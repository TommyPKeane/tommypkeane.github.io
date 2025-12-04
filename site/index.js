import {
  runCommonPageUpdates
  , setHeptagonVisibility
  , swapButtonPngGif
} from "/modules/common.js";
import { buildReferencesSection } from "/modules/generate-dom.js";
import { userConfig, selectRandomGreeting } from "/modules/site-config.js";


// Highlight.js | Setup
window.addEventListener(
  "load",
  () => {

    // Setup Button Hovers
    let main_buttons_arr = document.getElementsByClassName("main-img-button");

    Array.from(main_buttons_arr).forEach(
      function hstAssignHoverSwap(button_obj) {
        button_obj.addEventListener("mouseover", swapButtonPngGif);
        button_obj.addEventListener("mouseout", swapButtonPngGif);
      }
    );

    setHeptagonVisibility("Bottom");


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
