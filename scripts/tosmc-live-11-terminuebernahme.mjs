// TOSMC LIVE – 11 amtlich bestaetigte Sonderwettbewerb-Termine. Fail closed.
// Keine Tipps, Resultate, Rankings, Wettbewerbseinstellungen oder fremde Spiele aendern.
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
const allowedIds=validateTargetConfig(before,config);
const reportDir=path.join(root,'terminwaechter-bericht');fs.mkdirSync(reportDir,{recursive:true});
const found=await checkOfficial({config,siteGames:before});
const all=found.befunde||[];
const seen=new Set();
for(const f of all){
 if(!allowedIds.has(f.spielId)||seen.has(f.spielId))throw Error('QUELLENBEFUND_FREMD_ODER_DOPPELT:'+f.spielId);
 seen.add(f.spielId);
 const source=config.quellen.find(q=>q.spielIds?.includes(f.spielId));
 f.quellenName=source?.name||null;
}
if(found.status!=='GEPRUEFT'||all.length!==11||seen.size!==11||found.verifiziert!==11)throw Error('OFFIZIELLER_QUELLENBERICHT_NICHT_VOLLSTAENDIG');
if(all.some(f=>!['IDENTISCH','ABWEICHUNG','PAARUNG_GEFUNDEN_TERMIN_OFFEN'].includes(f.status)))throw Error('UNZULAESSIGER_QUELLENSTATUS');
const plan=planOfficialChanges(before,found,{allowedIds,windowDays:56,maxChanges:11});
const next=applyOfficialChanges(before,plan,{allowedIds});
if(fs.readFileSync(dataPath,'utf8')!==originalText)throw Error('SPIELDATEN_WAEHREND_PRUEFUNG_GEAENDERT');
const changes=plan.planned.map(p=>({spielId:p.id,alt:(before.saisons.flatMap(s=>s.spiele||[]).find(g=>g.id===p.id)||{}),neu:p})).map(p=>({spielId:p.spielId,alt:{datum:p.alt.datum,anstoss:p.alt.anstoss},neu:{datum:p.neu.datum,anstoss:p.neu.anstoss}}));
const report={repository:REPO,modus:mode,zeitpunkt:new Date().toISOString(),quellenStatus:found.status,pruefbarePaarungen:all.length,termineOffen:found.termineOffen,freigabeNurElfSpiele:true,geplanteAenderungen:changes,uebernommen:false,befunde:all,quellen:found.quellen};
const emit=()=>{
 fs.writeFileSync(path.join(reportDir,'LIVE_11_TERMINAUTOMATIK.json'),JSON.stringify(report,null,2)+'\n');
 fs.writeFileSync(path.join(reportDir,'LIVE_11_TERMINAUTOMATIK.md'),['# LIVE – elf Sonderwettbewerbstermine',`Modus: ${mode}`,`Quellenstatus: ${found.status}`,`Paarungen: ${all.length}/11`,`Offene Termine: ${found.termineOffen}`,`Geplante Datumsupdates: ${changes.length}`,`Uebernommen: ${report.uebernommen?'Ja':'Nein'}`,...changes.map(c=>`${c.spielId}: ${c.alt.datum} ${c.alt.anstoss} -> ${c.neu.datum} ${c.neu.anstoss}`),'Andere Spiele, Tipps, Resultate, Admin und OpenLigaDB werden nicht veraendert.',''].join('\n'));
};emit();
if(mode==='UEBERNEHMEN'&&changes.length){
 let snapshotText=null,updatedSnapshot=null;
 if(fs.existsSync(snapshotPath)){
  snapshotText=fs.readFileSync(snapshotPath,'utf8');
  const snapshot=JSON.parse(snapshotText);
  updatedSnapshot=updateScheduleSnapshot(snapshot,next,changes.map(c=>c.spielId));
 }
 fs.writeFileSync(dataPath,JSON.stringify(next,null,2)+'\n');
 if(updatedSnapshot!==null&&JSON.stringify(JSON.parse(snapshotText))!==JSON.stringify(updatedSnapshot))fs.writeFileSync(snapshotPath,JSON.stringify(updatedSnapshot,null,2)+'\n');
 report.uebernommen=true;emit();
}
console.log(`LIVE: Quellen ${found.status}, Paarungen ${all.length}/11, offen ${found.termineOffen}, Aenderungen ${changes.length}, geschrieben ${report.uebernommen}`);
