(() => {
    "use strict";

    const search = document.querySelector("#search-input");
    const filters = [...document.querySelectorAll(".reading-filters select")];
    const clearFilters = document.querySelector("#clear-filters");
    const groupButtons = [...document.querySelectorAll(".reading-group-button")];
    const count = document.querySelector("#reading-count");
    const results = document.querySelector("#reading-results");
    const views = [...document.querySelectorAll(".reading-views a")];
    const menuToggle = document.querySelector(".reading-nav .navbar-toggler");
    const menu = document.querySelector("#reading-navigation");

    const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });
    const dateFormat = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
    const shortDateFormat = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short", timeZone: "UTC" });
    const currentYear = new Intl.DateTimeFormat("en", { year: "numeric", timeZone: "Asia/Kolkata" }).format(new Date());
    const unknownYear = "undated";
    const sourceAvailable = typeof BOOKS !== "undefined";
    let groupMode = "";

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, character => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
        })[character]);
    }

    function dateInfo(value) {
        const iso = (value ?? "").replaceAll("/", "-");
        if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
        const date = new Date(iso + "T00:00:00Z");
        if (!Number.isFinite(date.getTime()) || !date.toISOString().startsWith(iso)) return null;
        return { iso, year: iso.slice(0, 4), label: dateFormat.format(date), shortLabel: shortDateFormat.format(date) };
    }

    const books = (sourceAvailable ? BOOKS : []).map(entry => {
        const date = dateInfo(entry.dateRead);
        const genres = [...new Set([entry.genre ?? []].flat().filter(Boolean))];
        return {
            title: entry.title,
            author: entry.author || "Unknown author",
            rating: entry.rating > 0 ? Number(entry.rating) : null,
            genre: genres.length ? genres : ["Uncategorized"],
            language: entry.language || "Unknown language",
            date,
            started: dateInfo(entry.dateStarted),
            year: date?.year ?? unknownYear,
        };
    }).sort((a, b) => (b.date?.iso ?? "").localeCompare(a.date?.iso ?? ""));

    function groupsFor(entries, field) {
        const grouped = new Map();
        for (const book of entries) {
            const values = field === "genre" ? book.genre : [book[field]];
            for (const value of values) {
                if (!grouped.has(value)) grouped.set(value, []);
                grouped.get(value).push(book);
            }
        }
        return [...grouped];
    }

    function sortedGroups(entries, field) {
        return groupsFor(entries, field).sort(([a, first], [b, second]) => field === "year"
            ? Number(b === unknownYear ? 0 : b) - Number(a === unknownYear ? 0 : a)
            : second.length - first.length || collator.compare(a, b));
    }

    function bookCount(size) {
        return `${size} ${size === 1 ? "book" : "books"}`;
    }

    function groupLabel(value) {
        return value === unknownYear ? "Year unknown" : value;
    }

    function readingDates({ date, started }) {
        if (!date) return "";
        const finish = `<time datetime="${date.iso}">${date.label}</time>`;
        if (!started || started.iso >= date.iso) return `<span class="book-date">${finish}</span>`;
        const startLabel = started.year === date.year ? started.shortLabel : started.label;
        return `<span class="book-date"><time datetime="${started.iso}">${startLabel}</time> – ${finish}</span>`;
    }

    function bookList(entries, title = "Reading log") {
        return `<ul class="book-list" role="list" aria-label="${escapeHtml(title)}">
            ${entries.map(book => `<li class="book-row">
                <div class="book-identity">
                    <p class="book-title">${escapeHtml(book.title)}</p>
                    <p class="book-author">${escapeHtml(book.author)}</p>
                </div>
                <div class="book-meta">
                    ${book.rating === null ? '<span class="book-unrated">Not rated</span>' :
                        `<span class="book-stars" role="img" aria-label="${book.rating} out of 5 stars" title="${book.rating} / 5">
                            <span aria-hidden="true">★★★★★</span>
                            <span class="book-stars-fill" aria-hidden="true" style="--rating-fill:${Math.min(book.rating, 5) * 20}%">★★★★★</span>
                        </span>`}
                    ${readingDates(book)}
                </div>
            </li>`).join("")}
        </ul>`;
    }

    function yearChart(entries) {
        const counts = new Map(groupsFor(entries, "year").map(([year, items]) => [year, items.length]));
        const undated = counts.get(unknownYear) ?? 0;
        counts.delete(unknownYear);
        const years = [...counts.keys()].map(Number);
        const start = Math.min(...years);
        const end = Math.max(...years);
        const largest = Math.max(...counts.values());

        const plot = years.length ? `<div class="year-chart-wrap" tabindex="0" role="region" aria-label="Yearly chart">
            <ol class="year-chart" style="--count:${end - start + 1}">
                ${Array.from({ length: end - start + 1 }, (_, offset) => {
                    const year = String(start + offset);
                    const size = counts.get(year) ?? 0;
                    const icon = `<span>${size}</span><span class="year-value" style="--bar-height:${Math.round(size / largest * 122)}px"></span>
                        <span class="year-label"><span class="year-wide">${year}</span><span class="year-short">’${year.slice(-2)}</span></span>`;
                    return `<li>${size
                        ? `<button type="button" data-chart-filter="year" value="${year}" aria-label="Show ${bookCount(size)} read in ${year}">${icon}</button>`
                        : `<div class="year-empty" aria-label="0 books in ${year}">${icon}</div>`}</li>`;
                }).join("")}
            </ol>
        </div>` : '<p class="reading-note">No read dates in these results.</p>';
        return `<section class="reading-chart-card">
            <h2>Books by year</h2>
            ${plot}
            ${undated ? `<p class="reading-note"><button class="undated-books" type="button" data-chart-filter="year" value="${unknownYear}">${bookCount(undated)} with no read date</button></p>` : ""}
        </section>`;
    }

    function categoryChart(title, entries, field, limit = Infinity) {
        const allGroups = sortedGroups(entries, field);
        const groups = allGroups.slice(0, limit);
        const largest = groups[0][1].length;
        const notes = [];
        if (allGroups.length > limit) notes.push(`Showing ${limit} of ${allGroups.length} genres.`);
        if (field === "genre" && entries.some(book => book.genre.length > 1)) notes.push("Books can have more than one genre.");
        return `<section class="reading-chart-card reading-chart-${field === "genre" ? "genres" : "languages"}">
            <h2>${title}</h2>
            <ul class="reading-bars">${groups.map(([name, items]) => `<li>
                <button type="button" data-chart-filter="${field}" value="${escapeHtml(name)}" aria-label="Show ${bookCount(items.length)} for ${escapeHtml(name)}">
                    <span>${escapeHtml(name)}</span>
                    <span class="reading-bar-track" aria-hidden="true"><span class="reading-bar-fill" style="--bar-width:${items.length / largest * 100}%"></span></span>
                    <span class="reading-bar-count" aria-hidden="true">${items.length}</span>
                </button>
            </li>`).join("")}</ul>
            ${notes.length ? `<p class="reading-note">${notes.join(" ")}</p>` : ""}
        </section>`;
    }

    function getView() {
        return location.hash === "#charts" ? "charts" : "list";
    }

    function render() {
        const view = getView();
        const terms = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
        const active = filters.filter(select => select.value);
        const filtered = books.filter(book => {
            const text = `${book.title} ${book.author}`.toLowerCase();
            return terms.every(term => text.includes(term)) && active.every(select =>
                select.dataset.filter === "genre" ? book.genre.includes(select.value) : book[select.dataset.filter] === select.value);
        });

        for (const link of views) {
            if (link.dataset.view === view) link.setAttribute("aria-current", "page");
            else link.removeAttribute("aria-current");
        }

        for (const select of filters) select.classList.toggle("is-active", Boolean(select.value));
        for (const button of groupButtons) button.setAttribute("aria-pressed", String(button.dataset.group === groupMode));
        clearFilters.hidden = !terms.length && !active.length;
        document.querySelector("#reading-group").hidden = view === "charts";
        count.textContent = !sourceAvailable ? "" : clearFilters.hidden ? bookCount(books.length) : `${filtered.length} of ${bookCount(books.length)}`;

        if (!sourceAvailable) {
            results.innerHTML = '<p class="reading-empty">The reading log could not be loaded. Refresh to try again.</p>';
        } else if (!filtered.length) {
            results.innerHTML = '<p class="reading-empty">No books match your search or filters.</p>';
        } else if (view === "charts") {
            results.innerHTML = `<div class="reading-charts">
                ${yearChart(filtered)}
                ${categoryChart("Books by genre", filtered, "genre", 8)}
                ${categoryChart("Books by language", filtered, "language")}
            </div>`;
        } else {
            results.innerHTML = groupMode
                ? sortedGroups(filtered, groupMode).map(([name, items]) => {
                    const title = groupLabel(name);
                    return `<section class="reading-book-group">
                        <div class="reading-group-heading"><h2>${escapeHtml(title)}</h2><span>${bookCount(items.length)}</span></div>
                        ${bookList(items, title)}
                    </section>`;
                }).join("")
                : bookList(filtered);
        }
    }

    if (sourceAvailable) {
        const rated = books.filter(book => book.rating !== null);
        document.querySelector("#stat-total").textContent = books.length;
        document.querySelector("#stat-year-label").textContent = `Read in ${currentYear}`;
        document.querySelector("#stat-year").textContent = books.filter(book => book.year === currentYear).length;
        document.querySelector("#stat-avg").textContent = rated.length
            ? (rated.reduce((total, book) => total + book.rating, 0) / rated.length).toFixed(1)
            : "—";
        document.querySelector("#stat-authors").textContent = new Set(books.map(book => book.author)).size;

        for (const select of filters) {
            const field = select.dataset.filter;
            const options = groupsFor(books, field).map(([name]) => name);
            options.sort((a, b) => field === "year"
                ? Number(b === unknownYear ? 0 : b) - Number(a === unknownYear ? 0 : a)
                : collator.compare(a, b));
            for (const value of options) select.add(new Option(groupLabel(value), value));
        }
    }

    search.addEventListener("input", render);
    for (const button of groupButtons) {
        button.addEventListener("click", () => {
            groupMode = button.dataset.group;
            render();
        });
    }
    for (const filter of filters) filter.addEventListener("change", render);
    clearFilters.addEventListener("click", () => {
        search.value = "";
        for (const filter of filters) filter.value = "";
        render();
        search.focus();
    });

    let focusList = false;
    results.addEventListener("click", event => {
        const drillDown = event.target.closest("[data-chart-filter]");
        if (!drillDown) return;
        filters.find(select => select.dataset.filter === drillDown.dataset.chartFilter).value = drillDown.value;
        focusList = true;
        location.hash = "#list";
    });
    window.addEventListener("hashchange", () => {
        render();
        if (focusList) {
            results.focus();
            focusList = false;
        }
    });

    menuToggle.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", String(menu.classList.toggle("show")));
    });
    document.querySelector(".reading-nav").addEventListener("keydown", event => {
        if (event.key === "Escape" && menu.classList.contains("show")) {
            menu.classList.remove("show");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.focus();
        }
    });

    render();
})();
