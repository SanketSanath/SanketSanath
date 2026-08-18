/**
 * data.js — Exploration content
 *
 * Edit this file to update the map and trip stories. No HTML or CSS changes
 * are needed when adding a place or a trip.
 *
 * VISITED_PLACES entry:
 *   name  {string} Place name
 *   state {string} State or country
 *   lat   {number} Latitude
 *   lng   {number} Longitude
 *
 * TRIPS entry:
 *   id         {string} Unique, URL-safe identifier
 *   title      {string} Card heading
 *   label      {string} Short trip category or location label
 *   route      {string[]} Stops in travel order
 *   story      {string} Short personal memory; use "" until ready
 */

const VISITED_PLACES = [
    { name: "Bhimavaram", state: "Andhra Pradesh", lat: 16.53, lng: 81.50 },
    { name: "Araria", state: "Bihar", lat: 26.15, lng: 87.52 },
    { name: "Bhagalpur", state: "Bihar", lat: 25.25, lng: 87.01 },
    { name: "Darbhanga", state: "Bihar", lat: 26.15, lng: 85.90 },
    { name: "Madhepura", state: "Bihar", lat: 25.92, lng: 87.00 },
    { name: "Nalanda", state: "Bihar", lat: 25.10, lng: 85.45 },
    { name: "Patna", state: "Bihar", lat: 25.60, lng: 85.14 },
    { name: "Saharsa", state: "Bihar", lat: 25.88, lng: 86.60 },
    { name: "Siwan", state: "Bihar", lat: 26.22, lng: 84.36 },
    { name: "Supaul", state: "Bihar", lat: 26.12, lng: 86.60 },
    { name: "Delhi", state: "Delhi", lat: 28.65, lng: 77.23 },
    { name: "Goa", state: "Goa", lat: 15.25, lng: 73.90 },
    { name: "Gurugram", state: "Haryana", lat: 28.46, lng: 77.03 },
    { name: "Shimla", state: "Himachal Pradesh", lat: 31.10, lng: 77.17 },
    { name: "Jammu", state: "Jammu and Kashmir", lat: 32.73, lng: 74.87 },
    { name: "Udhampur", state: "Jammu and Kashmir", lat: 32.92, lng: 75.14 },
    { name: "Bangalore", state: "Karnataka", lat: 12.97, lng: 77.59 },
    { name: "Mumbai", state: "Maharashtra", lat: 19.08, lng: 72.88 },
    { name: "Shirdi", state: "Maharashtra", lat: 19.76, lng: 74.46 },
    { name: "Konark", state: "Odisha", lat: 19.89, lng: 86.08 },
    { name: "Puri", state: "Odisha", lat: 19.81, lng: 85.83 },
    { name: "Tijara", state: "Rajasthan", lat: 27.95, lng: 76.81 },
    { name: "Alwar", state: "Rajasthan", lat: 27.56, lng: 76.62 },
    { name: "Jodhpur", state: "Rajasthan", lat: 26.30, lng: 73.02 },
    { name: "Bhangarh", state: "Rajasthan", lat: 27.09, lng: 76.29 },
    { name: "Chennai", state: "Tamil Nadu", lat: 13.08, lng: 80.27 },
    { name: "Chakrata", state: "Uttarakhand", lat: 30.70, lng: 77.86 },
    { name: "Rishikesh", state: "Uttarakhand", lat: 30.08, lng: 78.22 },
    { name: "Nainital", state: "Uttarakhand", lat: 29.38, lng: 79.46 },
    { name: "Agra", state: "Uttar Pradesh", lat: 27.18, lng: 78.01 },
    { name: "Mathura", state: "Uttar Pradesh", lat: 27.49, lng: 77.67 },
    { name: "Meerut", state: "Uttar Pradesh", lat: 28.98, lng: 77.71 },
    { name: "Varanasi", state: "Uttar Pradesh", lat: 25.32, lng: 83.00 },
    { name: "Darjiling", state: "West Bengal", lat: 27.04, lng: 88.26 },
    { name: "Kolkata", state: "West Bengal", lat: 22.57, lng: 88.36 },
    { name: "Itahari", state: "Nepal", lat: 26.86, lng: 87.06 },
    { name: "Kanyam", state: "Nepal", lat: 26.86, lng: 87.76 },
    { name: "Janakpur", state: "Nepal", lat: 26.75, lng: 85.85 },
    { name: "Biratnagar", state: "Nepal", lat: 26.58, lng: 87.06 }
];

const TRIPS = [
    {
        id: "rajasthan-bike-ride",
        title: "Riding Bike in Rajasthan",
        label: "Rajasthan",
        route: ["Alwar", "Tijara", "Bhangarh"],
        story: "This was an unexpected trip."
    },
    {
        id: "rishikesh-trip",
        title: "Rishikesh Trip",
        label: "Uttarakhand",
        route: ["Rishikesh"],
        story: "A trip full on adventure."
    },
    {
        id: "singapore-kuala-lumpur",
        title: "Singapore & Kuala Lumpur",
        label: "Southeast Asia",
        route: ["Singapore", "Kuala Lumpur"],
        story: "First self managed international trip"
    }
];

/**
 * World destinations grouped by visit status.
 * Each item has a flag emoji, country name, and optional `next: true` badge.
 */
const WORLD_FLAGS = [
    {
        title: "🏅 Flags Collected",
        countries: [
            { flag: "🇮🇳", name: "India" }, { flag: "🇳🇵", name: "Nepal" },
            { flag: "🇹🇭", name: "Thailand" }, { flag: "🇲🇾", name: "Malaysia" },
            { flag: "🇸🇬", name: "Singapore" }
        ]
    },
    {
        title: "🗺️ Next on the List",
        countries: [
            { flag: "🇻🇳", name: "Vietnam", next: true },
            { flag: "🇴🇲", name: "Oman", next: true }
        ]
    }
];

/**
 * Bucket-list groups. Each item uses an emoji, title, and optional location.
 */
const BUCKET_LIST = [
    {
        title: "Adventure Sports", status: "done", statusLabel: "Done",
        items: [
            { emoji: "🪢", name: "Bungee Jumping", place: "Rishikesh, Uttarakhand" },
            { emoji: "🚣", name: "White River Rafting", place: "Rishikesh, Uttarakhand" },
            { emoji: "🪂", name: "Paragliding", place: "Shimla, Himachal Pradesh" },
            { emoji: "🚤", name: "Jet Ski", place: "Phuket, Thailand" },
            { emoji: "🤿", name: "Snorkelling", place: "Phi Phi Islands, Thailand" },
            { emoji: "🥾", name: "Trekking", place: "Himalayas" }
        ]
    },
    {
        title: "Wish List", status: "todo", statusLabel: "Pending",
        items: [
            { emoji: "🛶", name: "Kayaking", place: "Somewhere scenic" },
            { emoji: "🪂", name: "Sky Diving", place: "Someday, somewhere high" },
            { emoji: "🪂", name: "Parasailing", place: "Over the ocean" },
            { emoji: "🤿", name: "Scuba Diving", place: "Deep sea" },
            { emoji: "🎿", name: "Skiing", place: "Snow-capped mountains" }
        ]
    }
];
