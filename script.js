/**
 * Portfolio Script — Odinaka Udoezika Ernest
 * Handles: theme toggle, navbar scroll state,
 *          mobile menu, smooth scrolling, scroll reveal
 */

/* ── 1. THEME TOGGLE ───────────────────────────────────────── */
/**
 * Immediately Invoked Function Expression (IIFE) for theme switching
 * Manages dark/light mode with localStorage persistence
 */
(function initTheme() {
  const html        = document.documentElement;  // Reference to <html> element where data-theme is stored
  const toggleBtn   = document.getElementById('themeToggle');  // Theme toggle button
  const icon        = toggleBtn?.querySelector('.toggle-icon');  // Icon element inside button

  // Load saved theme preference from browser storage, default to 'dark'
  const saved = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', saved);  // Apply theme to HTML root
  updateIcon(saved);  // Update button icon to match current theme

  // Add click event listener to toggle button
  toggleBtn?.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');  // Get current theme
    const next    = current === 'dark' ? 'light' : 'dark';  // Toggle to opposite theme
    html.setAttribute('data-theme', next);  // Apply new theme to HTML
    localStorage.setItem('theme', next);    // Persist preference to localStorage
    updateIcon(next);  // Update button icon
  });

  /**
   * Updates the toggle button icon based on current theme
   * ◑ = half circle (dark mode indicator)
   * ◐ = half circle rotated (light mode indicator)
   */
  function updateIcon(theme) {
    if (!icon) return;
    icon.textContent = theme === 'dark' ? '◑' : '◐';
  }
})();  // IIFE executes immediately


/* ── 2. NAVBAR SCROLL STATE ─────────────────────────────────── */
/**
 * Adds a 'scrolled' class to navbar when page is scrolled past threshold
 * Creates glassmorphic effect on scroll
 */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;  // Exit if navbar doesn't exist

  /**
   * Check scroll position and toggle scrolled class
   * Threshold: 40px of scrolling
   */
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');  // Add class for glass effect
    } else {
      navbar.classList.remove('scrolled');  // Remove when at top
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });  // passive: true improves performance
  onScroll(); // Run once on load to set initial state
})();


/* ── 3. MOBILE HAMBURGER MENU ───────────────────────────────── */
/**
 * Controls mobile navigation menu toggle
 * Handles hamburger button animation and menu open/close states
 */
(function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');  // Three-line menu button
  const mobileMenu = document.getElementById('mobileMenu'); // Dropdown menu container
  if (!hamburger || !mobileMenu) return;  // Exit if elements don't exist

  // Toggle menu when hamburger is clicked
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');  // Toggle menu visibility
    hamburger.classList.toggle('open', isOpen);  // Animate hamburger to X shape
    hamburger.setAttribute('aria-expanded', String(isOpen));  // Update accessibility attribute
  });

  // Close menu automatically when any navigation link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');  // Hide menu
      hamburger.classList.remove('open');   // Reset hamburger icon
      hamburger.setAttribute('aria-expanded', 'false');  // Update accessibility
    });
  });
})();


/* ── 4. SMOOTH SCROLL FOR ANCHOR LINKS ──────────────────────── */
/**
 * Implements smooth scrolling for all anchor links (# links)
 * Accounts for fixed navbar height to prevent content hiding behind header
 */
(function initSmoothScroll() {
  // Select all anchor links that point to elements on the same page
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;  // Ignore empty anchor links

      const target = document.querySelector(id);  // Find target element by ID
      if (!target) return;  // Exit if target doesn't exist

      e.preventDefault();  // Prevent default jump behavior

      // Get navbar height from CSS variable (default to 68px if not found)
      const navH   = parseInt(getComputedStyle(document.documentElement)
                      .getPropertyValue('--nav-h')) || 68;
      
      // Calculate scroll position: target's top position minus navbar height
      const top    = target.getBoundingClientRect().top + window.scrollY - navH;

      // Smooth scroll to calculated position
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ── 5. SCROLL REVEAL ────────────────────────────────────────── */
/**
 * Reveals elements with .reveal class when they scroll into view
 * Uses IntersectionObserver for optimal performance
 */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');  // All elements to animate
  if (!elements.length) return;

  /**
   * IntersectionObserver watches when elements enter the viewport
   * More efficient than scroll event listeners
   */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {  // Element has entered viewport
          entry.target.classList.add('visible');  // Trigger CSS animation
          observer.unobserve(entry.target);  // Stop watching after animation plays
        }
      });
    },
    {
      threshold: 0.12,        // Trigger when 12% of element is visible
      rootMargin: '0px 0px -40px 0px'  // Slight offset from bottom
    }
  );

  // Start observing all reveal elements
  elements.forEach(el => observer.observe(el));
})();


/* ── 6. ACTIVE NAV LINK HIGHLIGHT ───────────────────────────── */
/**
 * Highlights the navigation link corresponding to the current scroll position
 * Updates as user scrolls through sections
 */
(function initActiveNav() {
  // Select all sections that have an ID attribute
  const sections = document.querySelectorAll('section[id]');
  // Select all navigation links (both desktop and mobile)
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  // Get navbar height for offset calculation
  const navH     = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
  ) || 68;

  /**
   * Determines which section is currently in view
   * Highlights corresponding navigation link
   */
  const highlight = () => {
    let currentId = '';
    
    // Find which section is at the top of viewport
    sections.forEach(section => {
      const top = section.getBoundingClientRect().top - navH - 20;
      if (top <= 0) currentId = section.id;  // Section is at or above scroll position
    });

    // Toggle 'active-nav' class on matching links
    navLinks.forEach(link => {
      link.classList.toggle(
        'active-nav',
        link.getAttribute('href') === `#${currentId}`
      );
    });
  };

  window.addEventListener('scroll', highlight, { passive: true });
  highlight();  // Run once on load
})();


/* ── 7. TYPED HERO ROLE (subtle, optional effect) ───────────── */
/**
 * Creates a typewriter effect for the role/title text
 * Cycles through multiple phrases, typing and deleting
 * Adds dynamic, interactive feel to hero section
 */
(function initTypedEffect() {
  const roleEl = document.querySelector('.role-tag');  // Element to animate
  if (!roleEl) return;

  // Array of phrases to cycle through
  const phrases = [
    'Cybersecurity & Cloud Engineering',
    'SIEM & Threat Detection',
    'Cloud Security Specialist',
    'Incident Response Analyst',
  ];

  let phraseIndex = 0;  // Current phrase being typed
  let charIndex   = 0;  // Current character position in phrase
  let deleting    = false;  // Are we deleting (true) or typing (false)?
  let pausing     = false;  // Are we pausing between cycles?

  // Timing constants (in milliseconds)
  const TYPING_SPEED  = 60;   // Speed of typing (lower = faster)
  const DELETE_SPEED  = 35;   // Speed of deleting (slightly faster than typing)
  const PAUSE_END     = 2200; // Pause after completing a phrase
  const PAUSE_START   = 400;  // Pause before starting next phrase

  /**
   * Main animation loop using recursive setTimeout
   * Handles typing, deleting, and pausing logic
   */
  function tick() {
    const current = phrases[phraseIndex];

    if (pausing) return; // Skip animation during pause

    if (!deleting) {
      // === TYPING PHASE ===
      charIndex++;
      roleEl.textContent = current.slice(0, charIndex);  // Display up to current char

      if (charIndex === current.length) {
        // Completed typing the phrase - pause at end
        pausing = true;
        setTimeout(() => {
          deleting = true;   // Switch to delete mode
          pausing  = false;  // Resume animation
          setTimeout(tick, DELETE_SPEED);
        }, PAUSE_END);
        return;
      }
      setTimeout(tick, TYPING_SPEED);  // Continue typing
    } else {
      // === DELETING PHASE ===
      charIndex--;
      roleEl.textContent = current.slice(0, charIndex);  // Remove last character

      if (charIndex === 0) {
        // Completed deleting the phrase - move to next phrase
        deleting    = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;  // Cycle through phrases
        pausing     = true;
        setTimeout(() => {
          pausing = false;
          setTimeout(tick, TYPING_SPEED);
        }, PAUSE_START);
        return;
      }
      setTimeout(tick, DELETE_SPEED);  // Continue deleting
    }
  }

  // Small initial delay before starting the typewriter effect
  setTimeout(tick, 1800);
})();


/* ── 8. ADD ACTIVE NAV CSS ───────────────────────────────────── */
/**
 * Dynamically injects CSS for active navigation link styling
 * Ensures styles exist even if CSS file doesn't have them
 * Keeps styling modular and self-contained
 */
(function addActiveNavStyle() {
  const style = document.createElement('style');  // Create new <style> element
  // Define CSS rules for active navigation links
  style.textContent = `
    .nav-links a.active-nav {
      color: var(--accent) !important;       // Override with accent color
      background: var(--accent-glow) !important;  // Add glow background
    }
  `;
  document.head.appendChild(style);  // Inject styles into document
})();