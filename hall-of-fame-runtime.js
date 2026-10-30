(()=>{
  "use strict";
  const clone=value=>value&&typeof value==="object"?structuredClone(value):{};
  async function json(url,fallback={}){try{const r=await fetch(url,{cache:"no-store"});return r.ok?await r.json():fallback}catch{return fallback}}
  function mergeEntry(base,next){
    if(!next||next.freigegeben!==true||!next.name)return base;
    return {...(base||{}),...next,offen:false};
  }
  // Sonder-Ehrenchampions: ausschließlich bestätigte Gesamtsieger aus der vorhandenen Highscore.
  // Dies ist eine reine Lesefunktion; weder Rangfolgen noch Gewinner werden neu berechnet.
  const specialIds=new Set(["weihnachtsregatta","piratenkodex","smugglerauftraege"]);
  const seasonLabel=v=>{const m=String(v||"").match(/^(\d{4})[-/](\d{2}|\d{4})$/);if(!m)return "";const end=m[2].length===2?Math.floor(Number(m[1])/100)*100+Number(m[2]):Number(m[2]);return end===Number(m[1])+1?`${m[1]}/${end}`:""};
  function confirmedTitles(view){
    const current=view?.hallOfFame?.aktuelleSaison;
    const season=seasonLabel(current?.saison||view?.saison);
    if(!season)return [];
    const result=[];
    for(const [id,record] of Object.entries(current?.wettbewerbe||{})){
      if(!specialIds.has(id)||record?.status!=="abgeschlossen"||record?.abschluss?.completed!==true)continue;
      const league=view?.highscore?.wettbewerbe?.[id],rows=Array.isArray(league?.overall)?league.overall:[];
      const leaders=rows.filter(r=>Number(r?.rank)===1&&r?.name&&r?.participantId);
      if(leaders.length!==1)continue; // Kein willkürlicher Sieger bei ungeklärtem Gleichstand.
      const winner=leaders[0];
      const approved=record.sieger;
      if(approved?.freigegeben===false||approved?.bestaetigt===false||approved?.offen===true)continue;
      if(approved?.teilnehmerId&&approved.teilnehmerId!==winner.participantId)continue;
      if(approved?.name&&approved.name!==winner.name)continue;
      result.push({id,season,name:winner.name,participantId:winner.participantId,points:winner.totalPoints,label:record.label||league.label||id,
        finishedAt:record.abschluss?.abgeschlossenAm||record.abschluss?.zeitpunkt||""});
    }
    return result.sort((a,b)=>b.finishedAt.localeCompare(a.finishedAt)||b.id.localeCompare(a.id));
  }
  function insertHomeHonors(titles){
    const original=document.querySelector(".special-achievement-card");
    if(!original)return;
    // Nur während dieser Laufzeit erzeugte Elemente ersetzen; historische Karte bleibt unangetastet.
    document.querySelectorAll('.special-achievement-card[data-tosmc-auto-honor="true"]').forEach(el=>el.remove());
    for(const item of titles){
      const card=original.cloneNode(true);
      card.setAttribute("data-tosmc-auto-honor","true");
      card.querySelectorAll("[id]").forEach(el=>el.removeAttribute("id"));
      const title=card.querySelector(".special-achievement-copy span");
      const name=card.querySelector(".special-achievement-copy strong");
      const season=card.querySelector(".special-achievement-copy small");
      if(!title||!name||!season)continue;
      title.textContent=`Champion ${item.label}`;
      name.textContent=item.name;
      season.textContent=`Saison ${item.season}`;
      original.parentNode.insertBefore(card,original);
    }
  }
  async function load(){
    const base=clone(await json("./hall-of-fame.json",{}));
    const view=await json("./website-view.json",{});
    const titles=confirmedTitles(view);
    insertHomeHonors(titles);
    const update=view?.hallOfFame;
    const seasonState=update?.aktuelleSaison;
    const releasedSeasonChampion=(seasonState?.status==="abgeschlossen"||seasonState?.status==="abschluss-pruefen")&&seasonState?.gesamtChampion?.freigegeben===true?seasonState.gesamtChampion:null;
    const baseSpecial=Array.isArray(base.besondereLeistungen)?base.besondereLeistungen.filter(x=>x&&x.name&&x.titel&&(x.bestaetigt===true||x.freigegeben===true||x.offen===false)).at(-1):null;
    if(baseSpecial) base.ehrenmitglieder={label:baseSpecial.titel,wert:baseSpecial.name,offen:false};
    if(!update||(update.freigegeben!==true&&!releasedSeasonChampion)){
      base.meta={...(base.meta||{}),runtime:"Historische Ehrungen werden angezeigt."};
      return base;
    }
    const result=clone(base);
    result.aktuellerChampion=mergeEntry(result.aktuellerChampion,releasedSeasonChampion||update.gesamtChampion);
    result.teamChampion=mergeEntry(result.teamChampion,update.gesamtTeamSieger);
    const mapping={bundesliga:"meister","dfb-pokal":"dfbPokal","champions-league":"championsLeague","europa-league":"europaLeague",smugglerauftraege:"smugglerauftraege",bonuswettbewerb:"bonuswettbewerb",weihnachtsregatta:"weihnachtsregatta",piratenkodex:"piratenkodex",relegation:"relegation"};
    for(const [id,key] of Object.entries(mapping)) result[key]=mergeEntry(result[key],update.wettbewerbe?.[id]);
    if(Array.isArray(update.besondereLeistungen)){
      const existing=Array.isArray(result.besondereLeistungen)?result.besondereLeistungen:[];
      const additions=update.besondereLeistungen.filter(x=>x&&x.name&&x.titel&&(x.bestaetigt===true||x.freigegeben===true||x.offen===false));
      result.besondereLeistungen=[...existing,...additions.filter(a=>!existing.some(e=>e.titel===a.titel&&e.name===a.name))];
    }
    if(Array.isArray(update.meisterchronik)) result.meisterchronik=update.meisterchronik.filter(x=>x&&x.freigegeben===true&&x.name&&x.saison);
    if(update.rekorde&&update.rekordeFreigegeben===true){
      const recordSeason=seasonState?.saison||update.saison||"";
      const releasedRecords={};
      for(const [key,entry] of Object.entries(update.rekorde)){
        releasedRecords[key]=entry&&typeof entry==="object"&&entry.offen!==true
          ? {...entry,...(!entry.saison&&recordSeason?{saison:recordSeason}:{})}
          : entry;
      }
      result.rekorde={...(result.rekorde||{}),...releasedRecords};
    }
    const special=Array.isArray(result.besondereLeistungen)?result.besondereLeistungen.filter(x=>x&&x.name&&x.titel&&(x.bestaetigt===true||x.freigegeben===true||x.offen===false)).at(-1):null;
    if(special) result.ehrenmitglieder={label:special.titel,wert:special.name,offen:false};
    result.meta={...(result.meta||{}),runtime:"Das Ehrenlogbuch wurde aktualisiert."};
    return result;
  }
  window.OSCHallOfFame={load};
})();
