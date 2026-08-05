// ======================================================
// FEATURE MODAL
// Smart Tourism Planner
// ======================================================



// ======================================================
// FEATURE DATA
// ======================================================

const featureData = {

    planner: {

        icon: "fa-solid fa-robot",

        title: "AI Journey Planner",

        subtitle: "Powered by Artificial Intelligence",

        description:
            "Generate a personalized itinerary based on your destination, budget, duration and travel interests using AI.",

        button: "Start Planning",

        features: [

            "Personalized itinerary",
            "Best travel route",
            "Hotel recommendations",
            "Weather forecast",
            "Packing checklist",
            "Budget estimation",
            "Travel safety tips",
            "Local experiences"

        ]

    },

    route: {

        icon: "fa-solid fa-route",

        title: "Smart Route Planning",

        subtitle: "AI Navigation Assistant",

        description:
            "Find the shortest, fastest and safest travel routes with intelligent route optimization.",

        button: "Explore Routes",

        features: [

            "Shortest route",
            "Traffic awareness",
            "Google Maps support",
            "Alternative routes",
            "Travel time estimation",
            "Transport comparison",
            "Fuel estimation",
            "Smart optimization"

        ]

    },

    attraction: {

        icon: "fa-solid fa-location-dot",

        title: "Tourist Attractions",

        subtitle: "Discover Amazing Places",

        description:
            "Explore famous landmarks, hidden gems and exciting attractions around your destination.",

        button: "Explore Places",

        features: [

            "Top attractions",
            "Hidden gems",
            "Historical sites",
            "Nature spots",
            "Adventure activities",
            "Photo locations",
            "Nearby attractions",
            "Local experiences"

        ]

    },

    food: {

        icon: "fa-solid fa-utensils",

        title: "Food Recommendation",

        subtitle: "Taste Local Culture",

        description:
            "Discover the best local dishes, cafés and highly rated restaurants during your journey.",

        button: "Discover Food",

        features: [

            "Popular dishes",
            "Street food",
            "Top restaurants",
            "Traditional cuisine",
            "Vegetarian options",
            "Local cafés",
            "Nearby dining",
            "Food recommendations"

        ]

    },

    weather: {

        icon: "fa-solid fa-cloud-sun",

        title: "Weather Insights",

        subtitle: "Travel With Confidence",

        description:
            "Stay updated with weather forecasts, temperature, rainfall and smart packing suggestions.",

        button: "View Weather",

        features: [

            "Live forecast",
            "Temperature",
            "Humidity",
            "Rain probability",
            "Best travel season",
            "Packing suggestions",
            "Sunrise & Sunset",
            "Travel alerts"

        ]

    },

    tips: {

        icon: "fa-solid fa-lightbulb",

        title: "AI Travel Tips",

        subtitle: "Travel Smarter",

        description:
            "Receive useful travel tips, safety guidance and destination recommendations before every trip.",

        button: "Read Tips",

        features: [

            "Safety advice",
            "Local customs",
            "Emergency contacts",
            "Money saving tips",
            "Photography tips",
            "Packing advice",
            "Best travel time",
            "Travel hacks"

        ]

    }

};
// ======================================================
// MODAL INITIALIZATION
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    const modalElement = document.getElementById("featureModal");

    if (!modalElement) {

        console.error("Feature Modal not found.");

        return;

    }

    const featureModal = new bootstrap.Modal(modalElement);

    const modalIcon = document.getElementById("modalIcon");
    const modalTitle = document.getElementById("modalTitle");
    const modalSubtitle = document.getElementById("modalSubtitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalButton = document.getElementById("modalButton");
    const featureListLeft = document.getElementById("featureListLeft");
    const featureListRight = document.getElementById("featureListRight");

    document.querySelectorAll(".feature-btn").forEach(button => {

        button.addEventListener("click", function () {

            const key = this.dataset.feature;

            const data = featureData[key];

            if (!data) return;

            modalIcon.className = data.icon;

            modalTitle.textContent = data.title;

            modalSubtitle.textContent = data.subtitle;

            modalDescription.textContent = data.description;

            modalButton.textContent = data.button;

            featureListLeft.innerHTML = "";

            featureListRight.innerHTML = "";
                        data.features.forEach((item, index) => {

                const li = document.createElement("li");

                li.innerHTML = `
                    <i class="fa-solid fa-check text-primary me-2"></i>
                    ${item}
                `;

                if (index < 4) {

                    featureListLeft.appendChild(li);

                } else {

                    featureListRight.appendChild(li);

                }

            });

            modalButton.setAttribute("href", "#planner");

            featureModal.show();

        });

    });
    });