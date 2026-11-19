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
      } catch { }
      language.value = available.some((translation) => translation.lang === preferred) ? preferred : available[0].lang;

      const perRow = 2;
      const perSheet = 10;
      const overflows = (face) => face.scrollHeight > face.clientHeight + 1;

      function makeFace(side) {
        const face = document.createElement("article");
        face.className = `mission-print__card mission-print__card--${side}`;
        face.lang = language.value;
        return face;
      }

      // Fills a front/back pair at one font size; returns true if both faces fit.
      function layout(front, back, content, size) {
        const admonition = content.querySelector(".admonition");
        const title = admonition.querySelector(":scope > .admonition-title");
        const items = Array.from(admonition.children).filter((element) => element !== title);
        front.style.fontSize = back.style.fontSize = `${size}pt`;
        const backContent = content.cloneNode(false);
        const backAdmonition = admonition.cloneNode(false);
        backContent.append(backAdmonition);
        front.replaceChildren(content);
        back.replaceChildren(backContent);
        admonition.replaceChildren(...(title ? [title] : []));
        let split = 0;
        while (split < items.length) {
          admonition.append(items[split]);
          if (overflows(front)) {
            items[split].remove();
            break;
          }
          split += 1;
        }
        if (split === 0 && items.length) return false;
        backAdmonition.append(...items.slice(split));
        return !overflows(back);
      }

      function render() {
        const total = missions.length;
        const sheetCount = Math.ceil(total / perSheet);
        const fronts = [];
        const backs = [];
        const sheets = [];
        for (let sheet = 0; sheet < sheetCount; sheet += 1) {
          for (const side of ["front", "back"]) {
            const element = document.createElement("section");
            element.className = `mission-print__sheet mission-print__sheet--${side}`;
            sheets.push(element);
          }
        }
        cards.replaceChildren(...sheets);
        missions.forEach((translations, index) => {
          const front = makeFace("front");
          const back = makeFace("back");
          fronts.push(front);
          backs.push(back);
          const sheet = Math.floor(index / perSheet);
          const slot = index % perSheet;
          const row = Math.floor(slot / perRow);
          sheets[sheet * 2].append(front);
          // Long-edge flip mirrors columns so each back sits behind its front.
          back.style.gridColumn = String(perRow - (slot % perRow));
          back.style.gridRow = String(row + 1);
          sheets[sheet * 2 + 1].append(back);
        });

        let overflow = false;
        missions.forEach((translations, index) => {
          const source = translations.find((translation) => translation.lang === language.value);
          let size = 10;
          let fits = false;
          while (!fits && size >= 5.5) {
            const content = source.cloneNode(true);
            content.hidden = false;
            content.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
            fits = layout(fronts[index], backs[index], content, size);
            if (!fits) size -= 0.25;
          }
          if (!fits) overflow = true;
        });
        print.disabled = overflow;
        status.textContent = overflow
          ? "Some cards do not fit. Please choose another language."
          : `24 cards ready on ${sheetCount * 2} A4 pages (fronts and backs alternate). Print double-sided, flip on long edge, portrait, 100% scale, margins none, headers and footers off. Cut along the dashed borders to get credit-card-sized cards; each back sits behind its front. Choose Save as PDF in the print dialog for a PDF copy.`;
      }

      language.addEventListener("change", () => {
        try {
          localStorage.setItem(preferenceKey, language.value);
        } catch { }
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