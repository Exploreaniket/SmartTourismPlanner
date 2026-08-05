/* ======================================================
                PLANNER.JS
====================================================== */



// ======================================================
// GLOBAL VARIABLES
// ======================================================

currentTrip = null;
currentForm = null;

// ======================================================
// INITIALIZE
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("plannerForm");

    if (!form) {

        console.error("Planner Form Not Found");

        return;

    }

    form.addEventListener("submit", generateTrip);

});

// ======================================================
// GENERATE TRIP
// ======================================================

async function generateTrip(e) {

    e.preventDefault();

    const formData = collectFormData();

    if (!formData) return;

    currentForm = formData;

    console.log("Planner Data");

    console.table(formData);

}
// ======================================================
// COLLECT FORM DATA
// ======================================================

function collectFormData() {

    const mode = document.getElementById("plannerMode").value;

    const from = document.getElementById("fromDestination")
        ? document.getElementById("fromDestination").value.trim()
        : "";

    const destination = document.getElementById("destination").value.trim();

    const budget = document.getElementById("budget").value;

    const days = document.getElementById("days").value;

    const travelers = document.getElementById("travelers").value;

    const interest = document.getElementById("interest").value;

    const tripType = document.getElementById("tripType").value;

    // ------------------------
    // Validation
    // ------------------------

    if (!destination) {

        alert("Please enter destination.");

        return null;

    }

    if (mode === "route" && !from) {

        alert("Please enter your starting location.");

        return null;

    }

    return {

        mode,

        from,

        destination,

        budget,

        days,

        travelers,

        interest,

        tripType

    };

}
// ======================================================
// SEND REQUEST
// ======================================================

async function sendTripRequest(formData) {

    try {

        setGenerateLoading(true);

        const response = await fetch("/generate", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(formData)

        });

        if (!response.ok) {

            throw new Error("Server Error");

        }

        const trip = await response.json();

        currentTrip = trip;

        

        console.log(trip);

        renderDashboard(trip, formData);

        scrollToResult();

        // Weather (next step)
        // loadWeather(formData.destination);

    }

    catch (err) {

        console.error(err);

        alert(err.message);

    }

    finally {

        setGenerateLoading(false);

    }

}

// ======================================================
// UPDATE GENERATE
// ======================================================

async function generateTrip(e) {

    e.preventDefault();

    const formData = collectFormData();

    if (!formData) return;

    currentForm = formData;

    await sendTripRequest(formData);

}
