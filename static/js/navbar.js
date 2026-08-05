// ==========================================
// SMART TOURISM PLANNER NAVBAR
// ==========================================

console.log("Navbar Loaded");

// ==========================================
// Navbar Background
// ==========================================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (navbar) {

        navbar.classList.toggle("scrolled", window.scrollY > 50);

    }

});

// ==========================================
// Active Navigation
// ==========================================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

if (sections.length > 0) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            // Keep AI Planner active after trip generation
            const result = document.getElementById("result");

            if (result && result.innerHTML.trim() !== "") {

                navLinks.forEach(link => {

                    link.classList.remove("active");

                    if (link.getAttribute("href") === "#planner") {

                        link.classList.add("active");

                    }

                });

                return;

            }

            const id = entry.target.id;

            navLinks.forEach(link => {

                link.classList.remove("active");

                if (link.getAttribute("href") === "#" + id) {

                    link.classList.add("active");

                }

            });

        });

    }, {

        root: null,

        threshold: 0.45

    });

    sections.forEach(section => observer.observe(section));

}

// ==========================================
// Smooth Scroll + Close Mobile Menu
// ==========================================

navLinks.forEach(link => {

    link.addEventListener("click", function (e) {

        const href = this.getAttribute("href");

        if (!href || !href.startsWith("#")) return;

        const target = document.querySelector(href);

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

        // Close mobile navbar
        const navbarMenu = document.getElementById("navbarMenu");

        if (navbarMenu && navbarMenu.classList.contains("show")) {

            const collapse = bootstrap.Collapse.getOrCreateInstance(navbarMenu);

            collapse.hide();

        }

    });

});

// ==========================================
// Destination Search
// ==========================================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keypress", function (e) {

        if (e.key !== "Enter") return;

        e.preventDefault();

        const destination = this.value.trim().toLowerCase();

        if (destination === "") return;

        const target = document.getElementById(destination);

        if (target) {

            target.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });

            target.classList.add("search-highlight");

            setTimeout(() => {

                target.classList.remove("search-highlight");

            }, 2000);

        }

        else {

            showToast("Destination not found!");

        }

    });

}

// ==========================================
// Toast Message
// ==========================================

function showToast(message) {

    const toast = document.getElementById("toastMessage");

    const text = document.getElementById("toastText");

    if (!toast || !text) {

        alert(message);

        return;

    }

    text.innerHTML = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}