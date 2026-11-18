// Visit statuses come from the Exploration lists and the public adventure log.
// Hiking distances are one way, from the named trailhead to the destination.
const rajasthanHillForts = [
  { name: "Chittorgarh Fort", region: "Chittorgarh, Rajasthan", visited: true },
  { name: "Kumbhalgarh Fort", region: "Rajsamand, Rajasthan", visited: true },
  { name: "Ranthambore Fort", region: "Sawai Madhopur, Rajasthan", visited: false },
  { name: "Gagron Fort", region: "Jhalawar, Rajasthan", visited: false },
  { name: "Amber Fort", region: "Jaipur, Rajasthan", visited: false },
  { name: "Jaisalmer Fort", region: "Jaisalmer, Rajasthan", visited: false },
];

const TRAVEL_THEMES = {
  unesco: {
    name: "UNESCO heritage",
    itemType: "UNESCO",
    source: { label: "UNESCO India list", url: "https://whc.unesco.org/en/statesparties/IN/" },
    entries: [
      [251, "Agra Fort", { visited: true }],
      [242, "Ajanta Caves"],
      [243, "Ellora Caves"],
      [252, "Taj Mahal", { visited: true }],
      [249, "Group of Monuments at Mahabalipuram"],
      [246, "Sun Temple, Konark", { visited: true }],
      [337, "Kaziranga National Park"],
      [340, "Keoladeo National Park"],
      [338, "Manas Wildlife Sanctuary"],
      [234, "Churches and Convents of Goa", { partiallyVisited: true }],
      [255, "Fatehpur Sikri"],
      [241, "Group of Monuments at Hampi"],
      [240, "Khajuraho Group of Monuments"],
      [244, "Elephanta Caves", { visited: true }],
      [250, "Great Living Chola Temples", { components: [
        { name: "Brihadisvara Temple, Thanjavur", visited: false },
        { name: "Brihadisvara Temple, Gangaikondacholisvaram", visited: false },
        { name: "Airavatesvara Temple, Darasuram", visited: false },
      ] }],
      [239, "Group of Monuments at Pattadakal"],
      [452, "Sundarbans National Park"],
      [335, "Nanda Devi and Valley of Flowers National Parks"],
      [524, "Buddhist Monuments at Sanchi"],
      [232, "Humayun’s Tomb, Delhi", { visited: true }],
      [233, "Qutb Minar and its Monuments, Delhi", { visited: true }],
      [944, "Mountain Railways of India", { components: [
        { name: "Darjeeling Himalayan Railway", visited: true },
        { name: "Nilgiri Mountain Railway", visited: false },
        { name: "Kalka–Shimla Railway", visited: true },
      ] }],
      [1056, "Mahabodhi Temple Complex at Bodh Gaya"],
      [925, "Rock Shelters of Bhimbetka"],
      [1101, "Champaner-Pavagadh Archaeological Park"],
      [945, "Chhatrapati Shivaji Terminus", { visited: true }],
      [231, "Red Fort Complex", { visited: true }],
      [1338, "The Jantar Mantar, Jaipur"],
      [1342, "Western Ghats"],
      [247, "Hill Forts of Rajasthan", { components: rajasthanHillForts }],
      [1406, "Great Himalayan National Park Conservation Area"],
      [922, "Rani-ki-Vav (the Queen’s Stepwell) at Patan, Gujarat"],
      [1502, "Archaeological Site of Nalanda Mahavihara at Nalanda, Bihar"],
      [1513, "Khangchendzonga National Park"],
      [1321, "The Architectural Work of Le Corbusier"],
      [1551, "Historic City of Ahmadabad"],
      [1480, "Victorian Gothic and Art Deco Ensembles of Mumbai", { visited: true }],
      [1605, "Jaipur City, Rajasthan"],
      [1645, "Dholavira: a Harappan City"],
      [1570, "Kakatiya Rudreshwara (Ramappa) Temple, Telangana"],
      [1670, "Sacred Ensembles of the Hoysalas"],
      [1375, "Santiniketan"],
      [1711, "Moidams – the Mound-Burial System of the Ahom Dynasty"],
      [1739, "Maratha Military Landscapes of India"],
      [927, "Ancient Buddhist Site of Sarnath"],
    ].map(([propertyId, name, details]) => ({
      name, ...details, url: `https://whc.unesco.org/en/list/${propertyId}/`,
    })),
  },
  jyotirlingas: {
    name: "12 Jyotirlingas",
    itemType: "Jyotirlinga",
    hasLocations: true,
    entries: [
      ["Somnath", "Gujarat"],
      ["Mallikarjuna", "Andhra Pradesh"],
      ["Mahakaleshwar", "Madhya Pradesh"],
      ["Omkareshwar", "Madhya Pradesh"],
      ["Kedarnath", "Uttarakhand"],
      ["Bhimashankar", "Maharashtra"],
      ["Kashi Vishwanath", "Uttar Pradesh", true],
      ["Trimbakeshwar", "Maharashtra"],
      ["Vaidyanath", "Jharkhand"],
      ["Nageshwar", "Gujarat"],
      ["Rameshwaram", "Tamil Nadu"],
      ["Ghushmeshwar", "Shiwar, Rajasthan"],
    ].map(([name, region, visited = false]) => ({ name, region, visited })),
  },
  forts: {
    name: "Forts",
    itemType: "Fort",
    hasLocations: true,
    entries: [
      { name: "Agra Fort", region: "Agra, Uttar Pradesh", visited: true },
      { name: "Red Fort", region: "Delhi", visited: true },
      { name: "Mehrangarh Fort", region: "Jodhpur, Rajasthan", visited: true },
      ...rajasthanHillForts,
      { name: "Kangra Fort", region: "Kangra, Himachal Pradesh", visited: false },
    ],
  },
  hikes: {
    name: "Hikes and Treks",
    itemType: "Trek",
    hasRouteMetrics: true,
    entries: [
      {
        name: "Har Ki Dun", region: "Uttarakhand", visited: false,
        distanceKm: 25, trailhead: "Taluka", startAltitudeM: 2100, altitudeM: 3566,
        // The itinerary lists 14 km to Seema and 11 km onward. The operator's route notes give Taluka's elevation.
        url: "https://himalayatrekker.com/wp-content/uploads/2016/06/Har-Ki-Dun-Trek-Brochure.pdf",
      },
      {
        name: "Gaumukh–Tapovan", region: "Uttarakhand", visited: false,
        distanceKm: 25, trailhead: "Gangotri", startAltitudeM: 3048, altitudeM: 4463,
        // Gangotri elevation: https://www.moef.gov.in/uploads/2017/06/Chapter%20C%20-%20Tourism.pdf
        url: "https://www.uttarakhandtourism.gov.in/destination/gangotri",
      },
      {
        name: "Naina Peak", region: "Uttarakhand", visited: false,
        distanceKm: 6, trailhead: "Nainital", startAltitudeM: 1938, altitudeM: 2611,
        // Town elevation: https://udd.uk.gov.in/files/CDP_NITL.PDF
        url: "https://nainital.nic.in/tourist-place/naina-peak-or-china-peak/",
      },
      {
        name: "Khaliya Top", region: "Uttarakhand", visited: false,
        distanceKm: 6, trailhead: "Balati Bend", startAltitudeM: 2633, altitudeM: 3500,
        // Trailhead estimate from Copernicus GLO-90 at 30.059205° N, 80.220906° E.
        note: "Reached the bugyal. Zero Point is pending.",
        components: [
          { name: "Bugyal", visited: true },
          { name: "Zero Point", visited: false },
        ],
        url: "https://uttarakhandtourism.gov.in/assets/pdf/Final_Master%20Plan_Report.pdf",
      },
      {
        name: "Triund", region: "Himachal Pradesh", visited: false,
        distanceKm: 5.45, trailhead: "Dharamkot", startAltitudeM: 1934, altitudeM: 2828,
        // Trailhead estimate from Copernicus GLO-90 at the route guide's Dharamkot coordinates.
        url: "https://indiahikes.com/documented-trek/triund-trek",
      },
    ],
  },
};
