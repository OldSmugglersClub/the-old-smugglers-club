(() => {
  "use strict";
  const fallback = {
    schemaVersion: 1,
    datenVersion: 1,
    saison: "2026/2027",
    quellen: {
      wettbewerbe: "wettbewerbe.json", spiele: "spieldaten.json", teams: "teams.json",
      tippspieltage: "tippspieltage.json", highscore: "highscore.json", hallOfFame: "hall-of-fame.json",
      clubdaten: "clubdaten.json", saisonuebersicht: "saison-2026-2027.json", spieltag: "spieltag.json",
      bundesligaTabelle: "bundesliga-tabelle.json"
    }
  };
  let cache;
  async function load() {
    if (cache) return cache;
    cache = fetch("./datenregister.json", { cache: "no-store" })
      .then(r => { if (!r.ok) throw new Error(`datenregister.json: HTTP ${r.status}`); return r.json(); })
      .then(data => ({ ...fallback, ...data, quellen: { ...fallback.quellen, ...(data.quellen || {}) } }))
      .catch(error => { console.warn("Zentrales Datenregister nicht verfügbar; Rückfallpfade werden verwendet.", error); return fallback; });
    return cache;
  }
  async function url(key) {
    const registry = await load();
    const value = registry.quellen[key];
    return `./${value || fallback.quellen[key] || key}`;
  }
  window.OSCDataRegistry = { load, url, fallback };
})();
