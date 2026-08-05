// ==========================================
// SCROLL ANIMATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // Feature reveal animation
    const reveals = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                revealObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    reveals.forEach(item => {

        revealObserver.observe(item);

    });

    // General animation
    const elements = document.querySelectorAll(
        ".feature-card, .destination-card, .planner-card, .section-title"
    );

    const animationObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                animationObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    elements.forEach(item => {

        item.classList.add("hidden");

        animationObserver.observe(item);

    });

});