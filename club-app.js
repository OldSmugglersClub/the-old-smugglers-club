"use strict";

const $ = (id) => document.getElementById(id);

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

async function loadJson(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return response.json();
}

function formatDate(dateString, timeString = "") {
  if (!dateString) return "Termin offen";
  const iso = `${dateString}T${timeString || "12:00"}:00`;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return `${dateString} ${timeString}`.trim();
  return new Intl.DateTimeFormat("de-DE", {
    weekday: "short", day: "2-digit", month: "2-digit",
    hour: timeString ? "2-digit" : undefined,
    minute: timeString ? "2-digit" : undefined
  }).format(date);
}

function setText(id, value) {
  const el = $(id);
  if (el && value !== undefined && value !== null) el.textContent = value;
}

function renderMatches(data) {
  setText("matchday-kicker", `${data.wettbewerb} · ${data.saison}`);
  setText("matchday-title", `${data.spieltag}. Spieltag`);
  setText("matchday-state", data.status);
  setText("matchday-note", data.hinweis);

  const root = $("match-list");
  if (!root) return;
  const matches = Array.isArray(data.spiele) ? data.spiele : [];
  if (!matches.length) {
    root.innerHTML = `
      <div class="empty-state">
        <strong>Spielplan vorbereitet</strong>
        <span>Der Saisonstart ist für den ${escapeHtml(formatDate(data.startdatum))} hinterlegt. Sobald die Paarungen in <code>spieltag.json</code> stehen, erscheinen sie hier ohne HTML-Änderung.</span>
      </div>`;
    return;
  }
  root.innerHTML = matches.map(match => {
    const scored = Number.isInteger(match.heimtore) && Number.isInteger(match.auswaertstore);
    const score = scored ? `${match.heimtore}:${match.auswaertstore}` : "–";
    return `
      <article class="match-card">
        <div class="match-date">${escapeHtml(formatDate(match.datum, match.uhrzeit))}</div>
        <div class="match-pairing">
          <span>${escapeHtml(match.heim || "Noch offen")}</span>
          <strong>${escapeHtml(score)}</strong>
          <span>${escapeHtml(match.auswaerts || "Noch offen")}</span>
        </div>
        <span class="badge">${escapeHtml(match.status || "geplant")}</span>
      </article>`;
  }).join("");
}

function renderTable(data) {
  setText("table-state", data.status);
  const body = $("league-table-body");
  if (!body) return;
  const teams = Array.isArray(data.teams) ? data.teams : [];
  if (!teams.length) {
    body.innerHTML = `<tr><td colspan="9" class="table-empty">Die Saison hat noch nicht begonnen. Die Tabelle wird später aus <code>bundesliga-tabelle.json</code> gefüllt.</td></tr>`;
    return;
  }
  body.innerHTML = teams.map((team, index) => `
    <tr>
      <td>${escapeHtml(team.platz ?? index + 1)}</td>
      <td class="team-name">${escapeHtml(team.name)}</td>
      <td>${escapeHtml(team.spiele ?? 0)}</td>
      <td>${escapeHtml(team.siege ?? 0)}</td>
      <td>${escapeHtml(team.unentschieden ?? 0)}</td>
      <td>${escapeHtml(team.niederlagen ?? 0)}</td>
      <td>${escapeHtml(team.tore ?? "0:0")}</td>
      <td>${escapeHtml(team.differenz ?? 0)}</td>
      <td><strong>${escapeHtml(team.punkte ?? 0)}</strong></td>
    </tr>`).join("");
}

function renderTopPlayers(data) {
  setText("topplayers-state", data.status);
  const root = $("topplayers-grid");
  if (!root) return;
  const cats = Array.isArray(data.kategorien) ? data.kategorien : [];
  root.innerHTML = cats.map(item => `
    <article class="stat-card">
      <span>${escapeHtml(item.titel)}</span>
      <strong>${escapeHtml(item.name)}</strong>
      <em>${escapeHtml(item.wert)}</em>
    </article>`).join("");
}

function renderSystem(data) {
  setText("system-version", `Version ${data.version}`);
  setText("system-mode", data.modus);
  const root = $("system-modules");
  if (!root) return;
  root.innerHTML = (data.module || []).map(module => `
    <li><span>${escapeHtml(module.name)}</span><strong>${escapeHtml(module.status)}</strong></li>`
  ).join("");
}

function renderClub(data) {
  setText("champion-name", data.aktuellerChampion?.name);
  setText("champion-meta", [data.aktuellerChampion?.wettbewerb, data.aktuellerChampion?.titel, data.aktuellerChampion?.jahr].filter(Boolean).join(" · "));
  setText("record-total", `${data.rekorde?.gesamtpunkte?.wert ?? "–"} · ${data.rekorde?.gesamtpunkte?.name ?? ""}`);
  setText("record-bonus", `${data.rekorde?.bonuspunkte?.wert ?? "–"} · ${data.rekorde?.bonuspunkte?.name ?? ""}`);
  setText("record-exact", `${data.rekorde?.exakteTipps?.wert ?? "–"} · ${data.rekorde?.exakteTipps?.name ?? ""}`);
}

async function boot() {
  const tasks = [
    ["./spieltag.json", renderMatches],
    ["./bundesliga-tabelle.json", renderTable],
    ["./topspieler.json", renderTopPlayers],
    ["./systemstatus.json", renderSystem],
    ["./clubdaten.json", renderClub]
  ];
  const results = await Promise.allSettled(tasks.map(async ([path, renderer]) => {
    renderer(await loadJson(path));
  }));
  const failed = results.filter(result => result.status === "rejected");
  const status = $("data-health");
  if (status) {
    status.textContent = failed.length ? `${failed.length} Datenmodul(e) nicht geladen` : "Alle Datenmodule geladen";
    status.classList.toggle("warning", Boolean(failed.length));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const menu = $("menu-button");
  const nav = $("main-nav");
  if (menu && nav) {
    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
    });
  }
  const year = $("year");
  if (year) year.textContent = new Date().getFullYear();
  boot();
});
