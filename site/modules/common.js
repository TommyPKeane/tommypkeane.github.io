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
