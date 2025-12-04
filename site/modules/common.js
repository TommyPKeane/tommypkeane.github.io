import { getClassesList } from "/modules/utils.js";
import { sitemap_toc } from "/modules/site-toc.js";
import {
  buildModalSiteNavigation,
  buildSiteHeader,
  buildSiteFooter
} from "/modules/generate-dom.js";
import {
  updateCodeFiguresWithLineNumbers,
  updateFigureCaptions,
} from "/modules/figures.js";
import {
  // setupFeatherJs,
  setupHighlightJs,
  // setupKatexJs,
  // setupMermaidJs,
} from "/modules/libraries.js";


export const runCommonPageUpdates = function hstRunCommonPageUpdates() {
  const fileLastModifiedDateTime = document.lastModified;
  console.log(`Page Last Modified: ${fileLastModifiedDateTime}`);
  console.group("Look Away!");
  console.log("There's nothing here, sorry...");
  buildModalSiteNavigation(sitemap_toc);
  // buildSiteHeader();
  // buildSiteFooter();
  // updateFigureCaptions();
  // updateCodeFiguresWithLineNumbers();
  // Libraries
  // setupFeatherJs();
  setupHighlightJs();
  // setupKatexJs();
  // setupMermaidJs();
  return;
}

export const setHeptagonVisibility = function hstSetHeptagonVisibility(layer_name) {
  let heptagon_img = document.getElementById("heptagon");
  let svg_content = heptagon_img.contentDocument;
  let all_groups = svg_content.getElementsByTagName("g");

  Array.from(all_groups).forEach(
    function hstAssignHoverSwap(group_obj) {
      let group_mode = group_obj.getAttribute("inkscape:groupmode");

      if (!group_mode) {}
      else if (group_mode == "layer") {
        let crnt_layer_name = group_obj.getAttribute("inkscape:label");
        if (!crnt_layer_name) {}
        else if (crnt_layer_name == layer_name) { // Current Segment
          group_obj.style.visibility = "visible";
        } else if (crnt_layer_name == "Heptagon") { // Background
          group_obj.style.visibility = "visible";
        } else {
          group_obj.style.visibility = "hidden";
        }
      } else {}

      return;
    }
  );

  return;
}

export const swapButtonPngGif = function hstSwapButtonPngGif() {
  let button_obj = this;
  let img_obj = button_obj.getElementsByTagName("img")[0];
  let img_src = img_obj.getAttribute("src");

  if (img_src.endsWith(".png")) {
    img_obj.setAttribute("src", img_src.replace(".png", ".gif"));

    if (button_obj.id == "button-art") {
      setHeptagonVisibility("BottomLeft");
    } else if (button_obj.id == "button-writing") {
      setHeptagonVisibility("Left");
    } else if (button_obj.id == "button-software") {
      setHeptagonVisibility("TopLeft");
    } else if (button_obj.id == "button-games") {
      setHeptagonVisibility("TopRight");
    } else if (button_obj.id == "button-diy") {
      setHeptagonVisibility("Right");
    } else if (button_obj.id == "button-faqs") {
      setHeptagonVisibility("BottomRight");
    } else {}
  } else if (img_src.endsWith(".gif")) {
    img_obj.setAttribute("src", img_src.replace(".gif", ".png"));
    setHeptagonVisibility("Bottom");
  } else {}

  return;
}
