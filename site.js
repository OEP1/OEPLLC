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

// ---------------------------------------------------------------
//  Contact form
//
//  SETUP: paste your Formspree endpoint into ENDPOINT below.
//  Until it is set, the form opens the visitor's email client so
//  nothing is silently lost.
// ---------------------------------------------------------------

(function () {
  var ENDPOINT = "https://formspree.io/f/abcdwxyz";
  var RECIPIENT = "sales@opulentechopartners.com";

  var btn = document.getElementById("send");
  if (!btn) return;

  var note = document.getElementById("formNote");
  var form = document.getElementById("inquiryForm");

  var get = function (id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : "";
  };

  var setNote = function (msg, kind) {
    note.textContent = msg;
    note.style.color = kind === "error" ? "#B4232A" : "";
  };

  // Reveal the free-text box when "Other" is chosen
  var sel = document.getElementById("area");
  var wrap = document.getElementById("otherWrap");
  if (sel && wrap) {
    var sync = function () {
      var isOther = sel.value === "Other";
      wrap.hidden = !isOther;
      if (isOther) document.getElementById("areaOther").focus();
    };
    sel.addEventListener("change", sync);
    sync();
  }

  var collect = function () {
    var area = get("area");
    if (area === "Other") {
      var other = get("areaOther");
      area = other ? "Other — " + other : "Other (unspecified)";
    }
    return {
      name: get("name"),
      organization: get("org"),
      email: get("email"),
      area: area,
      message: get("message"),
      _gotcha: get("company_website"),
      _subject: "Consultation request — " + get("org")
    };
  };

  var mailtoFallback = function (d) {
    var body =
      "Name: " + d.name + "\n" +
      "Organization: " + d.organization + "\n" +
      "Email: " + d.email + "\n" +
      "Area of interest: " + d.area + "\n\n" +
      d.message + "\n";
    window.location.href =
      "mailto:" + RECIPIENT +
      "?subject=" + encodeURIComponent(d._subject) +
      "&body=" + encodeURIComponent(body);
  };

  btn.addEventListener("click", function () {
    var d = collect();

    if (!d.name || !d.organization || !d.email || !d.message) {
      setNote("Please complete the required fields before sending.", "error");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) {
      setNote("That email address does not look right. Please check it.", "error");
      return;
    }
    if (d._gotcha) return;

    if (!ENDPOINT) {
      setNote("Opening your email application…", "");
      mailtoFallback(d);
      return;
    }

    btn.disabled = true;
    var original = btn.textContent;
    btn.textContent = "Sending…";
    setNote("Sending your inquiry…", "");

    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(d)
    })
      .then(function (res) {
        if (!res.ok) throw new Error("failed");
        return res.json().catch(function () { return {}; });
      })
      .then(function () {
        form.innerHTML =
          '<h2>Thank you — your inquiry has been sent.</h2>' +
          '<p style="color:var(--slate)">We read every message ourselves and will follow up by email. ' +
          'To add anything, write to <a href="mailto:' + RECIPIENT + '">' + RECIPIENT + '</a> directly.</p>';
        form.scrollIntoView({ block: "center" });
      })
      .catch(function () {
        btn.disabled = false;
        btn.textContent = original;
        setNote("Sending failed. Please email " + RECIPIENT + " directly, or try again.", "error");
      });
  });
})();
