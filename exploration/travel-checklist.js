const TRAVEL_VISIT_LABELS = {
  all: "All",
  visited: "Visited",
  partial: "Partially visited",
  pending: "Pending",
};

function travelVisitStatus(entry) {
  if (entry.components?.length) {
    const statuses = entry.components.map(travelVisitStatus);
    if (statuses.every(status => status === "visited")) return "visited";
    if (statuses.some(status => status !== "pending")) return "partial";
  }
  if (entry.visited) return "visited";
  return entry.partiallyVisited ? "partial" : "pending";
}

function travelVisitGroups(entries) {
  const groups = { visited: [], partial: [], pending: [] };
  for (const entry of entries) groups[travelVisitStatus(entry)].push(entry);
  return { all: [...groups.visited, ...groups.partial, ...groups.pending], ...groups };
}

function renderTravelChecklist(theme, rows, status, selectedId = null) {
  if (!rows.length) {
    const label = status === "all" ? "" : `${TRAVEL_VISIT_LABELS[status].toLowerCase()} `;
    return `<p class="theme-empty">No ${label}entries for this theme.</p>`;
  }

  const html = value => String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
  const number = new Intl.NumberFormat("en");
  const statusBadge = entry => {
    const state = travelVisitStatus(entry);
    return `<span class="visit-status ${state}">${TRAVEL_VISIT_LABELS[state]}</span>`;
  };
  const records = rows.map(entry => {
    const selected = entry.id && selectedId === entry.id;
    const title = entry.url ? `<a class="theme-source" href="${html(entry.url)}" target="_blank" rel="noopener">
      ${html(entry.name)}&nbsp;<span aria-hidden="true">↗</span></a>` : html(entry.name);
    const components = entry.components?.length ? `<details class="theme-components"${selected ? " open" : ""}>
      <summary>${entry.components.filter(component => travelVisitStatus(component) === "visited").length} / ${entry.components.length} visited</summary>
      <ul>${entry.components.map(component => `<li><span>${html(component.name)}</span>${statusBadge(component)}</li>`).join("")}</ul>
    </details>` : "";
    const region = html(entry.region);
    return `<tr${entry.id ? ` id="${html(entry.id)}"` : ""}${selected ? ' class="record-highlight" tabindex="-1"' : ""}>
      <td>${title}${theme.hasRouteMetrics ? `<span class="theme-note">${region}</span>` : ""}${components}</td>
      ${theme.hasRouteMetrics ? `<td class="route-metric">≈ ${number.format(entry.distanceKm)} km<span class="theme-note">${html(entry.route)}</span></td>
        <td class="route-metric">≈ ${number.format(entry.altitudeM)} m</td>` : theme.hasLocations ? `<td>${region}</td>` : ""}
      <td>${statusBadge(entry)}${entry.note ? `<span class="theme-note">${html(entry.note)}</span>` : ""}</td>
    </tr>`;
  }).join("");

  return `<div class="table-scroll" tabindex="0" role="region" aria-label="${html(theme.name)} checklist">
    <table class="theme-table" aria-label="${html(theme.name)}"><thead><tr>
      <th scope="col">${theme.itemType === "UNESCO" ? "Site" : html(theme.itemType)}</th>
      ${theme.hasRouteMetrics ? '<th scope="col">Distance</th><th scope="col">Altitude</th>' : theme.hasLocations ? '<th scope="col">Location</th>' : ""}
      <th scope="col">Status</th>
    </tr></thead><tbody>${records}</tbody></table></div>`;
}
