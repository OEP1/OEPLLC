/* ---------------------------------------------------------------
   Mobile navigation, scroll reveal, and the contact form handler.
   --------------------------------------------------------------- */

// Mobile menu
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.textContent = open ? "Close" : "Menu";
  });
})();

// Scroll reveal
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-in"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -10% 0px" });

  items.forEach(function (el) { io.observe(el); });
})();

// Contact form -> opens the visitor's email client with everything filled in.
// To use a hosted form service instead, see the README.
(function () {
  var btn = document.getElementById("send");
  if (!btn) return;

  var RECIPIENT = "sales@opulentechopartners.com"; // <-- change to your real address

  btn.addEventListener("click", function () {
    var get = function (id) {
      var el = document.getElementById(id);
      return el ? el.value.trim() : "";
    };

    var name = get("name");
    var org = get("org");
    var email = get("email");
    var area = get("area");
    if (area === "Other") {
      var other = get("areaOther");
      area = other ? "Other — " + other : "Other (unspecified)";
    }
    var message = get("message");
    var note = document.getElementById("formNote");

    if (!name || !org || !email || !message) {
      note.textContent = "Please complete the required fields before continuing.";
      note.style.color = "#B4232A";
      return;
    }

    var body =
      "Name: " + name + "\n" +
      "Organization: " + org + "\n" +
      "Email: " + email + "\n" +
      "Area of interest: " + area + "\n\n" +
      message + "\n";

    note.textContent = "Opening your email application. If nothing happens, email " + RECIPIENT + " directly.";
    note.style.color = "";

    window.location.href =
      "mailto:" + RECIPIENT +
      "?subject=" + encodeURIComponent("Consultation request — " + org) +
      "&body=" + encodeURIComponent(body);
  });
})();

// Show the free-text field when "Other" is selected in Area of interest.
(function () {
  var sel = document.getElementById("area");
  var wrap = document.getElementById("otherWrap");
  if (!sel || !wrap) return;

  var sync = function () {
    var isOther = sel.value === "Other";
    wrap.hidden = !isOther;
    if (isOther) document.getElementById("areaOther").focus();
  };

  sel.addEventListener("change", sync);
  sync();
})();
