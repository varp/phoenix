/* HYPER */

const edD = new EventDispatcher();
edD.setEventHandler('windowDidOpen', (window) => {
    const op = 'dialogs.js'

    if (window.isMain() && !window.isNormal()) {
        Logger.log(op, `skipping. ${window.app()}`);
        return;
    }

    const name = window.app().name(),
        title = window.title();

    Logger.log(op, `app name ${name}`);
    Logger.log(op, `window title ${title}`);

    let mainWindow = window.app().mainWindow();
    if (!mainWindow) {
        Logger.log(op, `mainWindow is not set for app: ${window.app().name()}`);
        return;
    }

    let mainSize = mainWindow.size(),
        mainTopLeft = mainWindow.topLeft(),
        Y = mainTopLeft.y + 50,
        X = Math.round(mainSize.width / 2) - Math.round(window.size().width / 2);



    if (!/iTerm/.test(name)) {
        return;
    }

    Logger.log(`moving window to position: ${X}, ${Y}`)
    window.setTopLeft({ x: X, y: Y });
    window.raise();
    window.focus();

});
