import './style.css';

export function createReferenceLink(title: string, reference: string) {
    const linkEl = document.createElement('a');
    linkEl.className = 'keywordone-reference-link';
    linkEl.title = title;
    linkEl.href = reference;
    linkEl.textContent = '🔗';
    return linkEl;
}