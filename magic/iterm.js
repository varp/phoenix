/* HYPER */

const edI = new EventDispatcher()
edI.setEventHandler('windowDidOpen', (window) => {
    const op = 'magic/iterm.js: windowDidOpen'

    const name = window.app().name(),
        title = window.title();

    Logger.log(`${op}`, 'window name', name, 'title', title);


    if (!window.isNormal() || !window.isMain()) {
        return;
    }

    if (!/iTerm/.test(name)) {
        return;
    }

    window.maximize();
});


edI.setEventHandler('appDidLaunch', (app) => {
    const op = 'magic/iterm.js: appDidLaunch';

    const name = app.name();
    Logger.log(op, 'app name', name);
    if (!/iTerm/.test(name)) {
        return;
    }

    Timer.after(1, () => {
        // waiting 1 second to an app.mainWindow gets initialized
        const mainWindow = app.mainWindow(),
            windows = app.windows(),
            firstWindow = windows[0];

        if (mainWindow === undefined && windows.length === 0) {
            Logger.log(op, 'mainWindow is', mainWindow, 'windows of the app', windows.length, 'firstWindow', firstWindow);
            return;
        }

        const windowToExpand = mainWindow || firstWindow;
        windowToExpand.maximize();
    });
});
