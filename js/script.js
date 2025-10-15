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

    // Chef Hire Buttons
    document.querySelectorAll(".hire-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            alert("Chef hired successfully!");
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

    // Chef signup form submission
document.addEventListener("DOMContentLoaded", function() {
  const chefForm = document.getElementById("chefSignupForm");
  if (chefForm) {
    chefForm.addEventListener("submit", function(e) {
      e.preventDefault();
      alert("Thank you for signing up as a chef! We'll review your profile shortly.");
      chefForm.reset();
    });
  }
});
