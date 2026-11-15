(function () {
  "use strict";

  var SITE = window.SITE;
  var pageKey = document.body.getAttribute("data-page") || "home";
  var page = SITE.pages[pageKey];
  var c = SITE.contact;

  /* ---------- contact links ---------- */

  var bookingText = "Hi! I'd like to book a photo session.";
  var phoneIntl = "+1" + c.phone;
  var links = {
    email:
      "mailto:" + c.email +
      "?subject=" + encodeURIComponent("Photo session booking") +
      "&body=" + encodeURIComponent(bookingText + "\n\nType of shoot:\nDate / location:\n"),
    // ig.me opens a direct message thread in the Instagram app.
    instagram: "https://ig.me/m/" + c.instagram,
    // "?&body=" is the form that both iOS and Android accept.
    text: "sms:" + phoneIntl + "?&body=" + encodeURIComponent(bookingText),
    call: "tel:" + phoneIntl,
  };
  var phoneSpaced = c.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");

  /* ---------- small DOM helpers ---------- */

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "class") node.className = attrs[k];
      else if (k === "text") node.textContent = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (child) {
      if (child) node.appendChild(child);
    });
    return node;
  }

  function spacer() {
    return el("div", { class: "spacer", "aria-hidden": "true" });
  }

  function hamburger(label, extraClass) {
    return el(
      "button",
      { class: "hamburger " + (extraClass || ""), type: "button", "aria-label": label },
      [el("span"), el("span"), el("span")]
    );
  }

  // Tall column of stacked letters between two hairlines (design: "Collection").
  function column(title, label, href, ariaLabel, external) {
    var attrs = { class: "column", href: href, "aria-label": ariaLabel };
    if (external) {
      attrs.target = "_blank";
      attrs.rel = "noopener";
    }
    return el("a", attrs, [
      el("span", { class: "column__title", text: title, "aria-hidden": "true" }),
      el("span", { class: "column__label", text: label, "aria-hidden": "true" }),
    ]);
  }

  function message(lines) {
    return el(
      "p",
      { class: "message" },
      lines.map(function (line) {
        return el("span", { text: line });
      })
    );
  }

  /* ---------- page pieces ---------- */

  function header() {
    var open = hamburger("Open contact menu");
    open.setAttribute("aria-expanded", "false");
    open.setAttribute("aria-controls", "menu");
    open.addEventListener("click", openMenu);
    return el("header", { class: "header" }, [
      el("a", { class: "logo", href: "index.html", text: "A.N.", "aria-label": "A.N. home" }),
      open,
    ]);
  }

  function gallery(g) {
    var grid = el("div", { class: "grid" });
    for (var i = 1; i <= g.count; i++) {
      var file = (i < 10 ? "0" + i : i) + ".jpg";
      // Grid shows the square crop from the design; tapping opens the full frame.
      var thumb = "photos/" + g.folder + "/thumbs/" + file;
      var src = "photos/" + g.folder + "/" + file;
      var alt = g.title + ", photo " + i;
      var btn = el("button", { class: "tile", type: "button", "aria-label": "View " + alt }, [
        el("img", { src: thumb, alt: alt, width: 600, height: 600, loading: "lazy", decoding: "async" }),
      ]);
      btn.addEventListener("click", openLightbox.bind(null, src, alt));
      grid.appendChild(btn);
    }
    return el("section", { class: "gallery" }, [
      el("div", { class: "gallery__title" }, [
        el("h2", { text: g.title }),
        el("span", { text: g.label }),
      ]),
      grid,
    ]);
  }

  function booking() {
    function link(text, href, external) {
      var attrs = { href: href, text: text };
      if (external) {
        attrs.target = "_blank";
        attrs.rel = "noopener";
      }
      return el("a", attrs);
    }
    return el("section", { class: "booking", "aria-label": "Book a session" }, [
      el("h2", { text: "BOOK A SESSION." }),
      el("div", { class: "booking__links" }, [
        link("EMAIL", links.email),
        link("DM", links.instagram, true),
        link("TEXT", links.text),
        link("CALL", links.call),
      ]),
    ]);
  }

  function menu() {
    var close = hamburger("Close contact menu", "hamburger--dark");
    close.addEventListener("click", closeMenu);
    return el(
      "aside",
      { class: "menu", id: "menu", "aria-label": "Contact", "aria-hidden": "true", inert: "" },
      [
        spacer(),
        el("div", { class: "menu__bar" }, [close]),
        spacer(),
        message(["BOOK A", "SESSION."]),
        spacer(),
        el("div", { class: "columns" }, [
          column("@" + c.instagram.toUpperCase(), "SOCIAL", links.instagram,
            "Message @" + c.instagram + " on Instagram", true),
          column(phoneSpaced, "PHONE", links.text, "Text " + phoneSpaced),
          column(c.email.split("@")[0].toUpperCase(), "GMAIL", links.email, "Email " + c.email),
        ]),
        spacer(),
        el("div", { class: "footer footer--dark", "aria-hidden": "true" }),
      ]
    );
  }

  /* ---------- menu + lightbox behaviour ---------- */

  var menuEl, backdropEl, openBtn, lightboxEl, lastFocus;

  function openMenu() {
    menuEl.removeAttribute("inert");
    menuEl.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
    openBtn.setAttribute("aria-expanded", "true");
    menuEl.querySelector(".hamburger").focus();
  }

  function closeMenu() {
    menuEl.setAttribute("inert", "");
    menuEl.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
    openBtn.setAttribute("aria-expanded", "false");
    openBtn.focus();
  }

  function openLightbox(src, alt) {
    lastFocus = document.activeElement;
    var img = lightboxEl.querySelector("img");
    img.removeAttribute("src"); // clear the previous photo while the next loads
    img.src = src;
    img.alt = alt;
    lightboxEl.hidden = false;
    document.body.classList.add("lightbox-open");
    lightboxEl.querySelector("button").focus();
  }

  function closeLightbox() {
    lightboxEl.hidden = true;
    document.body.classList.remove("lightbox-open");
    if (lastFocus) lastFocus.focus();
  }

  /* ---------- assemble ---------- */

  var root = document.getElementById("page");
  root.textContent = "";
  var main = el("main");

  root.appendChild(spacer());
  root.appendChild(header());
  root.appendChild(spacer());
  main.appendChild(message(page.message));
  main.appendChild(spacer());

  if (page.collections) {
    main.appendChild(
      el(
        "nav",
        { class: "columns", "aria-label": "Collections" },
        page.collections.map(function (col) {
          return column(col.title, col.label, col.href, col.title + " " + col.label);
        })
      )
    );
    main.appendChild(spacer());
  } else if (page.galleries.length) {
    page.galleries.forEach(function (g) {
      main.appendChild(gallery(g));
      main.appendChild(spacer());
    });
  } else {
    main.appendChild(el("p", { class: "soon", text: "COMING SOON." }));
    main.appendChild(spacer());
  }

  main.appendChild(booking());
  root.appendChild(main);
  root.appendChild(spacer());
  root.appendChild(el("div", { class: "footer", "aria-hidden": "true" }));

  backdropEl = el("div", { class: "backdrop" });
  backdropEl.addEventListener("click", closeMenu);
  menuEl = menu();
  root.appendChild(backdropEl);
  root.appendChild(menuEl);
  openBtn = root.querySelector(".header .hamburger");

  var closeBtn = el("button", { class: "lightbox__close", type: "button", "aria-label": "Close photo", text: "CLOSE" });
  lightboxEl = el("div", { class: "lightbox", role: "dialog", "aria-modal": "true", "aria-label": "Photo" }, [
    closeBtn,
    el("img", { alt: "" }),
  ]);
  lightboxEl.hidden = true;
  lightboxEl.addEventListener("click", closeLightbox);
  document.body.appendChild(lightboxEl);

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (!lightboxEl.hidden) closeLightbox();
    else if (document.body.classList.contains("menu-open")) closeMenu();
  });
})();
