(() => {
  "use strict";

  const fileName = location.pathname.split("/").pop() || "bundesliga.html";
  const slug = fileName.replace(/\.html?$/i, "") || "bundesliga";
  const jsonUrl = `./${slug}.json`;
  const gameDataUrl = "./spieldaten.json";

  const FILTERS = {
    "bundesliga": { type: "wettbewerb", value: "bundesliga", title: "Spiele der Bundesliga" },
    "dfb-pokal": { type: "wettbewerb", value: "dfb-pokal", title: "Spiele des DFB-Pokals" },
    "champions-league": { type: "wettbewerb", value: "champions-league", title: "Spiele der Champions League" },
    "europa-league": { type: "wettbewerb", value: "europa-league", title: "Spiele der Europa League" },
    "relegation": { type: "wettbewerb", value: "relegation", title: "Spiele der Relegation" },
    "dynamo-dresden": { type: "sonderwertung", value: "smugglerauftrag", title: "Ausgewählte Smuggleraufträge" },
    "piratenkodex": { type: "sonderwertung", value: "piratenkodex", title: "Ausgewählte Spiele des Piratenkodex" },
    "weihnachtsregatta": { type: "sonderwertung", value: "weihnachtsregatta", title: "Spiele der Weihnachtsregatta" }
  };

  const $ = (id) => document.getElementById(id);
  const text = (id, value) => {
    const el = $(id);
    if (!el) return;
    el.textContent = value || "";
    el.classList.toggle("is-hidden", !value);
  };

  const safeArray = (value) => Array.isArray(value) ? value : [];

  function formatDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return value || "";
    const [year, month, day] = value.split("-");
    return `${day}.${month}.${year}`;
  }

  function formatResult(match) {
    const hasHomeScore = Number.isFinite(match.heimtore);
    const hasAwayScore = Number.isFinite(match.auswaertstore);
    if (hasHomeScore && hasAwayScore) return `${match.heimtore}:${match.auswaertstore}`;
    return match.status || "";
  }

  function centralGamesForPage(data) {
    const filter = FILTERS[slug];
    if (!filter) return [];

    return safeArray(data && data.spiele)
      .filter(match => {
        if (!match || typeof match !== "object") return false;
        if (filter.type === "wettbewerb") return match.wettbewerb === filter.value;
        return safeArray(match.sonderwertungen).includes(filter.value);
      })
      .sort((a, b) => {
        const first = `${a.datum || "9999-12-31"}T${a.anstoss || "23:59"}`;
        const second = `${b.datum || "9999-12-31"}T${b.anstoss || "23:59"}`;
        return first.localeCompare(second);
      });
  }

  function centralGamesSection(data) {
    const games = centralGamesForPage(data);
    if (!games.length) return null;

    return {
      typ: "spiele",
      titel: FILTERS[slug].title,
      anzeigen: true,
      spiele: games.map(match => ({
        datum: formatDate(match.datum),
        anstoss: match.anstoss || "Uhrzeit offen",
        heim: match.heim || "Heimteam offen",
        trenner: "–",
        auswaerts: match.auswaerts || "Auswärtsteam offen",
        ergebnis: formatResult(match),
        status: match.status || ""
      }))
    };
  }

  function renderCards(cards) {
    const root = $("info-cards");
    root.innerHTML = "";
    safeArray(cards).forEach(card => {
      const article = document.createElement("article");
      article.className = "info-card";
      const h2 = document.createElement("h2");
      h2.textContent = card.titel || "";
      const p = document.createElement("p");
      p.textContent = card.text || "";
      article.append(h2, p);
      root.appendChild(article);
    });
    root.classList.toggle("is-hidden", root.children.length === 0);
  }

  function renderTable(section, root) {
    const table = document.createElement("table");
    table.className = "data-table";
    const headers = safeArray(section.spalten);
    const rows = safeArray(section.zeilen);
    if (headers.length) {
      const thead = document.createElement("thead");
      const tr = document.createElement("tr");
      headers.forEach(h => {
        const th = document.createElement("th");
        th.textContent = h;
        tr.appendChild(th);
      });
      thead.appendChild(tr);
      table.appendChild(thead);
    }
    const tbody = document.createElement("tbody");
    rows.forEach(row => {
      const tr = document.createElement("tr");
      safeArray(row).forEach(cell => {
        const td = document.createElement("td");
        td.textContent = cell ?? "";
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    root.appendChild(table);
  }

  function renderMatches(section, root) {
    const list = document.createElement("div");
    list.className = "match-list";
    safeArray(section.spiele).forEach(match => {
      const row = document.createElement("div");
      row.className = "match-row";
      const meta = document.createElement("span");
      meta.textContent = [match.datum, match.anstoss].filter(Boolean).join(" · ");
      const pairing = document.createElement("strong");
      pairing.textContent = [match.heim, match.trenner || "–", match.auswaerts].filter(Boolean).join(" ");
      const result = document.createElement("span");
      result.className = "result";
      result.textContent = match.ergebnis || match.status || "";
      row.append(meta, pairing, result);
      list.appendChild(row);
    });
    root.appendChild(list);
  }

  function renderSections(sections) {
    const root = $("dynamic-sections");
    root.innerHTML = "";
    safeArray(sections).filter(s => s && s.anzeigen !== false).forEach(section => {
      const article = document.createElement("section");
      article.className = "dynamic-section";
      if (section.titel) {
        const h2 = document.createElement("h2");
        h2.textContent = section.titel;
        article.appendChild(h2);
      }

      switch (section.typ) {
        case "liste": {
          const ul = document.createElement("ul");
          safeArray(section.eintraege).forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            ul.appendChild(li);
          });
          article.appendChild(ul);
          break;
        }
        case "tabelle":
        case "rangliste":
          renderTable(section, article);
          break;
        case "spiele":
          renderMatches(section, article);
          break;
        default: {
          const p = document.createElement("p");
          p.textContent = section.text || "";
          article.appendChild(p);
        }
      }
      root.appendChild(article);
    });
    root.classList.toggle("is-hidden", root.children.length === 0);
  }

  function renderButtons(buttons) {
    const root = $("actions");
    root.innerHTML = "";
    safeArray(buttons).filter(b => b && b.anzeigen !== false && b.text && b.link).forEach((button, index) => {
      const a = document.createElement("a");
      a.className = `btn ${button.stil === "sekundaer" || index > 0 ? "btn-secondary" : "btn-primary"}`;
      a.href = button.link;
      a.textContent = button.text;
      if (button.neuesFenster) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      root.appendChild(a);
    });
    root.classList.toggle("is-hidden", root.children.length === 0);
  }

  async function fetchJson(url, required = true) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      if (required) throw error;
      console.warn(`Optionale Datei konnte nicht geladen werden: ${url}`, error);
      return { spiele: [] };
    }
  }

  async function load() {
    try {
      const [data, centralGameData] = await Promise.all([
        fetchJson(jsonUrl, true),
        fetchJson(gameDataUrl, false)
      ]);

      document.title = `${data.titel || "Wettbewerb"} | The Old Smugglers Club`;
      text("eyebrow", data.bereich);
      text("status-plaque", data.statusSchild);
      text("title", data.titel);
      text("description", data.beschreibung);

      renderCards(data.karten);

      const statusBox = $("status-box");
      const showStatus = Boolean(data.aktuellerStandTitel || data.aktuellerStand);
      statusBox.classList.toggle("is-hidden", !showStatus);
      text("status-title", data.aktuellerStandTitel);
      text("status-text", data.aktuellerStand);

      const centralSection = centralGamesSection(centralGameData);
      const sections = centralSection
        ? [centralSection, ...safeArray(data.bereiche)]
        : safeArray(data.bereiche);

      renderSections(sections);
      renderButtons(data.buttons);
      text("footer-text", data.fusszeile);
    } catch (error) {
      console.error(error);
      const box = $("error");
      box.textContent = "Die Wettbewerbsdaten konnten nicht geladen werden. Bitte prüfen, ob die passende JSON-Datei im selben Verzeichnis liegt.";
      box.classList.remove("is-hidden");
    }
  }

  load();
})();
