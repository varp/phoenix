let currentAppWindows = null;
let currentAppBundleId = '';

function cycleWindows() {
    const op = 'cycleWindows';
    const currentApp = App.focused();
    
    if (currentApp === undefined || currentApp === null) {
        Logger.log(op, 'currentApp is null or undefiend');
        return;
    }

    const appBundleId = currentApp.bundleIdentifier(); 
    if (currentAppBundleId !== appBundleId) {
        currentAppBundleId = appBundleId;
        currentAppWindows = null;
    }


    let windowsFromAllScreens = [];
     _.forEach(Screen.all(), (screen) => {
         windowsFromAllScreens.push(...screen.windows());
    });

    Logger.log(op, 'windowsFromAllScreens', windowsFromAllScreens.length);

    const windows = _.filter(windowsFromAllScreens, (window) => {
        if (window.isVisible() && window.isNormal() && window.isNormal() && window.app().bundleIdentifier() == appBundleId) {
            return true;
        }

        return false;
    });

    if (windows.length == 0) {
        Logger.log(op, 'there is no visible windows');
        return;
    } else {
        currentAppWindows = windows;
    }

    const currentWindow = currentAppWindows.shift();
    Logger.log(op, 'currentWindow', currentWindow.hash());
    Logger.log(op, 'currentAppWindows', currentAppWindows.length);
    currentWindow.raise();
    currentWindow.focus();
    currentAppWindows.push(currentWindow);
}

// (new EventDispatcher()).setHandler('`', ['cmd'], () => {
//     cycleWindows();
// });

