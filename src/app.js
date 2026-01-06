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
