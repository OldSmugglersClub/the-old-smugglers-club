import fs from 'node:fs';

// Nur die Darstellung desselben Anstosszeitpunkts. Keine Status-, Quellen-,
// Versions-, Ergebnis-, Admin- oder sonstigen Wettbewerbsfelder schreiben.
const DATE_FIELDS = ['datum','datumVon','datumBis','datumAnzeige','anstoss'];
const COMPETITIONS = new Set(['piratenkodex','weihnachtsregatta']);
const dateOK = s => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s+'T12:00:00Z')) && new Date(s+'T12:00:00Z').toISOString().slice(0,10)===s;
const timeOK = s => typeof s === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(s);
const display = d => {const [y,m,day]=d.split('-');return `${day}.${m}.${y}`;};
const dayNum = d => Math.floor(Date.parse(`${d}T12:00:00Z`)/86400000);
const clone = x => JSON.parse(JSON.stringify(x));
const games = data => (data.saisons||[]).flatMap(s=>Array.isArray(s.spiele)?s.spiele:[]);

export function validateTargetConfig(data,config){
  if(!data||!Array.isArray(data.saisons)||!config||!Array.isArray(config.quellen)) throw Error('UNGUELTIGE_EINGABE');
  // Die elf festen IDs bleiben auch nach einzelnen Vollabschluessen in der
  // Whitelist. Ein beendetes Spiel darf nie erneut geaendert werden.
  const all=games(data).filter(g=>COMPETITIONS.has(g.wettbewerb));
  const byId=new Map();
  for(const g of all){
    if(byId.has(g.id))throw Error('DOPPELTE_SPIEL_ID_IM_BESTAND:'+g.id);
    byId.set(g.id,g);
  }
  const targets=config.quellen.flatMap(q=>(q.spielIds||[]).map(id=>({id,source:q.name})));
  const seen=new Set();
  for(const t of targets){
    if(seen.has(t.id))throw Error('DOPPELTE_ZIELSPIEL_ID:'+t.id);
    seen.add(t.id);
    if(!byId.has(t.id))throw Error('NICHT_FREIGEGEBENES_ZIELSPIEL:'+t.id);
  }
  if(targets.length!==11||seen.size!==11)throw Error(`ZIELBESTAND_NICHT_EXAKT_11:${targets.length}/${seen.size}`);
  const ids=seen;
  return ids;
}

export function planOfficialChanges(data,report,{now=new Date(),windowDays=56,maxChanges=11,allowedIds}={}){
  if(!data||!Array.isArray(data.saisons)||!report||!Array.isArray(report.befunde))throw Error('EINGABE_UNGUELTIG');
  if(!(allowedIds instanceof Set)||allowedIds.size!==11)throw Error('EXAKTE_ZIELSPIELLISTE_ERFORDERLICH');
  if(!Number.isFinite(now.getTime()))throw Error('ZEIT_UNGUELTIG');
  const today=now.toISOString().slice(0,10), start=dayNum(today)-1, end=dayNum(today)+windowDays;
  const byId=new Map(games(data).map(g=>[g.id,g]));
  const sourceStatus=new Map((report.quellen||[]).map(q=>[q.name,q.status]));
  const planned=[];const seen=new Set();
  for(const f of report.befunde){
    if(f.status!=='ABWEICHUNG')continue;
    if(!allowedIds.has(f.spielId))throw Error('FREMDE_ABWEICHUNG_BLOCKIERT:'+f.spielId);
    if(seen.has(f.spielId))throw Error('DOPPELTER_BEFUND:'+f.spielId);seen.add(f.spielId);
    const g=byId.get(f.spielId);
    if(!g||!COMPETITIONS.has(g.wettbewerb)||g.status==='beendet'||Number.isInteger(g.heimtore)||Number.isInteger(g.auswaertstore))throw Error('GESCHUETZTES_SPIEL:'+f.spielId);
    if(!dateOK(f.amtlich?.datum)||!timeOK(f.amtlich?.anstoss))throw Error('UNGESICHERTER_TERMIN:'+f.spielId);
    if(!f.quellenName||sourceStatus.get(f.quellenName)!=='SPIELE_EXTRAHIERT')throw Error('QUELLE_UNSICHER:'+f.spielId);
    if(g.datum===f.amtlich.datum&&g.anstoss===f.amtlich.anstoss)continue;
    const officialDay=dayNum(f.amtlich.datum);
    if(officialDay<start||officialDay>end)continue;
    planned.push({id:g.id,datum:f.amtlich.datum,anstoss:f.amtlich.anstoss});
  }
  if(planned.length>maxChanges)throw Error('ZU_VIELE_AENDERUNGEN');
  return {today,planned};
}

export function applyOfficialChanges(data,plan,{allowedIds}={}){
  if(!(allowedIds instanceof Set)||allowedIds.size!==11)throw Error('EXAKTE_ZIELSPIELLISTE_ERFORDERLICH');
  const next=clone(data), map=new Map(games(next).map(g=>[g.id,g]));
  for(const p of plan.planned){
    if(!allowedIds.has(p.id))throw Error('NICHT_ERLAUBTES_SPIEL:'+p.id);
    const g=map.get(p.id);
    if(!g||!COMPETITIONS.has(g.wettbewerb)||g.status==='beendet'||Number.isInteger(g.heimtore)||Number.isInteger(g.auswaertstore))throw Error('GESCHUETZTES_SPIEL:'+p.id);
    for(const k of DATE_FIELDS)if(!(k in g))throw Error('TERMINFELD_FEHLT:'+p.id+':'+k);
    g.datum=p.datum;g.datumVon=p.datum;g.datumBis=p.datum;g.datumAnzeige=display(p.datum);g.anstoss=p.anstoss;
  }
  // Schutz durch vollstaendigen Vorher/Nachher-Diff: nur fuenf Datums-/Uhrzeit-Reprasentationen.
  const reference=clone(data);const original=new Map(games(reference).map(g=>[g.id,g]));
  for(const p of plan.planned){const after=map.get(p.id), before=original.get(p.id);for(const k of DATE_FIELDS)before[k]=after[k];}
  if(JSON.stringify(reference)!==JSON.stringify(next))throw Error('SCHUTZVERLETZUNG');
  return next;
}

export function updateScheduleSnapshot(snapshot,data,plannedIds){
  const next=clone(snapshot||{schemaVersion:1,updatedAt:null,entries:{}}), map=new Map(games(data).map(g=>[g.id,g]));
  for(const id of plannedIds){
    const g=map.get(id), existing=next.entries?.[id];
    if(!g||!COMPETITIONS.has(g.wettbewerb))throw Error('SNAPSHOT_FREMDES_SPIEL:'+id);
    if(!existing)continue; // keine neuen Eintraege oder Metadaten erfinden
    for(const k of ['datum','datumVon','datumBis','anstoss'])if(k in existing)existing[k]=g[k];
  }
  return next;
}
export function writeIfChanged(file,data){fs.writeFileSync(file,JSON.stringify(data,null,2)+'\n','utf8');}
