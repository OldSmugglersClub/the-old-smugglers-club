(async()=>{
  try{
    const u=window.OSCDataRegistry?await window.OSCDataRegistry.url('highscore'):'./highscore.json';
    const r=await fetch(u,{cache:'no-store'});
    if(!r.ok)return;
    const d=await r.json();

    const individual=d.individual?.overall||[];
    const matchday=d.individual?.matchday||[];
    const leader=individual.find(row=>Number(row.totalPoints||0)>0);

    document.querySelector('#hs-leader-name').textContent=leader?.name||'Saisonstart';
    document.querySelector('#hs-leader-points').textContent=leader
      ? `${Number(leader.totalPoints||0).toLocaleString('de-DE',{maximumFractionDigits:2})} Punkte`
      : 'Alle starten bei 0 Punkten';

    const matchdayLabel=String(d.meta?.matchday||'Letzter Spieltag').trim();
    const split=matchdayLabel.match(/^(.*?)(\d+\.\s*Spieltag)$/i);
    const matchdayName=document.querySelector('#hs-matchday-name');
    if(split){
      matchdayName.replaceChildren();
      const first=document.createElement('span');
      first.textContent=split[1].trim();
      const second=document.createElement('span');
      second.textContent=split[2].trim();
      matchdayName.append(first,second);
    }else{
      matchdayName.textContent=matchdayLabel;
    }

    const best=matchday.find(row=>Number(row.points||0)>0);
    document.querySelector('#hs-matchday-winner').textContent=best
      ? `${best.name} · ${Number(best.points||0).toLocaleString('de-DE',{maximumFractionDigits:2})} Punkte`
      : 'Noch ohne Wertung';

    const duel=d.teams?.duel;
    const teams=d.teams?.overall||[];
    const top=teams[0], second=teams[1];
    const topValue=Number(top?.averagePoints??top?.totalPoints??0);
    const secondValue=Number(second?.averagePoints??second?.totalPoints??0);
    const tie=duel?.label==='Gleichstand'||!top||!second||topValue===secondValue;

    document.querySelector('#hs-team-leader').textContent=tie?'Gleichstand':top.name;
    document.querySelector('#hs-team-points').textContent=duel?.display
      || `${topValue.toLocaleString('de-DE',{minimumFractionDigits:1,maximumFractionDigits:1})} : ${secondValue.toLocaleString('de-DE',{minimumFractionDigits:1,maximumFractionDigits:1})}`;
  }catch(e){
    console.warn('Highscore konnte nicht geladen werden.',e);
  }
})();