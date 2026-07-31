(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  let latestReport = null;

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

  function render(report) {
    const failed = report.sources.filter(source => !source.ok);
    $("overallBadge").textContent = failed.length ? `${failed.length} Fehler` : "Alle Quellen erreichbar";
    $("overallBadge").className = `admin-badge ${failed.length ? "error" : "ok"}`;
    $("sourceCount").textContent = `${report.sources.length} Quellen`;
    $("sourceCount").className = `admin-badge ${failed.length ? "warn" : "ok"}`;

    const summaries = [
      ["Website-Version", report.websiteVersion],
      ["Datenversion", String(report.dataVersion)],
      ["Erreichbare Quellen", `${report.sources.length - failed.length}/${report.sources.length}`],
      ["Gesamtladezeit", `${report.durationMs} ms`]
    ];
    $("summaryGrid").replaceChildren(...summaries.map(([label, value]) => {
      const article = document.createElement("article"); article.className = "admin-card";
      const span = document.createElement("span"); span.textContent = label;
      const strong = document.createElement("strong"); strong.textContent = value || "Nicht angegeben";
      article.append(span, strong); return article;
    }));

    $("sourceRows").replaceChildren(...report.sources.map(source => {
      const row = document.createElement("tr");
      [source.name, source.file].forEach((value, index) => { const cell = document.createElement("td"); if (index) { const code = document.createElement("code"); code.textContent = value; cell.appendChild(code); } else cell.textContent = value; row.appendChild(cell); });
      const status = document.createElement("td"); status.className = `admin-status ${source.ok ? "ok" : "error"}`; status.textContent = source.ok ? "OK" : "Fehler"; row.appendChild(status);
      const detail = document.createElement("td"); detail.textContent = source.detail; row.appendChild(detail);
      const speed = document.createElement("td"); speed.textContent = `${source.milliseconds} ms`; row.appendChild(speed);
      return row;
    }));

    const notices = failed.length ? failed.map(source => ({ type: "error", text: `${source.file}: ${source.detail}` })) : [{ type: "ok", text: "Alle registrierten Kernquellen konnten geladen und ausgewertet werden." }];
    notices.push({ type: "", text: "Das Administrationszentrum arbeitet ausschließlich lesend. Änderungen erfolgen weiterhin direkt in den JSON-Dateien und werden anschließend über GitHub veröffentlicht." });
    $("noticeList").replaceChildren(...notices.map(item => { const p = document.createElement("p"); p.className = `admin-notice ${item.type}`.trim(); p.textContent = item.text; return p; }));
    $("downloadButton").disabled = false;
  }

  async function run() {
    $("refreshButton").disabled = true; $("downloadButton").disabled = true;
    $("overallBadge").textContent = "Prüfung läuft"; $("overallBadge").className = "admin-badge";
    const started = performance.now();
    const registry = await window.OSCDataRegistry.load();
    const configured = registry.quellen || {};
    const labels = { wettbewerbe:"Wettbewerbe", spiele:"Spiele", teams:"Teams", tippspieltage:"Tippspieltage", highscore:"Highscore", hallOfFame:"Hall of Fame", clubdaten:"Clubdaten", saisonuebersicht:"Saisonübersicht", spieltag:"Spieltag", bundesligaTabelle:"Bundesliga-Tabelle", systemstatus:"Systemstatus" };
    const requests = Object.entries(configured).filter(([key, file]) => key !== "datenmodell" && key !== "version" && /\.json$/i.test(file)).map(([key, file]) => timedFetch(labels[key] || key, file));
    requests.push(timedFetch(["Website", "Version"].join("-"), configured.version || "VERSION.txt", "text"));
    const sources = await Promise.all(requests);
    latestReport = { reportVersion: 1, generatedAt: new Date().toISOString(), websiteVersion: registry.websiteVersion || sources.find(s => s.file === "VERSION.txt")?.detail || "unbekannt", schemaVersion: registry.schemaVersion, dataVersion: registry.datenVersion, durationMs: Math.round(performance.now() - started), sources: sources.map(({ payload, ...source }) => source) };
    render(latestReport); $("refreshButton").disabled = false;
  }

  function download() {
    if (!latestReport) return;
    const blob = new Blob([JSON.stringify(latestReport, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob); const link = document.createElement("a");
    link.href = url; link.download = `osc-systembericht-${new Date().toISOString().slice(0,10)}.json`; document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
  }
  $("refreshButton").addEventListener("click", run); $("downloadButton").addEventListener("click", download); run();
})();
