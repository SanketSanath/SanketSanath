const visitedDistricts = [
    // Andhra Pradesh
    "West Godavari",
    // Bihar
    "Araria",
    "Bhagalpur",
    "Darbhanga",
    "Madhepura",
    "Nalanda",
    "Patna",
    "Saharsa",
    "Siwan",
    "Supaul",
    // Delhi
    "Delhi",
    // Haryana
    "Faridabad",
    "Gurgaon",
    // Himachal Pradesh
    "Shimla",
    // J&K
    "Jammu",
    "Udhampur",
    // Karnataka
    "Bangalore Urban",
    // Maharashtra
    "Greater Bombay",
    "Thane",
    // Odisha
    "Khordha",
    "Puri",
    // Rajasthan
    "Alwar",
    "Jodhpur",
    // Tamil Nadu
    "Chennai",
    "Thiruvallur",
    // Uttar Pradesh
    "Agra",
    "Gautam Buddha Nagar",
    "Ghaziabad",
    "Mathura",
    "Meerut",
    "Varanasi",
    // west bengal
    "Darjiling",
    "Kolkata",
    "Haora",
    "North Goa"
];

const svg = d3.select("svg")
        .attr("width", window.innerWidth * 1)
        .attr("height", window.innerHeight * 1);

const projection = d3.geoMercator()
    .center([80, 22]) // Center on India
    .scale(1400)
    .translate([window.innerWidth * 0.5, window.innerHeight * 0.55]); // Center based on new dimensions

const path = d3.geoPath().projection(projection);
d3.json("indian-map.json").then(data => {
    svg.selectAll("path")
        .data(data.features)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", d => getColor(d, 'fill'))
        .attr("stroke", d => getColor(d, 'stroke'))
        .attr("stroke-width", 0.5)
});


function getColor(d, type) {
    const colorMap = {
        'fill': { default: '#eee', visited: '#afa' },
        'stroke': { default: '#ddd', visited: '#8a8' }
    };

    var districtName = '';
    if (!d.properties || !d.properties.NAME_2) {
        districtName = 'unknown';
    } else {
        districtName = d.properties.NAME_2;
    }
    return visitedDistricts.includes(districtName) ? colorMap[type].visited : colorMap[type].default;
}
