/* CHROME */

(new EventDispatcher()).setEventHandler('windowDidOpen', magicChromeOpen);

/* HELPERS */
/** @param {Window} window  */
function magicChromeOpen(window) {

  if (!window.isNormal() || !window.isMain()) return;

  const name = window.app().name(),
    title = window.title();

  if (!/Google Chrome/.test(name)) return;

  // setFrame('extend', window);
  window.maximize();
  window.focus();

}