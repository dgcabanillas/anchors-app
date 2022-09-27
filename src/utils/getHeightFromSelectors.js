export const getHeightFromSelectors = ( selectors = [] ) => {
  return selectors.reduce((height, selector) => {
    const node = document.querySelector(selector);
    if ( node ) return height + node.getBoundingClientRect().height;
    return height;
  }, 0);
}