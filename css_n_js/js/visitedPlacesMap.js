// Visited places with approximate lat/lng coordinates
const visitedPlaces = [
    // Andhra Pradesh
    { name: "West Godavari", state: "Andhra Pradesh", lat: 16.9, lng: 81.1 },
    // Bihar
    { name: "Araria", state: "Bihar", lat: 26.15, lng: 87.52 },
    { name: "Bhagalpur", state: "Bihar", lat: 25.25, lng: 87.01 },
    { name: "Darbhanga", state: "Bihar", lat: 26.15, lng: 85.90 },
    { name: "Madhepura", state: "Bihar", lat: 25.92, lng: 87.00 },
    { name: "Nalanda", state: "Bihar", lat: 25.10, lng: 85.45 },
    { name: "Patna", state: "Bihar", lat: 25.60, lng: 85.14 },
    { name: "Saharsa", state: "Bihar", lat: 25.88, lng: 86.60 },
    { name: "Siwan", state: "Bihar", lat: 26.22, lng: 84.36 },
    { name: "Supaul", state: "Bihar", lat: 26.12, lng: 86.60 },
    // Delhi
    { name: "Delhi", state: "Delhi", lat: 28.65, lng: 77.23 },
    // Goa
    { name: "North Goa", state: "Goa", lat: 15.50, lng: 74.10 },
    // Haryana
    { name: "Faridabad", state: "Haryana", lat: 28.41, lng: 77.31 },
    { name: "Gurgaon", state: "Haryana", lat: 28.46, lng: 77.03 },
    // Himachal Pradesh
    { name: "Shimla", state: "Himachal Pradesh", lat: 31.10, lng: 77.17 },
    // J&K
    { name: "Jammu", state: "Jammu and Kashmir", lat: 32.73, lng: 74.87 },
    { name: "Udhampur", state: "Jammu and Kashmir", lat: 32.92, lng: 75.14 },
    // Karnataka
    { name: "Bangalore Urban", state: "Karnataka", lat: 12.97, lng: 77.59 },
    // Maharashtra
    { name: "Greater Bombay", state: "Maharashtra", lat: 19.08, lng: 72.88 },
    { name: "Thane", state: "Maharashtra", lat: 19.22, lng: 73.00 },
    // Odisha
    { name: "Khordha", state: "Odisha", lat: 20.18, lng: 85.62 },
    { name: "Puri", state: "Odisha", lat: 19.81, lng: 85.83 },
    // Rajasthan
    { name: "Alwar", state: "Rajasthan", lat: 27.56, lng: 76.62 },
    { name: "Jodhpur", state: "Rajasthan", lat: 26.30, lng: 73.02 },
    // Tamil Nadu
    { name: "Chennai", state: "Tamil Nadu", lat: 13.08, lng: 80.27 },
    { name: "Thiruvallur", state: "Tamil Nadu", lat: 13.14, lng: 79.91 },
    // Uttarakhand
    { name: "Dehra Dun", state: "Uttarakhand", lat: 30.32, lng: 78.03 },
    { name: "Haridwar", state: "Uttarakhand", lat: 29.95, lng: 78.16 },
    { name: "Naini Tal", state: "Uttarakhand", lat: 29.38, lng: 79.46 },
    // Uttar Pradesh
    { name: "Agra", state: "Uttar Pradesh", lat: 27.18, lng: 78.01 },
    { name: "Gautam Buddha Nagar", state: "Uttar Pradesh", lat: 28.57, lng: 77.49 },
    { name: "Ghaziabad", state: "Uttar Pradesh", lat: 28.67, lng: 77.45 },
    { name: "Mathura", state: "Uttar Pradesh", lat: 27.49, lng: 77.67 },
    { name: "Meerut", state: "Uttar Pradesh", lat: 28.98, lng: 77.71 },
    { name: "Varanasi", state: "Uttar Pradesh", lat: 25.32, lng: 83.00 },
    // West Bengal
    { name: "Darjiling", state: "West Bengal", lat: 27.04, lng: 88.26 },
    { name: "Kolkata", state: "West Bengal", lat: 22.57, lng: 88.36 },
    { name: "Haora", state: "West Bengal", lat: 22.59, lng: 88.31 },
];

const NAVBAR_HEIGHT = 56;
const stateGeoJsonUrl = "https://gist.githubusercontent.com/jbrobst/56c13bbbf9d97d187fea01ca62ea5112/raw/e388c4cae20aa53cb5090210a42ebb9b765c0a36/india_states.geojson";

const svg = d3.select("svg");
const tooltip = d3.select("#map-tooltip");

function getMapDimensions() {
    return {
        width: window.innerWidth,
        height: window.innerHeight - NAVBAR_HEIGHT
    };
}

function buildProjection(width, height) {
    // Scale based on the smaller dimension so the map fits on any screen
    const scale = Math.min(width, height) * 1.4;
    return d3.geoMercator()
        .center([82, 22])
        .scale(scale)
        .translate([width * 0.45, height * 0.52]);
}

function renderMap(geoData) {
    const { width, height } = getMapDimensions();

    svg.attr("width", width).attr("height", height)
        .style("margin-top", NAVBAR_HEIGHT + "px");

    const projection = buildProjection(width, height);
    const path = d3.geoPath().projection(projection);

    svg.selectAll("*").remove();

    // Draw state borders
    svg.selectAll("path.state")
        .data(geoData.features)
        .enter().append("path")
        .attr("class", "state")
        .attr("d", path)
        .attr("fill", "#e8e8e8")
        .attr("stroke", "#aaa")
        .attr("stroke-width", 0.8);

    // Draw visited place squares
    const squareSize = Math.max(6, Math.min(width, height) * 0.012);

    svg.selectAll("rect.visited")
        .data(visitedPlaces)
        .enter().append("rect")
        .attr("class", "visited")
        .attr("x", d => projection([d.lng, d.lat])[0] - squareSize / 2)
        .attr("y", d => projection([d.lng, d.lat])[1] - squareSize / 2)
        .attr("width", squareSize)
        .attr("height", squareSize)
        .attr("fill", "#4caf50")
        .attr("stroke", "#2e7d32")
        .attr("stroke-width", 1)
        .attr("rx", 1)
        .style("cursor", "pointer")
        .on("mouseover", function (event, d) {
            d3.select(this).attr("fill", "#ff9800").attr("stroke", "#e65100");
            tooltip.style("display", "block")
                .html(`<strong>${d.name}</strong><br/>${d.state}`);
        })
        .on("mousemove", function (event) {
            tooltip
                .style("left", (event.pageX + 12) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function () {
            d3.select(this).attr("fill", "#4caf50").attr("stroke", "#2e7d32");
            tooltip.style("display", "none");
        });

    // Legend
    const legendX = width - 150;
    const legendY = height - 70;
    const legend = svg.append("g").attr("transform", `translate(${legendX}, ${legendY})`);
    legend.append("rect").attr("width", 134).attr("height", 58).attr("fill", "white").attr("stroke", "#ccc").attr("rx", 4);
    legend.append("rect").attr("x", 10).attr("y", 12).attr("width", 12).attr("height", 12).attr("fill", "#4caf50").attr("stroke", "#2e7d32");
    legend.append("text").attr("x", 28).attr("y", 23).attr("font-size", "12px").attr("fill", "#333").text("Visited");
    legend.append("rect").attr("x", 10).attr("y", 34).attr("width", 12).attr("height", 12).attr("fill", "#e8e8e8").attr("stroke", "#aaa");
    legend.append("text").attr("x", 28).attr("y", 45).attr("font-size", "12px").attr("fill", "#333").text("Not visited");
}

// Load GeoJSON once, re-render on resize
d3.json(stateGeoJsonUrl).then(data => {
    renderMap(data);

    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => renderMap(data), 150);
    });
});
