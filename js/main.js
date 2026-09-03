(function () {
  "use strict";

  /* ---- Password gate ---- */
  var GATE_KEY = "acw-site-unlocked";
  var GATE_PASSWORD = "brooklyn";
  var gate = document.getElementById("site-gate");

  if (gate) {
    if (window.localStorage.getItem(GATE_KEY) === "true") {
      gate.classList.add("is-hidden");
    } else {
      var gateForm = document.getElementById("gate-form");
      var gateInput = document.getElementById("gate-password");
      var gateError = document.getElementById("gate-error");

      gateForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (gateInput.value.trim().toLowerCase() === GATE_PASSWORD) {
          window.localStorage.setItem(GATE_KEY, "true");
          gate.classList.add("is-hidden");
        } else {
          gateError.hidden = false;
          gateInput.value = "";
          gateInput.focus();
        }
      });
    }
  }

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector(".nav-menu-toggle");
  var panel = document.querySelector(".mobile-nav-panel");

  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      var isOpen = panel.classList.toggle("is-open");
      document.body.classList.toggle("nav-open", isOpen);
      toggle.textContent = isOpen ? "CLOSE" : "MENU";
    });

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        panel.classList.remove("is-open");
        document.body.classList.remove("nav-open");
        toggle.textContent = "MENU";
      });
    });
  }

  /* ---- Nav shadow on scroll ---- */
  var nav = document.querySelector(".site-nav");
  if (nav) {
    var updateNavShadow = function () {
      nav.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    updateNavShadow();
    window.addEventListener("scroll", updateNavShadow, { passive: true });
  }

  /* ---- Scroll reveal (fade + rise) ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
      );
      revealEls.forEach(function (el) {
        io.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  }

  /* ---- Custom foreground / background parallax ----
     Layers carry data-parallax-speed: a multiplier applied to how far
     the layer travels relative to normal scroll. <1 = slower (background),
     >1 = faster (foreground). Values are relative to the layer's own
     position on screen so the effect stays subtle and centered. */
  var parallaxLayers = Array.prototype.slice.call(
    document.querySelectorAll("[data-parallax-speed]")
  );

  if (parallaxLayers.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var ticking = false;

    var applyParallax = function () {
      var viewportH = window.innerHeight;

      parallaxLayers.forEach(function (layer) {
        var speed = parseFloat(layer.getAttribute("data-parallax-speed")) || 0;
        var rect = layer.parentElement.getBoundingClientRect();
        var centerOffset = rect.top + rect.height / 2 - viewportH / 2;
        var translate = centerOffset * speed * -1;
        layer.style.transform = "translate3d(0, " + translate.toFixed(1) + "px, 0)";
      });

      ticking = false;
    };

    var onScroll = function () {
      if (!ticking) {
        window.requestAnimationFrame(applyParallax);
        ticking = true;
      }
    };

    applyParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  /* ---- RSVP form (client-side only demo) ---- */
  var rsvpForm = document.querySelector(".rsvp-form");
  if (rsvpForm) {
    rsvpForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var success = document.querySelector(".rsvp-form__success");
      rsvpForm.classList.add("is-hidden");
      if (success) {
        success.classList.add("is-visible");
      }
    });
  }
})();
