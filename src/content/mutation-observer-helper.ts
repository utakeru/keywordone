const observe = (targetNode: Node, observeOption: MutationObserverInit, callback: (mutationsList: MutationRecord[]) => void) => {
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, observeOption);
  return observer;
}

export { observe }
