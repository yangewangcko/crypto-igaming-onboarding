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

  document.querySelectorAll(".tc-email").forEach(function (btn) {
    var email = btn.getAttribute("data-email") || btn.textContent.trim();
    var label = btn.querySelector(".tc-copy");
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
})();
