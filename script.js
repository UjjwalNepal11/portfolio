const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const mobileBackdrop = document.querySelector(".mobile-nav-backdrop");
const body = document.body;

function openMenu() {
  hamburger.classList.add("active");
  navMenu.classList.add("active");
  mobileBackdrop.classList.add("active");
  body.classList.add("menu-open");
}

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
  mobileBackdrop.classList.remove("active");
  body.classList.remove("menu-open");
}

hamburger.addEventListener("click", () => {
  if (navMenu.classList.contains("active")) {
    closeMenu();
  } else {
    openMenu();
  }
});

mobileBackdrop.addEventListener("click", closeMenu);

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    closeMenu();
  }
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu ul li a");

function updateActiveNav() {
  if (body.classList.contains("menu-open")) return; 

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

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

function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

const heroH2 = document.querySelector(".hero-content h2");
const heroH3 = document.querySelector(".hero-content h3");

window.addEventListener("load", () => {
  loadTheme();
  if (heroH2 && heroH3) {
    typeWriter(heroH2, "Front-End Developer");
    setTimeout(() => typeWriter(heroH3, "Hey, I'm Bhagwat Nepal"), 1000);
  }
});

const staggerObserverOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      const staggerItems = entry.target.querySelectorAll(".stagger-item");
      staggerItems.forEach((item, itemIndex) => {
        if (!item.classList.contains("animate")) {
          item.style.animationDelay = `${(itemIndex + 1) * 0.15}s`;
          item.classList.add("animate");
        }
      });
    }
  });
}, staggerObserverOptions);

const legacyObserverOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};
const legacyObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.classList.contains("animate")) {
      entry.target.classList.add("animate");
    }
  });
}, legacyObserverOptions);

document
  .querySelectorAll(
    ".stagger-hero, .stagger-skills, .stagger-projects, #about h2, .about-content, #skills h2, #projects h2, #contact h2, .contact-content, .skills-grid, .projects-grid",
  )
  .forEach((el) => {
    if (el.querySelector(".stagger-item")) {
      staggerObserver.observe(el);
    } else {
      legacyObserver.observe(el);
    }
  });
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  const isLight = body.classList.contains("light-theme");
  body.classList.toggle("light-theme");
  const icon = themeToggle.querySelector("i");
  if (body.classList.contains("light-theme")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
  saveTheme(body.classList.contains("light-theme"));
});

function saveTheme(isLight) {
  localStorage.setItem("theme", isLight ? "light" : "dark");
}

function loadTheme() {
  const saved = localStorage.getItem("theme");
  const isLight = saved === "light";
  if (isLight) {
    document.body.classList.add("light-theme");
  }
  const themeToggle = document.getElementById("theme-toggle");
  const icon = themeToggle ? themeToggle.querySelector("i") : null;
  if (icon) {
    if (isLight) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  }
}
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const skillsGrid = document.querySelector(".skills-grid");

function getSkillsScrollAmount() {
  return window.innerWidth <= 768 ? 120 : 200;
}

function updateSkillsButtonVisibility() {
  const scrollLeft = skillsGrid.scrollLeft;
  const scrollWidth = skillsGrid.scrollWidth;
  const clientWidth = skillsGrid.clientWidth;
  const tolerance = window.innerWidth <= 768 ? 10 : 20;
  if (scrollLeft <= tolerance) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "block";
  }

  if (scrollLeft + clientWidth >= scrollWidth - tolerance) {
    nextBtn.style.display = "none";
  } else {
    nextBtn.style.display = "block";
  }
}
prevBtn.addEventListener("click", () => {
  skillsGrid.scrollBy({
    left: -getSkillsScrollAmount(),
    behavior: "smooth",
  });
  setTimeout(updateSkillsButtonVisibility, 300);
});
nextBtn.addEventListener("click", () => {
  skillsGrid.scrollBy({
    left: getSkillsScrollAmount(),
    behavior: "smooth",
  });
  setTimeout(updateSkillsButtonVisibility, 300);
});
window.addEventListener("load", () => {
  loadTheme();
  updateSkillsButtonVisibility();
});
window.addEventListener("resize", updateSkillsButtonVisibility);
skillsGrid.addEventListener("scroll", () =>
  setTimeout(updateSkillsButtonVisibility, 50),
);
window.addEventListener("load", updateSkillsButtonVisibility);

const projectPrevBtn = document.getElementById("project-prev-btn");
const projectNextBtn = document.getElementById("project-next-btn");
const projectsGrid = document.querySelector(".projects-grid");
function getSlideWidth() {
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    return projectsGrid.clientWidth; 
  }
  const gap = parseFloat(getComputedStyle(projectsGrid).gap) || 32;
  const cardWidth = projectsGrid.children[0].offsetWidth;
  return cardWidth + gap;
}
function updateProjectsButtonVisibility() {
  const scrollLeft = projectsGrid.scrollLeft;
  const scrollWidth = projectsGrid.scrollWidth;
  const clientWidth = projectsGrid.clientWidth;
  const tolerance = 10;

  if (scrollLeft <= tolerance) {
    projectPrevBtn.style.display = "none";
  } else {
    projectPrevBtn.style.display = "block";
  }

  if (scrollLeft + clientWidth >= scrollWidth - tolerance) {
    projectNextBtn.style.display = "none";
  } else {
    projectNextBtn.style.display = "block";
  }
}
projectPrevBtn.addEventListener("click", () => {
  const cardsPerView = window.innerWidth > 768 ? 2 : 1;
  const slideWidth = getSlideWidth() * cardsPerView;
  projectsGrid.scrollBy({
    left: -slideWidth,
    behavior: "smooth",
  });
  setTimeout(updateProjectsButtonVisibility, 300);
});
projectNextBtn.addEventListener("click", () => {
  const cardsPerView = window.innerWidth > 768 ? 2 : 1;
  const slideWidth = getSlideWidth() * cardsPerView;
  projectsGrid.scrollBy({
    left: slideWidth,
    behavior: "smooth",
  });
  setTimeout(updateProjectsButtonVisibility, 300);
});
updateProjectsButtonVisibility();
projectsGrid.addEventListener("scroll", () =>
  setTimeout(updateProjectsButtonVisibility, 50),
);
skillsGrid.addEventListener("scroll", updateSkillsButtonVisibility);
function initScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, var(--accent-primary), var(--accent-hover));
    z-index: 1001;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
  }

  window.addEventListener("scroll", updateProgress);
}

window.addEventListener("load", initScrollProgress);

window.addEventListener("resize", () => {
  updateProjectsButtonVisibility();
  updateSkillsButtonVisibility();
});

let isDesktop = window.innerWidth > 768;
let parallaxScrollHandler = null;
let heroImg = null;

function initHeroParallax() {
  heroImg = document.querySelector(".hero-image img");
  if (!heroImg || !isDesktop) {
    if (parallaxScrollHandler) {
      window.removeEventListener("scroll", parallaxScrollHandler);
      parallaxScrollHandler = null;
    }
    return;
  }

  if (parallaxScrollHandler) {
    window.removeEventListener("scroll", parallaxScrollHandler);
  }

  parallaxScrollHandler = () => {
    const scrolled = window.scrollY * 0.5;
    heroImg.style.transform = `translateY(${scrolled}px) rotate(${scrolled * 0.01}deg)`;
  };
  window.addEventListener("scroll", parallaxScrollHandler);
}

function checkResizeForParallax() {
  const newIsDesktop = window.innerWidth > 768;
  if (newIsDesktop !== isDesktop) {
    isDesktop = newIsDesktop;
    initHeroParallax();
  }
}

window.addEventListener("resize", checkResizeForParallax);
initHeroParallax();

const hero = document.getElementById("hero");
if (hero) {
  const trail = document.createElement("div");
  trail.style.cssText = `
    position: fixed;
    width: 8px;
    height: 8px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    transition: all 0.1s ease;
    left: -10px;
    top: -10px;
  `;
  document.body.appendChild(trail);

  let mouseX = 0,
    mouseY = 0;
  let trailX = 0,
    trailY = 0;

  hero.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateTrail() {
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;
    trail.style.left = trailX + "px";
    trail.style.top = trailY + "px";
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  hero.addEventListener("mouseleave", () => {
    trail.style.opacity = "0";
  });
  hero.addEventListener("mouseenter", () => {
    trail.style.opacity = "1";
  });
}
function validateField(field, errorId, validatorFn, errorMsg) {
  const errorEl = document.getElementById(errorId);
  if (validatorFn(field.value.trim())) {
    errorEl.textContent = "";
    field.style.borderColor = "";
    return true;
  } else {
    errorEl.textContent = errorMsg;
    field.style.borderColor = "#dc3545";
    return false;
  }
}

const nameField = contactForm.querySelector('input[type="text"]');
const emailField = contactForm.querySelector('input[type="email"]');
const messageField = contactForm.querySelector("textarea");

nameField.addEventListener("blur", function () {
  validateField(
    this,
    "name-error",
    (val) => {
      if (!val) return false;
      const nameRegex = /^[a-zA-Z\s]{2,50}$/i;
      return nameRegex.test(val);
    },
    "Invalid Name.",
  );
});

emailField.addEventListener("blur", function () {
  validateField(
    this,
    "email-error",
    (val) => {
      if (!val) return false;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(val);
    },
    "Please enter a valid email address.",
  );
});

messageField.addEventListener("blur", function () {
  const val = this.value.trim();
  if (
    !val ||
    val.length < 10 ||
    val.length > 500 ||
    val.toLowerCase().includes("<script")
  ) {
    document.getElementById("message-error").textContent = "Invalid content.";
    this.style.borderColor = "#dc3545";
  } else {
    document.getElementById("message-error").textContent = "";
    this.style.borderColor = "";
  }
});

contactForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  emailjs.init("L5lSLKNDI5ZNcvfZ4");
  document.getElementById("name-error").textContent = "";
  document.getElementById("email-error").textContent = "";
  document.getElementById("message-error").textContent = "";
 
  nameField.style.borderColor = "";
  emailField.style.borderColor = "";
  messageField.style.borderColor = "";
  const name = nameField.value.trim();
  const email = emailField.value.trim();
  const message = messageField.value.trim();
  let isValid = true;
  if (!name) {
    document.getElementById("name-error").textContent = "Name is required.";
    isValid = false;
  } else {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/i;
    if (!nameRegex.test(name)) {
      document.getElementById("name-error").textContent = "Enter Proper Name. ";
      isValid = false;
    }
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
  if (message.toLowerCase().includes("<script")) {
    document.getElementById("message-error").textContent =
      "Invalid content detected.";
    isValid = false;
  }
  if (isValid) {
    try {
      await emailjs.sendForm(
        "service_qsuej9k",
        "template_5wys077",
        contactForm,
      );
      document.getElementById("success-message").textContent =
        "Message sent successfully! We'll reply soon.";
      document.getElementById("success-message").style.display = "block";
      contactForm.reset();
      setTimeout(() => {
        document.getElementById("success-message").style.display = "none";
      }, 5000);
    } catch (error) {
      console.error("EmailJS error:", error);
      document.getElementById("success-message").textContent =
        "Failed to send message. Please try again.";
      document.getElementById("success-message").style.color = "#dc3545";
      document.getElementById("success-message").style.display = "block";
      setTimeout(() => {
        document.getElementById("success-message").style.display = "none";
      }, 5000);
    }
  }
});

function clearAllFormErrors() {
  const errorIds = ["name-error", "email-error", "message-error"];
  errorIds.forEach((id) => {
    const errorEl = document.getElementById(id);
    if (errorEl) errorEl.textContent = "";
  });
  [nameField, emailField, messageField].forEach((field) => {
    if (field) field.style.borderColor = "";
  });
}

const contactSection = document.getElementById("contact");
if (contactSection) {
  const contactObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio < 0.3) {
         
          clearAllFormErrors();
        }
      });
    },
    { threshold: [0, 0.3, 0.5, 1] },
  );
  contactObserver.observe(contactSection);
}

document.addEventListener(
  "click",
  (e) => {
    if (!contactForm.contains(e.target)) {
      clearAllFormErrors();
    }
  },
  true,
); 
