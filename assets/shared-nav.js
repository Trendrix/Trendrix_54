function normalizePath(pathname) {
  const p = (pathname || "").replace(/\\/g, "/");
  const file = p.split("/").pop() || "index.html";
  if (file === "" || file === "/") return "index.html";
  return file === "index.html" ? "index.html" : file;
}

export function mountSharedNav({ active, showBackHome = true } = {}) {
  const host = document.getElementById("txNavHost");
  if (!host) return;

  const activeFile = active || normalizePath(window.location.pathname);

  host.innerHTML = `
    <nav class="tx-nav" id="txNav" aria-label="Main navigation">
      <a href="index.html" class="tx-brand">
        <span class="tx-brand-icon">✦</span>
        Trendrix
      </a>
      ${showBackHome ? '<a href="index.html" class="tx-back-link">← Back Home</a>' : ""}
      <ul class="tx-links" role="list">
        <li><a href="index.html" data-file="index.html">🏠 Home</a></li>
        <li><a href="products.html" data-file="products.html">🛍️ Products</a></li>
        <li><a href="instagram.html" data-file="instagram.html" class="tx-insta">📸 Instagram</a></li>
        <li><a href="pinterest.html" data-file="pinterest.html" class="tx-pin">📌 Pinterest</a></li>
      </ul>
      <button class="tx-ham" id="txHam" aria-label="Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </nav>
    <nav class="tx-mobile" id="txMobile" aria-label="Mobile navigation">
      ${showBackHome ? '<a href="index.html" class="tx-mobile-back">← Back Home</a>' : ""}
      <a href="index.html" data-file="index.html">🏠 Home</a>
      <a href="products.html" data-file="products.html">🛍️ Products</a>
      <a href="instagram.html" data-file="instagram.html">📸 Instagram</a>
      <a href="pinterest.html" data-file="pinterest.html">📌 Pinterest</a>
    </nav>
  `;

  const nav = document.getElementById("txNav");
  const ham = document.getElementById("txHam");
  const mob = document.getElementById("txMobile");
  const mobileMq = window.matchMedia("(max-width: 768px)");

  function setActive() {
    host.querySelectorAll('[data-file]').forEach(a => {
      a.classList.toggle("tx-active", a.getAttribute("data-file") === activeFile);
    });
  }
  setActive();

  window.addEventListener("scroll", () => {
    nav.classList.toggle("tx-scrolled", window.scrollY > 60);
  }, { passive: true });

  function closeMobile() {
    ham.classList.remove("tx-open");
    mob.classList.remove("tx-open");
    ham.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  ham.addEventListener("click", () => {
    const open = !ham.classList.contains("tx-open");
    ham.classList.toggle("tx-open", open);
    mob.classList.toggle("tx-open", open);
    ham.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });

  mob.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMobile));
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobile();
  });

  document.addEventListener("click", (e) => {
    if (!mobileMq.matches) return;
    if (!ham.classList.contains("tx-open")) return;
    if (nav.contains(e.target) || mob.contains(e.target)) return;
    closeMobile();
  });

  mobileMq.addEventListener("change", (e) => {
    if (!e.matches) closeMobile();
  });

  const footerHost = document.getElementById("txFooterHost");
  if (footerHost) {
    footerHost.innerHTML = `
      <footer class="tx-footer" role="contentinfo">
        <div class="tx-footer-inner">
          <a href="index.html" class="tx-footer-brand">
            <span class="tx-brand-icon tx-footer-icon">✦</span>
            Trendrix
          </a>
          <p class="tx-footer-tagline">Your Personal Digital Closet</p>
          <nav class="tx-footer-links" aria-label="Footer navigation">
            <a href="index.html">Home</a>
            <a href="products.html">Products</a>
            <a href="instagram.html">Instagram</a>
            <a href="pinterest.html">Pinterest</a>
          </nav>
          <p class="tx-footer-copy">© 2025 Trendrix. All rights reserved.</p>
        </div>
      </footer>
    `;
  }
}

