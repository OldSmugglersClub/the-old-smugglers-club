const fmt = n => Number(n || 0).toLocaleString('de-DE', { maximumFractionDigits: 2 });
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

let data = {};
const STORAGE_KEY = 'tosmc-highscore-state-v231';
const state = {
  view: 'overall',
  page: 1,
  pageSize: 25,
  query: '',
  sortKey: 'official',
  sortDir: 'asc'
};

function loadSavedState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (['overall', 'matchday'].includes(saved.view)) state.view = saved.view;
    if ([25, 50, 100].includes(Number(saved.pageSize))) state.pageSize = Number(saved.pageSize);
    if (typeof saved.sortKey === 'string') state.sortKey = saved.sortKey;
    if (['asc', 'desc'].includes(saved.sortDir)) state.sortDir = saved.sortDir;
  } catch (error) {
    console.warn('Gespeicherter Highscore-Zustand konnte nicht gelesen werden.', error);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      view: state.view, pageSize: state.pageSize, sortKey: state.sortKey, sortDir: state.sortDir
    }));
  } catch (error) {
    console.warn('Highscore-Zustand konnte nicht gespeichert werden.', error);
  }
}

function currentFilteredRows() {
  const query = state.query.trim().toLocaleLowerCase('de');
  const rows = sortedRows(state.view);
  return query ? rows.filter(row => String(row.name).toLocaleLowerCase('de').includes(query)) : rows;
}

function csvCell(value) {
  return `"${String(value ?? '').replace(/"/g, '""')}"`;
}

function exportCurrentRanking() {
  const rows = currentFilteredRows();
  const overall = state.view === 'overall';
  const header = overall
    ? ['Rang', 'Spieler', 'Bonuspunkte', 'Spieltagsiege', 'Gesamtpunkte']
    : ['Rang', 'Spieler', 'Punkte', 'Bonus', 'Gesamtpunkte', 'Spieltagsplatz'];
  const body = rows.map(row => overall
    ? [row.rank, row.name, row.bonusPoints, row.matchdayWins, row.totalPoints]
    : [row.rank, row.name, row.points, row.bonusPoints, row.totalPoints, row.matchdayRank]);
  const meta = [
    ['The Old Smugglers Club – Highscore'],
    [`Saison ${data.meta?.season || '2026/2027'}`],
    [overall ? 'Gesamtwertung' : (data.meta?.matchday || 'Einzelspieltag')],
    [`Datenstand ${data.meta?.exportDate || 'unbekannt'}`],
    []
  ];
  const csv = '\uFEFF' + [...meta, header, ...body].map(row => row.map(csvCell).join(';')).join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const suffix = overall ? 'gesamtwertung' : 'spieltag';
  link.href = url;
  link.download = `old-smugglers-highscore-${suffix}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setSystemStatus('ready', 'CSV erstellt', `${rows.length} Ranglisteneinträge wurden exportiert.`);
}


function setSystemStatus(type, title, message, retry = false) {
  const el = document.querySelector('#hs-system-status');
  if (!el) return;
  el.className = `hs-system-status is-${type}`;
  el.hidden = false;
  el.innerHTML = `<strong>${esc(title)}</strong><span>${esc(message)}</span>${retry ? '<button type="button" id="hs-retry">Erneut laden</button>' : ''}`;
  if (retry) document.querySelector('#hs-retry')?.addEventListener('click', loadHighscoreData);
}

function validatePayload(payload) {
  const issues = [];
  if (!payload || typeof payload !== 'object') issues.push('Ungültiges Datenformat');
  if (!Array.isArray(payload?.individual?.overall)) issues.push('Gesamtwertung fehlt');
  if (!Array.isArray(payload?.individual?.matchday)) issues.push('Spieltagswertung fehlt');
  if (!Array.isArray(payload?.teams?.overall)) issues.push('Teamwertung fehlt');
  if (!payload?.meta || typeof payload.meta !== 'object') issues.push('Metadaten fehlen');
  return issues;
}

function setSection(name) {
  document.querySelectorAll('.hs-section').forEach(section => {
    const active = section.id === `section-${name}`;
    section.classList.toggle('is-active', active);
    section.hidden = !active;
  });
  document.querySelectorAll('.hs-main-tab').forEach(tab => {
    const active = tab.dataset.section === name;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  history.replaceState(null, '', `#${name}`);
}

function scoreOf(row, view) {
  return view === 'overall' ? Number(row.totalPoints || 0) : Number(row.points || 0);
}

function officialRows(view) {
  return [...(data.individual?.[view] || [])].sort((a, b) =>
    scoreOf(b, view) - scoreOf(a, view) ||
    Number(a.rank || 999) - Number(b.rank || 999) ||
    String(a.name).localeCompare(String(b.name), 'de')
  );
}

function sortedRows(view) {
  const rows = officialRows(view);
  if (state.sortKey === 'official') return rows;
  const direction = state.sortDir === 'asc' ? 1 : -1;
  return rows.sort((a, b) => {
    const av = state.sortKey === 'name' ? String(a.name || '') : Number(a[state.sortKey] || 0);
    const bv = state.sortKey === 'name' ? String(b.name || '') : Number(b[state.sortKey] || 0);
    const result = typeof av === 'string' ? av.localeCompare(bv, 'de') : av - bv;
    return result * direction || String(a.name).localeCompare(String(b.name), 'de');
  });
}

function competitionStatus(view) {
  const rows = officialRows(view);
  if (!rows.length) return { open: true, tied: false, max: 0, leaders: [] };
  const max = scoreOf(rows[0], view);
  const leaders = rows.filter(row => scoreOf(row, view) === max);
  return { open: max <= 0, tied: leaders.length > 1, max, leaders };
}

function renderPodium() {
  const rows = officialRows(state.view).slice(0, 3);
  const status = competitionStatus(state.view);
  const el = document.querySelector('#podium');
  const notice = document.querySelector('#ranking-notice');

  if (!rows.length) {
    notice.textContent = '';
    notice.hidden = true;
    el.innerHTML = '<div class="hs-podium-empty">Noch keine Ranglistendaten vorhanden.</div>';
    return;
  }

  notice.hidden = false;
  if (status.open) {
    notice.innerHTML = '<strong>Rangdeck noch unbesetzt.</strong> Alle Teilnehmer stehen derzeit bei 0 Punkten. Die angezeigte Reihenfolge ist vorläufig und alphabetisch.';
  } else if (status.tied) {
    notice.innerHTML = `<strong>Geteilte Führung.</strong> ${status.leaders.length} Spieler liegen mit ${fmt(status.max)} Punkten gleichauf.`;
  } else {
    notice.innerHTML = `<strong>Aktueller Stand.</strong> ${esc(status.leaders[0]?.name)} führt mit ${fmt(status.max)} Punkten.`;
  }

  el.innerHTML = `<div class="hs-podium-rigging" aria-hidden="true"><span></span><span></span></div>${rows.map((row, index) => {
    const place = index + 1;
    const tiedAtTop = status.tied && scoreOf(row, state.view) === status.max;
    const label = status.open ? 'Vorläufig' : tiedAtTop ? 'Geteilter Rang 1' : `Platz ${place}`;
    const motto = status.open ? 'Noch ohne Wertung' : index === 0 ? 'Kapitän der Rangliste' : index === 1 ? 'Erster Maat' : 'Steuermann';
    return `<article class="hs-podium-card place-${place}${status.open ? ' is-provisional' : ''}">
      <div class="hs-card-corners" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
      <div class="hs-rank-seal" aria-hidden="true"><span>${status.open ? '–' : place}</span></div>
      <div class="hs-place-label">${label}</div>
      <strong>${esc(row.name)}</strong>
      <div class="hs-podium-divider" aria-hidden="true"></div>
      <div class="hs-podium-points">${fmt(scoreOf(row, state.view))} Punkte</div>
      ${state.view === 'overall' ? `<small>${fmt(row.matchdayWins)} Spieltagssiege</small>` : ''}
      <div class="hs-podium-motto">${motto}</div>
      <div class="hs-pedestal-face" aria-hidden="true"><span>${status.open ? '–' : place}</span></div>
    </article>`;
  }).join('')}<div class="hs-podium-deck" aria-hidden="true"><span></span></div>`;
}

function sortButton(label, key) {
  const active = state.sortKey === key;
  const direction = active ? state.sortDir : 'none';
  const symbol = active ? (state.sortDir === 'asc' ? '▲' : '▼') : '';
  const action = !active ? 'sortieren' : state.sortDir === 'asc' ? 'absteigend sortieren' : 'aufsteigend sortieren';
  return `<button class="hs-sort" type="button" data-sort="${key}" data-direction="${direction}" aria-label="${esc(label)}: ${action}">${label}<span aria-hidden="true">${symbol}</span></button>`;
}

function rowCell(label, value, className = '') {
  return `<td${className ? ` class="${className}"` : ''} data-label="${label}">${value}</td>`;
}

function sortDescription() {
  if (state.sortKey === 'official') return 'Offizielle Rangfolge';
  const labels = {
    name: 'Spielername', bonusPoints: 'Bonuspunkte', matchdayWins: 'Spieltagsiege',
    totalPoints: 'Gesamtpunkte', points: 'Spieltagespunkte', matchdayRank: 'Spieltagsplatz'
  };
  return `${labels[state.sortKey] || state.sortKey} · ${state.sortDir === 'asc' ? 'aufsteigend' : 'absteigend'}`;
}

function updateRankingToolbar(filteredCount) {
  const view = document.querySelector('#toolbar-view');
  const sort = document.querySelector('#toolbar-sort');
  const count = document.querySelector('#toolbar-count');
  const reset = document.querySelector('#ranking-reset');
  if (!view || !sort || !count || !reset) return;
  view.textContent = state.view === 'overall' ? 'Gesamtwertung' : (data.meta?.matchday || 'Einzelspieltag');
  sort.textContent = sortDescription();
  count.textContent = `${filteredCount} ${filteredCount === 1 ? 'Spieler' : 'Spieler'}`;
  reset.hidden = !state.query && state.sortKey === 'official' && state.pageSize === 25;
}

function renderIndividual() {
  const filtered = currentFilteredRows();
  updateRankingToolbar(filtered.length);
  const exportCaption = document.querySelector('#export-caption');
  if (exportCaption) exportCaption.textContent = state.view === 'overall' ? 'Aktuelle Gesamtwertung' : (data.meta?.matchday || 'Aktueller Einzelspieltag');
  saveState();
  const pages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
  state.page = Math.min(state.page, pages);
  const start = (state.page - 1) * state.pageSize;
  const rows = filtered.slice(start, start + state.pageSize);
  const head = document.querySelector('#individual-head');
  const body = document.querySelector('#individual-body');

  if (state.view === 'overall') {
    head.innerHTML = `<tr><th>${sortButton('Rang', 'official')}</th><th>${sortButton('Spieler', 'name')}</th><th>${sortButton('Bonuspunkte', 'bonusPoints')}</th><th>${sortButton('Spieltagsiege', 'matchdayWins')}</th><th>${sortButton('Gesamtpunkte', 'totalPoints')}</th></tr>`;
    body.innerHTML = rows.map(row => `<tr>${rowCell('Rang', esc(row.rank), 'hs-rank')}${rowCell('Spieler', esc(row.name), 'hs-player')}${rowCell('Bonuspunkte', fmt(row.bonusPoints))}${rowCell('Spieltagsiege', fmt(row.matchdayWins))}${rowCell('Gesamtpunkte', fmt(row.totalPoints), 'hs-total')}</tr>`).join('');
    document.querySelector('#individual-title').textContent = 'Einzelwertung – Gesamt';
    document.querySelector('#individual-caption').textContent = 'Gesamtübersicht aller Einzelspieler. Spalten können sortiert werden.';
  } else {
    head.innerHTML = `<tr><th>${sortButton('Rang', 'official')}</th><th>${sortButton('Spieler', 'name')}</th><th>${sortButton('Punkte', 'points')}</th><th>${sortButton('Bonus', 'bonusPoints')}</th><th>${sortButton('Gesamtpunkte', 'totalPoints')}</th><th>${sortButton('Spieltagsplatz', 'matchdayRank')}</th></tr>`;
    body.innerHTML = rows.map(row => `<tr>${rowCell('Rang', esc(row.rank), 'hs-rank')}${rowCell('Spieler', esc(row.name), 'hs-player')}${rowCell('Punkte', fmt(row.points))}${rowCell('Bonus', fmt(row.bonusPoints))}${rowCell('Gesamtpunkte', fmt(row.totalPoints), 'hs-total')}${rowCell('Spieltagsplatz', esc(row.matchdayRank))}</tr>`).join('');
    document.querySelector('#individual-title').textContent = 'Einzelwertung – Spieltag';
    document.querySelector('#individual-caption').textContent = `${data.meta?.matchday || 'Ausgewählter Einzelspieltag'} · Spalten können sortiert werden.`;
  }

  if (!rows.length) {
    body.innerHTML = `<tr><td colspan="6" class="hs-empty"><strong>Kein Eintrag im Schiffsregister</strong><span>Für „${esc(state.query)}“ wurde kein Spieler gefunden.</span><button type="button" class="hs-empty-reset" id="empty-reset">Suche löschen</button></td></tr>`;
    document.querySelector('#empty-reset')?.addEventListener('click', resetRankingControls);
  }

  document.querySelectorAll('.hs-sort').forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.sort;
    if (key === 'official') {
      state.sortKey = 'official';
      state.sortDir = 'asc';
    } else if (state.sortKey === key) {
      state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      state.sortKey = key;
      state.sortDir = key === 'name' ? 'asc' : 'desc';
    }
    state.page = 1;
    renderIndividual();
  }));

  document.querySelector('#page-info').textContent = `Seite ${state.page} von ${pages} · ${filtered.length} Spieler`;
  document.querySelector('#page-prev').disabled = state.page <= 1;
  document.querySelector('#page-next').disabled = state.page >= pages;
  renderPodium();
}

function renderTeam(name) {
  const overallRows = [...(data.teams?.overall || [])].sort((a, b) => Number(b.totalPoints || 0) - Number(a.totalPoints || 0));
  const overall = overallRows.find(row => row.name === name);
  const opponent = overallRows.find(row => row.name !== name);
  const matchday = (data.teams?.matchday || []).find(row => row.name === name);
  const opponentMatchday = (data.teams?.matchday || []).find(row => row.name !== name);
  const host = document.querySelector(`[data-team-name="${CSS.escape(name)}"]`);
  if (!host) return;

  const ownPoints = Number(overall?.totalPoints || 0);
  const opponentPoints = Number(opponent?.totalPoints || 0);
  const total = ownPoints + opponentPoints;
  const share = total > 0 ? Math.round((ownPoints / total) * 100) : 50;
  const delta = ownPoints - opponentPoints;
  const open = total <= 0;
  const duelState = open ? 'Mannschaftsduell noch ohne Wertung' : delta === 0 ? 'Punktgleiches Mannschaftsduell' : delta > 0 ? `${fmt(delta)} Punkte Vorsprung` : `${fmt(Math.abs(delta))} Punkte Rückstand`;
  const rankLabel = open ? '–' : overall?.rank ?? '–';

  host.innerHTML = `<div class="hs-team-hero"><div><div class="hs-eyebrow">Gruppierung</div><h2>${esc(name)}</h2><p class="hs-status">Gesamt- und Spieltagswertung dieser Gruppierung.</p></div><div class="hs-team-score">${fmt(ownPoints)}<small>Gesamtpunkte</small></div></div>
    <div class="hs-team-duel${open ? ' is-open' : ''}">
      <div class="hs-team-duel-head"><span>Mannschaftsduell</span><strong>${esc(duelState)}</strong></div>
      <div class="hs-team-duel-track" role="img" aria-label="${esc(name)}: ${share} Prozent der gemeinsamen Teampunkte"><span style="width:${share}%"></span></div>
      <div class="hs-team-duel-labels"><b>${esc(name)}</b><b>${esc(opponent?.name || 'Gegnerteam')}</b></div>
    </div>
    <div class="hs-team-stats"><article><span>Gesamtrang</span><strong>${esc(rankLabel)}</strong><small>${open ? 'Noch nicht gewertet' : 'Aktuelle Teamwertung'}</small></article><article><span>Spieltagsiege</span><strong>${fmt(overall?.matchdayWins)}</strong><small>Gewonnene Einzelspieltage</small></article><article><span>Bonuspunkte</span><strong>${fmt(overall?.bonusPoints)}</strong><small>Anteil an der Gesamtwertung</small></article><article><span>Aktueller Spieltag</span><strong>${fmt(matchday?.points)} Punkte</strong><small>${esc(data.meta?.matchday || 'Noch nicht festgelegt')}</small></article><article><span>Spieltagsrang</span><strong>${open ? '–' : esc(matchday?.matchdayRank ?? '–')}</strong><small>${Number(matchday?.points || 0) > Number(opponentMatchday?.points || 0) ? 'Aktuell vorn' : Number(matchday?.points || 0) < Number(opponentMatchday?.points || 0) ? 'Aktuell hinten' : 'Aktuell punktgleich'}</small></article><article><span>Abstand zum Gegner</span><strong>${open ? 'Noch offen' : `${fmt(Math.abs(delta))} Punkte`}</strong><small>${open || delta === 0 ? 'Kein Abstand' : delta > 0 ? 'Vorsprung' : 'Rückstand'}</small></article></div>`;
}

function recordCard(label, value, note, available) {
  return `<article class="hs-record-card ${available ? 'is-available' : 'is-pending'}">
    <div class="hs-record-head"><span>${esc(label)}</span><b>${available ? 'Aktiv' : 'Noch offen'}</b></div>
    <strong>${esc(value)}</strong><small>${esc(note)}</small><i aria-hidden="true"></i>
  </article>`;
}

function orderCard(title, holder, note, state) {
  return `<article class="hs-order-card is-${state}">
    <span>${esc(title)}</span><strong>${esc(holder)}</strong><small>${esc(note)}</small>
    <b class="hs-order-state">${state === 'awarded' ? 'Vergeben' : 'Gesperrt'}</b>
    <i class="hs-order-rivet" aria-hidden="true"></i>
  </article>`;
}

function renderRecords() {
  const individuals = officialRows('overall');
  const matchday = officialRows('matchday');
  const teams = [...(data.teams?.overall || [])].sort((a, b) => Number(b.totalPoints || 0) - Number(a.totalPoints || 0));
  const records = data.records || {};
  const historyRows = Array.isArray(data.history) ? data.history : [];
  const open = competitionStatus('overall').open;
  const hasMatchday = matchday.some(row => Number(row.points || 0) > 0);
  const teamsScored = teams.some(row => Number(row.totalPoints || 0) > 0);

  const readiness = [
    ['Gesamtwertung', !open, !open ? 'Aktiv' : 'Wartet auf erste Punkte'],
    ['Spieltagswertung', hasMatchday, hasMatchday ? 'Aktiv' : 'Wartet auf ersten Spieltag'],
    ['Teamwertung', teamsScored, teamsScored ? 'Aktiv' : 'Wartet auf Teampunkte'],
    ['Saisonhistorie', historyRows.length > 0, historyRows.length ? `${historyRows.length} archivierte Stände` : 'Noch kein Archivstand'],
    ['Detailorden', Boolean(data.orders || data.tipDetails), data.orders || data.tipDetails ? 'Detaildaten vorhanden' : 'Detaildaten fehlen'],
    ['Datenexport', Boolean(data.meta?.exportDate), data.meta?.exportDate ? `Stand ${data.meta.exportDate}` : 'Exportdatum fehlt']
  ];
  document.querySelector('#readiness-grid').innerHTML = readiness.map(([label, ready, text]) => `<article class="hs-readiness-card ${ready ? 'is-ready' : 'is-waiting'}"><span>${esc(label)}</span><strong>${ready ? 'Bereit' : 'Wartet'}</strong><small>${esc(text)}</small><i aria-hidden="true"></i></article>`).join('');
  const activeModules = readiness.filter(([, ready]) => ready).length;
  const exportLabel = data.meta?.exportDate || 'Noch offen';
  const exportEl = document.querySelector('#records-export');
  const modulesEl = document.querySelector('#records-active-modules');
  if (exportEl) exportEl.textContent = exportLabel;
  if (modulesEl) modulesEl.textContent = `${activeModules} von ${readiness.length}`;

  const recordHtml = [
    recordCard('Tabellenführer', open ? 'Noch offen' : `${individuals[0].name} · ${fmt(individuals[0].totalPoints)}`, open ? 'Wird nach den ersten Punkten vergeben.' : 'Aktueller Spitzenreiter der Gesamtwertung.', !open),
    recordCard('Höchster Spieltag', records.highestMatchdayScore ? `${records.highestMatchdayScore.name} · ${fmt(records.highestMatchdayScore.points)}` : 'Noch offen', records.highestMatchdayScore ? 'Bester bisheriger Einzelspieltag.' : 'Benötigt einen abgeschlossenen Spieltag.', Boolean(records.highestMatchdayScore)),
    recordCard('Meiste Spieltagssiege', records.mostMatchdayWins ? `${records.mostMatchdayWins.name} · ${fmt(records.mostMatchdayWins.wins)}` : 'Noch offen', records.mostMatchdayWins ? 'Meiste gewonnene Einzelspieltage.' : 'Wird mit den Spieltagsergebnissen aufgebaut.', Boolean(records.mostMatchdayWins)),
    recordCard('Vorsprung an der Spitze', open ? 'Noch offen' : `${fmt(records.leadMargin)} Punkte`, open ? 'Noch keine belastbare Rangfolge.' : 'Abstand zwischen Platz 1 und Platz 2.', !open),
    recordCard('Bestes Team', records.bestTeam ? `${records.bestTeam.name} · ${fmt(records.bestTeam.points)}` : teamsScored ? 'Gleichstand' : 'Noch offen', records.bestTeam ? 'Führende Gruppierung.' : teamsScored ? 'Beide Teams sind punktgleich.' : 'Noch keine Teampunkte vorhanden.', Boolean(records.bestTeam) || teamsScored),
    recordCard('Teilnehmer', `${individuals.length} Spieler`, 'Aktuell im Highscore geführte Einzelspieler.', individuals.length > 0)
  ].join('');
  document.querySelector('#record-grid').innerHTML = recordHtml;

  const captain = matchday[0] && Number(matchday[0].points) > 0 ? `${matchday[0].name} · ${fmt(matchday[0].points)} Punkte` : 'Noch nicht vergeben';
  const orders = [
    orderCard('Kapitän der Woche', captain, hasMatchday ? 'Bester Spieler des aktuellen Einzelspieltags.' : 'Freischaltung nach dem ersten gewerteten Spieltag.', hasMatchday ? 'awarded' : 'locked'),
    orderCard('Volltrefferkönig', 'Noch nicht berechenbar', 'Benötigt Detaildaten zu exakten Ergebnistipps.', 'locked'),
    orderCard('Aufholjäger', 'Noch nicht berechenbar', historyRows.length >= 2 ? 'Archivstände vorhanden, aber Bewegungsdaten fehlen noch.' : 'Benötigt mindestens zwei archivierte Rangstände.', 'locked'),
    orderCard('Heißeste Serie', 'Noch nicht berechenbar', 'Benötigt mehrere abgeschlossene Einzelspieltage.', 'locked'),
    orderCard('Überraschung des Spieltags', 'Noch nicht berechenbar', 'Benötigt Tippdetails und belastbare Marktquoten.', 'locked'),
    orderCard('Admiral des Monats', 'Noch nicht vergeben', 'Freischaltung nach einem vollständigen Kalendermonat.', 'locked')
  ];
  document.querySelector('#order-grid').innerHTML = orders.join('');

  document.querySelector('#history-grid').innerHTML = historyRows.length
    ? `<div class="hs-history-head"><span>Spieltag</span><span>Führender Spieler</span><span>Punktestand</span></div>${historyRows.map((row, index) => `<div class="hs-history-row"><span>${esc(row.matchday)}</span><strong>${esc(row.leader)}</strong><b>${fmt(row.points)} Punkte</b><i aria-hidden="true">${index + 1}</i></div>`).join('')}`
    : '<div class="hs-history-empty"><strong>Logbuch noch leer</strong><p>Die Saisonhistorie wird erst belastbar, wenn Spieltagsstände archiviert werden. Bis dahin wird bewusst kein Verlauf simuliert.</p><span>Benötigt: mindestens einen abgeschlossenen und gespeicherten Spieltag</span></div>';
}

function resetRankingControls() {
  state.query = '';
  state.page = 1;
  state.pageSize = 25;
  state.sortKey = 'official';
  state.sortDir = 'asc';
  const search = document.querySelector('#player-search');
  const size = document.querySelector('#page-size');
  if (search) search.value = '';
  if (size) size.value = '25';
  renderIndividual();
  search?.focus();
}

function init() {
  loadSavedState();
  const individuals = officialRows('overall');
  const matchday = officialRows('matchday');
  const teams = [...(data.teams?.overall || [])].sort((a, b) => Number(b.totalPoints || 0) - Number(a.totalPoints || 0));
  const individualStatus = competitionStatus('overall');

  document.querySelector('#summary-leader').textContent = individualStatus.open ? 'Noch offen' : individuals[0]?.name || '–';
  document.querySelector('#summary-leader-points').textContent = individualStatus.open ? 'Saison noch ohne Wertung' : `${fmt(individuals[0]?.totalPoints)} Punkte`;
  document.querySelector('#summary-matchday').textContent = data.meta?.matchday || '–';
  document.querySelector('#summary-matchday-winner').textContent = matchday[0] && Number(matchday[0].points) > 0 ? `${matchday[0].name} · ${fmt(matchday[0].points)} Punkte` : 'Noch ohne Wertung';
  const teamsTied = teams.length < 2 || Number(teams[0]?.totalPoints || 0) === Number(teams[1]?.totalPoints || 0);
  document.querySelector('#summary-team').textContent = teamsTied ? 'Gleichstand' : teams[0].name;
  document.querySelector('#summary-team-points').textContent = teamsTied && Number(teams[0]?.totalPoints || 0) === 0 ? 'Noch ohne Wertung' : `${fmt(teams[0]?.totalPoints)} Punkte`;
  document.querySelector('#summary-updated').textContent = data.meta?.exportDate || '–';

  document.querySelectorAll('[data-individual-view]').forEach(item => classListToggle(item, item.dataset.individualView === state.view));
  const pageSizeSelect = document.querySelector('#page-size');
  if (pageSizeSelect) pageSizeSelect.value = String(state.pageSize);
  renderIndividual();
  renderTeam('Old Smugglers Team');
  renderTeam('New Smugglers Team');
  renderRecords();

  document.querySelectorAll('.hs-main-tab').forEach(tab => {
    tab.addEventListener('click', () => setSection(tab.dataset.section));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const tabs = [...document.querySelectorAll('.hs-main-tab')];
      const current = tabs.indexOf(tab);
      let next = current;
      if (event.key === 'ArrowRight') next = (current + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      tabs[next].focus();
      setSection(tabs[next].dataset.section);
    });
  });

  document.querySelectorAll('[data-individual-view]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-individual-view]').forEach(item => classListToggle(item, item === button));
    state.view = button.dataset.individualView;
    state.page = 1;
    state.sortKey = 'official';
    state.sortDir = 'asc';
    renderIndividual();
  }));

  document.querySelector('#player-search').addEventListener('input', event => {
    state.query = event.target.value;
    state.page = 1;
    renderIndividual();
  });
  document.querySelector('#page-size').addEventListener('change', event => {
    state.pageSize = Number(event.target.value);
    state.page = 1;
    renderIndividual();
  });
  document.querySelector('#ranking-reset').addEventListener('click', resetRankingControls);
  document.querySelector('#export-csv').addEventListener('click', exportCurrentRanking);
  document.querySelector('#print-ranking').addEventListener('click', () => window.print());
  document.querySelector('#page-prev').addEventListener('click', () => {
    if (state.page > 1) {
      state.page--;
      renderIndividual();
    }
  });
  document.querySelector('#page-next').addEventListener('click', () => {
    state.page++;
    renderIndividual();
  });

  const requestedSection = location.hash.replace('#', '');
  if (['individual', 'old-team', 'new-team', 'records'].includes(requestedSection)) setSection(requestedSection);
}

function classListToggle(element, active) {
  element.classList.toggle('is-active', active);
  element.setAttribute('aria-pressed', String(active));
}

function loadHighscoreData() {
  setSystemStatus('loading', 'Daten werden geladen', 'Das Highscore-Register wird vorbereitet.');
  fetch('./highscore.json', { cache: 'no-store' })
    .then(response => {
      if (!response.ok) throw Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(payload => {
      const issues = validatePayload(payload);
      if (issues.length) throw Error(issues.join(' · '));
      data = payload;
      init();
      const count = data.individual?.overall?.length || 0;
      setSystemStatus('ready', 'Highscore geladen', `${count} Spieler und alle verfügbaren Statistikmodule wurden eingelesen.`);
      window.setTimeout(() => {
        const el = document.querySelector('#hs-system-status');
        if (el?.classList.contains('is-ready')) el.hidden = true;
      }, 3500);
    })
    .catch(error => {
      const body = document.querySelector('#individual-body');
      if (body) body.innerHTML = '<tr><td colspan="6" class="hs-empty"><strong>Highscore nicht verfügbar</strong><span>Die zentrale Datendatei konnte nicht gelesen werden.</span></td></tr>';
      const notice = document.querySelector('#ranking-notice');
      if (notice) notice.innerHTML = '<strong>Datenfehler.</strong> Die Rangliste ist momentan nicht verfügbar.';
      setSystemStatus('error', 'Highscore konnte nicht geladen werden', 'Bitte Verbindung oder highscore.json prüfen.', true);
      console.error(error);
    });
}

window.addEventListener('hashchange', () => {
  const requested = location.hash.replace('#', '');
  if (['individual', 'old-team', 'new-team', 'records'].includes(requested)) setSection(requested);
});

loadHighscoreData();
