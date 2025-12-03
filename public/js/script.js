// Contact form thank-you message
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            alert("Thank you for contacting Chefaro! We’ll get back to you soon.");
            contactForm.reset();
        });
    }
});

//Perma log-in
document.addEventListener("DOMContentLoaded", () => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";

    const navLogin = document.getElementById("navLogin");
    const navSignup = document.getElementById("navSignup");
    const navProfile = document.getElementById("navProfile");
    const navLogout = document.getElementById("navLogout");

    // Make sure elements exist
    if (navLogin && navSignup && navProfile && navLogout) {
        if (loggedIn) {
            navLogin.style.display = "none";
            navSignup.style.display = "none";
            navProfile.style.display = "block";
            navLogout.style.display = "block";
        } else {
            navLogin.style.display = "block";
            navSignup.style.display = "block";
            navProfile.style.display = "none";
            navLogout.style.display = "none";
        }

        navLogout.addEventListener("click", () => {
            localStorage.clear();
            window.location.href = "index.html";
        });
    }
});

    // Chef Hire Buttons
    document.querySelectorAll(".hire-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            alert("Chef hired successfully!");
        });
    });

//Login System
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error);
            return;
        }

        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("isChef", data.user.is_chef);

        alert("Logged in successfully!");
        window.location.href = "index.html";
    });
}

// hide and unhide links in nav bar based on log in status
document.addEventListener("DOMContentLoaded", () => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";

    const navLogin = document.getElementById("navLogin");
    const navSignup = document.getElementById("navSignup");
    const navProfile = document.getElementById("navProfile");
    const navLogout = document.getElementById("navLogout");

    if (loggedIn) {
        navLogin.classList.add("d-none");
        navSignup.classList.add("d-none");

        navProfile.classList.remove("d-none");
        navLogout.classList.remove("d-none");
    } else {
        navLogin.classList.remove("d-none");
        navSignup.classList.remove("d-none");

        navProfile.classList.add("d-none");
        navLogout.classList.add("d-none");
    }

    // Logout handler
    navLogout.addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "index.html";
    });
});

// sign up chef description box
document.getElementById("isChef").addEventListener("change", function () {
    const descSection = document.getElementById("chefDescriptionSection");

    if (this.value === "Y") {
        descSection.style.display = "block";
    } else {
        descSection.style.display = "none";
    }
});

// sign up system
document.getElementById("signUpForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username2").value;
    const password = document.getElementById("password2").value;
    const isChef = document.getElementById("isChef").value;
    const description = isChef === "Y"
        ? document.getElementById("chefDescription").value
        : null;

    const profileData = {
        username,
        password,
        isChef,
        description
    };

    console.log(username, password, isChef);

    // Send to backend POST /api/signup
    const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData)
    });

    const data = await response.json();

    if (!response.ok) {
        alert("Error: " + data.error);
        return;
    }

    alert("Account created successfully!");
    window.location.href = "login.html";
});

