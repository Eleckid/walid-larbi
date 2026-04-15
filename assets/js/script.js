document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  gsap.registerPlugin(ScrollTrigger);

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
