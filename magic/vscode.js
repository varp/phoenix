/* VSCODE */
(new EventDispatcher()).setEventHandler('windowDidOpen', magicVSCodeOpen);

/* HELPERS */
/** @param {Window} window */
function magicVSCodeOpen(window) {

  if (!window.isNormal() || !window.isMain()) return;

  if (!/Code/.test(window.app().name())) return;

  Logger.log('magicVSCodeOpen', window.app().name(), {
    isNormal: window.isNormal(),
    isMain: window.isMain()
  }, window);

  // setFrame('extend', window);
  window.maximize();
  window.focus();

}