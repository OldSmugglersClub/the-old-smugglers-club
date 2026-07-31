(() => {
  "use strict";
  let cache;
  const safeArray = value => Array.isArray(value) ? value : [];
  const gamesFrom = data => safeArray(data && data.saisons).flatMap(s => safeArray(s && s.spiele)).concat(safeArray(data && data.spiele));
  const matchdaysFrom = data => safeArray(data && data.saisons).flatMap(s => safeArray(s && s.tippspieltage)).concat(safeArray(data && data.tippspieltage));
  function matches(game, competition) {
    const filter = competition && competition.filter;
    if (!filter || !game) return false;
    return filter.type === "sonderwertung"
      ? safeArray(game.sonderwertungen).includes(filter.value)
      : game[filter.type] === filter.value;
  }
  function summarize(competition, games, matchdays) {
    const items = games.filter(game => matches(game, competition));
    const completed = items.filter(game => Number.isFinite(game.heimtore) && Number.isFinite(game.auswaertstore));
    const dated = items.filter(game => /^\d{4}-\d{2}-\d{2}$/.test(game.datum || ""));
    const aliases = {"dynamo-dresden":"smugglerauftrag"};
    const key = aliases[competition.id] || competition.id;
    const days = matchdays.filter(day => day && (day.typ === key || day.wettbewerb === key));
    return { id: competition.id, games: items, total: items.length, completed: completed.length, scheduled: dated.length, open: Math.max(0, items.length - completed.length), matchdays: days.length };
  }
  async function fetchJson(url, fallback) {
    try { const response = await fetch(url, {cache:"no-store"}); if (!response.ok) throw new Error(`HTTP ${response.status}`); return await response.json(); }
    catch (error) { console.warn(`Zentrale Datenquelle nicht verfügbar: ${url}`, error); return fallback; }
  }
  async function load() {
    if (cache) return cache;
    cache = (async () => {
      const registry = window.OSCDataRegistry;
      const urls = registry ? await Promise.all([registry.url("wettbewerbe"), registry.url("spiele"), registry.url("teams"), registry.url("tippspieltage")]) : ["./wettbewerbe.json","./spieldaten.json","./teams.json","./tippspieltage.json"];
      const [competitionData, gameData, teamData, matchdayData] = await Promise.all([
        fetchJson(urls[0], {wettbewerbe:[]}), fetchJson(urls[1], {saisons:[]}), fetchJson(urls[2], {teams:[]}), fetchJson(urls[3], {saisons:[]})
      ]);
      const competitions = safeArray(competitionData.wettbewerbe);
      const games = gamesFrom(gameData);
      const matchdays = matchdaysFrom(matchdayData);
      const summaries = Object.fromEntries(competitions.map(item => [item.id, summarize(item, games, matchdays)]));
      return { competitionData, competitions, gameData, games, teamData, matchdayData, matchdays, summaries, updated: competitionData.aktualisiert || gameData.aktualisiert || "" };
    })();
    return cache;
  }
  window.OSCDataModel = { load, summarize, matches };
})();
