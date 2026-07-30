(() => {
  "use strict";

  const fileName = location.pathname.split("/").pop() || "bundesliga.html";
  const slug = fileName.replace(/\.html?$/i, "") || "bundesliga";
  const jsonUrl = `./${slug}.json`;
  const gameDataUrl = "./spieldaten.json";
  const teamDataUrl = "./teams.json";
  const bundesligaTableUrl = "./bundesliga-tabelle.json";

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


  function allCentralGames(data) {
    return Array.isArray(data && data.saisons)
      ? data.saisons.flatMap(season => safeArray(season && season.spiele))
      : safeArray(data && data.spiele);
  }

  function numericScore(value) {
    return Number.isFinite(value) ? value : null;
  }

  function calculateBundesligaTable(gameData, teamData, tableData) {
    const teamLookup = createTeamLookup(teamData);
    const games = allCentralGames(gameData).filter(match => match && match.wettbewerb === "bundesliga");
    const rows = new Map();

    const ensureTeam = (teamId, fallback) => {
      if (!teamId) return null;
      if (!rows.has(teamId)) {
        rows.set(teamId, {
          id: teamId,
          name: teamName(teamLookup, teamId, fallback),
          played: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          points: 0
        });
      }
      return rows.get(teamId);
    };

    games.forEach(match => {
      ensureTeam(match.heimTeamId, match.heim);
      ensureTeam(match.auswaertsTeamId, match.auswaerts);

      const homeGoals = numericScore(match.heimtore);
      const awayGoals = numericScore(match.auswaertstore);
      if (homeGoals === null || awayGoals === null) return;

      const home = ensureTeam(match.heimTeamId, match.heim);
      const away = ensureTeam(match.auswaertsTeamId, match.auswaerts);
      if (!home || !away) return;

      home.played += 1;
      away.played += 1;
      home.goalsFor += homeGoals;
      home.goalsAgainst += awayGoals;
      away.goalsFor += awayGoals;
      away.goalsAgainst += homeGoals;

      if (homeGoals > awayGoals) {
        home.wins += 1;
        away.losses += 1;
        home.points += 3;
      } else if (homeGoals < awayGoals) {
        away.wins += 1;
        home.losses += 1;
        away.points += 3;
      } else {
        home.draws += 1;
        away.draws += 1;
        home.points += 1;
        away.points += 1;
      }
    });

    const manualRows = safeArray(tableData && tableData.teams);
    if (manualRows.length) {
      manualRows.forEach(team => {
        if (!team || !team.id) return;
        rows.set(team.id, {
          id: team.id,
          name: teamName(teamLookup, team.id, team.name),
          played: Number(team.spiele || team.played || 0),
          wins: Number(team.siege || team.wins || 0),
          draws: Number(team.unentschieden || team.draws || 0),
          losses: Number(team.niederlagen || team.losses || 0),
          goalsFor: Number(team.tore || team.goalsFor || 0),
          goalsAgainst: Number(team.gegentore || team.goalsAgainst || 0),
          points: Number(team.punkte || team.points || 0)
        });
      });
    }

    const sorted = [...rows.values()].sort((a, b) => {
      const pointDiff = b.points - a.points;
      if (pointDiff) return pointDiff;
      const goalDiff = (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst);
      if (goalDiff) return goalDiff;
      const goalsDiff = b.goalsFor - a.goalsFor;
      if (goalsDiff) return goalsDiff;
      return a.name.localeCompare(b.name, "de");
    });

    return {
      rows: sorted,
      playedMatches: games.filter(match => numericScore(match.heimtore) !== null && numericScore(match.auswaertstore) !== null).length,
      status: tableData && tableData.status ? tableData.status : ""
    };
  }

  function renderBundesligaTable(gameData, teamData, tableData, root) {
    const standings = calculateBundesligaTable(gameData, teamData, tableData);
    const article = document.createElement("section");
    article.className = "dynamic-section standings-section";

    const headingRow = document.createElement("div");
    headingRow.className = "section-heading-row";
    const heading = document.createElement("h2");
    heading.textContent = "Bundesliga-Tabelle";
    const badge = document.createElement("span");
    badge.className = "data-status-badge";
    badge.textContent = standings.playedMatches
      ? `${standings.playedMatches} Spiele ausgewertet`
      : "Saison noch nicht gestartet";
    headingRow.append(heading, badge);
    article.appendChild(headingRow);

    if (!standings.rows.length) {
      const note = document.createElement("p");
      note.className = "data-note";
      note.textContent = standings.status || "Die Tabelle erscheint automatisch, sobald Mannschaften und Ergebnisse vorliegen.";
      article.appendChild(note);
      root.appendChild(article);
      return;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "table-scroll";
    const table = document.createElement("table");
    table.className = "data-table standings-table";
    table.innerHTML = "<thead><tr><th>Pl.</th><th>Verein</th><th>Sp.</th><th>S</th><th>U</th><th>N</th><th>Tore</th><th>Diff.</th><th>Pkt.</th></tr></thead>";
    const tbody = document.createElement("tbody");

    standings.rows.forEach((team, index) => {
      const tr = document.createElement("tr");
      const goalDifference = team.goalsFor - team.goalsAgainst;
      const values = [
        index + 1,
        team.name,
        team.played,
        team.wins,
        team.draws,
        team.losses,
        `${team.goalsFor}:${team.goalsAgainst}`,
        goalDifference > 0 ? `+${goalDifference}` : String(goalDifference),
        team.points
      ];
      values.forEach((value, columnIndex) => {
        const cell = document.createElement(columnIndex === 0 ? "th" : "td");
        if (columnIndex === 0) cell.scope = "row";
        cell.textContent = value;
        tr.appendChild(cell);
      });
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    wrapper.appendChild(table);
    article.appendChild(wrapper);

    const note = document.createElement("p");
    note.className = "data-note";
    note.textContent = standings.playedMatches
      ? "Die Tabelle wird automatisch aus den in spieldaten.json hinterlegten Endergebnissen berechnet."
      : "Die Mannschaften sind vorbereitet. Ergebnisse und Tabelle werden nach Saisonstart automatisch aus spieldaten.json aufgebaut.";
    article.appendChild(note);
    root.appendChild(article);
  }


  function completedBundesligaGames(gameData) {
    return allCentralGames(gameData)
      .filter(match => match && match.wettbewerb === "bundesliga")
      .filter(match => numericScore(match.heimtore) !== null && numericScore(match.auswaertstore) !== null)
      .sort((a, b) => `${a.datum || ""}T${a.anstoss || ""}`.localeCompare(`${b.datum || ""}T${b.anstoss || ""}`));
  }

  function calculateBundesligaStatistics(gameData, teamData) {
    const games = completedBundesligaGames(gameData);
    const teamLookup = createTeamLookup(teamData);
    const teams = new Map();

    const ensure = (id, fallback) => {
      if (!id) return null;
      if (!teams.has(id)) {
        teams.set(id, {
          id,
          name: teamName(teamLookup, id, fallback),
          played: 0,
          points: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          homePlayed: 0,
          homePoints: 0,
          awayPlayed: 0,
          awayPoints: 0,
          cleanSheets: 0,
          currentRunType: null,
          currentRun: 0,
          longestWinRun: 0,
          form: []
        });
      }
      return teams.get(id);
    };

    let totalGoals = 0;
    let homeWins = 0;
    let draws = 0;
    let awayWins = 0;
    let biggestWin = null;
    let highestScoring = null;

    games.forEach(match => {
      const hg = numericScore(match.heimtore);
      const ag = numericScore(match.auswaertstore);
      const home = ensure(match.heimTeamId, match.heim);
      const away = ensure(match.auswaertsTeamId, match.auswaerts);
      if (!home || !away) return;

      totalGoals += hg + ag;
      home.played += 1;
      away.played += 1;
      home.homePlayed += 1;
      away.awayPlayed += 1;
      home.goalsFor += hg;
      home.goalsAgainst += ag;
      away.goalsFor += ag;
      away.goalsAgainst += hg;
      if (ag === 0) home.cleanSheets += 1;
      if (hg === 0) away.cleanSheets += 1;

      let homeResult = "U";
      let awayResult = "U";
      if (hg > ag) {
        homeWins += 1;
        home.points += 3;
        home.homePoints += 3;
        homeResult = "S";
        awayResult = "N";
      } else if (hg < ag) {
        awayWins += 1;
        away.points += 3;
        away.awayPoints += 3;
        homeResult = "N";
        awayResult = "S";
      } else {
        draws += 1;
        home.points += 1;
        away.points += 1;
        home.homePoints += 1;
        away.awayPoints += 1;
      }

      [[home, homeResult], [away, awayResult]].forEach(([team, result]) => {
        team.form.push(result);
        if (team.form.length > 5) team.form.shift();
        if (result === "S") {
          team.currentRun = team.currentRunType === "S" ? team.currentRun + 1 : 1;
          team.currentRunType = "S";
          team.longestWinRun = Math.max(team.longestWinRun, team.currentRun);
        } else {
          team.currentRunType = result;
          team.currentRun = 1;
        }
      });

      const difference = Math.abs(hg - ag);
      if (!biggestWin || difference > biggestWin.difference || (difference === biggestWin.difference && hg + ag > biggestWin.totalGoals)) {
        biggestWin = { match, difference, totalGoals: hg + ag };
      }
      if (!highestScoring || hg + ag > highestScoring.totalGoals) {
        highestScoring = { match, totalGoals: hg + ag };
      }
    });

    const teamRows = [...teams.values()];
    const bestBy = (selector) => teamRows.length
      ? [...teamRows].sort((a, b) => selector(b) - selector(a) || b.points - a.points || a.name.localeCompare(b.name, "de"))[0]
      : null;

    return {
      games,
      totalGoals,
      averageGoals: games.length ? totalGoals / games.length : 0,
      homeWins,
      draws,
      awayWins,
      biggestWin,
      highestScoring,
      bestAttack: bestBy(team => team.goalsFor),
      bestDefense: bestBy(team => -team.goalsAgainst),
      bestHome: bestBy(team => team.homePlayed ? team.homePoints / team.homePlayed : -1),
      bestAway: bestBy(team => team.awayPlayed ? team.awayPoints / team.awayPlayed : -1),
      mostCleanSheets: bestBy(team => team.cleanSheets),
      longestWinRun: bestBy(team => team.longestWinRun),
      formRows: [...teamRows].sort((a, b) => b.points - a.points || (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst) || a.name.localeCompare(b.name, "de"))
    };
  }

  function pairingText(match, teamData) {
    if (!match) return "–";
    const lookup = createTeamLookup(teamData);
    const home = teamName(lookup, match.heimTeamId, match.heim);
    const away = teamName(lookup, match.auswaertsTeamId, match.auswaerts);
    return `${home} – ${away} ${match.heimtore}:${match.auswaertstore}`;
  }

  function createStatCard(label, value, detail = "") {
    const card = document.createElement("article");
    card.className = "season-stat-card";
    const labelEl = document.createElement("span");
    labelEl.className = "season-stat-label";
    labelEl.textContent = label;
    const valueEl = document.createElement("strong");
    valueEl.textContent = value;
    card.append(labelEl, valueEl);
    if (detail) {
      const detailEl = document.createElement("small");
      detailEl.textContent = detail;
      card.appendChild(detailEl);
    }
    return card;
  }

  function renderBundesligaStatistics(gameData, teamData, root) {
    const stats = calculateBundesligaStatistics(gameData, teamData);
    const section = document.createElement("section");
    section.className = "dynamic-section bundesliga-statistics";

    const heading = document.createElement("h2");
    heading.textContent = "Saisonstatistik und Rekorde";
    section.appendChild(heading);

    if (!stats.games.length) {
      const empty = document.createElement("div");
      empty.className = "statistics-empty";
      empty.innerHTML = "<strong>Bereit für den Saisonstart</strong><span>Sobald Endergebnisse in spieldaten.json eingetragen sind, erscheinen hier automatisch Torstatistik, Form, Heim-/Auswärtswerte und Saisonrekorde.</span>";
      section.appendChild(empty);
      root.appendChild(section);
      return;
    }

    const overview = document.createElement("div");
    overview.className = "season-stat-grid";
    overview.append(
      createStatCard("Ausgewertete Spiele", String(stats.games.length)),
      createStatCard("Tore", String(stats.totalGoals), `${stats.averageGoals.toFixed(2).replace(".", ",")} pro Spiel`),
      createStatCard("Heimsiege", String(stats.homeWins)),
      createStatCard("Unentschieden", String(stats.draws)),
      createStatCard("Auswärtssiege", String(stats.awayWins))
    );
    section.appendChild(overview);

    const records = document.createElement("div");
    records.className = "record-grid";
    const recordItems = [
      ["Beste Offensive", stats.bestAttack, stats.bestAttack ? `${stats.bestAttack.goalsFor} Tore` : ""],
      ["Beste Defensive", stats.bestDefense, stats.bestDefense ? `${stats.bestDefense.goalsAgainst} Gegentore` : ""],
      ["Heimstärkstes Team", stats.bestHome, stats.bestHome ? `${stats.bestHome.homePoints} Punkte aus ${stats.bestHome.homePlayed} Spielen` : ""],
      ["Auswärtsstärkstes Team", stats.bestAway, stats.bestAway ? `${stats.bestAway.awayPoints} Punkte aus ${stats.bestAway.awayPlayed} Spielen` : ""],
      ["Meiste Zu-null-Spiele", stats.mostCleanSheets, stats.mostCleanSheets ? `${stats.mostCleanSheets.cleanSheets}` : ""],
      ["Längste Siegesserie", stats.longestWinRun, stats.longestWinRun ? `${stats.longestWinRun.longestWinRun} Siege` : ""]
    ];
    recordItems.forEach(([label, team, detail]) => records.appendChild(createStatCard(label, team ? team.name : "–", detail)));
    section.appendChild(records);

    const matchRecords = document.createElement("div");
    matchRecords.className = "match-records";
    matchRecords.append(
      createStatCard("Höchster Sieg", stats.biggestWin ? pairingText(stats.biggestWin.match, teamData) : "–", stats.biggestWin ? `${stats.biggestWin.difference} Tore Unterschied` : ""),
      createStatCard("Torreichstes Spiel", stats.highestScoring ? pairingText(stats.highestScoring.match, teamData) : "–", stats.highestScoring ? `${stats.highestScoring.totalGoals} Tore` : "")
    );
    section.appendChild(matchRecords);

    const formHeading = document.createElement("h3");
    formHeading.textContent = "Form der letzten fünf Ligaspiele";
    section.appendChild(formHeading);
    const formWrapper = document.createElement("div");
    formWrapper.className = "table-scroll";
    const table = document.createElement("table");
    table.className = "data-table form-table";
    table.innerHTML = "<thead><tr><th>Verein</th><th>Form</th><th>Punkte</th><th>Tore</th></tr></thead>";
    const tbody = document.createElement("tbody");
    stats.formRows.forEach(team => {
      const row = document.createElement("tr");
      const teamCell = document.createElement("td");
      teamCell.textContent = team.name;
      const formCell = document.createElement("td");
      const form = document.createElement("div");
      form.className = "form-badges";
      team.form.forEach(result => {
        const badge = document.createElement("span");
        badge.className = `form-badge form-${result.toLowerCase()}`;
        badge.textContent = result;
        form.appendChild(badge);
      });
      formCell.appendChild(form);
      const pointsCell = document.createElement("td");
      pointsCell.textContent = String(team.points);
      const goalsCell = document.createElement("td");
      goalsCell.textContent = `${team.goalsFor}:${team.goalsAgainst}`;
      row.append(teamCell, formCell, pointsCell, goalsCell);
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    formWrapper.appendChild(table);
    section.appendChild(formWrapper);

    const note = document.createElement("p");
    note.className = "data-note";
    note.textContent = "Alle Werte werden ausschließlich aus den hinterlegten Bundesliga-Endergebnissen berechnet. Spielerbezogene Daten wie Torjäger oder Karten benötigen später eine eigene Datenquelle.";
    section.appendChild(note);
    root.appendChild(section);
  }

  function centralGamesForPage(data) {
    const filter = FILTERS[slug];
    if (!filter) return [];

    const allGames = Array.isArray(data && data.saisons)
      ? data.saisons.flatMap(season => safeArray(season && season.spiele))
      : safeArray(data && data.spiele);

    return allGames
      .filter(match => {
        if (!match || typeof match !== "object") return false;
        if (filter.type === "wettbewerb") return match.wettbewerb === filter.value;
        return safeArray(match.sonderwertungen).includes(filter.value);
      })
      .sort((a, b) => {
        const first = `${a.datum || a.datumVon || "9999-12-31"}T${a.anstoss || "23:59"}`;
        const second = `${b.datum || b.datumVon || "9999-12-31"}T${b.anstoss || "23:59"}`;
        return first.localeCompare(second);
      });
  }

  function createTeamLookup(teamData) {
    return new Map(safeArray(teamData && teamData.teams).map(team => [team.id, team]));
  }

  function teamName(teamLookup, teamId, fallback) {
    return teamLookup.get(teamId)?.name || fallback || "Team offen";
  }

  function centralGamesSection(data, teamData) {
    const games = centralGamesForPage(data);
    const teamLookup = createTeamLookup(teamData);
    if (!games.length) return null;

    return {
      typ: "spiele",
      titel: FILTERS[slug].title,
      anzeigen: true,
      spiele: games.map(match => ({
        datum: match.datumAnzeige || formatDate(match.datum || match.datumVon),
        datumSortierung: match.datum || match.datumVon || "9999-12-31",
        anstoss: match.anstoss || "Uhrzeit offen",
        heim: teamName(teamLookup, match.heimTeamId, match.heim || "Heimteam offen"),
        trenner: "–",
        auswaerts: teamName(teamLookup, match.auswaertsTeamId, match.auswaerts || "Auswärtsteam offen"),
        ergebnis: formatResult(match),
        status: match.status || "",
        runde: match.runde || "Spiele",
        spieltagNummer: Number.isFinite(match.spieltagNummer) ? match.spieltagNummer : null
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

    // Tabellen dürfen auf kleinen Displays nicht die gesamte Seite verbreitern.
    // Stattdessen bleiben sie innerhalb ihres Bereichs horizontal scrollbar.
    const wrapper = document.createElement("div");
    wrapper.className = "table-scroll generic-table-scroll";
    wrapper.appendChild(table);
    root.appendChild(wrapper);
  }

  function createMatchList(matches) {
    const list = document.createElement("div");
    list.className = "match-list";
    safeArray(matches).forEach(match => {
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
    return list;
  }

  function renderBundesligaMatchdays(section, root) {
    const groups = new Map();
    safeArray(section.spiele).forEach(match => {
      const key = match.runde || "Spiele";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(match);
    });

    const orderedGroups = [...groups.entries()].sort((a, b) => {
      const aNumber = a[1][0] && a[1][0].spieltagNummer;
      const bNumber = b[1][0] && b[1][0].spieltagNummer;
      if (Number.isFinite(aNumber) && Number.isFinite(bNumber)) return aNumber - bNumber;
      return a[0].localeCompare(b[0], "de");
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayIso = today.toISOString().slice(0, 10);
    let openIndex = orderedGroups.findIndex(([, matches]) =>
      matches.some(match => (match.datumSortierung || "9999-12-31") >= todayIso)
    );
    if (openIndex < 0) openIndex = Math.max(orderedGroups.length - 1, 0);

    const accordion = document.createElement("div");
    accordion.className = "matchday-accordion";

    orderedGroups.forEach(([round, matches], index) => {
      const details = document.createElement("details");
      details.className = "matchday-group";
      details.open = index === openIndex;

      const summary = document.createElement("summary");
      summary.className = "matchday-summary";

      const title = document.createElement("span");
      title.textContent = round;
      const count = document.createElement("span");
      count.className = "matchday-count";
      count.textContent = `${matches.length} Spiele`;

      summary.append(title, count);
      details.append(summary, createMatchList(matches));
      accordion.appendChild(details);
    });

    root.appendChild(accordion);
  }

  function renderMatches(section, root) {
    if (slug === "bundesliga") {
      renderBundesligaMatchdays(section, root);
      return;
    }
    root.appendChild(createMatchList(section.spiele));
  }


  function renderQuickBackButton(buttons, root) {
    const backButton = safeArray(buttons).find(button =>
      button && button.anzeigen !== false && button.text && button.link &&
      (button.link.includes("#wettbewerbe") || /zurück.*wettbewerb/i.test(button.text))
    );
    if (!backButton) return;

    const quickActions = document.createElement("div");
    quickActions.className = "actions quick-actions";
    const link = document.createElement("a");
    link.className = "btn btn-secondary";
    link.href = backButton.link;
    link.textContent = backButton.text;
    quickActions.appendChild(link);
    root.appendChild(quickActions);
  }

  function renderSections(sections, buttons, gameData, teamData, tableData) {
    const root = $("dynamic-sections");
    root.innerHTML = "";
    if (slug === "bundesliga" || slug === "dynamo-dresden") {
      renderQuickBackButton(buttons, root);
    }
    if (slug === "bundesliga") {
      renderBundesligaTable(gameData, teamData, tableData, root);
      renderBundesligaStatistics(gameData, teamData, root);
    }
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
      const [data, centralGameData, teamData, bundesligaTableData] = await Promise.all([
        fetchJson(jsonUrl, true),
        fetchJson(gameDataUrl, false),
        fetchJson(teamDataUrl, false),
        slug === "bundesliga" ? fetchJson(bundesligaTableUrl, false) : Promise.resolve({ teams: [] })
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

      const centralSection = centralGamesSection(centralGameData, teamData);
      const sections = centralSection
        ? [centralSection, ...safeArray(data.bereiche)]
        : safeArray(data.bereiche);

      renderSections(sections, data.buttons, centralGameData, teamData, bundesligaTableData);
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
