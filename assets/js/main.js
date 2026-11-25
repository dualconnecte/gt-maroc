/* =========================================================
   GT MAROC — Interactions
   ========================================================= */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header ---------- */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-stuck", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile navigation ---------- */
  const burger = document.querySelector(".burger");
  const mobileNav = document.querySelector(".mobile-nav");
  if (burger && mobileNav) {
    const close = () => {
      burger.setAttribute("aria-expanded", "false");
      mobileNav.classList.remove("is-open");
      document.body.style.overflow = "";
    };
    burger.addEventListener("click", () => {
      const open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      mobileNav.classList.toggle("is-open", !open);
      document.body.style.overflow = open ? "" : "hidden";
    });
    mobileNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach((el) => io.observe(el));
    }
  }

  /* ---------- Showreel ---------- */
  const reel = document.querySelector("[data-reel]");
  if (reel) {
    const slides = Array.from(reel.querySelectorAll(".reel-slide"));
    const dots = Array.from(reel.querySelectorAll(".reel-dots button"));
    const bar = reel.querySelector(".reel-progress i");
    const caption = reel.querySelector(".reel-caption");
    const play = reel.querySelector(".reel-play");
    let index = 0;
    let timer = null;
    const DURATION = 4500;

    const show = (i) => {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("is-active", k === index));
      dots.forEach((d, k) => d.classList.toggle("is-active", k === index));
      if (caption) caption.textContent = slides[index].dataset.caption || "";
      if (bar) {
        bar.style.transition = "none";
        bar.style.width = "0%";
        requestAnimationFrame(() => {
          bar.style.transition = `width ${DURATION}ms linear`;
          bar.style.width = "100%";
        });
      }
    };

    const start = () => {
      if (reduceMotion) return;
      stop();
      timer = setInterval(() => show(index + 1), DURATION);
    };
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
      if (bar) {
        const w = bar.getBoundingClientRect().width;
        bar.style.transition = "none";
        bar.style.width = w + "px";
      }
    };

    show(0);
    start();

    dots.forEach((d, k) =>
      d.addEventListener("click", () => {
        show(k);
        start();
      })
    );

    if (play) {
      play.addEventListener("click", () => openLightbox(index));
    }

    reel.addEventListener("mouseenter", stop);
    reel.addEventListener("mouseleave", start);

    /* ---------- Lightbox ---------- */
    let lbIndex = 0;
    function openLightbox(i) {
      let lb = document.querySelector(".lightbox");
      if (!lb) {
        lb = document.createElement("div");
        lb.className = "lightbox";
        lb.setAttribute("role", "dialog");
        lb.setAttribute("aria-modal", "true");
        lb.innerHTML =
          '<button class="lb-close" aria-label="Fermer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
          '<button class="lb-prev" aria-label="Précédent"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M15 5l-7 7 7 7"/></svg></button>' +
          '<button class="lb-next" aria-label="Suivant"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 5l7 7-7 7"/></svg></button>' +
          '<figure><img alt=""><figcaption></figcaption></figure>';
        document.body.appendChild(lb);
        lb.querySelector(".lb-close").addEventListener("click", closeLightbox);
        lb.querySelector(".lb-prev").addEventListener("click", () => renderLb(lbIndex - 1));
        lb.querySelector(".lb-next").addEventListener("click", () => renderLb(lbIndex + 1));
        lb.addEventListener("click", (e) => {
          if (e.target === lb) closeLightbox();
        });
        document.addEventListener("keydown", (e) => {
          if (!lb.classList.contains("is-open")) return;
          if (e.key === "Escape") closeLightbox();
          if (e.key === "ArrowLeft") renderLb(lbIndex - 1);
          if (e.key === "ArrowRight") renderLb(lbIndex + 1);
        });
      }
      lbIndex = i;
      renderLb(i);
      lb.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
    function renderLb(i) {
      const lb = document.querySelector(".lightbox");
      if (!lb) return;
      lbIndex = (i + slides.length) % slides.length;
      const slide = slides[lbIndex];
      const img = slide.querySelector("img");
      lb.querySelector("img").src = img.getAttribute("src");
      lb.querySelector("img").alt = img.getAttribute("alt") || "";
      lb.querySelector("figcaption").textContent = slide.dataset.caption || "";
    }
    function closeLightbox() {
      const lb = document.querySelector(".lightbox");
      if (!lb) return;
      lb.classList.remove("is-open");
      document.body.style.overflow = "";
    }
  }

  /* ---------- Contact form (mailto fallback, no backend) ---------- */
  const form = document.querySelector("[data-contact-form]");
  if (form) {
    const status = form.querySelector(".form-status");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const get = (k) => (data.get(k) || "").toString().trim();
      const name = get("name");
      const email = get("email");
      const message = get("message");
      const required = [name, email, message];
      if (required.some((v) => !v) || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        if (status) {
          status.textContent =
            "Merci de renseigner votre nom, une adresse e-mail valide et votre message.";
          status.className = "form-status is-error";
        }
        return;
      }
      const lines = [
        "Nom : " + name,
        "Société : " + get("company"),
        "E-mail : " + email,
        "Téléphone : " + get("phone"),
        "Objet : " + get("subject"),
        "",
        message,
      ];
      const subject = "Demande site web — " + (get("subject") || "Contact");
      const href =
        "mailto:gtmaroc@menara.ma?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(lines.join("\n"));
      window.location.href = href;
      if (status) {
        status.textContent =
          "Votre messagerie s'ouvre avec le message pré-rempli. Vous pouvez aussi nous appeler au +212 5 22 62 36 67.";
        status.className = "form-status is-ok";
      }
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
