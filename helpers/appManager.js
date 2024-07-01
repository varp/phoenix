let singleton = Symbol();
let singletonEnforcer = Symbol();

class AppManager {

    /**
     * @returns {AppManager}
     */
    static get instance() {

        if (!this[singleton]) {
            this[singleton] = new AppManager(singletonEnforcer);
        }

        return this[singleton];
    }

    static set instance(v) {
        throw "Can't change constant property!";
    }

    constructor(enforcer) {
        if (enforcer !== singletonEnforcer)
            throw "Instantiation failed: use Singleton.getInstance() instead of new.";

        this.windows ||= {}
    }

    /**
     * Search application with exact matching `appName` with fallback to searching
     * by `bundleIdentifier` is it was passed
     *
     * @param {string} appName application name
     * @param {string} bundleIdentifier application bundle identifier
     *
     * @returns {App}
     */
    findApp(appName, bundleIdentifier = "") {
        let app = false;

        if (bundleIdentifier.length) {
            app = _.first(App.all().filter(a => {
                return a.bundleIdentifier() === bundleIdentifier;
            }), false);
            Logger.log('AppManager::findApp', `by bundleId  - ${bundleIdentifier}, app - ${app}`);
            return app;
        }

        app = App.get(appName);
        Logger.log('AppManager::findApp', `by appName  - ${appName}, app - ${app}`);
        return app;
    }

    switchToApp(appName, launch = true, bundleIdentifier = "") {
        if (this._findAndExecuteAppSwitcher(appName, launch, bundleIdentifier)) {
            return;
        }

        return this.defaultAppSwitcher(appName, launch, bundleIdentifier);
    }

    defaultAppSwitcher(appName, launch, bundleIdentifier) {
        const op = 'AppManager.defaultAppSwitcher';

        let app = this.findApp(appName, bundleIdentifier);

        if (!app && launch) {
            app = App.launch(appName, {
                focus: true
            });

            if (app === undefined) {
                (new Alert()).show(`Can not launch the '${appName}' application.`, App.get('Phoenix').icon());
                return;
            }

            return;
        }


        let isAppActive = app.isActive(),
            isAppHidden = app.isHidden(),
        // app.windows() returns only windows on the current display 
        // TODO: collect and save windows from all displays and update periodically
            appWindows = app.windows(), 
            appWindowsLength = appWindows.length,
            appMainWindow = app.mainWindow();

        Logger.log(op, `${appName} active - ${isAppActive} hidden - ${isAppHidden}`);

        let res = null;

        if (app.isHidden()) {
            res = app.show();
        }

        if (!app.isActive()) {
            res = app.focus();
            Logger.log(op, `${appName} result of focusing to the app - ${res}`);
        }

        // if (appMainWindow) {
        //     res = appMainWindow.raise();
        //     Logger.log(op, `${appName} result of raising to the app mainWindow - ${res}`);
        // }

        // if (appWindows.length === 0) {
        //     this._reopenApp(appName);
        //     Logger.log(op, `${appName} result of focusing to the app's main window - ${res}`);
        // }

        if (appWindowsLength === 0) {
            app.mainWindow().focus();
            return;
        }

        let w = this.windows[app.hash()];
        if (w === undefined) {
            w = this.windows[app.hash()] = {
                lastActiveWindowIndex: 0,
                lastActiveWindowHash: appMainWindow.hash()
            }
        }

        Logger.log(op, 'w.lastActiveWindowIndex', w.lastActiveWindowIndex,
            'w.lastActiveWindowHash', w.lastActiveWindowHash, 'appWindowsLength', appWindowsLength);

        let nextWindowIndex = ((w.lastActiveWindowIndex + 1) % appWindowsLength + appWindowsLength) % appWindowsLength || 0;
        if (w.lastActiveWindowHash === appWindows[nextWindowIndex].hash()) {
            Logger.log(op, 'recalculating next window index because of hash equality');
            nextWindowIndex = ((appWindowsLength - 1) % appWindowsLength + appWindowsLength) % appWindowsLength || 0;
        }

        Logger.log(op, 'nextWindowIndex', nextWindowIndex);

        const nextWindow = appWindows[nextWindowIndex];
        res = nextWindow.focus();

        Logger.log(op, appName, 'result of focusing to the app window', res);

        w.lastActiveWindowIndex = nextWindowIndex;
        w.lastActiveWindowHash = nextWindow.hash();
    }

    _reopenApp(appName) {
        const op = 'AppManager._reopenApp';
        // let script = `tell application "${appName}"
        //     try
        //         reopen
        //         activate
        //     on error
        //         log "can not reopen the app"
        //         activate
        //     end
        // end`;

        Logger.log(op, `making attempt to reopen app if any - ${appName}`);
        // Cmd.osascript(script);
        App.launch(appName, {
            focus: true
        });

    }

    /**
     * Register application switcher
     *
     * @param {string} appIdentifierPattern
     * @param {Function} switcher
     */
    registerAppSwitcher(appIdentifierPattern, switcher) {
        this.switchers = this.switchers || {};
        this.switchers[appIdentifierPattern] = this._validateSwitcherType(switcher);
        Logger.log('AppManager::registerAppSwitcher', `registered switcher for app with bundleIdentifier - ${appIdentifierPattern}`);
    }

    _validateSwitcherType(switcher) {
        let type = typeof switcher;

        if (type === 'function') {
            return switcher;
        }

        if (type === 'object' && (switcher instanceof BaseAppSwitcher)) {
            return switcher;
        }

        throw new TypeError("Custom switchers implemented as a class must be an instance of BaseAppSwitcher");
    }

    _findAndExecuteAppSwitcher(appName, launch = true, bundleIdentifier = "") {

        let switcher = this._findAppSwitcher(appName, bundleIdentifier);

        if (switcher === null) {
            return false;
        }

        Logger.log('AppManager::_findAndExecuteAppSwitcher', `found a switcher for app: ${appName || bundleIdentifier}`);

        let callable = switcher;
        if (typeof switcher === 'object') {
            callable = switcher.switchToApp;
        }
        Logger.log('AppManager::_findAndExecuteAppSwitcher', `executing switcher for app: ${appName || bundleIdentifier}`);
        callable.call(switcher, appName, launch, bundleIdentifier);

        return true;
    }

    _findAppSwitcher(appName, bundleIdentifier = "") {
        const predicate = (item) => {
            let r = new RegExp(item);
            return appName.match(r) || bundleIdentifier.match(r);
        };

        const switcher = _.get(this.switchers, _.keys(this.switchers).sort().find(predicate), null);

        Logger.log('AppManager::_findAppSwitcher()', `appName | bundleId - ${appName || bundleIdentifier || null}, switcher - ${switcher}`);

        return switcher;
    }

}
