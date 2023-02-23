//apparently there is no way to create NodeList nor remove elements from it, so this is the only solutions that I found that actually returns a NodeList just as the regular querySelectorAll
export function querySelectorAll(selector) {
  const [parentSelector, childSelector] = selector.split("<");
  if (childSelector == null) return document.querySelectorAll(parentSelector);

  const parents = document.querySelectorAll(parentSelector);

  parents.forEach((parent) => {
    const children = [
      ...parent.querySelectorAll(`${parentSelector} > ${childSelector}`),
    ];
    if (
      children.some((child) => {
        return child.closest(parentSelector) === parent;
      })
    ) {
      parent.dataset.selectedEnhencedQuerySelectorAll = "";
    }
  });

  const out = document.querySelectorAll(
    "[data-selected-enhenced-query-selector-all]"
  );

  out.forEach((el) => {
    delete el.dataset["selectedEnhencedQuerySelectorAll"];
  });
  return out;
}
