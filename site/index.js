import { runCommonPageUpdates } from "/modules/common.js";
import { buildReferencesSection } from "/modules/generate-dom.js";
import { userConfig, selectRandomGreeting } from "/modules/site-config.js";


// Highlight.js | Setup
window.addEventListener(
  "load",
  () => {
    // runCommonPageUpdates();
    // document.getElementById("header-catchphrase").innerHTML = selectRandomGreeting();
    // document.getElementById("greeting").innerHTML = `Welcome, ${userConfig.name}!`;
    // buildReferencesSection(
    //   "reference-links-container",
    //   {
    //     "highlight.js (Syntax Highlighting)": "https://highlightjs.org/",
    //     "Plotly (Graphing and Data Plotting)": "https://plotly.com/javascript/",
    //     "Paper.js (Canvas Graphics Library)": "http://paperjs.org/",
    //     "GitHub Official Logos": "https://github.com/logos",
    //   }
    // );
    return;
  },
);
