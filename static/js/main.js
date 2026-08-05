/* ======================================================
                MAIN.JS
        UI INTERACTIONS ONLY
====================================================== */

/* ==========================================
        ALWAYS START FROM HOME
========================================== */

window.addEventListener("load", () => {

    if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname);
    }

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

});


/* ==========================================
        INITIALIZE ALL UI
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initPlannerMode();
    initBudgetSlider();
    initTripType();
    initInterestChips();

});


/* ==========================================
        PLANNER MODE
========================================== */

function initPlannerMode() {

    const destinationMode = document.getElementById("destinationMode");
    const routeMode = document.getElementById("routeMode");
    const fromField = document.getElementById("fromField");
    const plannerMode = document.getElementById("plannerMode");

    if (!destinationMode || !routeMode || !fromField || !plannerMode) {
        return;
    }

    // Default Mode
    plannerMode.value = "destination";

    destinationMode.addEventListener("click", () => {

        destinationMode.classList.add("active");
        routeMode.classList.remove("active");

        fromField.classList.add("d-none");

        plannerMode.value = "destination";

    });

    routeMode.addEventListener("click", () => {

        routeMode.classList.add("active");
        destinationMode.classList.remove("active");

        fromField.classList.remove("d-none");

        plannerMode.value = "route";

    });

}


/* ==========================================
        BUDGET SLIDER
========================================== */

function initBudgetSlider() {

    const budgetSlider = document.getElementById("budget");
    const budgetValue = document.getElementById("budgetValue");

    if (!budgetSlider || !budgetValue) return;

    function updateBudget() {

        budgetValue.textContent =
            "₹" + Number(budgetSlider.value).toLocaleString("en-IN");

    }

    updateBudget();

    budgetSlider.addEventListener("input", updateBudget);

}


/* ==========================================
        TRIP TYPE
========================================== */

function initTripType() {

    const tripChips = document.querySelectorAll(".trip-chip");
    const tripTypeInput = document.getElementById("tripType");

    if (!tripChips.length || !tripTypeInput) return;

    tripChips.forEach(chip => {

        chip.addEventListener("click", () => {

            tripChips.forEach(c => c.classList.remove("active"));

            chip.classList.add("active");

            tripTypeInput.value = chip.dataset.type;

        });

    });

}


/* ==========================================
        INTEREST CHIPS
========================================== */

function initInterestChips() {

    const interestChips = document.querySelectorAll(".interest-chip");
    const interestInput = document.getElementById("interest");

    if (!interestChips.length || !interestInput) return;

    function updateInterest() {

        const selected = [];

        document.querySelectorAll(".interest-chip.active")
            .forEach(chip => {

                selected.push(chip.dataset.interest);

            });

        interestInput.value = selected.join(",");

    }

    interestChips.forEach(chip => {

        chip.addEventListener("click", () => {

            chip.classList.toggle("active");

            updateInterest();

        });

    });

}


/* ==========================================
        SMOOTH SCROLL
========================================== */

function scrollToResult() {

    const result = document.getElementById("tripResult");

    if (!result) return;

    result.scrollIntoView({

        behavior: "smooth",
        block: "start"

    });

}


/* ==========================================
        BUTTON LOADING STATE
========================================== */

function setGenerateLoading(isLoading) {

    const btn = document.getElementById("generateBtn");

    if (!btn) return;

    if (isLoading) {

        btn.disabled = true;

        btn.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2"></span>
            Generating Trip...
        `;

    } else {

        btn.disabled = false;

        btn.innerHTML = `
            <i class="fa-solid fa-wand-magic-sparkles"></i>
            Generate AI Trip
        `;

    }

}