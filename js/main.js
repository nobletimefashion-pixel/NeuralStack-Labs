/* ==========================================================================
   NeauralStack Labs — site behaviour
   Progressive enhancement only: every page remains usable without JS.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Mobile navigation
     ------------------------------------------------------------------ */
  function initNav() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var nav = document.getElementById("primary-nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    // Reset state when resizing to desktop
    var mq = window.matchMedia("(min-width: 60em)");
    (mq.addEventListener ? mq.addEventListener.bind(mq, "change") : mq.addListener.bind(mq))(function () {
      setOpen(false);
    });
  }

  /* ------------------------------------------------------------------
     Reveal-on-scroll
     ------------------------------------------------------------------ */
  function initReveal() {
    var targets = document.querySelectorAll(".reveal");
    if (!targets.length) return;

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ------------------------------------------------------------------
     Dynamic copyright year
     ------------------------------------------------------------------ */
  function initYear() {
    var els = document.querySelectorAll("[data-year]");
    var year = String(new Date().getFullYear());
    els.forEach(function (el) {
      el.textContent = year;
    });
  }

  /* ------------------------------------------------------------------
     Contact form -> prefilled email (mailto)
     No data is stored or sent by the website itself; the visitor's own
     email application composes the message. Fallback link always shown.
     ------------------------------------------------------------------ */
  var CONTACT_EMAIL = "ferroshes@gmail.com";

  function initContactForm() {
    var form = document.getElementById("inquiry-form");
    if (!form) return;

    var status = document.getElementById("form-status");
    var serviceSelect = form.querySelector("#service");

    // Preselect service when arriving via ?service=... (e.g. from service cards)
    try {
      var params = new URLSearchParams(window.location.search);
      var preset = params.get("service");
      if (preset && serviceSelect) {
        var option = Array.prototype.find.call(serviceSelect.options, function (o) {
          return o.value === preset;
        });
        if (option) serviceSelect.value = preset;
      }
    } catch (err) {
      /* URLSearchParams unavailable — ignore, form still works */
    }

    function showStatus(kind, message) {
      if (!status) return;
      status.className = "form__status is-visible form__status--" + kind;
      status.textContent = message;
      status.focus({ preventScroll: true });
    }

    function setFieldError(field, message) {
      var errorEl = document.getElementById(field.id + "-error");
      field.setAttribute("aria-invalid", message ? "true" : "false");
      if (errorEl) errorEl.textContent = message || "";
    }

    function validate() {
      var valid = true;
      var requiredFields = form.querySelectorAll("[data-required]");
      requiredFields.forEach(function (field) {
        var value = (field.value || "").trim();
        var message = "";
        if (!value) {
          message = "This field is required.";
        } else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          message = "Please enter a valid email address.";
        }
        setFieldError(field, message);
        if (message) valid = false;
      });
      return valid;
    }

    form.addEventListener("input", function (e) {
      var field = e.target;
      if (field.matches("[data-required]") && field.getAttribute("aria-invalid") === "true") {
        setFieldError(field, "");
      }
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!validate()) {
        showStatus("error", "Please fix the highlighted fields, then try again.");
        var firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var data = new FormData(form);
      var name = String(data.get("name") || "").trim();
      var email = String(data.get("email") || "").trim();
      var company = String(data.get("company") || "").trim();
      var service = String(data.get("service") || "").trim();
      var budget = String(data.get("budget") || "").trim();
      var timeline = String(data.get("timeline") || "").trim();
      var description = String(data.get("description") || "").trim();

      var serviceLabel = service;
      if (serviceSelect) {
        var selected = serviceSelect.options[serviceSelect.selectedIndex];
        if (selected) serviceLabel = selected.text;
      }

      var subject = "Project inquiry — " + (serviceLabel || "General") + (company ? " — " + company : "");
      var body = [
        "Name: " + name,
        "Email: " + email,
        "Company / project: " + (company || "—"),
        "Service: " + (serviceLabel || "—"),
        "Approximate budget: " + (budget || "—"),
        "Desired timeline: " + (timeline || "—"),
        "",
        "Project description:",
        description,
      ].join("\n");

      var mailto =
        "mailto:" +
        CONTACT_EMAIL +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);

      // Hand off to the visitor's email application.
      window.location.href = mailto;

      showStatus(
        "info",
        "Your email application should now open with a prefilled message to " +
          CONTACT_EMAIL +
          ". Send it from there to reach us. If nothing opened, copy the details above and email us directly."
      );
    });
  }

  /* ------------------------------------------------------------------
     Init
     ------------------------------------------------------------------ */
  function init() {
    initNav();
    initReveal();
    initYear();
    initContactForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
