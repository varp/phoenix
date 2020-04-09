/* HYPER */

(new EventDispatcher()).setEventHandler('windowDidOpen', (window) => {

  if (!window.isNormal() || !window.isMain()) return;

  const name = window.app().name(),
    title = window.title();

  if (!/iTerm/.test(name) || false) return;

  (new WindowManager()).setFrame('extend', window);
  window.focus();

});