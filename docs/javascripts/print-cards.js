(() => {
  const preferenceKey = "mission-card-language";

  async function initializePrintCards() {
    const root = document.querySelector(".mission-print:not([data-initialized])");
    if (!root) return;
    root.dataset.initialized = "true";

    const language = root.querySelector("select");
    const print = root.querySelector("button");
    const status = root.querySelector(".mission-print__status");
    const cards = root.querySelector(".mission-print__cards");

    try {
      const base = new URL(root.dataset.activities, document.baseURI);
      const missions = await Promise.all(Array.from({ length: 24 }, async (_, index) => {
        const url = new URL(`day-${String(index + 1).padStart(2, "0")}/`, base);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Day ${index + 1}: HTTP ${response.status}`);
        const page = new DOMParser().parseFromString(await response.text(), "text/html");
        const translations = Array.from(page.querySelectorAll(".mission-card > .mission-card__translation"));
        if (!translations.length) throw new Error(`Day ${index + 1}: no mission card found`);
        translations.forEach((translation) => {
          translation.querySelectorAll("[href], [src]").forEach((element) => {
            ["href", "src"].forEach((attribute) => {
              if (element.hasAttribute(attribute)) {
                element.setAttribute(attribute, new URL(element.getAttribute(attribute), url).href);
              }
            });
          });
        });
        return translations;
      }));
      if (!root.isConnected) return;

      const available = missions[0].filter((translation) =>
        missions.every((translations) => translations.some((candidate) => candidate.lang === translation.lang))
      );
      if (!available.length) throw new Error("No language is available for all 24 cards");
      language.replaceChildren(...available.map((translation) => {
        const option = document.createElement("option");
        option.value = translation.lang;
        option.lang = translation.lang;
        option.textContent = translation.dataset.languageLabel;
        return option;
      }));
      let preferred = "en";
      try {
        preferred = localStorage.getItem(preferenceKey) || "en";
      } catch {}
      language.value = available.some((translation) => translation.lang === preferred) ? preferred : available[0].lang;

      function render() {
        cards.replaceChildren(...missions.map((translations) => {
          const card = document.createElement("article");
          card.className = "mission-print__card";
          card.lang = language.value;
          const content = translations.find((translation) => translation.lang === language.value).cloneNode(true);
          content.hidden = false;
          content.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
          card.append(content);
          return card;
        }));
        let overflow = false;
        cards.querySelectorAll(".mission-print__card").forEach((card) => {
          let size = 9;
          card.style.fontSize = `${size}pt`;
          while (card.scrollHeight > card.clientHeight + 1 && size > 7.5) {
            size -= 0.25;
            card.style.fontSize = `${size}pt`;
          }
          if (card.scrollHeight > card.clientHeight + 1) overflow = true;
        });
        print.disabled = overflow;
        status.textContent = overflow
          ? "Some cards do not fit. Please choose another language."
          : "24 cards ready. A4 or Letter, portrait, 100% scale, headers and footers off. Cut along the dashed borders; fold each card in half twice to fit a 7 cm box. Choose Save as PDF in the print dialog for a PDF copy.";
      }

      language.addEventListener("change", () => {
        try {
          localStorage.setItem(preferenceKey, language.value);
        } catch {}
        render();
      });
      print.addEventListener("click", () => window.print());
      language.disabled = false;
      await document.fonts.ready;
      if (root.isConnected) render();
    } catch (error) {
      status.textContent = `Could not load all 24 mission cards. Reload this page to try again. ${error.message}`;
    }
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(initializePrintCards);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePrintCards);
  } else {
    initializePrintCards();
  }
})();