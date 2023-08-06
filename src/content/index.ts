import { observe } from "./mutation-observer-helper";
import { fetchAndSaveKeywordSettings } from "./keyword-persistent-helper";
import { replaceReferenceLink } from "./replace-reference-link-helper";
import './style.css';

fetchAndSaveKeywordSettings();

replaceReferenceLink(document.body);

observe(document.body, { childList: true, subtree: true }, (mutationsList) => {
  mutationsList.forEach((mutationRecord) => {
    mutationRecord.addedNodes.forEach((addedNode) => {
      replaceReferenceLink(addedNode);
    });
  });
});
