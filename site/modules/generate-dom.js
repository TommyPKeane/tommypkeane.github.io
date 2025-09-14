import { sitemap_toc } from "/modules/site-toc.js";
import { getClassesList, htmlToElement } from "/modules/utils.js";

const KindEnum = {
  "link": "link",
  "nested": "nested",
};

const IndicatorIconEnum = {
  "page": "file-text",
  "closed": "chevron-right",
  "opened": "chevron-down",
};

const IndicatorIconAttributeName = "data-feather";
const IndicatorIconClassName = "indicatorIcon";


export const toggleExpandableIndicatorIcon = function hstToggleExpandableIndicatorIcon(indicatorIcon) {
  if (indicatorIcon) {
    const currentFeatherIconClasses = getClassesList(indicatorIcon);
    if (currentFeatherIconClasses.includes(`feather-${IndicatorIconEnum.opened}`)) {
      const newIcon = htmlToElement("<span>⏵</span>");
      const classes = getClassesList(newIcon);
      classes.push(IndicatorIconClassName);
      newIcon.setAttribute("class", classes.join(" "));
      indicatorIcon.replaceWith(newIcon);
    } else if (currentFeatherIconClasses.includes(`feather-${IndicatorIconEnum.closed}`)) {
      const newIcon = htmlToElement("<span>▿</span>");
      const classes = getClassesList(newIcon);
      classes.push(IndicatorIconClassName);
      newIcon.setAttribute("class", classes.join(" "));
      indicatorIcon.replaceWith(newIcon);
    } else {
      console.warn(`Indicator Icon Name not found: ${currentFeatherIconClasses}`);
    }
  } else {
    console.warn(`Indicator Icon Element not found: ${indicatorIconSelector}`);
  }
  return;
}

export const toggleChildContainerVisibility = function hstToggleChildContainerVisibility(element) {
  const classes = getClassesList(element);
  if (classes.includes("visible")) {
    classes.pop("visible");
    classes.push("hidden");
    element.setAttribute("class", classes.join(" "));
  } else if (classes.includes("hidden")) {
    classes.pop("hidden");
    classes.push("visible");
    element.setAttribute("class", classes.join(" "));
  } else {
    console.warn(`hidden/visible Missing from Classes: ${classes}`);
  }
  return;
}

export const toggleNestedNavSection = function hstToggleNestedNavSection(clickEvent) {
  const indicatorIconSelector = `.${IndicatorIconClassName}`;
  const indicatorIcon = event.currentTarget.parentNode.querySelector(indicatorIconSelector);
  toggleExpandableIndicatorIcon(indicatorIcon);
  const childContainerElement = event.currentTarget.parentNode.querySelector(".navEntryBody");
  if (childContainerElement) {
    toggleChildContainerVisibility(childContainerElement);
  } else {
    console.warn(`navEntryBody Element is Missing: ${childContainerElement}`);
  }
  return;
}


export const buildNavLinkFragment = function hstBuildNavLinkFragment(title, url, nestingLevel) {
  const navFragment = document.createDocumentFragment();

  const entryContainerElement = document.createElement("div");
  entryContainerElement.setAttribute("class", `navEntry nestingLevel${nestingLevel}`);

  const entryHeaderElement = document.createElement("div");
  entryHeaderElement.setAttribute("class", "navEntryHeader");

  const newIcon = htmlToElement("<span class=\"\">⏵</span>");
  const classes = getClassesList(newIcon);
  classes.push(IndicatorIconClassName);
  newIcon.setAttribute("class", classes.join(" "));

  if (url) {
    const entryLinkElement = document.createElement("a");
    entryLinkElement.setAttribute("href", url);
    const entryTextElement = document.createElement("span");
    entryTextElement.innerHTML = title;
    entryLinkElement.appendChild(newIcon);
    entryLinkElement.appendChild(entryTextElement);
    entryHeaderElement.appendChild(entryLinkElement);
  } else {
    const entryTextElement = document.createElement("span");
    entryTextElement.setAttribute("class", "null-link");
    entryTextElement.innerHTML = title;
    entryHeaderElement.appendChild(newIcon);
    entryHeaderElement.appendChild(entryTextElement);
  }

  entryContainerElement.appendChild(entryHeaderElement);
  navFragment.appendChild(entryContainerElement);

  return navFragment;
}

export const buildNavNestedFragment = function hstBuildNavNestedFragment(title, nestingLevel) {
  const navFragment = document.createDocumentFragment();

  const entryContainerElement = document.createElement("div");
  entryContainerElement.setAttribute("class", `navEntry nestingLevel${nestingLevel}`);

  const entryHeaderElement = document.createElement("div");
  entryHeaderElement.setAttribute("class", "navEntryHeader expandable");
  entryHeaderElement.addEventListener("click", toggleNestedNavSection);
  const entryBodyElement = document.createElement("div");
  entryBodyElement.setAttribute("class", "navEntryBody hidden");

  const entryPrefixElement = document.createElement("div");
  const expandableIndicatorElement = document.createElement("img");
  expandableIndicatorElement.setAttribute("class", IndicatorIconClassName);
  expandableIndicatorElement.setAttribute(IndicatorIconAttributeName, IndicatorIconEnum.closed);
  entryPrefixElement.appendChild(expandableIndicatorElement);

  const entryContentsElement = document.createElement("div");
  const entryTextElement = document.createElement("span");
  entryTextElement.setAttribute("class", "null-link");
  entryTextElement.innerHTML = title;
  entryContentsElement.appendChild(entryTextElement);

  entryHeaderElement.appendChild(expandableIndicatorElement);
  entryHeaderElement.appendChild(entryContentsElement);

  entryContainerElement.appendChild(entryHeaderElement);
  entryContainerElement.appendChild(entryBodyElement);

  navFragment.appendChild(entryContainerElement);

  return navFragment;
}

export const parseTocEntryObject = function hstParseTocEntryObject(tocEntryObject, nestingLevel) {
  let tocEntryFragment = null;

  const title = tocEntryObject?.title;
  const url = tocEntryObject?.url;
  const kind = tocEntryObject?.kind;
  const contents = tocEntryObject?.contents;

  if (kind === KindEnum.link) {
    tocEntryFragment = buildNavLinkFragment(title, url, nestingLevel);
  } else if (kind === KindEnum.nested) {
    tocEntryFragment = buildNavNestedFragment(title, nestingLevel);
    if (url) {
      console.warn("Non-null URL for Nested Title is not Supported");
    } else {}
    for (const tocSubEntry of contents) {
      const tocEntryFragmentBodyElement = tocEntryFragment.querySelector(`.navEntryBody`);
      const subEntryFragment = parseTocEntryObject(tocSubEntry, nestingLevel + 1);
      tocEntryFragmentBodyElement.appendChild(subEntryFragment);
    }
  } else {
    console.error(`Unknown TOC Object Kind: ${kind}`);
  }
  return tocEntryFragment;
}


export const buildModalSiteNavigation = function hstBuildModalSiteNavigation(tocObject) {
  const containerElement = document.createElement("div");
  containerElement.setAttribute("id", "site-header-container");

  const headerImageElement = document.createElement("img");
  headerImageElement.setAttribute(
    "src",
    "images/tommypkeane-com_header_1920x1080_web.svg",
  );

  const containerContentsFragment = document.createDocumentFragment();
  const navElement = document.createElement("nav");
  for (const [topLevelKey, topLevelObj] of Object.entries(tocObject)) {
    const topLevelNavEntryFragment = parseTocEntryObject(topLevelObj, 0);
    navElement.appendChild(topLevelNavEntryFragment);
  }
  containerContentsFragment.appendChild(navElement);

  containerElement.appendChild(headerImageElement);
  containerElement.appendChild(containerContentsFragment);

  return containerElement;
}

export const buildSiteHeader = function hstBuildSiteHeader() {
  let siteHeaderElement = document.querySelector("#site-header");
  siteHeaderElement.innerHTML = ""; // Clear Contents
  if (siteHeaderElement) {
    const siteNavElement = buildModalSiteNavigation(sitemap_toc);
    siteHeaderElement.appendChild(siteNavElement);
  } else {
    console.warn("👻 Didn't find `#site-header` Element");
  }
  return;
}

export const buildReferencesSection = function hstBuildReferencesSection(
  containerId,
  linksObj,
) {
  const containerElement = document.querySelector(`#${containerId}`);
  if (containerElement) {
    const unorderedListElement = document.createElement("ul");
    unorderedListElement.setAttribute("class", "referenceLinks");

    const listBuilderFragment = new DocumentFragment();

    for (const key in linksObj) {
      const linkText = key.toLocaleLowerCase();
      const linkLink = linksObj[key];

      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", linkLink);
      linkElement.textContent = linkText;

      const imageElement = document.createElement("img");
      // imageElement.setAttribute("srcset", "/images/feather/external-link.svg");
      imageElement.setAttribute("class", "link-icon");

      const listElement = document.createElement("li");
      listElement.setAttribute("class", "ref-link");
      listElement.appendChild(imageElement);
      listElement.appendChild(linkElement);

      listBuilderFragment.append(listElement);
    }
    unorderedListElement.append(listBuilderFragment);
    containerElement.innerHTML = null;
    containerElement.append(unorderedListElement);
  } else {}
  return;
}

export const buildSiteFooter = function hstBuildSiteFooter() {
  let _footerEl = document.querySelector("#main-footer");
  if (_footerEl) {
    const summaryParagraph = document.createElement("p");
    summaryParagraph.textContent = "📬🐰 Contact | Questions | Concerns | Declarations of Adoration | Spiteful Condemnations 🐰📬";
    const emailParagraph = document.createElement("p");
    emailParagraph.setAttribute("class", "monospaced");
    emailParagraph.textContent = "talk.to.tommypkeane@gmail.com";
    _footerEl.innerHTML = null;
    _footerEl.appendChild(summaryParagraph);
    _footerEl.appendChild(emailParagraph);
  } else {
    console.warn("👻 Didn't find `#main-footer` Element");
  }
  return;
}

export const buildCompatiblePdf = function hstBuildCompatiblePdf() {
  return;
}
