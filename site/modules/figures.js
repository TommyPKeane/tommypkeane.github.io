/**
 * @file Common Utility Methods for HTML figure Elements
 * @module modules/figures.js
 *
 * ...
 *
 * @exports updateFigureCaptions
 *
 * @author Tommy P. Keane <talk.to.tommypkeane@gmail.com>
 * @copyright Tommy P. Keane, 2023 (https://www.tommypkeane.com)
 * @license CC-BY-4.0
 * @version 1.0.0
 */
import { getClassesList } from "/modules/utils.js";
import { range } from "/modules/python.js";


export const updateCodeFiguresWithLineNumbers = function hstUpdateCodeFiguresWithLineNumbers() {
  document.querySelectorAll(".codeFigure").forEach(
    (figureElement) => {
      const codeElement = figureElement.removeChild(figureElement.querySelector("pre"));
      const codeContainer = document.createElement("div");
      codeContainer.setAttribute("class", "codeContainer");
      const originalCode = codeElement.querySelector("code");

      const numLines = (codeElement.textContent.match(/\n/g) || []).length;

      const lineNumbersPre = document.createElement("pre");
      const lineNumbersCode = document.createElement("code");
      lineNumbersCode.textContent = range(1, numLines-1).join("\n");
      lineNumbersCode.setAttribute("class", `${originalCode.getAttribute("class")} lineNumbers`);
      codeElement.setAttribute("class", "sourceCode");

      lineNumbersPre.appendChild(lineNumbersCode);

      codeContainer.appendChild(lineNumbersPre);
      codeContainer.appendChild(codeElement);

      figureElement.insertBefore(codeContainer, figureElement.firstChild)
    },
  );
}


export const updateFigureCaptions = function hstUpdateFigureCaptions() {
  let _figCount = 0;
  let _eqCount = 0;
  let _listCount = 0;
  let _canvasCount = 0;
  document.querySelectorAll("figcaption").forEach(
    (el) => {
      const figureClassNames = getClassesList(el.parentNode);
      if (figureClassNames) {
        if (figureClassNames.includes("imageFileDownloadFigure")) {
          const downloadIcon = document.createElement("img");
          downloadIcon.setAttribute("class", "icon");
          downloadIcon.setAttribute("alt", "Download Arrow");
          downloadIcon.setAttribute("data-feather", "download");
          var textContent = document.createTextNode(` ${el.innerHTML}`);
          el.innerHTML = "";
          el.appendChild(downloadIcon);
          el.appendChild(textContent);
        } else if (figureClassNames.includes("codeFigure")) {
          _listCount += 1;
          el.innerHTML = `Listing ${_listCount}: ${el.innerHTML}`;
        } else if (figureClassNames.includes("paperFigure")) {
          _canvasCount += 1;
          el.innerHTML = `Canvas ${_canvasCount}: ${el.innerHTML}`;
        } else if (figureClassNames.includes("threejsFigure")) {
          _canvasCount += 1;
          // pass
        } else if (figureClassNames.includes("katexEquation")) {
          _eqCount += 1;
          el.innerHTML = `Eq. ${_eqCount}: ${el.innerHTML}`;
        } else {
          _figCount += 1;
          el.innerHTML = `Fig. ${_figCount}: ${el.innerHTML}`;
        }
      } else {}
    }
  )
  return;
}
