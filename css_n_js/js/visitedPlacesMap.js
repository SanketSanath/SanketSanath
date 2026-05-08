// ── Data ──────────────────────────────────────────────────────────────────

const visitedPlaces = [
    // Andhra Pradesh
    { name: "West Godavari", state: "Andhra Pradesh", lat: 16.9, lng: 81.1 },
    // Bihar
    { name: "Araria",               state: "Bihar", lat: 26.15, lng: 87.52 },
    { name: "Bhagalpur",            state: "Bihar", lat: 25.25, lng: 87.01 },
    { name: "Darbhanga",            state: "Bihar", lat: 26.15, lng: 85.90 },
    { name: "Madhepura",            state: "Bihar", lat: 25.92, lng: 87.00 },
    { name: "Nalanda",              state: "Bihar", lat: 25.10, lng: 85.45 },
    { name: "Patna",                state: "Bihar", lat: 25.60, lng: 85.14 },
    { name: "Saharsa",              state: "Bihar", lat: 25.88, lng: 86.60 },
    { name: "Siwan",                state: "Bihar", lat: 26.22, lng: 84.36 },
    { name: "Supaul",               state: "Bihar", lat: 26.12, lng: 86.60 },
    // Delhi
    { name: "Delhi",                state: "Delhi", lat: 28.65, lng: 77.23 },
    // Goa
    { name: "North Goa",            state: "Goa", lat: 15.50, lng: 74.10 },
    // Haryana
    { name: "Faridabad",            state: "Haryana", lat: 28.41, lng: 77.31 },
    { name: "Gurgaon",              state: "Haryana", lat: 28.46, lng: 77.03 },
    // Himachal Pradesh
    { name: "Shimla",               state: "Himachal Pradesh", lat: 31.10, lng: 77.17 },
    // Jammu & Kashmir
    { name: "Jammu",                state: "Jammu and Kashmir", lat: 32.73, lng: 74.87 },
    { name: "Udhampur",             state: "Jammu and Kashmir", lat: 32.92, lng: 75.14 },
    // Karnataka
    { name: "Bangalore Urban",      state: "Karnataka", lat: 12.97, lng: 77.59 },
    // Maharashtra
    { name: "Greater Bombay",       state: "Maharashtra", lat: 19.08, lng: 72.88 },
    { name: "Thane",                state: "Maharashtra", lat: 19.22, lng: 73.00 },
    // Odisha
    { name: "Khordha",              state: "Odisha", lat: 20.18, lng: 85.62 },
    { name: "Puri",                 state: "Odisha", lat: 19.81, lng: 85.83 },
    // Rajasthan
    { name: "Alwar",                state: "Rajasthan", lat: 27.56, lng: 76.62 },
    { name: "Jodhpur",              state: "Rajasthan", lat: 26.30, lng: 73.02 },
    // Tamil Nadu
    { name: "Chennai",              state: "Tamil Nadu", lat: 13.08, lng: 80.27 },
    { name: "Thiruvallur",          state: "Tamil Nadu", lat: 13.14, lng: 79.91 },
    // Uttarakhand
    { name: "Dehra Dun",            state: "Uttarakhand", lat: 30.32, lng: 78.03 },
    { name: "Haridwar",             state: "Uttarakhand", lat: 29.95, lng: 78.16 },
    { name: "Naini Tal",            state: "Uttarakhand", lat: 29.38, lng: 79.46 },
    // Uttar Pradesh
    { name: "Agra",                 state: "Uttar Pradesh", lat: 27.18, lng: 78.01 },
    { name: "Gautam Buddha Nagar",  state: "Uttar Pradesh", lat: 28.57, lng: 77.49 },
    { name: "Ghaziabad",            state: "Uttar Pradesh", lat: 28.67, lng: 77.45 },
    { name: "Mathura",              state: "Uttar Pradesh", lat: 27.49, lng: 77.67 },
    { name: "Meerut",               state: "Uttar Pradesh", lat: 28.98, lng: 77.71 },
    { name: "Varanasi",             state: "Uttar Pradesh", lat: 25.32, lng: 83.00 },
    // West Bengal
    { name: "Darjiling",            state: "West Bengal", lat: 27.04, lng: 88.26 },
    { name: "Kolkata",              state: "West Bengal", lat: 22.57, lng: 88.36 },
    { name: "Haora",                state: "West Bengal", lat: 22.59, lng: 88.31 },
];

// emoji — shown as a foreignObject icon on the map and in the sidebar list
const adventures = [
    { name: "Bungee Jumping",   place: "Rishikesh",  state: "Uttarakhand",      lat: 30.11, lng: 78.32, emoji: "🪂" },
    { name: "River Rafting",    place: "Rishikesh",  state: "Uttarakhand",      lat: 30.09, lng: 78.30, emoji: "🚣" },
    { name: "Paragliding",      place: "Shimla",     state: "Himachal Pradesh", lat: 31.10, lng: 77.17, emoji: "🪁" },
    { name: "Trekking",         place: "Nainital",   state: "Uttarakhand",      lat: 29.38, lng: 79.46, emoji: "🥾" },
    { name: "Camping",          place: "Haridwar",   state: "Uttarakhand",      lat: 29.95, lng: 78.16, emoji: "⛺" },
];

// ── Constants ──────────────────────────────────────────────────────────────

const STATE_GEOJSON_URL = "https://gist.githubusercontent.com/jbrobst/56c13bbbf9d97d187fea01ca62ea5112/raw/e388c4cae20aa53cb5090210a42ebb9b765c0a36/india_states.geojson";

let currentTab = "places";    // "places" | "adventures"
let geoData    = null;
let highlightedIndex = -1;

// ── DOM refs ───────────────────────────────────────────────────────────────

const svg           = d3.select("#main-svg");
const tooltip       = d3.select("#map-tooltip");
const listContainer = document.getElementById("list-container");
const sidebarTitle  = document.getElementById("sidebar-title");
const sidebarCount  = document.getElementById("sidebar-count");

// ── Projection ─────────────────────────────────────────────────────────────

function getContainerSize() {
    const el = document.getElementById("map-container");
    return { width: el.clientWidth, height: el.clientHeight };
}

function buildProjection(width, height) {
    const scale = Math.min(width, height) * 1.35;
    return d3.geoMercator()
        .center([82, 22])
        .scale(scale)
        .translate([width * 0.45, height * 0.52]);
}

// ── Render map ─────────────────────────────────────────────────────────────

function renderMap() {
    const { width, height } = getContainerSize();
    const projection = buildProjection(width, height);
    const path = d3.geoPath().projection(projection);

    svg.attr("width", width).attr("height", height);
    svg.selectAll("*").remove();

    // State fills
    svg.selectAll("path.state")
        .data(geoData.features)
        .enter().append("path")
        .attr("class", "state")
        .attr("d", path)
        .attr("fill", "#e8e8e8")
        .attr("stroke", "#aaa")
        .attr("stroke-width", 0.8);

    if (currentTab === "places") {
        renderPlaces(projection);
    } else {
        renderAdventures(projection);
    }
}

// ── Places: green squares ──────────────────────────────────────────────────

function renderPlaces(projection) {
    const { width, height } = getContainerSize();
    const sq = Math.max(6, Math.min(width, height) * 0.012);

    svg.selectAll("rect.visited")
        .data(visitedPlaces)
        .enter().append("rect")
        .attr("class", "visited")
        .attr("x", d => projection([d.lng, d.lat])[0] - sq / 2)
        .attr("y", d => projection([d.lng, d.lat])[1] - sq / 2)
        .attr("width", sq)
        .attr("height", sq)
        .attr("fill", "#4caf50")
        .attr("stroke", "#2e7d32")
        .attr("stroke-width", 1)
        .attr("rx", 1.5)
        .style("cursor", "pointer")
        .on("mouseover", (event, d) => {
            d3.select(event.currentTarget).attr("fill", "#ff9800").attr("stroke", "#e65100");
            showTooltip(event, `<strong>${d.name}</strong><br>${d.state}`);
        })
        .on("mousemove", moveTooltip)
        .on("mouseout",  (event) => {
            d3.select(event.currentTarget).attr("fill", "#4caf50").attr("stroke", "#2e7d32");
            hideTooltip();
        })
        .on("click", (event, d) => {
            const idx = visitedPlaces.indexOf(d);
            highlightListItem(idx);
        });
}

// ── Adventures: emoji foreignObject icons ─────────────────────────────────

function renderAdventures(projection) {
    const { width, height } = getContainerSize();
    const iconSize = Math.max(20, Math.min(width, height) * 0.035);

    const fo = svg.selectAll("foreignObject.adventure")
        .data(adventures)
        .enter().append("foreignObject")
        .attr("class", "adventure")
        .attr("width", iconSize)
        .attr("height", iconSize)
        .attr("x", d => projection([d.lng, d.lat])[0] - iconSize / 2)
        .attr("y", d => projection([d.lng, d.lat])[1] - iconSize / 2)
        .style("cursor", "pointer")
        .on("mouseover", (event, d) => {
            d3.select(event.currentTarget).style("filter", "drop-shadow(0 0 4px rgba(255,152,0,0.9))");
            showTooltip(event, `<strong>${d.emoji} ${d.name}</strong><br>${d.place}, ${d.state}`);
        })
        .on("mousemove", moveTooltip)
        .on("mouseout", (event) => {
            d3.select(event.currentTarget).style("filter", "none");
            hideTooltip();
        })
        .on("click", (event, d) => {
            const idx = adventures.indexOf(d);
            highlightListItem(idx);
        });

    fo.append("xhtml:div")
        .style("width", iconSize + "px")
        .style("height", iconSize + "px")
        .style("font-size", (iconSize * 0.8) + "px")
        .style("line-height", iconSize + "px")
        .style("text-align", "center")
        .style("user-select", "none")
        .text(d => d.emoji);
}

// ── Sidebar list ───────────────────────────────────────────────────────────

function renderList() {
    const data = currentTab === "places" ? visitedPlaces : adventures;
    const isAdventures = currentTab === "adventures";

    sidebarTitle.childNodes[0].textContent = isAdventures ? "Adventures " : "Places Visited ";
    sidebarCount.textContent = `(${data.length})`;

    listContainer.innerHTML = "";

    data.forEach((item, i) => {
        const div = document.createElement("div");
        div.className = "list-item";
        div.dataset.index = i;

        const icon = document.createElement("div");
        icon.className = "list-icon";
        icon.textContent = isAdventures ? item.emoji : "📍";

        const text = document.createElement("div");
        text.innerHTML = `<div class="list-name">${isAdventures ? item.name : item.name}</div>
                          <div class="list-state">${isAdventures ? item.place + ", " + item.state : item.state}</div>`;

        div.appendChild(icon);
        div.appendChild(text);

        div.addEventListener("click", () => highlightListItem(i));
        listContainer.appendChild(div);
    });
}

function highlightListItem(idx) {
    highlightedIndex = idx;
    document.querySelectorAll(".list-item").forEach(el => el.classList.remove("highlighted"));
    const target = listContainer.querySelector(`[data-index="${idx}"]`);
    if (target) {
        target.classList.add("highlighted");
        target.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
}

// ── Tooltip helpers ────────────────────────────────────────────────────────

function showTooltip(event, html) {
    tooltip.style("display", "block").html(html);
}
function moveTooltip(event) {
    tooltip.style("left", (event.clientX + 14) + "px").style("top", (event.clientY - 34) + "px");
}
function hideTooltip() {
    tooltip.style("display", "none");
}

// ── Tab switching ──────────────────────────────────────────────────────────

document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentTab = btn.dataset.tab;
        highlightedIndex = -1;
        renderMap();
        renderList();
    });
});

// ── Resize ─────────────────────────────────────────────────────────────────

let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => renderMap(), 150);
});

// ── Boot ───────────────────────────────────────────────────────────────────

d3.json(STATE_GEOJSON_URL).then(data => {
    geoData = data;
    renderMap();
    renderList();
});
