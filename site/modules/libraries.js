/**
 * Utility Methods for Setup/Management of Third-Party Libraries
 *
 * Most of the code running this website is custom (written by me), but there
 * are third-party libraries used to do things like syntax highlighting, canvas
 * drawing, or creating equations from TeX syntax.
 *
 * This module provides the utility methods that are necessary to setup and
 * configure those libraries for my usage here on this website. This may or may
 * not help you, as you may or may not want the same configuration that I want
 * -- or may or may not want to make the same mistakes I've probably made 👻.
 *
 * Copyright (c) 2023, Tommy P. Keane
 * CC-BY 4.0
 */
import hljs from "/thirdparty/highlight/es/core.min.js";


/**
 * feater.js Library Module
 *
 * This is a safety fallback definition to allow this code to be generically
 * imported on any page without any failures/errors. If the requisite feather.js
 * Library has not been loaded, then this function reference will be undefined.
 *
 * @type module
 */
let feather = window.feather || undefined;

/**
 * Perform a safety check, then Setup and Configure feather.js
 *
 * @return Nothing to Return
 */
export const setupFeatherJs = function hstSetupFeatherJs() {
  if (feather) {
    feather.replace();
  } else {}
  return;
}


/**
 * highlight.js DOM Selector Query
 *
 * This query-string is used to find code blocks that will be processed by
 * highlight.js for replacement with generated DOM elements that provide the
 * syntax highlighting from the library.
 *
 * @type string
 */
export const highlightJsElementSelector = "pre code";


export const createLineNumbers = function hstCreateLineNumbers(codeElement) {
  codeElement.textContent.split("\n")
  return;
}

/**
 * Event Handler Method for applying highlight.js DOM Refactoring/Replacement
 *
 * This method runs the syntax highlighting DOM generation from the library, but
 * as a personalized customization we also pre-emptively remove any trailing
 * newline or blankspace characters, so that the finally rendered output in the
 * browser will have a cleaner look, and allow us to write the HTML code where
 * we preserve the spacing and vertical-alignment of opening and closing tags.
 *
 * @return Nothing to Return
 */
export const setupHighlightJs = function hstSetupHighlightJs() {
  document.querySelectorAll(highlightJsElementSelector).forEach(
    (el) => {
      el.textContent = el.textContent.replace(/^\n/,"");
      el.textContent = el.textContent.replace(/\n{1}\s*$/,"");
      hljs.highlightElement(el);
    }
  );
  return;
}


/**
 * katex.js Configuration, Setup, and DOM Generation Method
 *
 * This is a safety fallback definition to allow this code to be generically
 * imported on any page without any failures/errors. If the requisite katex.js
 * Library has not been loaded, then this function reference will be undefined.
 *
 * @type function
 */
let renderMathInElement = window.renderMathInElement || undefined;

/**
 * Perform a safety check, then Setup and Configure feather.js
 *
 * @return Nothing to Return
 */
export const setupKatexJs = function hstSetupKatexJs() {
  if (renderMathInElement) {
    renderMathInElement(
      document.body,
      {
        "delimiters": [
          {"left": "$$", "right": "$$", "display": true,},
          {"left": "$", "right": "$", "display": false,},
          {"left": "\\(", "right": "\\)", "display": false,},
          {"left": "\\[", "right": "\\]", "display": true,},
        ],
        "throwOnError" : false,
      },
    );
  } else {}
  return;
}


/**
 * mermaid.js Library Module
 *
 * This is a safety fallback definition to allow this code to be generically
 * imported on any page without any failures/errors. If the requisite mermaid.js
 * Library has not been loaded, then this function reference will be undefined.
 *
 * @type module
 */
let mermaid = window.mermaid || undefined;

/**
 * Perform a safety check, then Setup and Configure mermaid.js
 *
 * @return Nothing to Return
 */
export const setupMermaidJs = function hstSetupMermaidJs() {
  if (mermaid) {
    mermaid.initialize(
      {
        "startOnLoad": true,
      },
    );
  } else {}
  return;
}
