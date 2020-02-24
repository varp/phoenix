let singleton = Symbol();
let singletonEnforcer = Symbol();

class AppManager {

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

        if (bundleIdentifier !== "") {
            App.all().filter(a => {
                if (a.bundleIdentifier() === bundleIdentifier) {
                    app = a;
                    return app;
                }
            });
            return app;
        }

        app = App.get(appName);
        return app;
    }

    switchToApp(appName, launch = true, bundleIdentifier = "") {

        let app = this.findApp(appName, bundleIdentifier);

        if (!app && launch) {
            app = App.launch(appName, { focus: true });
        }

        if (typeof app === 'undefined') {
            (new Alert()).show(`Can not launch the '${appName}' application.`, App.get('Phoenix').icon());
            return;
        }


        if (this.executeAppSwitcher(app)) {
            return;
        }

        let isAppActive = app.isActive(),
            isAppHidden = app.isHidden(),
            appWindows = app.windows(),
            appMainWindow = app.mainWindow();

        if (!app.isActive()) {
            app.activate();
        }

        if (app.isHidden()) {
            app.show();
        }

        Logger.log(`AppManager::switchToApp app - ${appName} active - ${isAppActive} hidden - ${isAppHidden}`);


        let res = app.focus();
        Logger.log(`AppManager::switchToApp app - ${appName} result of focusing to the app - ${res}`);

        if (appWindows.length === 0) {
            this.reopenApp(appName);

            Logger.log(`AppManager::switchToApp app - ${appName} result of focusing to the app's main window - ${res}`);
        }

    }

    reopenApp(appName) {
        let script = `tell application "${appName}"
            try
                reopen
                activate
            on error
                log "can not reopen the app"
                activate
            end
        end`;

        Logger.log('AppManager::registerAppSwitcher', `making attempt to reopen app if any - ${appName}`);
        Cmd.osascript(script);

    }

    registerAppSwitcher(bundleIdentifier, switcher) {
        this.switchers = this.switchers || {};
        this.switchers[bundleIdentifier] = switcher;
        Logger.log('AppManager::registerAppSwitcher', `registered switcher for app with bundleIdentifier - ${bundleIdentifier}`);
    }

    executeAppSwitcher(app) {

        const bundleIdentifier = app.bundleIdentifier(),
            switcher = this.switchers[bundleIdentifier];
        if (switcher === undefined) {
            return false;
        }

        Logger.log('AppManager::registerAppSwitcher', `found a switcher for app with bundleIdentifier - ${bundleIdentifier}`);

        switch (typeof (switcher)) {
            case "function":
                Logger.log('AppManager::registerAppSwitcher', `executing switcher for app with bundleIdentifier - ${bundleIdentifier}`);
                switcher.call(this, app);
                break;
            case "object":
                if (!(switcher instanceof BaseAppSwitcher)) {
                    throw new TypeError("Custom switchers implemented as a class must be an instance of BaseAppSwitcher");
                }
                Logger.log('AppManager::registerAppSwitcher', `executing switcher for app with bundleIdentifier - ${bundleIdentifier}`);
                switcher.switchToApp.call(switcher, app);
                break;
            default:
                throw new TypeError('invalid type of switcher');
        }

        return true;
    }

}