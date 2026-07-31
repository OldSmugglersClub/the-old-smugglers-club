(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  let latestReport = null;
  let latestBackup = null;

  async function timedFetch(name, file, type = "json") {
    const started = performance.now();
    try {
      const response = await fetch(`./${file}`, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = type === "text" ? await response.text() : await response.json();
      return { name, file, ok: true, milliseconds: Math.round(performance.now() - started), payload, detail: type === "json" ? describe(payload) : payload.trim() };
    } catch (error) {
      return { name, file, ok: false, milliseconds: Math.round(performance.now() - started), payload: null, detail: String(error.message || error) };
    }
  }

  function describe(data) {
    if (Array.isArray(data)) return `${data.length} Einträge`;
    if (!data || typeof data !== "object") return "Geladen";
    const candidates = ["spiele", "teams", "wettbewerbe", "tippspieltage", "spieler", "quellen", "module"];
    for (const key of candidates) {
      const value = data[key];
      if (Array.isArray(value)) return `${value.length} ${key}`;
      if (value && typeof value === "object") return `${Object.keys(value).length} ${key}`;
    }
    return `${Object.keys(data).length} Hauptfelder`;
  }

  function card(label, value) {
    const article = document.createElement("article"); article.className = "admin-card";
    const span = document.createElement("span"); span.textContent = label;
    const strong = document.createElement("strong"); strong.textContent = value ?? "–";
    article.append(span, strong); return article;
  }

  function renderValidation(validation) {
    const counts = validation?.counts || {};
    const errors = validation?.errors || [];
    const warnings = validation?.warnings || [];
    const status = validation?.status || "error";
    $("validationBadge").textContent = status === "ok" ? "Ohne Befund" : status === "warning" ? `${warnings.length} Warnungen` : `${errors.length} Fehler`;
    $("validationBadge").className = `admin-badge ${status === "ok" ? "ok" : status === "warning" ? "warn" : "error"}`;
    $("validationGrid").replaceChildren(
      card("Wettbewerbe", counts.competitions || 0), card("Spiele", counts.games || 0),
      card("Teams", counts.teams || 0), card("Tippspieltage", counts.matchdays || 0),
      card("Fehler", counts.errors || 0), card("Warnungen", counts.warnings || 0)
    );
    const items = [...errors, ...warnings];
    const notices = items.length ? items.map(item => ({ type: item.severity === "error" ? "error" : "", text: `${item.message}${item.details?.length ? `: ${item.details.join(", ")}` : ""}` })) : [{ type: "ok", text: "Alle zentralen Referenzen, IDs, Datumsangaben und Ergebnisfelder sind konsistent." }];
    $("validationDetails").replaceChildren(...notices.map(item => { const p = document.createElement("p"); p.className = `admin-notice ${item.type}`.trim(); p.textContent = item.text; return p; }));
  }

  function render(report) {
    const failed = report.sources.filter(source => !source.ok);
    $("overallBadge").textContent = failed.length ? `${failed.length} Fehler` : "Alle Quellen erreichbar";
    $("overallBadge").className = `admin-badge ${failed.length ? "error" : "ok"}`;
    $("sourceCount").textContent = `${report.sources.length} Quellen`;
    $("sourceCount").className = `admin-badge ${failed.length ? "warn" : "ok"}`;
    $("summaryGrid").replaceChildren(
      card("Website-Version", report.websiteVersion), card("Datenversion", String(report.dataVersion)),
      card("Erreichbare Quellen", `${report.sources.length - failed.length}/${report.sources.length}`), card("Gesamtladezeit", `${report.durationMs} ms`)
    );
    $("sourceRows").replaceChildren(...report.sources.map(source => {
      const row = document.createElement("tr");
      [source.name, source.file].forEach((value, index) => { const cell = document.createElement("td"); if (index) { const code = document.createElement("code"); code.textContent = value; cell.appendChild(code); } else cell.textContent = value; row.appendChild(cell); });
      const status = document.createElement("td"); status.className = `admin-status ${source.ok ? "ok" : "error"}`; status.textContent = source.ok ? "OK" : "Fehler"; row.appendChild(status);
      const detail = document.createElement("td"); detail.textContent = source.detail; row.appendChild(detail);
      const speed = document.createElement("td"); speed.textContent = `${source.milliseconds} ms`; row.appendChild(speed);
      return row;
    }));
    const notices = failed.length ? failed.map(source => ({ type: "error", text: `${source.file}: ${source.detail}` })) : [{ type: "ok", text: "Alle registrierten Kernquellen konnten geladen und ausgewertet werden." }];
    notices.push({ type: "", text: "Mit „Datenbestand sichern“ wird eine lokale JSON-Sicherung aller erreichbaren Datenquellen erstellt. Die Website-Dateien auf GitHub werden dabei nicht verändert." });
    $("noticeList").replaceChildren(...notices.map(item => { const p = document.createElement("p"); p.className = `admin-notice ${item.type}`.trim(); p.textContent = item.text; return p; }));
  }

  async function run() {
    $("refreshButton").disabled = true; $("downloadButton").disabled = true; $("backupButton").disabled = true;
    $("overallBadge").textContent = "Prüfung läuft"; $("overallBadge").className = "admin-badge";
    const started = performance.now();
    const registry = await window.OSCDataRegistry.load();
    const configured = registry.quellen || {};
    const labels = { wettbewerbe:"Wettbewerbe", spiele:"Spiele", teams:"Teams", tippspieltage:"Tippspieltage", highscore:"Highscore", hallOfFame:"Hall of Fame", clubdaten:"Clubdaten", saisonuebersicht:"Saisonübersicht", spieltag:"Spieltag", bundesligaTabelle:"Bundesliga-Tabelle", systemstatus:"Systemstatus" };
    const requests = Object.entries(configured).filter(([key, file]) => key !== "datenmodell" && key !== "version" && /\.json$/i.test(file)).map(([key, file]) => timedFetch(labels[key] || key, file));
    const versionLabel = ["Website", "Version"].join("-");
    requests.push(timedFetch(versionLabel, configured.version || "VERSION.txt", "text"));
    const sources = await Promise.all(requests);
    window.OSCDataModel.reset();
    const model = await window.OSCDataModel.load();
    latestReport = { reportVersion: 2, generatedAt: new Date().toISOString(), websiteVersion: registry.websiteVersion || sources.find(s => s.file === "VERSION.txt")?.detail || "unbekannt", schemaVersion: registry.schemaVersion, dataVersion: registry.datenVersion, durationMs: Math.round(performance.now() - started), validation: model.validation, sources: sources.map(({ payload, ...source }) => source) };
    latestBackup = { backupVersion: 1, generatedAt: latestReport.generatedAt, websiteVersion: latestReport.websiteVersion, dataVersion: latestReport.dataVersion, sources: Object.fromEntries(sources.filter(s => s.ok && s.file.endsWith(".json")).map(s => [s.file, s.payload])) };
    render(latestReport); renderValidation(model.validation);
    $("refreshButton").disabled = false; $("downloadButton").disabled = false; $("backupButton").disabled = !Object.keys(latestBackup.sources).length;
  }

  function saveJson(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob); const link = document.createElement("a");
    link.href = url; link.download = filename; document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
  }
  $("refreshButton").addEventListener("click", run);
  $("downloadButton").addEventListener("click", () => latestReport && saveJson(latestReport, `osc-systembericht-${new Date().toISOString().slice(0,10)}.json`));
  $("backupButton").addEventListener("click", () => latestBackup && saveJson(latestBackup, `osc-datensicherung-${new Date().toISOString().slice(0,10)}.json`));
  run();
})();
