// Lightweight i18n: swaps text by data-i18n key from i18n/<lang>.json.
// No framework, no build step. Language persists in localStorage.
(function () {
  const SUPPORTED = ["en", "zh"];
  const DEFAULT = "en";
  const cache = {};

  function pick(dict, key) {
    return key.split(".").reduce((o, k) => (o == null ? undefined : o[k]), dict);
  }

  async function load(lang) {
    if (cache[lang]) return cache[lang];
    const res = await fetch(`i18n/${lang}.json`, { cache: "no-cache" });
    if (!res.ok) throw new Error(`Failed to load i18n/${lang}.json`);
    cache[lang] = await res.json();
    return cache[lang];
  }

  function apply(dict) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = pick(dict, key);
      if (val == null) return; // leave fallback markup if key missing
      const attr = el.getAttribute("data-i18n-attr");
      if (attr) el.setAttribute(attr, val);
      else el.textContent = val;
    });
  }

  async function setLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT;
    try {
      const dict = await load(lang);
      apply(dict);
      document.documentElement.lang = lang === "zh" ? "zh-Hans" : "en";
      localStorage.setItem("cko-lang", lang);
      document.querySelectorAll(".lang-btn").forEach((b) =>
        b.classList.toggle("is-active", b.dataset.lang === lang)
      );
    } catch (e) {
      console.error(e); // keep fallback English markup on failure
    }
  }

  function init() {
    document.querySelectorAll(".lang-btn").forEach((btn) =>
      btn.addEventListener("click", () => setLang(btn.dataset.lang))
    );
    const stored = localStorage.getItem("cko-lang");
    const browser = (navigator.language || "").toLowerCase().startsWith("zh") ? "zh" : "en";
    setLang(stored || browser);
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
