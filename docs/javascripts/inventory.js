(() => {
  async function initializeInventory() {
    const root = document.querySelector(".inventory:not([data-initialized])");
    if (!root) return;
    root.dataset.initialized = "true";

    const status = root.querySelector(".inventory__status");
    const container = root.querySelector(".inventory__table");
    const table = container.querySelector("table");
    const sortControl = root.querySelector(".inventory__sort");
    const sort = sortControl.querySelector("select");

    try {
      const base = new URL(root.dataset.activities, document.baseURI);
      const activities = await Promise.all(Array.from({ length: 24 }, async (_, index) => {
        const day = index + 1;
        const url = new URL(`day-${String(day).padStart(2, "0")}/`, base);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Day ${day}: HTTP ${response.status}`);
        const page = new DOMParser().parseFromString(await response.text(), "text/html");
        const heading = page.querySelector("h2#materials-list");
        let table;
        for (let section = heading?.nextElementSibling; section && section.tagName !== "H2"; section = section.nextElementSibling) {
          table = section.matches("table") ? section : section.querySelector("table");
          if (table) break;
        }
        const rows = Array.from(table?.querySelectorAll("tbody > tr") || []);
        if (!rows.length) throw new Error(`Day ${day}: no materials table found`);

        return rows.map((row) => {
          if (row.cells.length !== 3) throw new Error(`Day ${day}: expected three materials columns`);
          row.querySelectorAll("[href], [src]").forEach((element) => {
            ["href", "src"].forEach((attribute) => {
              if (element.hasAttribute(attribute)) {
                element.setAttribute(attribute, new URL(element.getAttribute(attribute), url).href);
              }
            });
          });
          row.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
          const activity = document.createElement("td");
          const link = document.createElement("a");
          link.href = new URL("#materials-list", url).href;
          link.textContent = `Day ${day}`;
          activity.append(link);
          row.cells[0].after(activity);
          return row;
        });
      }));
      if (!root.isConnected) return;

      const rows = activities.flat();
      const groups = new Map();
      rows.forEach((row) => {
        const key = row.cells[0].textContent.trim().replace(/\s+/g, " ").toLowerCase();
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(row);
      });
      function render() {
        let sections;
        if (sort.value === "activity") {
          const section = document.createElement("tbody");
          section.append(...rows.map((row) => row.cloneNode(true)));
          sections = [section];
        } else {
          sections = Array.from(groups.entries())
            .sort(([first], [second]) => first.localeCompare(second, "en"))
            .map(([, entries]) => {
              const section = document.createElement("tbody");
              const copies = entries.map((row) => row.cloneNode(true));
              const heading = document.createElement("th");
              heading.scope = "rowgroup";
              heading.rowSpan = copies.length;
              heading.append(...copies[0].cells[0].childNodes);
              copies[0].cells[0].replaceWith(heading);
              copies.slice(1).forEach((row) => row.cells[0].remove());
              section.append(...copies);
              return section;
            });
        }
        table.querySelectorAll("tbody").forEach((section) => section.remove());
        table.append(...sections);
        table.querySelectorAll("thead th").forEach((heading, index) => {
          if (index === (sort.value === "activity" ? 1 : 0)) {
            heading.setAttribute("aria-sort", "ascending");
          } else {
            heading.removeAttribute("aria-sort");
          }
        });
      }
      sort.addEventListener("change", render);
      render();
      sort.disabled = false;
      sortControl.hidden = false;
      container.hidden = false;
      status.textContent = `${groups.size} distinct items; ${rows.length} materials entries from 24 activities. Quantities are listed per activity, not added together.`;
    } catch (error) {
      status.textContent = `Could not load all 24 materials lists. Reload this page to try again. ${error.message}`;
    }
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(initializeInventory);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeInventory);
  } else {
    initializeInventory();
  }
})();