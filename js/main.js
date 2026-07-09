// Mobile nav toggle + team email copy-to-clipboard.
(function () {
  // --- Mobile nav ---
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  // --- Copy email ---
  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      try {
        var ta = document.createElement("textarea");
        ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        document.execCommand("copy"); document.body.removeChild(ta); resolve();
      } catch (e) { reject(e); }
    });
  }

  document.querySelectorAll(".tc-email, .copy-chip").forEach(function (btn) {
    var email = btn.getAttribute("data-email") || btn.textContent.trim();
    var label = btn.querySelector(".tc-copy, .cc-copy");
    var original = label ? label.textContent : "Copy";
    btn.addEventListener("click", function () {
      copy(email).then(function () {
        btn.classList.add("copied");
        if (label) label.textContent = "Copied!";
        setTimeout(function () {
          btn.classList.remove("copied");
          if (label) label.textContent = original;
        }, 1600);
      }).catch(function () {
        if (label) label.textContent = "Press ⌘C";
      });
    });
  });

  // --- In-page TOC scroll-spy ---
  var toc = document.querySelector(".doc-toc");
  if (toc && "IntersectionObserver" in window) {
    var links = {};
    toc.querySelectorAll("a[href^='#']").forEach(function (a) {
      links[a.getAttribute("href").slice(1)] = a;
    });
    var targets = Object.keys(links)
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);
    var visible = new Set();
    function highlight() {
      var current = null;
      // topmost visible section wins
      targets.forEach(function (el) {
        if (visible.has(el.id) && (!current || el.offsetTop < current.offsetTop)) current = el;
      });
      Object.keys(links).forEach(function (id) {
        links[id].classList.toggle("active", current && id === current.id);
      });
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) visible.add(e.target.id);
        else visible.delete(e.target.id);
      });
      highlight();
    }, { rootMargin: "-80px 0px -70% 0px", threshold: 0 });
    targets.forEach(function (el) { obs.observe(el); });
  }
})();
