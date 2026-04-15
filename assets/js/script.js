document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  gsap.registerPlugin(ScrollTrigger);

  /* ── Custom animated cursor ── */
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  const trail = document.getElementById("cursor-trail");
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let trailX = 0, trailY = 0;

  // Hide cursor elements on touch devices
  if ("ontouchstart" in window) {
    [dot, ring, trail].forEach(el => el.style.display = "none");
    document.body.style.cursor = "auto";
  } else {
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    });

    // Smooth follow for ring and trail
    function animateCursor() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";

      trailX += (mouseX - trailX) * 0.08;
      trailY += (mouseY - trailY) * 0.08;
      trail.style.left = trailX + "px";
      trail.style.top = trailY + "px";

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const hoverTargets = "a, button, [role='button'], .card-panel, .mini-grid-card, .xp-card-v2, .interest-card, .contact-card, .formation-card, .tag-cyber, .tag-glow, input, textarea";
    document.querySelectorAll(hoverTargets).forEach((el) => {
      el.addEventListener("mouseenter", () => {
        dot.style.width = "8px";
        dot.style.height = "8px";
        dot.style.background = "#8b5cf6";
        dot.style.boxShadow = "0 0 12px #8b5cf6, 0 0 24px rgba(139,92,246,0.4)";
        ring.style.width = "50px";
        ring.style.height = "50px";
        ring.style.borderColor = "rgba(139,92,246,0.6)";
        ring.style.borderWidth = "2px";
        trail.style.opacity = "0.25";
      });
      el.addEventListener("mouseleave", () => {
        dot.style.width = "6px";
        dot.style.height = "6px";
        dot.style.background = "#06d6d6";
        dot.style.boxShadow = "0 0 8px #06d6d6, 0 0 16px rgba(6,214,214,0.3)";
        ring.style.width = "36px";
        ring.style.height = "36px";
        ring.style.borderColor = "rgba(6,214,214,0.5)";
        ring.style.borderWidth = "1.5px";
        trail.style.opacity = "0.15";
      });
    });

    // Hide on mouse leave window
    document.addEventListener("mouseleave", () => {
      [dot, ring, trail].forEach(el => el.style.opacity = "0");
    });
    document.addEventListener("mouseenter", () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      trail.style.opacity = "0.15";
    });
  }

  /* ── Hero Particles ── */
  const particleContainer = document.getElementById("particles");
  for (let i = 0; i < 25; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "vw";
    p.style.animationDuration = (8 + Math.random() * 12) + "s";
    p.style.animationDelay = (Math.random() * 10) + "s";
    p.style.opacity = (0.2 + Math.random() * 0.5);
    p.style.width = p.style.height = (1 + Math.random() * 2) + "px";
    particleContainer.appendChild(p);
  }

  /* ── Section Particles (for all enhanced sections) ── */
  document.querySelectorAll(".section-particles").forEach((container) => {
    const count = 12;
    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "section-particle";
      p.style.left = Math.random() * 100 + "%";
      p.style.top = Math.random() * 100 + "%";
      p.style.animationDuration = (10 + Math.random() * 15) + "s";
      p.style.animationDelay = (Math.random() * 12) + "s";
      p.style.opacity = (0.15 + Math.random() * 0.35);
      const size = (1 + Math.random() * 2) + "px";
      p.style.width = size;
      p.style.height = size;
      container.appendChild(p);
    }
  });

  /* ── Mobile menu ── */
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = menuToggle.querySelector(".menu-icon");
  const closeIcon = menuToggle.querySelector(".close-icon");
  let menuOpen = false;

  menuToggle.addEventListener("click", () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle("hidden", !menuOpen);
    menuIcon.classList.toggle("hidden", menuOpen);
    closeIcon.classList.toggle("hidden", !menuOpen);
  });

  document.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", () => {
      menuOpen = false;
      mobileMenu.classList.add("hidden");
      menuIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
    });
  });

  /* ── Text scramble effect ── */
  function scrambleText(el, finalText, duration) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";
    const steps = 20;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      let result = "";
      for (let i = 0; i < finalText.length; i++) {
        if (finalText[i] === " ") {
          result += " ";
        } else if (step >= steps * (i / finalText.length) + steps * 0.3) {
          result += finalText[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      el.textContent = result;
      step++;
      if (step > steps) {
        clearInterval(timer);
        el.textContent = finalText;
      }
    }, interval);
  }

  /* ── Typing effect for About section ── */
  function typeText(el, text, speed, callback) {
    let i = 0;
    el.textContent = "";
    const timer = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        el.classList.add("done");
        if (callback) callback();
      }
    }, speed);
  }

  // Trigger typing when About section scrolls into view
  document.querySelectorAll(".typing-label").forEach((el) => {
    const text = el.dataset.type;
    let triggered = false;
    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        if (triggered) return;
        triggered = true;
        typeText(el, text, 50);
      },
    });
  });

  document.querySelectorAll(".typing-word").forEach((el) => {
    const text = el.dataset.type;
    let triggered = false;
    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        if (triggered) return;
        triggered = true;
        setTimeout(() => typeText(el, text, 80), 600);
      },
    });
  });

  // Highlight keywords in About section on scroll
  ScrollTrigger.create({
    trigger: "#a-propos",
    start: "top 50%",
    onEnter: () => {
      document.querySelectorAll("#a-propos strong").forEach((el, i) => {
        el.classList.add("keyword-highlight");
        setTimeout(() => {
          el.style.backgroundSize = "100% 100%";
        }, 300 + i * 400);
      });
    },
  });

  /* ── Hero entrance ── */
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroTl
    .from(".hero-status", { opacity: 0, y: 12, duration: 0.6 })
    .from(".hero-title", { opacity: 0, y: 30, duration: 1, ease: "power4.out" }, "-=0.3")
    .from(".hero-role", { opacity: 0, y: 12, duration: 0.6 }, "-=0.4")
    .from(".hero-desc", { opacity: 0, y: 12, duration: 0.6 }, "-=0.3")
    .from(".hero-cta", { opacity: 0, y: 16, duration: 0.6 }, "-=0.2")
    .from(".hero-social", { opacity: 0, y: 10, duration: 0.5 }, "-=0.2")
    .from(".scroll-hint", { opacity: 0, duration: 0.4 }, "-=0.1")
    .from("#main-nav", { opacity: 0, y: -10, duration: 0.5 }, "-=0.2");

  /* ── Trigger scramble after hero title appears ── */
  document.querySelectorAll(".glitch-text").forEach((el, i) => {
    const finalText = el.dataset.text;
    el.textContent = "";
    setTimeout(() => {
      scrambleText(el, finalText, 800);
    }, 600 + i * 300);
  });

  /* ── Reveal on scroll ── */
  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  /* ── XP cards stagger animation ── */
  gsap.utils.toArray(".xp-card-v2").forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 30, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: i * 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  /* ── Formation cards entrance ── */
  gsap.utils.toArray(".formation-card").forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 30, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: i * 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  /* ── Contact cards entrance ── */
  gsap.utils.toArray(".contact-card").forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 20, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: i * 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  /* ── Section separators glow animation ── */
  gsap.utils.toArray(".section-separator").forEach((sep) => {
    gsap.fromTo(sep,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sep,
          start: "top 92%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  /* ── Glow line animations ── */
  gsap.utils.toArray(".glow-line").forEach((line) => {
    gsap.fromTo(line,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: line,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  /* ── Progress bars ── */
  document.querySelectorAll(".skill-bar").forEach((bar) => {
    const pct = bar.dataset.percent;
    const fill = bar.querySelector(".progress-fill");
    ScrollTrigger.create({
      trigger: bar,
      start: "top 88%",
      onEnter: () => { fill.style.width = pct + "%"; },
    });
  });

  /* ── Interest cards stagger ── */
  gsap.utils.toArray(".interest-card").forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 20, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: i * 0.1,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  /* ── Nav active state ── */
  const sectionIds = ["a-propos", "competences", "parcours", "formation", "contact"];
  const navLinks = document.querySelectorAll(".nav-link");

  sectionIds.forEach((id, i) => {
    ScrollTrigger.create({
      trigger: "#" + id,
      start: "top center",
      end: "bottom center",
      onEnter: () => activateNav(i),
      onEnterBack: () => activateNav(i),
    });
  });

  function activateNav(index) {
    navLinks.forEach((link, i) => {
      link.classList.toggle("text-cyan", i === index);
      link.classList.toggle("text-txt-dim", i !== index);
    });
  }
});
