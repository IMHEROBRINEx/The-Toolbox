// Load Home Page HTML
fetch("/../src/pages/home/home.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("app").innerHTML = html;
  });

// Load Home Page CSS
const style = document.createElement("link");
style.rel = "stylesheet";
style.href = "/../src/pages/home/home.css";
document.head.appendChild(style);

// Load Home Page JS
const script = document.createElement("script");
script.src = "/../src/pages/home/home.js";
script.defer = true;
document.body.appendChild(script);


// Get reference to the root container where pages will be rendered
const app = document.getElementById("app");

/* =========================
   CSS LOADER
   ========================= */

/**
 * Dynamically loads a CSS file for the active page.
 * Removes any previously loaded page-specific CSS
 * to avoid style conflicts between pages.
 */
function loadCSS(href) {
  // Remove existing page CSS if present
  const existing = document.querySelector("link[data-page]");
  if (existing) existing.remove();

  // Create a new <link> tag
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;

  // Mark this CSS as page-specific
  link.setAttribute("data-page", "true");

  // Attach CSS to the document head
  document.head.appendChild(link);
}

/* =========================
   JS LOADER
   ========================= */

/**
 * Dynamically loads a JavaScript file for the active page.
 * Removes previously loaded page JS to prevent duplicate logic.
 */
function loadJS(src) {
  // Remove existing page script if present
  const existing = document.querySelector("script[data-page]");
  if (existing) existing.remove();

  // Create a new <script> tag
  const script = document.createElement("script");
  script.src = src;
  script.defer = true;

  // Mark this JS as page-specific
  script.setAttribute("data-page", "true");

  // Attach JS to the document body
  document.body.appendChild(script);
}

/* =========================
   HOME PAGE LOADER
   ========================= */

/**
 * Loads the Home page UI, styles, and logic.
 * This is the default page of the application.
 */
function loadHome() {
  // Fetch Home HTML layout
  fetch("../src/pages/home/home.html")
    .then(res => res.text())
    .then(html => {
      // Inject Home HTML into root container
      app.innerHTML = html;

      // Load Home-specific CSS
      loadCSS("../src/pages/home/home.css");

      // Load Home-specific JS
      loadJS("../src/pages/home/home.js");

      // Attach click handler to SOS utility item
      document
        .querySelector(".utility-item")
        .addEventListener("click", loadSOS);
    });
}

/* =========================
   SOS FLASHLIGHT PAGE LOADER
   ========================= */

/**
 * Loads the SOS Flashlight UI, styles, and logic.
 * Triggered when user selects SOS Flashlight from Home.
 */
function loadSOS() {
  // Fetch SOS HTML layout
  fetch("../src/pages/sos-flashlight/sos.html")
    .then(res => res.text())
    .then(html => {
      // Inject SOS HTML into root container
      app.innerHTML = html;

      // Load SOS-specific CSS
      loadCSS("../src/pages/sos-flashlight/sos.css");

      // Load SOS-specific JS
      loadJS("../src/pages/sos-flashlight/sos.js");

      // Attach click handler to Back button
      document
        .querySelector(".back-btn")
        .addEventListener("click", loadHome);
    });
}

/* =========================
   APP ENTRY POINT
   ========================= */

/**
 * Initial page load when the app starts.
 * Home page is always loaded first.
 */
loadHome();
