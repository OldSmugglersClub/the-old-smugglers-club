import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const script = fs.readFileSync(path.join(root, "wettbewerb.js"), "utf8");

const requiredSnippets = [
  'if (slug !== "champions-league") return false;',
  'if (!matches.length) return false;',
  'root.appendChild(schedule);\n    return true;',
  'if (championsLeaguePhaseOverviewRendered && section.typ === "spiele" && section.zentral === true) return;'
];

for (const snippet of requiredSnippets) {
  if (!script.includes(snippet)) throw new Error(`HF64-Schutz fehlt: ${snippet}`);
}

for (const page of [
  "bundesliga.html",
  "champions-league.html",
  "dfb-pokal.html",
  "dynamo-dresden.html",
  "europa-league.html",
  "piratenkodex.html",
  "relegation.html",
  "weihnachtsregatta.html"
]) {
  const html = fs.readFileSync(path.join(root, page), "utf8");
  if (!html.includes('wettbewerb.js?v=4.9.2-HF12-HF64')) {
    throw new Error(`${page}: gemeinsame HF64-Skriptkennung fehlt`);
  }
}

console.log("CL-Doppellisten-Prüfung bestanden: obere Ligaphasenansicht ersetzt die zentrale Doppelliste; Fallback bleibt erhalten.");
