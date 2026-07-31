(() => {
  "use strict";

  const $ = id => document.getElementById(id);
  const safeArray = value => Array.isArray(value) ? value : [];

  function centralGames(data) {
    return safeArray(data && data.saisons).flatMap(season => safeArray(season && season.spiele));
  }

  function centralMatchdays(data) {
    return safeArray(data && data.saisons).flatMap(season => safeArray(season && season.tippspieltage));
  }

  function matchingGames(games, filter) {
    if (!filter) return [];
    if (filter.feld === "sonderwertungen") {
      return games.filter(game => safeArray(game && game.sonderwertungen).includes(filter.wert));
    }
    return games.filter(game => game && game[filter.feld] === filter.wert);
  }

  function matchingMatchdays(matchdays, competition) {
    const aliases = {
      smugglerauftraege: "smugglerauftrag",
      "champions-league": "champions-league",
      "europa-league": "europa-league",
      "dfb-pokal": "dfb-pokal",
      bundesliga: "bundesliga",
      piratenkodex: "piratenkodex",
      weihnachtsregatta: "weihnachtsregatta",
      relegation: "relegation"
    };
    const type = aliases[competition.id];
    return matchdays.filter(day => day && (day.typ === type || day.wettbewerb === type));
  }

  function displayCount(target, actual, suffix) {
    if (Number.isFinite(target)) {
      const detail = actual > 0 && actual !== target ? `<small>${actual} aktuell hinterlegt</small>` : "";
      return `<span class="season-count">${target}${detail}</span>`;
    }
    if (actual > 0) return `<span class="season-count">${actual}<small>aktuell hinterlegt</small></span>`;
    return `<span class="season-count">automatisch<small>${suffix}</small></span>`;
  }

  async function init() {
    try {
      const registry = window.OSCDataRegistry;
      const [overviewUrl, gamesUrl, matchdaysUrl] = registry
        ? await Promise.all([registry.url("saisonuebersicht"), registry.url("spiele"), registry.url("tippspieltage")])
        : ["./saison-2026-2027.json", "./spieldaten.json", "./tippspieltage.json"];
      const [overviewResponse, gamesResponse, matchdaysResponse] = await Promise.all([
        fetch(overviewUrl, { cache: "no-store" }),
        fetch(gamesUrl, { cache: "no-store" }),
        fetch(matchdaysUrl, { cache: "no-store" })
      ]);
      if (!overviewResponse.ok || !gamesResponse.ok || !matchdaysResponse.ok) throw new Error("Saisondaten konnten nicht vollständig geladen werden.");

      const [overview, gameData, matchdayData] = await Promise.all([
        overviewResponse.json(), gamesResponse.json(), matchdaysResponse.json()
      ]);
      const competitions = safeArray(overview.wettbewerbe);
      const games = centralGames(gameData);
      const matchdays = centralMatchdays(matchdayData);

      $("season-title").textContent = overview.titel || "Saisonübersicht 2026/2027";
      $("season-subtitle").textContent = overview.untertitel || "";
      $("competition-count").textContent = competitions.length;
      $("stored-games").textContent = games.length;

      const knownMatchdays = competitions.reduce((sum, item) => sum + (Number.isFinite(item.tippspieltageZiel) ? item.tippspieltageZiel : 0), 0);
      const knownGames = competitions.reduce((sum, item) => sum + (Number.isFinite(item.spieleZiel) ? item.spieleZiel : 0), 0);
      const openMatchdayCompetitions = competitions.filter(item => !Number.isFinite(item.tippspieltageZiel)).length;
      const openGameCompetitions = competitions.filter(item => !Number.isFinite(item.spieleZiel)).length;

      $("matchday-total").textContent = `${knownMatchdays}+`;
      $("matchday-note").textContent = `${openMatchdayCompetitions} Wettbewerbe werden ergänzt`;
      $("game-total").textContent = `${knownGames}+`;
      $("game-note").textContent = `${openGameCompetitions} Wettbewerbe werden ergänzt`;

      const tbody = $("season-table-body");
      competitions.forEach(competition => {
        const actualGames = matchingGames(games, competition.filter).length;
        const actualMatchdays = matchingMatchdays(matchdays, competition).length;
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><a class="season-competition-link" href="./${competition.seite}">${competition.name}</a></td>
          <td>${displayCount(competition.tippspieltageZiel, actualMatchdays, "nach Auslosung")}</td>
          <td>${displayCount(competition.spieleZiel, actualGames, "nach Auslosung")}</td>
          <td>${competition.zeitraum || "Noch offen"}</td>
          <td><span class="season-status-pill">${competition.status || "geplant"}</span></td>`;
        tbody.appendChild(row);
      });

      $("data-state").textContent = `Stand ${overview.aktualisiert ? overview.aktualisiert.split("-").reverse().join(".") : "aktuell"}`;
    } catch (error) {
      $("data-state").textContent = "Datenfehler";
      const box = $("season-error");
      box.textContent = error.message;
      box.classList.remove("is-hidden");
    }
  }

  init();
})();
