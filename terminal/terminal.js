(() => {
  "use strict";

  const views = ["overview", "reading", "travel", "timeline"];
  const kindNames = { reading: "Reading", travel: "Travel" };
  const main = document.querySelector("#content");
  const navLinks = document.querySelectorAll("[data-view]");
  const searchButton = document.querySelector("#open-search");
  const searchDialog = document.querySelector("#record-search");
  const searchInput = document.querySelector("#search-input");
  const searchStatus = document.querySelector("#search-status");
  const searchResults = document.querySelector("#search-results");
  if (/Mac|iPhone|iPad/.test(navigator.platform)) {
    searchButton.querySelector("kbd").textContent = "⌘ K";
    navLinks.forEach((link, index) => { link.querySelector("kbd").textContent = `⌥ ${index + 1}`; });
  }

  const calendarDay = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  const calendarMonth = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
  const compareText = new Intl.Collator("en", { numeric: true, sensitivity: "base" }).compare;
  const number = new Intl.NumberFormat("en");

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[character]);
  }

  function parseDate(value) {
    const parts = /^(\d{4})[-/](\d{2})(?:[-/](\d{2}))?$/.exec(value ?? "");
    if (!parts) return null;

    const [, year, month, day] = parts;
    const monthKey = `${year}-${month}`;
    const iso = day ? `${monthKey}-${day}` : monthKey;
    const calendarDate = new Date(`${monthKey}-${day ?? "01"}T00:00:00Z`);
    if (!Number.isFinite(calendarDate.getTime()) || !calendarDate.toISOString().startsWith(iso)) return null;

    return {
      year,
      iso,
      key: `${monthKey}-${day ?? "00"}`,
      label: (day ? calendarDay : calendarMonth).format(calendarDate),
    };
  }

  function records(entries, prefix, kind, dateField) {
    return entries.map((entry, index) => ({
      ...entry, id: `${prefix}-${index}`, kind, date: parseDate(entry[dateField]),
    }));
  }

  const booksAvailable = typeof BOOKS !== "undefined";
  const travelAvailable = typeof TRIPS !== "undefined" && typeof VISITED_PLACES !== "undefined" && typeof VISITED_AREAS !== "undefined";
  const books = records(booksAvailable ? BOOKS : [], "book", "reading", "dateRead").map(book => ({
    ...book,
    genres: [book.genre ?? []].flat().filter(Boolean),
    rating: book.rating > 0 ? book.rating : null,
  }));
  const trips = records(travelAvailable ? TRIPS : [], "trip", "travel", "date");
  const locations = [
    ...records(travelAvailable ? VISITED_PLACES : [], "place", "travel"),
    ...records(travelAvailable ? VISITED_AREAS : [], "area", "travel"),
  ].map(location => ({
    ...location,
    title: location.name,
    type: location.id.startsWith("place-") ? "Place" : "Area",
  })).sort((a, b) => compareText(a.title, b.title));
  const placesCount = locations.filter(location => location.type === "Place").length;
  const allRecords = [...books, ...trips, ...locations];
  const travelThemes = Object.entries(typeof TRAVEL_THEMES === "undefined" ? {} : TRAVEL_THEMES).map(
    ([key, theme]) => ({
      ...theme,
      key,
      entries: theme.entries.map((entry, index) => ({
        ...entry,
        id: `theme-${key}-${index}`,
        title: entry.name,
        label: entry.region ?? theme.name,
        kind: "travel",
        type: theme.itemType,
        theme: key,
      })),
    }),
  );

  function latestFirst(a, b) {
    return (b.date?.key ?? "").localeCompare(a.date?.key ?? "") || compareText(a.title, b.title);
  }

  const activity = allRecords.filter(record => record.date).sort(latestFirst);
  const sortedTrips = [...trips].sort(latestFirst);
  const searchIndex = [...allRecords, ...travelThemes.flatMap(theme => theme.entries)].sort(latestFirst).map(record => ({
    record,
    text: [record.title, record.author, record.genres, record.language, record.label, record.state, record.route, record.trailhead,
      record.type, record.components?.map(component => component.name)]
      .flat().filter(Boolean).join(" ").toLocaleLowerCase(),
  }));

  function breakdown(items) {
    const counts = new Map();
    for (const item of items.filter(Boolean)) counts.set(item, (counts.get(item) ?? 0) + 1);
    return [...counts].sort(([a, aCount], [b, bCount]) => bCount - aCount || compareText(a, b));
  }

  function yearsIn(items) {
    return [...new Set(items.map(item => item.date?.year).filter(Boolean))].sort();
  }

  const activityYears = yearsIn(activity);
  const yearRange = activityYears.length ? Array.from(
    { length: Number(activityYears.at(-1)) - Number(activityYears[0]) + 1 },
    (_, index) => String(Number(activityYears[0]) + index),
  ) : [];
  const genres = [...new Set(books.flatMap(book => book.genres))].sort(compareText);
  const languages = [...new Set(books.map(book => book.language).filter(Boolean))].sort(compareText);
  const regions = breakdown(locations.map(location => location.state));
  const regionOptions = regions.map(([region]) => region).sort(compareText);
  const bookYears = yearsIn(books).reverse();
  if (books.some(book => !book.date)) bookYears.push(["undated", "Date unknown"]);

  function hrefFor(view, values = {}) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(values)) {
      if (value) params.set(key, value);
    }
    return `#${view}${params.size ? `?${params}` : ""}`;
  }

  function routeFor(record) {
    if (record.theme) return hrefFor("travel", { view: "themes", theme: record.theme, record: record.id });
    return hrefFor(record.kind, { record: record.id });
  }

  function currentRoute() {
    const [name, query] = location.hash.slice(1).split("?");
    return { name: views.includes(name) ? name : "overview", params: new URLSearchParams(query ?? "") };
  }

  function header(title, description, end = "") {
    return `<header class="view-header">
      <div><h1 tabindex="-1">${title}</h1><p>${description}</p></div>
      ${end}
    </header>`;
  }

  function panel(title, content, { meta = "", className = "", id = "" } = {}) {
    return `<section class="panel ${className}"${id ? ` id="${id}"` : ""}>
      <div class="panel-head"><h2${id ? ' tabindex="-1"' : ""}>${title}</h2>${meta}</div>${content}
    </section>`;
  }

  function filter(name, label, selected, options, allLabel) {
    return `<div class="filter">
      <label for="filter-${name}">${label}</label>
      <select id="filter-${name}" data-filter="${name}">
        <option value="">${allLabel}</option>
        ${options.map(option => {
          const [value, text] = Array.isArray(option) ? option : [option, option];
          return `<option value="${escapeHtml(value)}"${value === selected ? " selected" : ""}>${escapeHtml(text)}</option>`;
        }).join("")}
      </select>
    </div>`;
  }

  function empty(message) {
    return `<p class="empty">${message}</p>`;
  }

  function timeLabel(date) {
    return date ? `<time datetime="${date.iso}">${date.label}</time>` : '<span class="missing">Unknown</span>';
  }

  function kindLabel(record) {
    return `<span class="kind" data-kind="${record.kind}">${record.type ?? kindNames[record.kind]}</span>`;
  }

  function recordMeta(record) {
    return record.author ?? record.label ?? record.state ?? "";
  }

  function activityList(items) {
    return `<ul class="activity-list">${items.map(record => `<li>
      <a class="activity-row" href="${routeFor(record)}">
        <span class="activity-date">${timeLabel(record.date)}</span>
        <span class="activity-name">${escapeHtml(record.title)}<span class="activity-meta">${escapeHtml(recordMeta(record))}</span></span>
        ${kindLabel(record)}
      </a>
    </li>`).join("")}</ul>`;
  }

  function annualChart() {
    if (!yearRange.length) return empty("No dated records yet.");

    const counts = new Map(yearRange.map(year => [year, { reading: 0, travel: 0 }]));
    for (const record of activity) counts.get(record.date.year)[record.kind] += 1;
    const max = Math.max(...Array.from(counts.values(), ({ reading, travel }) => reading + travel));
    const interval = Math.ceil(max / 4);
    const upper = interval * 4;
    const columns = [...counts].map(([year, { reading, travel }]) => {
      const label = `${year}: ${reading} reading, ${travel} travel. Open timeline.`;
      return `<a class="year-column" href="${hrefFor("timeline", { year })}" title="${label}" aria-label="${label}">
        <span class="stack" aria-hidden="true">
          ${travel ? `<span class="segment-travel" style="--size:${travel / upper * 100}%"></span>` : ""}
          ${reading ? `<span class="segment-reading" style="--size:${reading / upper * 100}%"></span>` : ""}
        </span>
        <span class="year-label" aria-hidden="true"><span class="year-full">${year}</span><span class="year-short">’${year.slice(-2)}</span></span>
      </a>`;
    }).join("");

    return `<div class="chart-shell">
      <div class="chart-scroll" tabindex="0" role="group" aria-label="Activity by year. Select a year to open the timeline.">
        <div class="chart" style="--years:${yearRange.length}">
          <div class="chart-ticks" aria-hidden="true">${[0, 1, 2, 3, 4].map(step =>
            `<span style="--position:${25 * step}%">${interval * step}</span>`).join("")}
          </div>
          <div class="chart-grid" aria-hidden="true"></div>
          <div class="chart-series">${columns}</div>
        </div>
      </div>
      <div class="legend"><span><i class="key-reading"></i> Books read</span><span><i class="key-travel"></i> Trips taken</span></div>
    </div>`;
  }

  function overview() {
    const metrics = [
      ["Books logged", booksAvailable ? books.length : null, "reading"],
      ["Trips logged", travelAvailable ? trips.length : null, "travel"],
      ["Places visited", travelAvailable ? placesCount : null, "travel", { section: "places" }],
      ["Areas explored", travelAvailable ? locations.length - placesCount : null, "travel", { section: "places" }],
    ];
    const metricsHtml = metrics.map(([label, count, view, params]) => `<a class="metric" data-kind="${view}" href="${hrefFor(view, params)}">
      <span class="metric-label">${label}</span>
      <span class="metric-arrow" aria-hidden="true">↗</span>
      <strong class="metric-value">${count === null ? "—" : number.format(count)}</strong>
    </a>`).join("");
    const yearSpan = activityYears.length > 1 ? `${activityYears[0]}–${activityYears.at(-1)}` : (activityYears[0] ?? "");

    return `${header("Overview", "Reading, travel, and the records that connect them.", yearSpan ? `<span class="period">${yearSpan}</span>` : "")}
      <div class="metrics">${metricsHtml}</div>
      <div class="panel-grid">
        ${panel("Activity by year", annualChart(), { meta: '<span class="panel-head-meta">Dated records</span>' })}
        ${panel("Recent activity", activity.length ? activityList(activity.slice(0, 6)) : empty("No dated activity yet."), {
          meta: '<a class="text-link" href="#timeline">Full timeline <span aria-hidden="true">→</span></a>',
        })}
      </div>`;
  }

  function barList(counts, view, filterName, params, selected, noun) {
    if (!counts.length) return empty("No records for this breakdown.");
    const max = Math.max(...counts.map(([, count]) => count));
    return `<ul class="breakdown">${counts.map(([label, count]) => {
      const url = hrefFor(view, { ...params, [filterName]: selected === label ? "" : label });
      const description = `${label}: ${number.format(count)} ${noun}${count === 1 ? "" : "s"}`;
      return `<li><a href="${url}" aria-label="${escapeHtml(description)}"${selected === label ? ' aria-current="true"' : ""}>
        <span>${escapeHtml(label)}</span>
        <span class="bar-track" aria-hidden="true"><span class="bar-fill" style="--size:${count / max * 100}%"></span></span>
        <span class="bar-count" aria-hidden="true">${number.format(count)}</span>
      </a></li>`;
    }).join("")}</ul>`;
  }

  const columns = [
    ["title", "Title"], ["author", "Author"], ["date", "Date read"],
    ["rating", "Rating"], ["genres", "Genre"], ["language", "Language"],
  ];

  function sortBooks(items, field, direction) {
    return [...items].sort((a, b) => {
      const left = a[field];
      const right = b[field];
      const hasLeft = Array.isArray(left) ? left.length > 0 : left != null && left !== "";
      const hasRight = Array.isArray(right) ? right.length > 0 : right != null && right !== "";
      if (hasLeft !== hasRight) return hasLeft ? -1 : 1;
      if (!hasLeft) return compareText(a.title, b.title);
      const result = field === "rating" ? left - right : compareText(left.key ?? left, right.key ?? right);
      return result * (direction === "asc" ? 1 : -1) || compareText(a.title, b.title);
    });
  }

  function recordAttributes(record, selected) {
    return `id="${record.id}"${selected === record.id ? ' class="record-highlight" tabindex="-1"' : ""}`;
  }

  function readingTable(rows, order, direction, params) {
    const headings = columns.map(([field, label]) => {
      const active = field === order;
      const next = active ? (direction === "asc" ? "desc" : "asc") : (["date", "rating"].includes(field) ? "desc" : "asc");
      return `<th scope="col"${active ? ` aria-sort="${direction === "asc" ? "ascending" : "descending"}"` : ""}${field === "rating" ? ' class="rating-heading"' : ""}>
        <button type="button" class="sort-action" id="sort-${field}" data-sort="${field}" data-direction="${next}">
          ${label}${active ? ` <span class="sort-arrow" aria-hidden="true">${direction === "asc" ? "↑" : "↓"}</span>` : ""}
        </button>
      </th>`;
    }).join("");

    return `<div class="table-scroll" tabindex="0" role="region" aria-label="Reading records table">
      <table class="reading-table" aria-label="Reading records">
        <thead><tr>${headings}</tr></thead>
        <tbody>${rows.map(book => `<tr ${recordAttributes(book, params.get("record"))}>
          <td>${escapeHtml(book.title)}</td><td>${escapeHtml(book.author)}</td>
          <td class="date-cell">${timeLabel(book.date)}</td>
          <td class="rating">${book.rating === null ? '<span class="missing" aria-label="Unrated">—</span>' : number.format(book.rating)}</td>
          <td>${escapeHtml(book.genres.join(" · "))}</td><td>${escapeHtml(book.language)}</td>
        </tr>`).join("")}</tbody>
      </table>
    </div>`;
  }

  function reading(params) {
    const year = params.get("year") ?? "";
    const genre = params.get("genre") ?? "";
    const language = params.get("language") ?? "";
    const requestedSort = params.get("sort");
    const order = columns.some(([field]) => field === requestedSort) ? requestedSort : "date";
    const direction = params.get("direction") === "asc" ? "asc" : "desc";
    const filtered = books.filter(book => (!year || (book.date?.year ?? "undated") === year)
      && (!genre || book.genres.includes(genre))
      && (!language || book.language === language));
    const chartParams = { year, genre, language, sort: requestedSort, direction: params.get("direction") };
    const yearCounts = breakdown(filtered.map(book => book.date?.year)).sort(([a], [b]) => b.localeCompare(a));

    return `${header("Reading", "Books logged, with ratings, genres, and languages.",
      '<a class="text-link" href="../reading/index.html">Reading log <span aria-hidden="true">↗</span></a>')}
      <div class="filterbar" role="group" aria-label="Reading filters">
        ${filter("year", "Year", year, bookYears, "All years")}
        ${filter("genre", "Genre", genre, genres, "All genres")}
        ${filter("language", "Language", language, languages, "All languages")}
        ${year || genre || language ? '<a class="text-link" href="#reading">Clear filters</a>' : ""}
      </div>
      <div class="panel-grid equal">
        ${panel("Books by year", barList(yearCounts, "reading", "year", chartParams, year, "book"), { className: "reading-bars" })}
        ${panel("Books by genre", barList(breakdown(filtered.flatMap(book => book.genres)), "reading", "genre", chartParams, genre, "book"), { className: "reading-bars" })}
      </div>
      ${panel("Reading records", filtered.length
        ? readingTable(sortBooks(filtered, order, direction), order, direction, params)
        : empty("No books match these filters."), {
        meta: `<span class="panel-head-meta">${number.format(filtered.length)} of ${number.format(books.length)} books</span>`,
      })}
    `;
  }

  function travelThemeView(params) {
    const theme = travelThemes.find(item => item.key === params.get("theme")) ?? travelThemes[0];
    if (!theme || typeof renderTravelChecklist !== "function") {
      return panel("Theme lists", empty("Theme lists could not be loaded. Try refreshing."));
    }

    const status = params.get("status");
    const activeStatus = Object.hasOwn(TRAVEL_VISIT_LABELS, status) ? status : "all";
    const statusQuery = key => key === "all" ? "" : key;
    const groups = travelVisitGroups(theme.entries);
    const themeNav = travelThemes.map(item => {
      const href = hrefFor("travel", { view: "themes", theme: item.key, status: statusQuery(activeStatus) });
      const itemGroups = item === theme ? groups : travelVisitGroups(item.entries);
      return `<a href="${href}"${item === theme ? ' aria-current="page"' : ""}>
        <strong>${item.name}</strong>
        <span>${itemGroups.visited.length} / ${item.entries.length} visited${itemGroups.partial.length ? ` · ${itemGroups.partial.length} partial` : ""}</span>
      </a>`;
    }).join("");
    const statusNav = Object.entries(TRAVEL_VISIT_LABELS).map(([value, label]) => {
      const href = hrefFor("travel", { view: "themes", theme: theme.key, status: statusQuery(value) });
      return `<a href="${href}"${activeStatus === value ? ' aria-current="page"' : ""}>${label} <span>${groups[value].length}</span></a>`;
    }).join("");
    const table = renderTravelChecklist(theme, groups[activeStatus], activeStatus, params.get("record"));

    return `<nav class="theme-picker" aria-label="Travel themes">${themeNav}</nav>
      ${panel(theme.name, `<div class="theme-toolbar">
        <nav class="theme-statuses" aria-label="Visit status">${statusNav}</nav>
        ${theme.hasRouteMetrics ? `<span class="panel-head-meta">${TRAVEL_ROUTE_NOTE}</span>` : ""}
      </div>${table}`, {
        meta: theme.source ? `<a class="text-link" href="${theme.source.url}" target="_blank" rel="noopener">${theme.source.label} <span aria-hidden="true">↗</span></a>` : "",
      })}`;
  }

  function travel(params) {
    const views = [["", "Trips and places"], ["themes", "Theme lists"], ["map", "Scratch map"]];
    const view = views.find(([key]) => key === params.get("view"))?.[0] ?? "";
    const viewNav = views.map(([key, label]) => `<a href="${hrefFor("travel", { view: key })}"${key === view ? ' aria-current="page"' : ""}>${label}</a>`).join("");
    const title = `${header("Travel", "Trips, routes, and places explored.",
      '<a class="text-link" href="../exploration/index.html">Exploration map <span aria-hidden="true">↗</span></a>')}
      <nav class="travel-views" aria-label="Travel views">${viewNav}</nav>`;

    if (view === "themes") return title + travelThemeView(params);
    if (view === "map") {
      return title + panel("Scratch map", `<iframe class="scratch-map-frame" title="Interactive scratch map of India and Nepal"
        src="../exploration/index.html?embed=map"></iframe>`, {
        meta: '<span class="panel-head-meta">Select a region to zoom · Esc to reset</span>',
      });
    }
    return title + travelRecords(params);
  }

  function travelRecords(params) {
    const selectedRecord = params.get("record");
    const region = params.get("region") ?? "";
    const filteredPlaces = locations.filter(place => !region || place.state === region);
    const tripRows = sortedTrips.map(trip => {
      const route = trip.route?.length ? `<p class="trip-route">${trip.route.map(escapeHtml).join(" → ")}</p>` : "";
      const story = trip.story ? `<p>${escapeHtml(trip.story)}</p>` : "";
      const title = escapeHtml(trip.title);
      return `<tr ${recordAttributes(trip, selectedRecord)}>
        <td>${route || story
          ? `<details${selectedRecord === trip.id ? " open" : ""}><summary>${title}</summary><div class="trip-detail">${route}${story}</div></details>`
          : title}</td>
        <td>${escapeHtml(trip.label)}</td><td class="date-cell">${timeLabel(trip.date)}</td>
      </tr>`;
    }).join("");
    const placeRows = filteredPlaces.map(place => `<tr ${recordAttributes(place, selectedRecord)}>
      <td>${escapeHtml(place.title)}</td><td>${escapeHtml(place.state)}</td><td>${place.type}</td>
    </tr>`).join("");

    return `<div class="panel-grid travel-grid">
        ${panel("Trips", tripRows ? `<div class="table-scroll" tabindex="0" role="region" aria-label="Trips table">
          <table class="trip-table" aria-label="Trips"><thead><tr><th scope="col">Trip</th><th scope="col">Region</th><th scope="col">Date</th></tr></thead><tbody>${tripRows}</tbody></table>
        </div>` : empty("No trips are available."), {
          meta: `<span class="panel-head-meta">${number.format(trips.length)} logged</span>`,
        })}
        <div>
          ${panel("Places and areas by region", barList(regions, "travel", "region", {}, region, "record"))}
          ${panel("Places and areas", placeRows ? `<div class="table-scroll" tabindex="0" role="region" aria-label="Places and areas table">
            <table aria-label="Places and areas"><thead><tr><th scope="col">Location</th><th scope="col">Region</th><th scope="col">Type</th></tr></thead><tbody>${placeRows}</tbody></table>
          </div>` : empty("No places or areas match this region."), {
            meta: filter("region", "Region", region, regionOptions, "All regions"),
            className: "travel-place-panel",
            id: "places",
          })}
        </div>
      </div>`;
  }

  function timeline(params) {
    const year = params.get("year") ?? "";
    const kind = params.get("type") ?? "";
    const filtered = activity.filter(record => (!year || record.date.year === year) && (!kind || record.kind === kind));
    const groups = new Map();
    for (const record of filtered) {
      if (!groups.has(record.date.year)) groups.set(record.date.year, []);
      groups.get(record.date.year).push(record);
    }

    return `${header("Timeline", "Dated entries from the reading and travel logs.")}
      <div class="filterbar" role="group" aria-label="Timeline filters">
        ${filter("year", "Year", year, [...yearRange].reverse(), "All years")}
        ${filter("type", "Category", kind, Object.entries(kindNames), "All categories")}
        ${year || kind ? '<a class="text-link" href="#timeline">Clear filters</a>' : ""}
      </div>
      ${panel("Activity", groups.size ? [...groups].map(([groupYear, items]) => `<section class="timeline-group">
        <h3 class="timeline-year">${groupYear}</h3>${activityList(items)}
      </section>`).join("") : empty("No dated records match these filters."), {
        className: "timeline",
        meta: `<span class="panel-head-meta">${number.format(filtered.length)} entries</span>`,
      })}`;
  }

  const renderView = { overview, reading, travel, timeline };

  function render({ focusHeading = false, focusControl = "" } = {}) {
    const { name, params } = currentRoute();
    const unavailable = [!booksAvailable && "reading", !travelAvailable && "travel"].filter(Boolean);
    const alert = unavailable.length ? `<p class="source-alert" role="status">Could not load ${unavailable.join(" and ")} data. Try refreshing the page.</p>` : "";
    main.innerHTML = alert + renderView[name](params);
    for (const link of navLinks) {
      if (link.dataset.view === name) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    }
    document.title = name === "overview" ? "Life Terminal | Sanket Sanath" : `${main.querySelector("h1").textContent} | Life Terminal`;

    const placeHeading = name === "travel" && params.get("section") === "places" ? main.querySelector("#places h2") : null;
    const target = main.querySelector(".record-highlight") ?? placeHeading;
    if (focusControl) {
      document.getElementById(focusControl)?.focus({ preventScroll: true });
    } else if (target) {
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: "center", inline: "nearest" });
    } else if (focusHeading) {
      window.scrollTo(0, 0);
      main.querySelector("h1").focus({ preventScroll: true });
    }
  }

  function updateRoute(values, focusControl) {
    const route = currentRoute();
    const params = { ...Object.fromEntries(route.params), ...values, record: "" };
    history.replaceState(null, "", hrefFor(route.name, params));
    render({ focusControl });
  }

  main.addEventListener("change", event => {
    const { filter: name } = event.target.dataset;
    if (name) updateRoute({ [name]: event.target.value }, event.target.id);
  });

  main.addEventListener("click", event => {
    const button = event.target.closest("[data-sort]");
    if (button) updateRoute({ sort: button.dataset.sort, direction: button.dataset.direction }, button.id);
  });

  function drawSearch() {
    const terms = searchInput.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    const results = terms.length ? searchIndex.filter(({ text }) => terms.every(term => text.includes(term))) : searchIndex;
    const visible = results.slice(0, terms.length ? 16 : 6);
    searchStatus.textContent = terms.length
      ? (results.length ? `${visible.length} of ${results.length} matches` : "No matching records.")
      : "Recent records";
    searchResults.innerHTML = visible.map(({ record }) => `<li>
      <a class="activity-row" href="${routeFor(record)}">
        <span class="activity-name">${escapeHtml(record.title)}<span class="activity-meta">${escapeHtml(recordMeta(record))}</span></span>
        ${kindLabel(record)}
      </a>
    </li>`).join("");
  }

  function openSearch() {
    if (searchDialog.open) return;
    searchInput.value = "";
    drawSearch();
    searchDialog.showModal();
    searchInput.focus();
  }

  function openSearchResult(link) {
    const sameRoute = location.hash === link.hash;
    searchDialog.close();
    if (sameRoute) render();
    else location.hash = link.hash;
  }

  searchButton.disabled = false;
  searchButton.addEventListener("click", openSearch);
  searchInput.addEventListener("input", drawSearch);
  searchResults.addEventListener("click", event => {
    const link = event.target.closest("a");
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openSearchResult(link);
  });

  searchDialog.addEventListener("keydown", event => {
    const links = [...searchResults.querySelectorAll("a")];
    if (!links.length) return;
    if (event.key === "Enter" && event.target === searchInput) {
      event.preventDefault();
      openSearchResult(links[0]);
    }
    if (event.key === "ArrowDown" && event.target === searchInput) {
      event.preventDefault();
      links[0].focus();
    }
    const index = links.indexOf(event.target);
    if (index < 0 || !["ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "ArrowUp") (links[index - 1] ?? searchInput).focus();
    else (links[index + 1] ?? links[index]).focus();
  });

  document.addEventListener("keydown", event => {
    if ((event.metaKey || event.ctrlKey) && !event.altKey && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openSearch();
    }
    if (searchDialog.open || !event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.target.matches("input, textarea, [contenteditable]")) return;
    const match = /^Digit([1-4])$/.exec(event.code);
    if (!match) return;
    event.preventDefault();
    location.hash = hrefFor(views[Number(match[1]) - 1]);
  });

  document.querySelector(".skip-link").addEventListener("click", event => {
    event.preventDefault();
    main.focus();
  });
  window.addEventListener("hashchange", () => render({ focusHeading: true }));
  render();
})();
