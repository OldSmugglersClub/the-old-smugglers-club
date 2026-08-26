(() => {
"use strict";
const $=s=>document.querySelector(s);
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const arr=v=>Array.isArray(v)?v:[];
const norm=v=>String(v??"").trim().toLowerCase();
const keepSpieltag=v=>String(v??"").replace(/(\d+\.)\s+(Spieltag)/gi,"$1\u00a0$2");
const formatThirtySecondsKicker=v=>esc(keepSpieltag(v)).replace(/(\d+\.)/g,'<span class="logbook-30s-round">$1</span>');
let data=null;
let gameById=new Map();
let spieltagpunkteDoc=null;

function shown(entry){return (entry?.highlights||[]).filter(h=>h?.anzeigen===true)}
function highlight(entry,type){return shown(entry).find(h=>h.typ===type)}

function sensationCases(highlightEntry){
 const limit=Number(highlightEntry?.daten?.grenzeProzent ?? 25);
 return arr(highlightEntry?.daten?.faelle).filter(f=>{
   const actual=String(f?.richtigerAusgang||"");
   const most=String(f?.meistGetippt?.ausgang||"");
   const share=Number(f?.richtigeTendenz?.anteil);
   return (actual==="1"||actual==="2")
     && most
     && actual!==most
     && Number.isFinite(share)
     && share<=limit;
 });
}
function validSmelledHighlight(entry){
 const h=highlight(entry,"wer-hats-gerochen");
 return h&&sensationCases(h).length?h:null;
}
function firstTipperName(rows){
 const first=arr(rows).map(x=>x?.teilnehmer).find(Boolean);
 return first?String(first):"";
}

function startStat(entry,type){
 const h=highlight(entry,type),d=h?.daten||{};
 if(!h)return null;
 if(type==="kapitaene"){
  const value=Number(d.anzahl||arr(d.tipper).length||0);
  return {label:"Kapitäne",value,copy:value===1?"holt die Beute":"teilen die Beute"};
 }
 if(type==="gegen-den-strom"){
  const value=Number(d.meistGetippt?.anzahl||0);
  return {label:"Gegen den Strom",value,copy:value===1?"lag daneben":"lagen daneben"};
 }
 if(type==="volltreffer"){
  const value=Number(d.anzahl||arr(d.tipper).length||0);
  return {label:"Volltreffer",value,copy:value===1?"traf exakt":"trafen exakt"};
 }
 return null;
}
function storyFromEntry(entry){
 const against=highlight(entry,"gegen-den-strom");
 if(against){
  const d=against.daten||{},count=Number(d.meistGetippt?.anzahl||0),exact=Number(d.exakt||0);
  return {
   title:`${count} Smuggler segelten in die falsche Richtung.`,
   text:`Die größte Tippgruppe setzte auf ${outcomeLabel(d.meistGetippt?.ausgang)}. Richtig war ${outcomeLabel(d.richtigerAusgang)}; ${exact} trafen ${d.ergebnis||"das Ergebnis"} exakt.`
  };
 }
 const smelled=validSmelledHighlight(entry);
 if(smelled){
  const f=sensationCases(smelled)[0],r=f?.richtigeTendenz||{};
  if(f)return {
   title:`Nur ${Number(r.anzahl||0)} Smuggler rochen die Überraschung.`,
   text:`Bei ${f.heimTeam} – ${f.auswaertsTeam} lag die Außenseiterseite mit ${outcomeLabel(f.richtigerAusgang)} richtig.`
  };
 }
 const captains=highlight(entry,"kapitaene");
 if(captains){
  const d=captains.daten||{},count=Number(d.anzahl||arr(d.tipper).length||0);
  return {
   title:count===1?"Ein Kapitän holte die beste Beute.":`${count} Kapitäne teilten die beste Beute.`,
   text:`Die stärkste Spieltagsleistung lag bei ${Number(d.punkte||0)} Punkten.`
  };
 }
 return null;
}
function renderThirtySeconds(entry,pending){
 const host=$("#logbook-30s"); if(!host) return;
 if(pending?.active){
  host.innerHTML=`<div class="logbook-30s-pending"><span class="logbook-kicker">${esc(pending.kicker)}</span><strong>${esc(keepSpieltag(pending.title))}</strong><p>${esc(pending.text)}</p>${pending.detail?`<small>${esc(pending.detail)}</small>`:""}</div>`;
  return;
 }
 if(!entry){
  host.innerHTML='<div class="logbook-30s-empty">Noch kein abgeschlossener Spieltag für die Kurzfassung vorhanden.</div>';
  return;
 }
 const stats=[startStat(entry,"kapitaene"),startStat(entry,"gegen-den-strom"),startStat(entry,"volltreffer")].filter(Boolean);
 const story=storyFromEntry(entry);
 if(!stats.length&&!story){
  host.innerHTML='<div class="logbook-30s-empty">Für diesen Spieltag liegen noch keine freigegebenen Kurzmeldungen vor.</div>';
  return;
 }
 host.innerHTML=`<div class="logbook-30s-head"><span class="logbook-kicker">${formatThirtySecondsKicker(entry.bezeichnung||entry.runde||"Letzter Spieltag")}</span></div>${stats.length?`<div class="logbook-30s-stats">${stats.map(stat=>`<article class="logbook-30s-stat"><span>${esc(stat.label)}</span><strong>${Number(stat.value).toLocaleString("de-DE")}</strong><small>${esc(stat.copy)}</small></article>`).join("")}</div>`:""}${story?`<article class="logbook-30s-story"><span>Die Geschichte des Spieltags</span><strong>${esc(story.title)}</strong><p>${esc(story.text)}</p></article>`:""}`;
}

function shortNames(rows,max=8){
 const names=(rows||[]).map(x=>x.teilnehmer).filter(Boolean);
 return names.slice(0,max).map(n=>`<span class="lb-name">${esc(n)}</span>`).join("")+
   (names.length>max?`<span class="lb-name">+${names.length-max} weitere</span>`:"");
}
function outcomeLabel(v){return v==="1"?"Heimsieg":v==="2"?"Auswärtssieg":"Remis"}

function renderHighlight(h){
 const d=h.daten||{};
 if(h.typ==="kapitaene"){
   const count=Number(d.anzahl||0),name=firstTipperName(d.tipper);
   const text=count===1
    ?`${esc(name||"1 Tipper")} holt mit ${Number(d.punkte||0)} Punkten die beste Spieltagsleistung.`
    :`<strong>${count} Tipper</strong> teilen sich mit ${Number(d.punkte||0)} Punkten die beste Spieltagsleistung.`;
   return `<article class="lb-highlight lb-highlight--wide lb-highlight--captains"><h3>Kapitäne des Spieltags</h3><p>${text}</p><div class="lb-names">${shortNames(d.tipper)}</div></article>`;
 }
 if(h.typ==="gegen-den-strom") return `<article class="lb-highlight lb-highlight--hero"><h3>Gegen den Strom</h3><p>Die größte Tippgruppe setzte auf <strong>${esc(outcomeLabel(d.meistGetippt?.ausgang))}</strong> (${Number(d.meistGetippt?.anzahl||0)} Tipps) und lag falsch. Richtig war <strong>${esc(outcomeLabel(d.richtigerAusgang))}</strong>; ${Number(d.exakt||0)} Tipper trafen ${esc(d.ergebnis||"")} exakt.</p><div class="lb-scoreline"><div><strong>${Number(d.tippverteilung?.["1"]||0)}</strong><span>Heimsieg</span></div><div><strong>${Number(d.tippverteilung?.X||0)}</strong><span>Remis</span></div><div><strong>${Number(d.tippverteilung?.["2"]||0)}</strong><span>Auswärtssieg</span></div></div></article>`;
 if(h.typ==="wer-hats-gerochen"){
   const cases=sensationCases(h);
   if(!cases.length)return "";
   return `<article class="lb-highlight lb-highlight--wide lb-highlight--smelled"><h3>Wer hat’s gerochen?</h3>${cases.map((f,caseIndex)=>{
     const r=f.richtigeTendenz||{};
     const sorted=arr(r.tipper).map((x,idx)=>({x,idx})).sort((a,b)=>(Number(Boolean(b.x?.exakt))-Number(Boolean(a.x?.exakt)))||(a.idx-b.idx)).map(row=>row.x);
     const shownTipper=sorted.slice(0,5),rest=Math.max(0,sorted.length-shownTipper.length);
     const rows=shownTipper.map(x=>`
       <tr>
         <td class="lb-smelled-name">${esc(x.teilnehmer)}</td>
         <td class="lb-smelled-tip">${esc(x.tipp)}</td>
         <td class="lb-smelled-hit"><span class="lb-hit-badge ${x.exakt?"is-exact":"is-tendency"}">${x.exakt?"Sensation exakt":"Tendenz richtig"}</span></td>
       </tr>`).join("");
     const more=rest?`<div class="lb-smelled-more">+${rest} ${rest===1?"weiterer Tipper":"weitere Tipper"}</div>`:"";
     return `<section class="lb-sensation-case">
       ${cases.length>1?`<div class="lb-sensation-number">Überraschung ${caseIndex+1}</div>`:""}
       <p><strong>${esc(f.heimTeam)} – ${esc(f.auswaertsTeam)} · ${esc(f.ergebnis||"")}</strong><br>Nur <strong>${Number(r.anzahl||0)} von ${Number(f.abgegeben||0)} Tippern</strong> (${Number(r.anteil||0).toLocaleString("de-DE",{maximumFractionDigits:1})} %) hatten den ${esc(outcomeLabel(f.richtigerAusgang))} auf dem Zettel. Die Mehrheit tippte auf ${esc(outcomeLabel(f.meistGetippt?.ausgang))}.</p>
       <div class="lb-smelled-table-wrap">
         <table class="lb-smelled-table">
           <thead><tr><th>Tipper</th><th>Tipp</th><th>Wertung</th></tr></thead>
           <tbody>${rows}</tbody>
         </table>
         ${more}
       </div>
     </section>`;
   }).join("")}</article>`;
 }
 if(h.typ==="volltreffer") return `<article class="lb-highlight lb-highlight--volltreffer"><h3>Volltreffer</h3><p>Die stärksten Präzisionstreffer: <strong>${Number(d.maxExakt||0)} exakt</strong> im Spieltag.</p><div class="lb-names">${shortNames(d.tipper)}</div></article>`;
 if(h.typ==="crewduell"){
   const teams=d.teams||[]; const a=teams[0],b=teams[1];
   return `<article class="lb-highlight lb-highlight--crew">
     <div class="lb-crew-head">
       <h3>Crewduell</h3>
       <p><strong>${esc(d.sieger||"Gleichstand")}</strong> führt nach Durchschnittspunkten.</p>
     </div>
     <div class="lb-crew-visual" aria-hidden="true"></div>
     ${a&&b?`<div class="lb-crew-scorebar">
       <div class="lb-crew-side lb-crew-side--left">
         <span>${esc(a.team)}</span>
         <strong>${Number(a.durchschnitt||0).toLocaleString("de-DE",{minimumFractionDigits:2,maximumFractionDigits:2})}</strong>
       </div>
       <div class="lb-crew-vs">vs.</div>
       <div class="lb-crew-side lb-crew-side--right">
         <strong>${Number(b.durchschnitt||0).toLocaleString("de-DE",{minimumFractionDigits:2,maximumFractionDigits:2})}</strong>
         <span>${esc(b.team)}</span>
       </div>
     </div>
     <div class="lb-crew-scorelabel">Durchschnittspunkte</div>`:""}
     <small class="lb-crew-note">Crewduell = Vergleich der Durchschnittspunkte aller aktiven Teammitglieder.</small>
   </article>`;
 }
 if(h.typ==="kursbewegung") return `<article class="lb-highlight"><h3>Kursbewegung</h3><p>Größter Sprung: <strong>+${Number(d.maxGewinn||0)} Plätze</strong>. Größter Verlust: <strong>${Number(d.maxVerlust||0)} Plätze</strong>.</p><div class="lb-names">${shortNames(d.gewinner,5)}</div></article>`;
 if(h.typ==="zahlen-aus-der-kombuese") return `<article class="lb-highlight lb-highlight--wide lb-highlight--galley"><h3>Zahlen aus der Kombüse</h3><div class="lb-galley-grid"><div><strong>${Number(d.abgegeben||0)}</strong><span>Abgaben</span></div><div><strong>${Number(d.nichtAbgegeben||0)}</strong><span>Nichtabgaben</span></div><div><strong>${Number(d.exakt||0)}</strong><span>Exakt</span></div><div><strong>${Number(d.differenz||0)}</strong><span>Differenz</span></div><div><strong>${Number(d.tendenz||0)}</strong><span>Tendenz</span></div></div></article>`;
 return "";
}


function cocoLogbookCard(entry){
 const ids=arr(entry?.spielIds).filter(Boolean);
 if(!ids.length||!window.CocoOracle)return "";
 const games=ids.map(id=>gameById.get(id)).filter(Boolean).filter(g=>Number.isFinite(g?.heimtore)&&Number.isFinite(g?.auswaertstore));
 if(!games.length)return "";
 let tendency=0,exact=0;
 for(const g of games){
   const ev=window.CocoOracle.evaluate(window.CocoOracle.predict(g.id),g.heimtore,g.auswaertstore);
   if(ev.tendencyHit)tendency+=1;
   if(ev.exact)exact+=1;
 }
 const quote=(tendency/games.length*100).toFixed(1).replace(".",",");
 return `<article class="lb-highlight lb-highlight--coco"><h3>Cocos Seemannsgarn</h3><p>So schlug sich das Orakel in diesem abgeschlossenen Wertungsblock.</p><div class="lb-scoreline"><div><strong>${tendency}/${games.length}</strong><span>Tendenztreffer</span></div><div><strong>${exact}</strong><span>Volltreffer</span></div><div><strong>${quote} %</strong><span>Trefferquote</span></div></div></article>`;
}
function renderHighlightsWithCoco(entry){
 const rows=[];
 let inserted=false;
 for(const h of shown(entry)){
   const rendered=renderHighlight(h);
   if(rendered)rows.push(rendered);

   if(h?.typ==="crewduell"){
     const form=formCrewCard(entry);
     if(form)rows.push(form);
   }

   if(h?.typ==="volltreffer"){
     const coco=cocoLogbookCard(entry);
     if(coco){rows.push(coco);inserted=true;}
   }
 }
 if(!inserted){
   const coco=cocoLogbookCard(entry);
   if(coco)rows.push(coco);
 }
 return rows.join("");
}


function formCrewCard(entry){
 const matchdays=arr(spieltagpunkteDoc?.spieltage).filter(md=>md?.abgeschlossen!==false);
 const index=matchdays.findIndex(md=>md?.id===entry?.id);
 if(index<=0)return "";

 const current=matchdays[index];
 const previous=matchdays[index-1];
 const prevById=new Map(arr(previous?.rangliste).map(row=>[row?.teilnehmerId,row]));

 const rows=[];
 arr(current?.rangliste).forEach((row,currentOrder)=>{
   const prev=prevById.get(row?.teilnehmerId);
   if(!prev)return;
   const before=Number(prev?.gesamtspieltagssiege);
   const now=Number(row?.gesamtspieltagssiege);
   if(!Number.isFinite(before)||!Number.isFinite(now))return;
   rows.push({
     order:currentOrder,
     name:row?.teilnehmer||row?.teilnehmerId||"",
     before,
     now,
     delta:Number((now-before).toFixed(4))
   });
 });

 // Bei gleichem Delta bleibt die vorhandene Kicktipp-Reihenfolge maßgeblich.
 rows.sort((a,b)=>b.delta-a.delta||a.order-b.order);
 const top=rows.slice(0,5);
 if(!top.length)return "";

 const fmt=value=>Math.abs(value).toLocaleString("de-DE",{minimumFractionDigits:2,maximumFractionDigits:4});
 const body=top.map((row,i)=>{
   const cls=row.delta>0?"is-up":row.delta<0?"is-down":"is-flat";
   const symbol=row.delta>0?"▲":row.delta<0?"▼":"—";
   const value=row.delta===0?"":` ${row.delta>0?"+":"-"}${fmt(row.delta)}`;
   return `<div class="lb-form-row">
     <span class="lb-form-rank">${i+1}.</span>
     <strong>${esc(row.name)}</strong>
     <span class="lb-form-course ${cls}">${symbol}${value}</span>
   </div>`;
 }).join("");

 return `<article class="lb-highlight lb-highlight--form">
   <h3>Form der Crew</h3>
   <p>Wer bekam beim letzten Wertungsblock den meisten Wind in die Segel?</p>
   <div class="lb-form-list">${body}</div>
   <small class="lb-form-note">Kurs = Veränderung des Kicktipp-S-Werts zum vorherigen abgeschlossenen Wertungsblock</small>
 </article>`;
}

function renderEntry(entry,pending){
 const host=$("#lb-current"); if(!host) return;
 if(pending?.active){
  host.innerHTML=`<section class="lb-entry lb-entry--pending"><header class="lb-entry-head"><span>${esc(pending.kicker)}</span><h2>${esc(keepSpieltag(pending.title))}</h2></header><div class="lb-pending-copy"><p>${esc(pending.text)}</p>${pending.detail?`<strong>${esc(pending.detail)}</strong>`:""}<small>Frühere abgeschlossene Logbücher bleiben unten im Archiv erreichbar.</small></div></section>`;
  document.title="Auswertung läuft | The Old Smugglers Club";
  return;
 }
 if(!entry){host.innerHTML='<div class="lb-status">Noch kein abgeschlossenes Logbuch vorhanden.</div>';return}
 host.innerHTML=`<section class="lb-entry"><header class="lb-entry-head"><span>${esc(entry.wettbewerb||"Spieltag")}</span><h2>${esc(keepSpieltag(entry.bezeichnung||entry.runde||"Logbuch"))}</h2></header><div class="lb-highlight-grid">${renderHighlightsWithCoco(entry)}</div></section>`;
 document.title=`${entry.bezeichnung||"Logbuch"} | The Old Smugglers Club`;
}
function archive(){
 const host=$("#lb-archive-list"); if(!host) return;
 const source=[...(data?.logbuecher||[])];
 const ordinalById=new Map(source.map((e,i)=>[e?.id,i+1]));
 const logs=[...source].reverse();
 host.innerHTML=logs.map((e,i)=>{
   const ordinal=ordinalById.get(e?.id)||source.indexOf(e)+1;
   const competition=labelType(e?.wettbewerb||e?.typ||"");
   const archiveLabel=`${ordinal}. Tippspieltag · ${competition}`;
   return `<button type="button" data-log-id="${esc(e.id)}" aria-current="${i===0?"true":"false"}">${esc(archiveLabel)}</button>`;
 }).join("");
 host.addEventListener("click",ev=>{
   const b=ev.target.closest("button[data-log-id]"); if(!b)return;
   const entry=(data.logbuecher||[]).find(x=>x.id===b.dataset.logId); renderEntry(entry,null);
   host.querySelectorAll("button").forEach(x=>x.setAttribute("aria-current",String(x===b)));
 });
}

async function fetchJson(path){
 try{const r=await fetch(path,{cache:"no-store"});if(!r.ok)return null;return await r.json()}catch(_){return null}
}
function flattenGames(doc){return arr(doc?.saisons).flatMap(s=>arr(s.spiele)).concat(arr(doc?.spiele))}
function activeMatchdays(doc){
 const seasons=arr(doc?.saisons);const active=seasons.find(s=>s?.aktiv===true)||seasons.find(s=>s?.id===doc?.aktiveSaison)||seasons[0];
 return arr(active?.tippspieltage).filter(md=>md?.aktiv!==false);
}
function gameStart(game){
 if(!game?.terminBestaetigt||!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(String(game.datum||""))||!/^[0-9]{2}:[0-9]{2}$/.test(String(game.anstoss||"")))return null;
 if(new Set(["verlegt","abgesagt","ausgefallen","termin-offen","offen"]).has(norm(game.status)))return null;
 const [y,m,d]=game.datum.split("-").map(Number),[hh,mm]=game.anstoss.split(":").map(Number);const dt=new Date(y,m-1,d,hh,mm,0,0);
 return Number.isNaN(dt.getTime())?null:dt;
}
function resolveGames(md,games){
 const byId=new Map(games.map(g=>[g.id,g]));
 if(arr(md?.spielIds).length)return md.spielIds.map(id=>byId.get(id)).filter(Boolean);
 const sel=md?.spielAuswahl||{};
 return games.filter(g=>{
  if(sel.wettbewerb&&g.wettbewerb!==sel.wettbewerb)return false;
  if(sel.spieltagNummer!=null&&Number(g.spieltagNummer)!==Number(sel.spieltagNummer))return false;
  if(sel.runde&&norm(g.runde)!==norm(sel.runde))return false;
  if(sel.teamId&&g.heimTeamId!==sel.teamId&&g.auswaertsTeamId!==sel.teamId)return false;
  return Boolean(sel.wettbewerb||sel.spieltagNummer!=null||sel.runde||sel.teamId);
 });
}
function logCoversGames(logs,games){
 const ids=games.map(g=>g?.id).filter(Boolean);if(!ids.length)return false;
 return logs.some(log=>{const set=new Set(arr(log?.spielIds));return ids.every(id=>set.has(id))});
}
function labelType(v){
 const n=norm(v);
 if(n==="bundesliga")return "Bundesliga";
 if(n==="champions-league")return "Champions League";
 if(n==="europa-league")return "Europa League";
 if(n==="dfb-pokal")return "DFB-Pokal";
 if(n==="smugglerauftrag"||n==="smugglerauftraege")return "Smugglerauftrag";
 if(n==="piratenkodex")return "Piratenkodex";
 if(n==="relegation")return "Relegation";
 return String(v||"Tippspieltag");
}
function descriptor(md,games){
 const starts=games.map(gameStart).filter(Boolean).sort((a,b)=>a-b);
 return {md,games,start:starts[0]||null,label:md?.name||`${labelType(md?.typ)} ${md?.nummer||""}`.trim()};
}
function pendingFromSchedule(logs,matchdayDoc,gameDoc,now){
 const games=flattenGames(gameDoc);if(!games.length)return [];
 return activeMatchdays(matchdayDoc).map(md=>descriptor(md,resolveGames(md,games))).filter(x=>x.start&&x.start<=now&&!logCoversGames(logs,x.games)).sort((a,b)=>a.start-b.start);
}
function explicitRunning(view){
 const b=view?.anzeige?.laufenderWertungsblock;
 if(!b||b.aktiv!==true)return null;
 const label=[labelType(b.wertung),b.runde].filter(Boolean).join(" · ");
 const ended=Number(b.beendet),total=Number(b.gesamt);
 return {label:label||"Aktueller Tippspieltag",detail:Number.isFinite(ended)&&Number.isFinite(total)&&total>0?`${ended} von ${total} Spielen abgeschlossen`:""};
}
function buildPending(view,matchdayDoc,gameDoc,logs){
 const explicit=explicitRunning(view);
 const now=new Date();
 const scheduled=pendingFromSchedule(logs,matchdayDoc,gameDoc,now);
 const names=[];
 if(explicit?.label)names.push(explicit.label);
 scheduled.forEach(x=>{if(!names.some(n=>norm(n)===norm(x.label)))names.push(x.label)});
 if(!names.length)return {active:false};
 const title="Die Beute wird noch gezählt";
 const text=names.length>1
  ?"Mehrere Tippspieltage haben bereits begonnen. Die alten Spieltagswerte bleiben verborgen, bis die betroffenen Wertungsblöcke vollständig ausgewertet sind."
  :"Der aktuelle Tippspieltag hat bereits begonnen. Die alten Spieltagswerte bleiben verborgen, bis der Wertungsblock vollständig ausgewertet ist.";
 const detail=explicit?.detail||(names.length?names.join(" · "):"");
 return {active:true,kicker:"Neuer Wertungsblock läuft",title,text,detail};
}

async function init(){
 try{
   const [logDoc,view,matchdays,games,spieltagpunkte]=await Promise.all([
     fetchJson("./spieltag-logbuch.json"),fetchJson("./website-view.json"),fetchJson("./tippspieltage.json"),fetchJson("./spieldaten.json"),fetchJson("./spieltagpunkte.json")
   ]);
   if(!logDoc)throw Error("spieltag-logbuch.json nicht erreichbar");
   data=logDoc; spieltagpunkteDoc=spieltagpunkte; gameById=new Map(flattenGames(games).map(g=>[g.id,g])); const latest=(data.logbuecher||[]).at(-1)||null;
   const pending=buildPending(view,matchdays,games,arr(data.logbuecher));
   renderThirtySeconds(latest,pending); renderEntry(latest,pending); archive();
   const st=$("#lb-status"); if(st) st.remove();
 }catch(e){
   const st=$("#lb-status"); if(st) st.textContent="Das Spieltags-Logbuch konnte nicht geladen werden.";
 }
}
document.readyState==="loading"?document.addEventListener("DOMContentLoaded",init,{once:true}):init();
})();
