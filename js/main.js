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

  var zh = (document.documentElement.lang || "").toLowerCase().indexOf("zh") === 0;
  var COPIED = zh ? "已复制！" : "Copied!";
  var PRESS = zh ? "请按 ⌘C" : "Press ⌘C";
  document.querySelectorAll(".tc-email, .copy-chip").forEach(function (btn) {
    var email = btn.getAttribute("data-email") || btn.textContent.trim();
    var label = btn.querySelector(".tc-copy, .cc-copy");
    var original = label ? label.textContent : (zh ? "复制" : "Copy");
    btn.addEventListener("click", function () {
      copy(email).then(function () {
        btn.classList.add("copied");
        if (label) label.textContent = COPIED;
        setTimeout(function () {
          btn.classList.remove("copied");
          if (label) label.textContent = original;
        }, 1600);
      }).catch(function () {
        if (label) label.textContent = PRESS;
      });
    });
  });

  // --- Image lightbox (full-screen popup, stays on page) ---
  var lbLinks = document.querySelectorAll("a.lightbox-link");
  if (lbLinks.length) {
    var overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    var lbImg = document.createElement("img");
    lbImg.alt = "";
    overlay.appendChild(lbImg);
    document.body.appendChild(overlay);

    function closeLb() {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
      lbImg.removeAttribute("src");
    }
    lbLinks.forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var img = a.querySelector("img");
        lbImg.src = a.getAttribute("href") || (img ? img.getAttribute("src") : "");
        lbImg.alt = img ? img.getAttribute("alt") || "" : "";
        overlay.classList.add("open");
        document.body.style.overflow = "hidden";
      });
    });
    // Click anywhere on the overlay (including the image) closes it.
    overlay.addEventListener("click", closeLb);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("open")) closeLb();
    });
  }

  // --- In-page TOC scroll-spy ---
  var toc = document.querySelector(".doc-toc");
  if (toc) {
    var links = {};
    toc.querySelectorAll("a[href^='#']").forEach(function (a) {
      links[a.getAttribute("href").slice(1)] = a;
    });
    var targets = Object.keys(links)
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);
    // Sort by document order so "last section past the line" is reliable
    // even though #integration contains its subsections.
    targets.sort(function (a, b) {
      return (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1;
    });

    function highlight() {
      var line = 100; // detection line just below the sticky header
      var current = null;
      targets.forEach(function (el) {
        if (el.getBoundingClientRect().top - line <= 0) current = el; // deepest passed wins
      });
      if (!current && targets.length) current = targets[0]; // top of page
      // Bottom of page: the last section can't reach the line — activate it.
      var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && targets.length) current = targets[targets.length - 1];
      Object.keys(links).forEach(function (id) {
        links[id].classList.toggle("active", !!current && id === current.id);
      });
    }
    highlight();
    window.addEventListener("scroll", highlight, { passive: true });
    window.addEventListener("resize", highlight);
  }
})();
