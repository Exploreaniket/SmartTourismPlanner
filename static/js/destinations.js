// ============================================
// Destination → Planner Connection
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    const buttons = document.querySelectorAll(".plan-trip-btn");

    buttons.forEach(button => {

        button.addEventListener("click", function () {

            const destination = this.dataset.destination;

            const loader = document.getElementById("plannerLoader");

            if (loader) {
                loader.classList.add("show");
            }

            setTimeout(() => {

                if (loader) {
                    loader.classList.remove("show");
                }

                const planner = document.getElementById("planner");

                if (planner) {
                    planner.scrollIntoView({
                        behavior: "smooth"
                    });
                }

                const destinationInput = document.getElementById("destination");

                if (destinationInput) {
                    destinationInput.value = destination;
                }

                setTimeout(() => {

                    const daysInput = document.getElementById("days");

                    if (daysInput) {
                        daysInput.focus();
                    }

                }, 500);

            }, 1800);

        });

    });

});