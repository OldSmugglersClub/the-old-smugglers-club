// TOSMC LIVE: strikt schreibgeschuetzte Vorschau der 11 Sonderwettbewerbs-Anstosszeiten.
// Nur amtlich eindeutig bestaetigte Termine kommen als Abweichung in Frage.
import fs from 'node:fs';
import path from 'node:path';
import {run as checkOfficial} from './offizielle-quellen-browser.mjs';
import {validateTargetConfig,planOfficialChanges,applyOfficialChanges} from './terminwaechter-auto-core.mjs';

const REPO='OldSmugglersClub/the-old-smugglers-club';
if(process.env.GITHUB_ACTIONS==='true' &&
 (process.env.GITHUB_REPOSITORY!==REPO || process.env.GITHUB_REF!=='refs/heads/main'))
 throw Error('NUR_LIVE_MAIN_VORSCHAU');
if(process.env.TOSMC_MODE && process.env.TOSMC_MODE!=='VORSCHAU')throw Error('LIVE_WRITE_GESPERRT');
const root=process.cwd();
const dataPath=path.join(root,'spieldaten.json');
const configPath=path.join(root,'terminwaechter/offizielle-quellen.json');
const before=fs.readFileSync(dataPath,'utf8');
const data=JSON.parse(before);
const config=JSON.parse(fs.readFileSync(configPath,'utf8'));
const allowedIds=validateTargetConfig(data,config);
const result=await checkOfficial({config,siteGames:data});
for(const f of result.befunde||[]){
 const q=config.quellen.find(s=>s.spielIds?.includes(f.spielId));
 f.quellenName=q?.name||null;
}
if((result.befunde||[]).some(f=>!allowedIds.has(f.spielId)))throw Error('FREMDE_SPIEL_ID');
const plan=planOfficialChanges(data,result,{allowedIds,windowDays:56,maxChanges:11});
const proposed=applyOfficialChanges(data,plan,{allowedIds}); // Nur In-Memory-Kontrolle, kein Schreiben.
if(fs.readFileSync(dataPath,'utf8')!==before)throw Error('SPIELDATEN_WURDEN_VERAENDERT');
const report={repository:REPO,modus:'VORSCHAU',zeitpunkt:new Date().toISOString(),
 pruefstatus:result.status,verifiziert:result.verifiziert,termineOffen:result.termineOffen,
 zielspiele:allowedIds.size,geplanteAenderungen:plan.planned,
 quellen:result.quellen,befunde:result.befunde,
 dateienVeraendert:false,freigabeLiveSchreiben:false,
 hinweis:'Nur Vorschau. Auch bei amtlichen Abweichungen keine automatische Uebernahme.'};
fs.mkdirSync(path.join(root,'terminwaechter-bericht'),{recursive:true});
fs.writeFileSync(path.join(root,'terminwaechter-bericht/LIVE_11_VORSCHAU.json'),JSON.stringify(report,null,2)+'\n');
fs.writeFileSync(path.join(root,'terminwaechter-bericht/LIVE_11_VORSCHAU.md'),[
 '# LIVE Terminwaechter – 11 Spiele – nur Vorschau',
 `Status: ${result.status}; Paarungen: ${result.verifiziert}/${result.befunde.length}`,
 `Offene Termine: ${result.termineOffen}; Geplante Korrekturen: ${plan.planned.length}`,
 ...plan.planned.map(p=>`- ${p.id}: ${p.datum} ${p.anstoss}`),
 'Keine Website-Dateien veraendert. Keine LIVE-Write-Freigabe.'].join('\n')+'\n');
console.log(`LIVE READ ONLY: ${result.verifiziert}/${result.befunde.length}; offen ${result.termineOffen}; moegliche Aenderungen ${plan.planned.length}.`);
if(result.status!=='GEPRUEFT')process.exitCode=2;
