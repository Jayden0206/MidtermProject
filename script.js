// Contact form thank-you message
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            alert("Thank you for contacting TasteHub! We’ll get back to you soon.");
            contactForm.reset();
        });
    }
});


// Contact Form Alert
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you for contacting TasteHub! We’ll get back to you soon.");
            contactForm.reset();
        });
    }

    // Chef Hire button
    document.querySelectorAll(".hire-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            alert("Chef hired successfully! They'll contact you shortly.");
        });
    });

    // View Recipe button
    document.querySelectorAll(".view-recipe").forEach(btn => {
        btn.addEventListener("click", () => {
            alert("Recipe details coming soon! Stay tuned 🍽️");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Contact Form
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you for contacting TasteHub! We’ll get back to you soon.");
            contactForm.reset();
        });
    }

    // Chef Hire Buttons
    document.querySelectorAll(".hire-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            alert("Chef hired successfully! They'll contact you shortly.");
        });
    });

    // View Recipe Buttons
    document.querySelectorAll(".view-recipe").forEach(btn => {
        btn.addEventListener("click", () => {
            alert("Recipe details coming soon! Stay tuned 🍽️");
        });
    });

    //Login System
    const loginForm = document.getElementById("loginForm");
    const welcomeSection = document.getElementById("welcomeSection");
    const displayName = document.getElementById("displayName");
    const logoutBtn = document.getElementById("logoutBtn");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value.trim();
            if (username) {
                loginForm.classList.add("d-none");
                welcomeSection.classList.remove("d-none");
                displayName.textContent = username;
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            welcomeSection.classList.add("d-none");
            loginForm.classList.remove("d-none");
        });
    }
});
