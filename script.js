const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);
document.querySelectorAll(".skill, .project").forEach((el) => {
  observer.observe(el);
});
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-theme");
  const icon = themeToggle.querySelector("i");
  if (body.classList.contains("light-theme")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
});
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const skillsGrid = document.querySelector(".skills-grid");
function updateButtonVisibility() {
  const scrollLeft = skillsGrid.scrollLeft;
  const scrollWidth = skillsGrid.scrollWidth;
  const clientWidth = skillsGrid.clientWidth;
  if (scrollLeft <= 0) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "block";
  }
  if (scrollLeft + clientWidth >= scrollWidth - 1) {
    nextBtn.style.display = "none";
  } else {
    nextBtn.style.display = "block";
  }
}
prevBtn.addEventListener("click", () => {
  skillsGrid.scrollBy({
    left: -200,
    behavior: "smooth",
  });
  setTimeout(updateButtonVisibility, 300);
});
nextBtn.addEventListener("click", () => {
  skillsGrid.scrollBy({
    left: 200,
    behavior: "smooth",
  });
  setTimeout(updateButtonVisibility, 300);
});
updateButtonVisibility();
skillsGrid.addEventListener("scroll", updateButtonVisibility);
const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("name-error").textContent = "";
  document.getElementById("email-error").textContent = "";
  document.getElementById("message-error").textContent = "";
  document.getElementById("success-message").style.display = "none";
  const name = contactForm.querySelector('input[type="text"]').value.trim();
  const email = contactForm.querySelector('input[type="email"]').value.trim();
  const message = contactForm.querySelector("textarea").value.trim();
  let isValid = true;
  if (!name) {
    document.getElementById("name-error").textContent =
      "Please enter your name.";
    isValid = false;
  }
  if (!email) {
    document.getElementById("email-error").textContent =
      "Please enter your email.";
    isValid = false;
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById("email-error").textContent =
        "Please enter a valid email address.";
      isValid = false;
    }
  }
  if (!message) {
    document.getElementById("message-error").textContent =
      "Please enter your message.";
    isValid = false;
  }
  if (isValid) {
    document.getElementById("success-message").textContent =
      "Thank you for your message!";
    document.getElementById("success-message").style.display = "block";
    contactForm.reset();
    setTimeout(() => {
      document.getElementById("success-message").style.display = "none";
    }, 3000);
  }
});
