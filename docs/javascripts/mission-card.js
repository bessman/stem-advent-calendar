(() => {
  const preferenceKey = "mission-card-language";

  function closeControl(control, restoreFocus = false) {
    control.querySelector(".mission-card__languages").hidden = true;
    const button = control.querySelector(".mission-card__toggle");
    button.setAttribute("aria-expanded", "false");
    if (restoreFocus) button.focus();
  }

  function initializeCards() {
    document.querySelectorAll(".mission-card:not([data-initialized])").forEach((card, index) => {
      const translations = Array.from(card.querySelectorAll(":scope > .mission-card__translation"));
      if (!translations.length) return;

      let preferredLanguage = "en";
      try {
        preferredLanguage = localStorage.getItem(preferenceKey) || "en";
      } catch {}

      const fallback = translations.find((translation) => translation.lang === "en") || translations[0];
      const selected = translations.find((translation) => translation.lang === preferredLanguage) || fallback;
      const control = document.createElement("div");
      control.className = "mission-card__control";

      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "mission-card__toggle";
      toggle.setAttribute("aria-expanded", "false");

      const languages = document.createElement("div");
      languages.className = "mission-card__languages";
      languages.id = `mission-card-languages-${index}`;
      languages.hidden = true;
      languages.setAttribute("role", "group");
      languages.setAttribute("aria-label", "Mission card language");
      toggle.setAttribute("aria-controls", languages.id);

      const status = document.createElement("span");
      status.className = "mission-card__status";
      status.setAttribute("role", "status");

      function selectLanguage(translation) {
        translations.forEach((candidate) => {
          candidate.hidden = candidate !== translation;
        });
        const label = translation.dataset.languageLabel;
        toggle.textContent = `Language: ${label}`;
        toggle.setAttribute("aria-label", `Mission card language: ${label}`);
        languages.querySelectorAll("button").forEach((option) => {
          option.setAttribute("aria-pressed", String(option.lang === translation.lang));
        });
      }

      translations.forEach((translation) => {
        const option = document.createElement("button");
        option.type = "button";
        option.lang = translation.lang;
        option.textContent = translation.dataset.languageLabel;
        option.addEventListener("click", () => {
          selectLanguage(translation);
          status.textContent = `Mission card language: ${translation.dataset.languageLabel}`;
          try {
            localStorage.setItem(preferenceKey, translation.lang);
          } catch {}
          closeControl(control, true);
        });
        languages.append(option);
      });

      toggle.addEventListener("click", () => {
        const open = languages.hidden;
        languages.hidden = !open;
        toggle.setAttribute("aria-expanded", String(open));
        if (open) languages.querySelector('[aria-pressed="true"]').focus();
      });
      control.addEventListener("focusout", (event) => {
        if (!control.contains(event.relatedTarget)) closeControl(control);
      });
      control.append(toggle, languages, status);
      if (translations.length > 1) card.prepend(control);
      selectLanguage(selected);
      card.dataset.initialized = "true";
    });
  }

  document.addEventListener("click", (event) => {
    document.querySelectorAll(".mission-card__control").forEach((control) => {
      if (!control.contains(event.target)) closeControl(control);
    });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const control = event.target.closest(".mission-card__control");
    if (control && !control.querySelector(".mission-card__languages").hidden) {
      event.preventDefault();
      closeControl(control, true);
    }
  });

  if (typeof document$ !== "undefined") {
    document$.subscribe(initializeCards);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeCards);
  } else {
    initializeCards();
  }
})();