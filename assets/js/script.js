'use strict';



/**
 * PRELOADER
 */

const preloader = document.querySelector("[data-preloader]");

window.addEventListener("DOMContentLoaded", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * Mobile navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

addEventOnElements(navTogglers, "click", function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
});

addEventOnElements(navLinks, "click", function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("nav-active");
});



/**
 * Header active
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  header.classList[window.scrollY > 100 ? "add" : "remove"]("active");
});



/**
 * Element tilt effect
 */

const tiltElements = document.querySelectorAll("[data-tilt]");

const initTilt = function (event) {

  /** get tilt element center position */
  const centerX = this.offsetWidth / 2;
  const centerY = this.offsetHeight / 2;

  const tiltPosY = ((event.offsetX - centerX) / centerX) * 10;
  const tiltPosX = ((event.offsetY - centerY) / centerY) * 10;

  this.style.transform = `perspective(1000px) rotateX(${tiltPosX}deg) rotateY(${tiltPosY - (tiltPosY * 2)}deg)`;

}

addEventOnElements(tiltElements, "mousemove", initTilt);

addEventOnElements(tiltElements, "mouseout", function () {
  this.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
});



/**
 * Tab content
 */

const tabBtns = document.querySelectorAll("[data-tab-btn]");
const tabContents = document.querySelectorAll("[data-tab-content]");

let lastActiveTabBtn = tabBtns[0];
let lastActiveTabContent = tabContents[0];

const filterContent = function () {

  if (!(lastActiveTabBtn === this)) {

    lastActiveTabBtn.classList.remove("active");
    lastActiveTabContent.classList.remove("active");

    this.classList.add("active");
    lastActiveTabBtn = this;

    const currentTabContent = document.querySelector(`[data-tab-content="${this.dataset.tabBtn}"]`);

    currentTabContent.classList.add("active");
    lastActiveTabContent = currentTabContent;

  }

}

addEventOnElements(tabBtns, "click", filterContent);



/**
 * Custom cursor
 */

const cursors = document.querySelectorAll("[data-cursor]");
const hoveredElements = [...document.querySelectorAll("button"), ...document.querySelectorAll("a")];

window.addEventListener("mousemove", function (event) {

  const posX = event.clientX;
  const posY = event.clientY;

  /** cursor dot position */
  cursors[0].style.left = `${posX}px`;
  cursors[0].style.top = `${posY}px`;

  /** cursor outline position */
  setTimeout(function () {
    cursors[1].style.left = `${posX}px`;
    cursors[1].style.top = `${posY}px`;
  }, 80);

});

/** add hovered class when mouseover on hoverElements */
addEventOnElements(hoveredElements, "mouseover", function () {
  for (let i = 0, len = cursors.length; i < len; i++) {
    cursors[i].classList.add("hovered");
  }
});

/** remove hovered class when mouseout on hoverElements */
addEventOnElements(hoveredElements, "mouseout", function () {
  for (let i = 0, len = cursors.length; i < len; i++) {
    cursors[i].classList.remove("hovered");
  }
});



/**
 * Theme toggle
 */

const themeToggleBtn = document.querySelector("[data-theme-toggle]");
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', currentTheme);

themeToggleBtn.addEventListener("click", function () {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});



/**
 * Intersection Observer for scroll animations
 */

const animateOnScroll = function() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fade-in-up 0.8s ease-out forwards';
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);
  });

  // Observe tech items (reuse for animations)
  const techItems = document.querySelectorAll('.tech-item');
  techItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.animationDelay = `${index * 0.1}s`;
    observer.observe(item);
  });

  // Observe service cards
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.15}s`;
    observer.observe(card);
  });

  // Observe project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.2}s`;
    observer.observe(card);
  });
};

// Initialize scroll animations
window.addEventListener('load', animateOnScroll);



/**
 * Enhanced smooth scroll
 */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});



/**
 * Parallax effect for space background
 */

window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const stars = document.querySelector('.stars');
  const stars2 = document.querySelector('.stars2');
  const stars3 = document.querySelector('.stars3');
  
  if (stars && stars2 && stars3) {
    stars.style.transform = `translateY(${scrollTop * 0.5}px)`;
    stars2.style.transform = `translateY(${scrollTop * 0.3}px)`;
    stars3.style.transform = `translateY(${scrollTop * 0.2}px)`;
  }
});



/**
 * Add ripple effect to buttons
 */

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});



/**
 * Typing animation for hero subtitle
 */

const typingText = document.querySelector('.typing-text');
if (typingText) {
  const text = typingText.textContent;
  typingText.textContent = '';
  let charIndex = 0;
  
  function typeCharacter() {
    if (charIndex < text.length) {
      typingText.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(typeCharacter, 100);
    } else {
      setTimeout(() => {
        typingText.style.borderRight = 'none';
      }, 500);
    }
  }
  
  setTimeout(typeCharacter, 1000);
}