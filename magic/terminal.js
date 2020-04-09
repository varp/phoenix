/* TERMINAL */

(new EventDispatcher()).setEventHandler('windowDidOpen', (window) => {

  if (!window.isNormal() || !window.isMain()) return;

  const name = window.app().name(),
    title = window.title();

  if (!/Terminal/.test(name) || false) return;

  (new WindowManager()).setFrame('bottom-right', window);

});