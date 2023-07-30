export function createReferenceLink(title: string) {
    const link = document.createElement('a');
    link.title = title;
    link.href = 'https://www.google.com';
    link.textContent = '🔍';
    return link;
}