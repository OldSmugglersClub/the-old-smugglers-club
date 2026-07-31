(() => {
  "use strict";

  const DEFAULT_REGISTER = "./assets/smugglers-design-system/schmugglersiegel/schmugglersiegel-register.json";
  let registerPromise = null;
  let register = { teams: {} };

  const fallbackInitials = (teamId, teamName) => {
    const ignored = new Set(["fc", "sc", "sv", "vfl", "vfb", "tsg", "1.", "04", "05", "09"]);
    const parts = String(teamName || teamId || "Team")
      .split(/[\s-]+/)
      .filter(Boolean)
      .filter(part => !ignored.has(part.toLowerCase()));
    return (parts.map(part => part[0]).join("").slice(0, 4) || "TEAM").toUpperCase();
  };

  const load = (url = DEFAULT_REGISTER) => {
    if (!registerPromise) {
      registerPromise = fetch(url, { cache: "no-store" })
        .then(response => {
          if (!response.ok) throw new Error(`Schmugglersiegel-Register konnte nicht geladen werden (${response.status})`);
          return response.json();
        })
        .then(data => {
          register = data && typeof data === "object" ? data : { teams: {} };
          return register;
        })
        .catch(error => {
          console.warn(error);
          register = { teams: {} };
          return register;
        });
    }
    return registerPromise;
  };

  const resolve = (teamId, teamName) => {
    const entry = register.teams?.[teamId] || null;
    return {
      teamId,
      name: entry?.name || teamName || "Team offen",
      initials: entry?.kuerzel || fallbackInitials(teamId, teamName),
      src: entry?.datei || (teamId ? `./assets/smugglers-design-system/schmugglersiegel/${teamId}.svg` : "")
    };
  };

  const render = (element, teamId, teamName, options = {}) => {
    if (!element) return;
    const badge = resolve(teamId, teamName);
    const fallback = document.createElement("span");
    fallback.textContent = badge.initials;
    fallback.setAttribute("aria-hidden", "true");
    element.replaceChildren(fallback);
    element.setAttribute("aria-label", options.ariaLabel || `Schmugglersiegel ${badge.name}`);

    if (!badge.src) return;
    const image = document.createElement("img");
    image.alt = options.alt ?? "";
    image.decoding = "async";
    image.loading = options.loading || "eager";
    image.src = badge.src;
    image.addEventListener("load", () => element.replaceChildren(image), { once: true });
    image.addEventListener("error", () => element.replaceChildren(fallback), { once: true });
  };

  window.OSCTeamBadge = Object.freeze({ load, resolve, render, fallbackInitials });
})();
