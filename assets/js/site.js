/* Flow Fund — site.js
   Mobile nav, form validation, localStorage capture.
   Formspree / mailto hooks documented in README and comments below. */

(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 920px)").matches) {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.textContent = "Menu";
        }
      });
    });
  }

  /* ---------- Helpers ---------- */
  function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());
  }

  function serializeForm(form) {
    var data = {};
    var fd = new FormData(form);
    fd.forEach(function (value, key) {
      if (data[key] !== undefined) {
        if (!Array.isArray(data[key])) data[key] = [data[key]];
        data[key].push(value);
      } else {
        data[key] = value;
      }
    });
    data._submittedAt = new Date().toISOString();
    data._page = location.pathname;
    data._form = form.getAttribute("data-form") || form.id || "form";
    return data;
  }

  function persist(key, payload) {
    try {
      var list = JSON.parse(localStorage.getItem(key) || "[]");
      if (!Array.isArray(list)) list = [];
      list.push(payload);
      localStorage.setItem(key, JSON.stringify(list));
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Remote submit hook — wire before public launch.
   * Options:
   *   1) Formspree: set form action="https://formspree.io/f/YOUR_ID" method="POST"
   *      and remove preventDefault remote call, OR POST via fetch below.
   *   2) mailto fallback builds a draft to lfuller@quantumridgecapital.com
   *   3) Cloudflare Pages Function endpoint
   *
   * Returns a Promise resolving to { ok: boolean, mode: string }
   */
  function submitRemote(payload) {
    /* --- Formspree example (uncomment + set ID) ---
    return fetch("https://formspree.io/f/YOUR_FORM_ID", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload)
    }).then(function (r) { return { ok: r.ok, mode: "formspree" }; });
    */

    /* mailto draft — opens user's email client */
    var subject = encodeURIComponent(
      "[Flow Fund] " + (payload._form || "Inquiry") + " — " + (payload.name || payload.email || "Visitor")
    );
    var bodyLines = Object.keys(payload)
      .filter(function (k) { return k.charAt(0) !== "_"; })
      .map(function (k) { return k + ": " + payload[k]; });
    bodyLines.push("", "—", "Page: " + payload._page, "At: " + payload._submittedAt);
    var body = encodeURIComponent(bodyLines.join("\n"));
    var mailto = "mailto:lfuller@quantumridgecapital.com?subject=" + subject + "&body=" + body;

    /* Prefer localStorage as source of truth for V1; optionally open mailto */
    var openMailto = formWantsMailto(payload._form);
    if (openMailto) {
      window.location.href = mailto;
      return Promise.resolve({ ok: true, mode: "mailto" });
    }
    return Promise.resolve({ ok: true, mode: "localStorage" });
  }

  function formWantsMailto(formName) {
    /* Conversation + walkthrough forms open a mailto draft after local save */
    return formName === "conversation" || formName === "walkthrough" || formName === "email-capture";
  }

  function showSuccess(form) {
    var success = form.parentElement.querySelector("[data-form-success]");
    if (success) {
      form.hidden = true;
      success.hidden = false;
      success.focus && success.focus();
    }
  }

  function setError(el, msg) {
    if (!el) return;
    el.textContent = msg || "";
    el.hidden = !msg;
  }

  /* ---------- Generic form binder ---------- */
  function bindForm(form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var err = form.querySelector("[data-form-error]");
      setError(err, "");

      var required = form.querySelectorAll("[required]");
      for (var i = 0; i < required.length; i++) {
        var el = required[i];
        if (el.type === "checkbox") continue;
        if (!String(el.value || "").trim()) {
          var lab = el.id ? form.querySelector('label[for="' + el.id + '"]') : null;
          var pretty = lab ? lab.textContent.replace(/\s+/g, " ").replace(/\(optional\)/i, "").trim() : "required fields";
          setError(err, "Please complete " + pretty + ".");
          el.focus();
          return;
        }
      }

      var emailInput = form.querySelector('[name="email"]');
      if (emailInput && !isEmail(emailInput.value)) {
        setError(err, "Please enter a valid email address.");
        emailInput.focus();
        return;
      }

      var consent = form.querySelector('[name="consent"]');
      if (consent && !consent.checked) {
        setError(err, "Please confirm you understand this is educational information only.");
        consent.focus();
        return;
      }

      var payload = serializeForm(form);
      var storageKey = "flowfund_" + (payload._form || "submissions");
      persist(storageKey, payload);

      var btn = form.querySelector('[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.dataset.label = btn.textContent;
        btn.textContent = "Sending…";
      }

      submitRemote(payload).then(function () {
        showSuccess(form);
      }).catch(function () {
        setError(err, "Saved locally. If email did not open, write lfuller@quantumridgecapital.com directly.");
        showSuccess(form);
      }).finally(function () {
        if (btn) {
          btn.disabled = false;
          btn.textContent = btn.dataset.label || "Submit";
        }
      });
    });
  }

  document.querySelectorAll("form[data-form]").forEach(bindForm);
})();
