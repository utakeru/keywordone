import { observe } from "./mutation-observer-helper";
import { createReferenceLink } from "./create-element";


console.log(document.body+ "a")
window.addEventListener("DOMContentLoaded", () => console.log("fuga", document.body))

observe(document.body, { childList: true, subtree: true }, (mutationsList) => {
    console.log(mutationsList);
    Array.from(document.querySelectorAll(`span:not([class*='keywordone-walked']`)).forEach(a => {
        a.append(createReferenceLink(a.textContent!));
        a.classList.add("keywordone-walked");
    })
    console.log("hoge")
});
