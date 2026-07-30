const fmt = n => Number(n || 0).toLocaleString('de-DE', { maximumFractionDigits: 2 });
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

let data = {};
const state = {
  view: 'overall',
  page: 1,
  pageSize: 25,
  query: '',
  sortKey: 'official',
  sortDir: 'asc'
};

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
  return `<button class="hs-sort" type="button" data-sort="${key}" aria-sort="${direction}">${label}<span aria-hidden="true">${symbol}</span></button>`;
}

function rowCell(label, value, className = '') {
  return `<td${className ? ` class="${className}"` : ''} data-label="${label}">${value}</td>`;
}

function renderIndividual() {
  const all = sortedRows(state.view);
  const query = state.query.trim().toLocaleLowerCase('de');
  const filtered = query ? all.filter(row => String(row.name).toLocaleLowerCase('de').includes(query)) : all;
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
    body.innerHTML = `<tr><td colspan="6" class="hs-empty">Für „${esc(state.query)}“ wurde kein Spieler gefunden.</td></tr>`;
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
  const overall = (data.teams?.overall || []).find(row => row.name === name);
  const matchday = (data.teams?.matchday || []).find(row => row.name === name);
  const host = document.querySelector(`[data-team-name="${CSS.escape(name)}"]`);
  if (!host) return;
  host.innerHTML = `<div class="hs-team-hero"><div><div class="hs-eyebrow">Gruppierung</div><h2>${esc(name)}</h2><p class="hs-status">Gesamt- und Spieltagswertung dieser Gruppierung.</p></div><div class="hs-team-score">${fmt(overall?.totalPoints)}<small>Gesamtpunkte</small></div></div><div class="hs-team-stats"><article><span>Gesamtrang</span><strong>${esc(overall?.rank ?? '–')}</strong></article><article><span>Spieltagsiege</span><strong>${fmt(overall?.matchdayWins)}</strong></article><article><span>Bonuspunkte</span><strong>${fmt(overall?.bonusPoints)}</strong></article><article><span>Aktueller Spieltag</span><strong>${fmt(matchday?.points)} Punkte</strong></article><article><span>Spieltagsrang</span><strong>${esc(matchday?.matchdayRank ?? '–')}</strong></article><article><span>Tippspieltag</span><strong>${esc(data.meta?.matchday || '–')}</strong></article></div>`;
}

function renderRecords() {
  const individuals = officialRows('overall');
  const matchday = officialRows('matchday');
  const teams = [...(data.teams?.overall || [])].sort((a, b) => Number(b.totalPoints || 0) - Number(a.totalPoints || 0));
  const records = data.records || {};
  const open = competitionStatus('overall').open;
  const values = [
    ['Tabellenführer', open ? 'Noch offen' : `${individuals[0].name} · ${fmt(individuals[0].totalPoints)}`],
    ['Höchster Spieltag', records.highestMatchdayScore ? `${records.highestMatchdayScore.name} · ${fmt(records.highestMatchdayScore.points)}` : 'Noch offen'],
    ['Meiste Spieltagssiege', records.mostMatchdayWins ? `${records.mostMatchdayWins.name} · ${fmt(records.mostMatchdayWins.wins)}` : 'Noch offen'],
    ['Vorsprung an der Spitze', open ? 'Noch offen' : `${fmt(records.leadMargin)} Punkte`],
    ['Bestes Team', records.bestTeam ? `${records.bestTeam.name} · ${fmt(records.bestTeam.points)}` : 'Gleichstand'],
    ['Teilnehmer', `${individuals.length} Spieler`]
  ];
  document.querySelector('#record-grid').innerHTML = values.map(item => `<article class="hs-record-card"><span>${esc(item[0])}</span><strong>${esc(item[1])}</strong></article>`).join('');

  const orders = [
    ['Kapitän der Woche', matchday[0] && Number(matchday[0].points) > 0 ? `${matchday[0].name} · ${fmt(matchday[0].points)} Punkte` : 'Noch nicht vergeben'],
    ['Volltrefferkönig', 'Benötigt Detaildaten zu exakten Tipps'],
    ['Aufholjäger', 'Benötigt Rangverlauf mehrerer Spieltage'],
    ['Heißeste Serie', 'Benötigt mehrere abgeschlossene Spieltage'],
    ['Überraschung des Spieltags', 'Benötigt Tipp- und Quotendetails'],
    ['Admiral des Monats', 'Wird nach dem ersten vollständigen Monat vergeben']
  ];
  document.querySelector('#order-grid').innerHTML = orders.map(item => `<article class="hs-order-card"><span>${esc(item[0])}</span><strong>${esc(item[1])}</strong></article>`).join('');

  const historyRows = data.history || [];
  document.querySelector('#history-grid').innerHTML = historyRows.length
    ? historyRows.map(row => `<div class="hs-history-row"><span>${esc(row.matchday)}</span><strong>${esc(row.leader)}</strong><b>${fmt(row.points)} Punkte</b></div>`).join('')
    : '<p class="hs-empty">Die Saisonhistorie beginnt automatisch, sobald mehrere Spieltagsstände archiviert wurden.</p>';
}

function init() {
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

  renderIndividual();
  renderTeam('Old Smugglers Team');
  renderTeam('New Smugglers Team');
  renderRecords();

  document.querySelectorAll('.hs-main-tab').forEach(tab => {
    tab.addEventListener('click', () => setSection(tab.dataset.section));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      const tabs = [...document.querySelectorAll('.hs-main-tab')];
      const current = tabs.indexOf(tab);
      const next = event.key === 'ArrowRight' ? (current + 1) % tabs.length : (current - 1 + tabs.length) % tabs.length;
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

fetch('./highscore.json', { cache: 'no-store' })
  .then(response => {
    if (!response.ok) throw Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then(payload => {
    data = payload;
    init();
  })
  .catch(error => {
    document.querySelector('#individual-body').innerHTML = '<tr><td class="hs-empty">Highscore-Daten konnten nicht geladen werden.</td></tr>';
    document.querySelector('#ranking-notice').innerHTML = '<strong>Datenfehler.</strong> Die Rangliste ist momentan nicht verfügbar.';
    console.error(error);
  });
