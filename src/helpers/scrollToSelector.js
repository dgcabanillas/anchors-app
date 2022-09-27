export const scrollToSelector = ( selector, offset = 0 ) => {
  const element = document.querySelector(selector);
  if ( element ) {
    const top = element.offsetTop - offset;
    window.scroll({ top, behavior: 'smooth' });
  }
}