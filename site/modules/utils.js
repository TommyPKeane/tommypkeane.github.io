/**
 * @file Common Utility Methods for JavaScript
 * @module modules/utils.js
 *
 * This module has the kind of code that would be available in a general purpose
 * utility library like `underscore.js`, JQuery, or `lodash`. So, you should
 * decide whether you want to use this code, that I've made, or if you want to
 * use something much more standardized.
 *
 * @exports getClassesList
 *
 * @author Tommy P. Keane <talk.to.tommypkeane@gmail.com>
 * @copyright Tommy P. Keane, 2023 (https://www.tommypkeane.com)
 * @license CC-BY-4.0
 * @version 1.0.0
 */


/**
 * Create an iterable Array of Strings of all the Classes of an HTML Element
 *
 * By design for HTML and CSS, Classes are separated by a single blankspace
 * character, so this helper method provides the syntax to create an iterable
 * Array of all those Class names.
 *
 * This also can be used as a helper method for filtering out or toggling the
 * classes of an element, by extracting, injecting, or searching for classes to
 * be attached to an Element.
 *
 * @param {Object} DOM Element
 * @returns {Array} List of Strings of the Various Classes for an Element
 */
export const getClassesList = function hstGetClassesList(element) {
  const classesList = element.getAttribute("class")?.split(" ");
  return classesList;
}


export const removeClass = function hstRemoveClass(element, targetClass) {
  const classesList = getClassesList(element) || [];
  classesList.pop(targetClass);
  element.setAttribute("class", classesList.join(" "));
  return;
}


export const addClass = function hstRemoveClass(element, targetClass) {
  const classesList = getClassesList(element) || [];
  classesList.push(targetClass);
  element.setAttribute("class", classesList.join(" "));
  return;
}

/**
 * Create an HTML Element from a given HTML String for injecting into the DOM
 *
 * References:
 * - https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
 *
 * @param {String} HTML representing a single element
 * @return {Element}
 */
export const htmlToElement = function hstHtmlToElement(html) {
    var template = document.createElement("template");
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}
