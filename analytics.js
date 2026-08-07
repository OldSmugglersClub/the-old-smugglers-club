/* The Old Smugglers Club – Website Analytics
 * Version 4.7.2-TEST1
 * Zweck: ausschließlich Pageviews der freigegebenen öffentlichen Inhaltsseiten.
 * GoatCounter-Konto: oldsmugglersclub
 * Fehler oder Blockierung dieses Skripts dürfen keine Website-Funktion beeinflussen.
 */
(function () {
  'use strict';

  try {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://gc.zgo.at/count.js';
    script.setAttribute('data-goatcounter', 'https://oldsmugglersclub.goatcounter.com/count');
    script.onerror = function () {
      /* Analytics ist optional; bewusst keine sichtbare Fehlermeldung. */
    };
    document.head.appendChild(script);
  } catch (_) {
    /* Fail-open: Die Website bleibt ohne Analytics vollständig nutzbar. */
  }
})();
