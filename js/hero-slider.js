/* ==========================================================================
   NeauralStack Labs — hero slider
   Progressive enhancement: without JS the first slide is visible by default.
   Autoplay pauses on hover/focus and is disabled under prefers-reduced-motion.
   ========================================================================== */

(function () {
  "use strict";

  function initHeroSlider() {
    var root = document.querySelector("[data-hero-slider]");
    if (!root) return;

    var slides = Array.prototype.slice.call(root.querySelectorAll(".hero-slide"));
    var dots = Array.prototype.slice.call(root.querySelectorAll(".hero-slider__dot"));
    var prevBtn = root.querySelector("[data-slider-prev]");
    var nextBtn = root.querySelector("[data-slider-next]");
    if (slides.length < 2) {
      // Nothing to rotate: show controls only if there is more than one slide.
      var controls = root.querySelector(".hero-slider__controls");
      if (controls) controls.hidden = true;
      return;
    }

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var AUTOPLAY_MS = 7000;
    var index = 0;
    var timer = null;

    function render(nextIndex, focusDots) {
      index = (nextIndex + slides.length) % slides.length;

      slides.forEach(function (slide, i) {
        var active = i === index;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", String(!active));
        // Keep hidden slides out of the tab order.
        slide.querySelectorAll("a, button, input, select, textarea").forEach(function (el) {
          if (active) el.removeAttribute("tabindex");
          else el.setAttribute("tabindex", "-1");
        });
      });

      dots.forEach(function (dot, i) {
        var active = i === index;
        dot.setAttribute("aria-current", String(active));
        if (active && focusDots) dot.focus();
      });
    }

    function stop() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function start() {
      if (reduceMotion || timer) return;
      timer = setInterval(function () {
        render(index + 1, false);
      }, AUTOPLAY_MS);
    }

    // Controls
    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        render(index - 1, false);
        stop();
        start();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        render(index + 1, false);
        stop();
        start();
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        render(i, false);
        stop();
        start();
      });
    });

    // Pause autoplay while hovered or focused inside the slider.
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", function (e) {
      if (!root.contains(e.relatedTarget)) start();
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else start();
    });

    render(0, false);
    start();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeroSlider);
  } else {
    initHeroSlider();
  }
})();
