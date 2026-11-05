// TOSMC LIVE – Sondertermine DYN2: dynamische Anzahl aktiver Spiele; fail closed.
// Nur noch nicht beendete Zielspiele; keine anderen Spiele oder Wertungen aendern.
import fs from 'node:fs';
import path from 'node:path';
import {run as checkOfficial} from './offizielle-quellen-browser.mjs';
import {validateTargetConfig,planOfficialChanges,applyOfficialChanges,updateScheduleSnapshot} from './terminwaechter-auto-core.mjs';

const REPO='OldSmugglersClub/the-old-smugglers-club';
const GUARD='LIVE_NUR_11_AMTLICH_BESTAETIGTE_ANSTOSSZEITPUNKTE';
const mode=process.env.TOSMC_MODE||'VORSCHAU';
if(!['VORSCHAU','UEBERNEHMEN'].includes(mode))throw Error('UNGUELTIGER_MODUS');
if(process.env.GITHUB_ACTIONS==='true'&&(process.env.GITHUB_REPOSITORY!==REPO||process.env.GITHUB_REF!=='refs/heads/main'))throw Error('NUR_LIVE_MAIN');
if(mode==='UEBERNEHMEN'&&process.env.TOSMC_FREIGABE!==GUARD)throw Error('LIVE_SCHREIBFREIGABE_FEHLT');
const root=process.cwd(),dataPath=path.join(root,'spieldaten.json'),snapshotPath=path.join(root,'schedule-terminstand.json');
const originalText=fs.readFileSync(dataPath,'utf8');
const before=JSON.parse(originalText);
const config=JSON.parse(fs.readFileSync(path.join(root,'terminwaechter/offizielle-quellen.json'),'utf8'));
const configuredIds=validateTargetConfig(before,config);
if(configuredIds.size!==11)throw Error('KONFIGURIERTE_ZIELSPIELE_NICHT_11');
const games=new Map(before.saisons.flatMap(s=>s.spiele||[]).map(g=>[g.id,g]));
// Ausschliesslich explizit als beendet markierte Spiele verlassen die aktive Pruefmenge.
// Unbekannte Stati bleiben aktiv und koennen nicht stillschweigend entfallen.
const completedIds=new Set([...configuredIds].filter(id=>games.get(id)?.status==='beendet'));
const allowedIds=new Set([...configuredIds].filter(id=>!completedIds.has(id)));
const reportDir=path.join(root,'terminwaechter-bericht');fs.mkdirSync(reportDir,{recursive:true});
const report={repository:REPO,version:'LIVE-11-TERMIN-DYN2',modus:mode,zeitpunkt:new Date().toISOString(),
 konfiguriert:configuredIds.size,abgeschlossen:completedIds.size,aktiv:allowedIds.size,
 abgeschlosseneSpielIds:[...completedIds],aktiveSpielIds:[...allowedIds],
 quellenStatus:'NICHT_GEPRUEFT',pruefbarePaarungen:0,verifiziert:0,termineOffen:null,
 freigabeNurElfSpiele:true,geplanteAenderungen:[],uebernommen:false,befunde:[],quellen:[]};
const emit=()=>{
 fs.writeFileSync(path.join(reportDir,'LIVE_11_TERMINAUTOMATIK.json'),JSON.stringify(report,null,2)+'\n');
 fs.writeFileSync(path.join(reportDir,'LIVE_11_TERMINAUTOMATIK.md'),[
 '# LIVE – Sondertermine DYN2',`Modus: ${mode}`,`Konfiguriert: ${report.konfiguriert}`,
 `Abgeschlossen: ${report.abgeschlossen}`,`Aktiv: ${report.aktiv}`,
 `Quellenstatus: ${report.quellenStatus}`,`Gepruefte aktive Paarungen: ${report.pruefbarePaarungen}/${report.aktiv}`,
 `Offene Termine: ${report.termineOffen??'nicht ermittelt'}`,`Geplante Datumsupdates: ${report.geplanteAenderungen.length}`,
 `Uebernommen: ${report.uebernommen?'Ja':'Nein'}`,
 ...(report.fehler?[`Fehler: ${report.fehler}`]:[]),
 ...report.geplanteAenderungen.map(c=>`${c.spielId}: ${c.alt.datum} ${c.alt.anstoss} -> ${c.neu.datum} ${c.neu.anstoss}`),
 'Andere Spiele, Tipps, Resultate, Admin und OpenLigaDB werden nicht veraendert.',''].join('\n'));
};
emit();
try{
 // Keine externen Anfragen mehr, sobald alle elf Zielspiele beendet sind.
 if(allowedIds.size===0){report.quellenStatus='KEINE_AKTIVEN_SPIELE';emit();console.log('LIVE: alle 11 Zielspiele abgeschlossen; keine Aenderung');}
 else{
  const activeConfig={...config,quellen:config.quellen.map(q=>({...q,spielIds:(q.spielIds||[]).filter(id=>allowedIds.has(id))})).filter(q=>q.spielIds.length)};
  const found=await checkOfficial({config:activeConfig,siteGames:before});
  const all=found.befunde||[];const seen=new Set();
  report.quellenStatus=found.status;report.pruefbarePaarungen=all.length;
  report.verifiziert=found.verifiziert;report.termineOffen=found.termineOffen;
  report.befunde=all;report.quellen=found.quellen;
  for(const f of all){
   if(!allowedIds.has(f.spielId)||seen.has(f.spielId))throw Error('QUELLENBEFUND_FREMD_ODER_DOPPELT:'+f.spielId);
   seen.add(f.spielId);
   const source=activeConfig.quellen.find(q=>q.spielIds?.includes(f.spielId));
   f.quellenName=source?.name||null;
  }
  emit(); // Auch bei fehlerhafter Vollstaendigkeit steht der Befund im Artefakt.
  if(found.status!=='GEPRUEFT'||all.length!==allowedIds.size||seen.size!==allowedIds.size||found.verifiziert!==allowedIds.size)
   throw Error(`OFFIZIELLER_QUELLENBERICHT_NICHT_VOLLSTAENDIG:${all.length}/${allowedIds.size}`);
  if(all.some(f=>!['IDENTISCH','ABWEICHUNG','PAARUNG_GEFUNDEN_TERMIN_OFFEN'].includes(f.status)))throw Error('UNZULAESSIGER_QUELLENSTATUS');
  const plan=planOfficialChanges(before,found,{allowedIds:configuredIds,windowDays:56,maxChanges:11});
  const next=applyOfficialChanges(before,plan,{allowedIds:configuredIds});
  if(fs.readFileSync(dataPath,'utf8')!==originalText)throw Error('SPIELDATEN_WAEHREND_PRUEFUNG_GEAENDERT');
  const changes=plan.planned.map(p=>({spielId:p.id,alt:before.saisons.flatMap(s=>s.spiele||[]).find(g=>g.id===p.id),neu:p}))
   .map(p=>({spielId:p.spielId,alt:{datum:p.alt.datum,anstoss:p.alt.anstoss},neu:{datum:p.neu.datum,anstoss:p.neu.anstoss}}));
  report.geplanteAenderungen=changes;emit();
  if(mode==='UEBERNEHMEN'&&changes.length){
   let snapshotText=null,updatedSnapshot=null;
   if(fs.existsSync(snapshotPath)){
    snapshotText=fs.readFileSync(snapshotPath,'utf8');
    updatedSnapshot=updateScheduleSnapshot(JSON.parse(snapshotText),next,changes.map(c=>c.spielId));
   }
   fs.writeFileSync(dataPath,JSON.stringify(next,null,2)+'\n');
   if(updatedSnapshot!==null&&JSON.stringify(JSON.parse(snapshotText))!==JSON.stringify(updatedSnapshot))fs.writeFileSync(snapshotPath,JSON.stringify(updatedSnapshot,null,2)+'\n');
   report.uebernommen=true;emit();
  }
  console.log(`LIVE DYN2: ${all.length}/${allowedIds.size} aktive Paarungen, ${completedIds.size} abgeschlossen, ${changes.length} Aenderungen, geschrieben ${report.uebernommen}`);
 }
}catch(error){report.fehler=String(error.message||error);emit();throw error;}
