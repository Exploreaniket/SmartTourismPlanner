let currentTrip = null;
let currentForm = null;

/* ======================================================
                AI DASHBOARD
====================================================== */

function renderDashboard(data, formData) {

    currentTrip = data;
currentForm = formData;

    const result = document.getElementById("result");

   result.innerHTML = `

<div class="trip-dashboard">


    ${renderActionBar(formData)}

   ${renderSummary(data, formData)}

${renderWeather(data, formData)}

${renderMapSection()}

${renderTravelInfo(data)}

    ${renderItinerary(data)}

    ${renderBudget(data)}

    ${renderHotels(data)}

    ${renderRestaurants(data)}

    ${renderMustVisit(data)}

    ${renderPacking(data)}

    ${renderTravelTips(data)}

    ${renderRecommendation(data)}

    ${renderEmergency(data)}

</div>

`;

// Wait until the HTML is added to the page
setTimeout(() => {

    if (typeof loadMap === "function") {

        loadMap(formData.destination);

    }

}, 300);
}

/* ======================================================
                WEATHER
====================================================== */

function renderWeather(data) {

    const weather = data.weather;

    if (!weather) return "";

    return `

<div class="dashboard-card weather-card">

    <div class="weather-top">

        <div class="weather-main">

            <div class="weather-icon">

                ${weather.icon}

            </div>

            <div>

                <h2>${weather.description}</h2>

                <h1>${weather.temperature}°C</h1>

                <p>Feels Like ${weather.feels_like}°C</p>

            </div>

        </div>

    </div>

    <div class="summary-grid">

        <div class="summary-box">

            <small>💧 Humidity</small>

            <h5>${weather.humidity}%</h5>

        </div>

        <div class="summary-box">

            <small>💨 Wind</small>

            <h5>${weather.wind} km/h</h5>

        </div>

        <div class="summary-box">

            <small>🌅 Sunrise</small>

            <h5>${new Date(weather.sunrise).toLocaleTimeString([],{
                hour:'2-digit',
                minute:'2-digit'
            })}</h5>

        </div>

        <div class="summary-box">

            <small>🌇 Sunset</small>

            <h5>${new Date(weather.sunset).toLocaleTimeString([],{
                hour:'2-digit',
                minute:'2-digit'
            })}</h5>

        </div>

    </div>

    <div class="weather-advice">

        💡 ${weather.advice}

    </div>

</div>

`;
}

/* ======================================================
                MUST VISIT
====================================================== */

function renderMustVisit(data){

    const places = data.must_visit || [];

    if(places.length===0) return "";

    return `

<div class="dashboard-card">

<h2>📍 Must Visit Places</h2>

<div class="hotel-grid">

${places.map(place=>`

<div class="hotel-card">

<h4>${place.place}</h4>

<p><strong>⭐ Why Visit?</strong></p>

<p>${place.reason}</p>

<hr>

<p>🕒 Best Time : ${place.best_time}</p>

</div>

`).join("")}

</div>

</div>

`;

}
/* ======================================================
                PACKING
====================================================== */

function renderPacking(data){

    const packing = data.packing || [];

    if(packing.length===0) return "";

    return `

<div class="dashboard-card">

<h2>🎒 Packing Checklist</h2>

<ul class="travel-list">

${packing.map(item=>`

<li>

✅ ${item}

</li>

`).join("")}

</ul>

</div>

`;

}

/* ======================================================
                TRAVEL TIPS
====================================================== */

function renderTravelTips(data){

    const tips = data.travel_tips || [];

    if(tips.length===0) return "";

    return `

<div class="dashboard-card">

<h2>💡 AI Travel Tips</h2>

<ul class="travel-list">

${tips.map(tip=>`

<li>

💡 ${tip}

</li>

`).join("")}

</ul>

</div>

`;

}
/* ======================================================
            AI RECOMMENDATION
====================================================== */

function renderRecommendation(data){

    if(!data.ai_recommendation) return "";

    return `

<div class="dashboard-card recommendation-card">

<h2>🤖 AI Recommendation</h2>

<p>

${data.ai_recommendation}

</p>

</div>

`;

}
/* ======================================================
                EMERGENCY
====================================================== */

function renderEmergency(data){

    const emergency = data.emergency || {};

    return `

<div class="dashboard-card">

<h2>🚨 Emergency Contacts</h2>

<div class="summary-grid">

<div class="summary-box">

<small>Police</small>

<h5>${emergency.police || "112"}</h5>

</div>

<div class="summary-box">

<small>Ambulance</small>

<h5>${emergency.ambulance || "108"}</h5>

</div>

</div>

</div>

`;

}

/* ======================================================
                BUDGET
====================================================== */

function renderBudget(data){

    const budget = data.budget || {};

    return `

<div class="dashboard-card">

<h2>💰 Budget Breakdown</h2>

<div class="summary-grid">

<div class="summary-box">

<small>🏨 Hotel</small>

<h5>${budget.Hotel || "-"}</h5>

</div>

<div class="summary-box">

<small>🍽 Food</small>

<h5>${budget.Food || "-"}</h5>

</div>

<div class="summary-box">

<small>🚖 Transport</small>

<h5>${budget.Transport || "-"}</h5>

</div>

<div class="summary-box">

<small>🎯 Activities</small>

<h5>${budget.Activities || "-"}</h5>

</div>

<div class="summary-box">

<small>🚨 Emergency</small>

<h5>${budget.Emergency || "-"}</h5>

</div>

</div>

</div>

`;

}
/* ======================================================
                HOTELS
====================================================== */

function renderHotels(data){

    const hotels = data.hotels || [];

    if(hotels.length===0) return "";

    return `

<div class="dashboard-card">

<h2>🏨 Recommended Hotels</h2>

<div class="hotel-grid">

${hotels.map(h=>`

<div class="hotel-card">

<h4>${h.name}</h4>

<p class="price">${h.price}</p>

<p>${h.why}</p>

</div>

`).join("")}

</div>

</div>

`;

}

/* ======================================================
            RESTAURANTS
====================================================== */

function renderRestaurants(data){

    const restaurants=data.restaurants || [];

    if(restaurants.length===0) return "";

    return `

<div class="dashboard-card">

<h2>🍽 Recommended Restaurants</h2>

<div class="hotel-grid">

${restaurants.map(r=>`

<div class="hotel-card">

<h4>${r.name}</h4>

<p>

🍴 ${r.speciality}

</p>

</div>

`).join("")}

</div>

</div>

`;

}

/* ======================================================
                ACTION BAR
====================================================== */

function renderActionBar(formData){

return `

<div class="dashboard-actions">

<div>

<h2 class="dashboard-title">

🗺 AI Travel Plan

</h2>

<p>

Your personalized itinerary for

<strong>${formData.destination}</strong>

</p>

</div>

<div class="action-buttons">

<button class="action-btn" id="downloadPDF">

<i class="fa-solid fa-file-pdf"></i>

PDF

</button>

<button class="action-btn" id="openMaps">

<i class="fa-solid fa-map-location-dot"></i>

Maps

</button>

<button class="action-btn" id="regenerateTrip">

<i class="fa-solid fa-rotate"></i>

Again

</button>

<button class="action-btn" id="saveTrip">

<i class="fa-solid fa-heart"></i>

Save

</button>

<button class="action-btn" id="shareTrip">

<i class="fa-solid fa-share-nodes"></i>

Share

</button>

</div>

</div>

`;

}


/* ======================================================
                SUMMARY
====================================================== */

function renderSummary(data, formData) {

    return `

<div class="dashboard-card">

    <h2>🗺 Trip Summary</h2>

    <div class="summary-grid">

        <div class="summary-box">

            <small>Destination</small>

            <h5>${formData.destination}</h5>

        </div>

        <div class="summary-box">

            <small>Duration</small>

            <h5>${formData.days} Days</h5>

        </div>

        <div class="summary-box">

            <small>Travelers</small>

            <h5>${formData.travelers}</h5>

        </div>

        <div class="summary-box">

            <small>Budget</small>

            <h5>₹${Number(formData.budget).toLocaleString()}</h5>

        </div>

    </div>

    <p class="trip-summary">

        ${data.trip_summary}

    </p>

</div>

`;

}


/* ======================================================
            TRAVEL INFORMATION
====================================================== */

function renderTravelInfo(data){

    const info = data.travel_info || {};

    return `

<div class="dashboard-card">

<h2>🚆 Travel Information</h2>

<div class="summary-grid">

<div class="summary-box">

<small>Best Transport</small>

<h5>${info.best_transport || "-"}</h5>

</div>

<div class="summary-box">

<small>Travel Time</small>

<h5>${info.estimated_travel_time || "-"}</h5>

</div>

<div class="summary-box">

<small>Nearest Airport</small>

<h5>${info.nearest_airport || "-"}</h5>

</div>

<div class="summary-box">

<small>Railway Station</small>

<h5>${info.nearest_railway_station || "-"}</h5>

</div>

<div class="summary-box">

<small>Best Season</small>

<h5>${info.best_time_to_visit || "-"}</h5>

</div>

</div>

</div>

`;

}
/* ======================================================
                ITINERARY
====================================================== */

function renderItinerary(data){

    const itinerary = data.itinerary || [];

    if(itinerary.length === 0){

        return "";

    }

    return `

<div class="dashboard-card">

    <h2>📅 Day-wise Itinerary</h2>

    ${itinerary.map(day=>`

    <div class="day-card">

        <div class="day-header">

            <h3>Day ${day.day}</h3>

            <span class="day-cost">

                💰 ${day.estimated_cost}

            </span>

        </div>

        <div class="timeline">

            <div class="timeline-item">

                <div class="timeline-icon">

                    🌅

                </div>

                <div>

                    <strong>Morning</strong>

                    <p>${day.morning}</p>

                </div>

            </div>

            <div class="timeline-item">

                <div class="timeline-icon">

                    ☀

                </div>

                <div>

                    <strong>Afternoon</strong>

                    <p>${day.afternoon}</p>

                </div>

            </div>

            <div class="timeline-item">

                <div class="timeline-icon">

                    🌙

                </div>

                <div>

                    <strong>Evening</strong>

                    <p>${day.evening}</p>

                </div>

            </div>

        </div>

    </div>

    `).join("")}

</div>

`;

}

/* ======================================================
            ACTION BUTTONS
====================================================== */

document.addEventListener("click",function(e){

if(e.target.closest("#regenerateTrip")){

window.scrollTo({

top:document.getElementById("planner").offsetTop-80,

behavior:"smooth"

});

}

if(e.target.closest("#openMaps")){

const destination=document.getElementById("destination").value;

window.open(

`https://www.google.com/maps/search/${encodeURIComponent(destination)}`,

"_blank"

);

}

if(e.target.closest("#saveTrip")){

alert("Save Trip feature coming soon!");

}

if(e.target.closest("#shareTrip")){

navigator.clipboard.writeText(window.location.href);

alert("Trip link copied!");

}

if(e.target.closest("#downloadPDF")){

downloadTripPDF();

}

});



/* ==========================================
        DOWNLOAD PDF
========================================== */

function downloadTripPDF() {

    if (!currentTrip || !currentForm) {
        alert("Generate a trip first.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    let y = 20;

    function title(text) {
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(16);
        pdf.text(text, 15, y);
        y += 8;

        pdf.line(15, y, 195, y);
        y += 8;
    }

    function text(label, value) {
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(11);
        pdf.text(label, 15, y);

        pdf.setFont("helvetica", "normal");
        pdf.text(String(value), 60, y);

        y += 7;
    }

    function paragraph(value) {
        const lines = pdf.splitTextToSize(value || "-", 175);
        pdf.text(lines, 15, y);
        y += lines.length * 6 + 5;
    }

    // ---------------- Header ----------------

    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text("SMART TOURISM PLANNER", 15, y);

    y += 12;

    text("Destination", currentForm.destination);
    text("Duration", currentForm.days + " Days");
    text("Travelers", currentForm.travelers);
    text("Budget", "INR " + currentForm.budget);

    y += 5;

    // Trip Summary

    title("TRIP SUMMARY");

    paragraph(currentTrip.trip_summary);

    // Travel Info

    title("TRAVEL INFORMATION");

    const t = currentTrip.travel_info || {};

    text("Best Transport", t.best_transport || "-");
    text("Airport", t.nearest_airport || "-");
    text("Railway", t.nearest_railway_station || "-");
    text("Best Season", t.best_time_to_visit || "-");

    // Itinerary

    title("DAY-WISE ITINERARY");

    (currentTrip.itinerary || []).forEach(day => {

        pdf.setFont("helvetica", "bold");
        pdf.text(`DAY ${day.day}`, 15, y);
        y += 8;

        pdf.setFont("helvetica", "normal");

        paragraph("Morning: " + day.morning);
        paragraph("Afternoon: " + day.afternoon);
        paragraph("Evening: " + day.evening);

        text("Estimated Cost", day.estimated_cost);

        y += 5;

        if (y > 260) {
            pdf.addPage();
            y = 20;
        }
    });

    // Budget

    title("BUDGET");

    Object.entries(currentTrip.budget || {}).forEach(([key, value]) => {
        text(key, value);
    });

    // Hotels

    title("HOTELS");

    (currentTrip.hotels || []).forEach(h => {
        paragraph("• " + h.name + " - " + (h.price || ""));
    });

    // Restaurants

    title("RESTAURANTS");

    (currentTrip.restaurants || []).forEach(r => {
        paragraph("• " + r.name + " - " + (r.speciality || ""));
    });

    // Packing

    title("PACKING CHECKLIST");

    (currentTrip.packing || []).forEach(item => {
        paragraph("✓ " + item);
    });

    // Tips

    title("TRAVEL TIPS");

    (currentTrip.travel_tips || []).forEach(tip => {
        paragraph("• " + tip);
    });

    // Emergency

    title("EMERGENCY");

    text("Police", currentTrip.emergency?.police || "112");
    text("Ambulance", currentTrip.emergency?.ambulance || "108");

    y += 10;

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "italic");
    pdf.text("Generated by Smart Tourism Planner", 15, y);

    pdf.save(`${currentForm.destination}_Trip.pdf`);
}
/* ======================================================
                    MAP SECTION
====================================================== */

function renderMapSection() {

    return `

    <div class="dashboard-card">

        <h2>🗺 Interactive Map</h2>

        <p class="text-muted">
            Explore your destination on the interactive map.
        </p>

        <div id="travelMap"></div>

    </div>

    `;

}