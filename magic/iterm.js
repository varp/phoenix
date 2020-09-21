/* HYPER */

(new EventDispatcher()).setEventHandler('windowDidOpen', (window) => {

    if (!window.isNormal() || !window.isMain()) {
        return;
    }

    const name = window.app().name(),
        title = window.title();

    Logger.log(`Window name ${name}`);
    if (!/iTerm/.test(name)) {
        return;
    }

    (new WindowManager()).setFrame('extend');
    window.maximize();

});