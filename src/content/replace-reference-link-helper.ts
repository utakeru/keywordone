import { createReferenceLink } from "./create-element";
import { KEYWORD } from "./keyword-persistent-helper";

const TARGET_SELECTORS = [
  ".ocean-space-thread-text",
  ".ocean-ui-comments-commentbase-text",
  ".gaia-argoui-app-info-content",
  ".control-value-content-gaia",
  ".recordlist-cell-gaia",
  ".commentlist-body-gaia",
];

const WALKED_CLASS = "keywordone-walked";

export async function replaceReferenceLink(node: Node) {
  chrome.storage.local.get(["keywords"], (result) => {
    const keywords = result.keywords;
    if (keywords === null) {
      return;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      TARGET_SELECTORS.forEach((targetSelector) => {
        Array.from(
          (node as Element).querySelectorAll(
            `${targetSelector}:not([class*='${WALKED_CLASS}']`
          )
        ).forEach((a) => {
          keywords.forEach((keyword: KEYWORD) => {
            a.innerHTML = a.innerHTML.replaceAll(
              keyword.text,
              keyword.text +
                createReferenceLink(keyword.text, keyword.link).outerHTML
            );
          });
          // 探索済みの要素にはclassを付与する
          a.classList.add(WALKED_CLASS);
        });
      });
    }
  });
}
