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
                return a.bundleIdentifier() === bundleIdentifier
            }), false);
            Logger.log('AppManager::findApp', `by bundleId  - ${bundleIdentifier}, app - ${app}`);
            return app;
        }

        app = App.get(appName);
        Logger.log('AppManager::findApp', `by appName  - ${appName}, app - ${app}`);
        return app;
    }

    switchToApp(appName, launch = true, bundleIdentifier = "") {
        if (this._executeAppSwitcher(appName, launch, bundleIdentifier)) {
            return;
        }

        return this.defaultAppSwitcher(appName, launch, bundleIdentifier);
    }

    defaultAppSwitcher(appName, launch, bundleIdentifier) {
        let app = this.findApp(appName, bundleIdentifier);

        if (!app && launch) {
            app = App.launch(appName, {
                focus: true
            });
        }

        if (typeof app === 'undefined') {
            (new Alert()).show(`Can not launch the '${appName}' application.`, App.get('Phoenix').icon());
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
            this._reopenApp(appName);

            Logger.log(`AppManager::switchToApp app - ${appName} result of focusing to the app's main window - ${res}`);
        }
    }

    _reopenApp(appName) {
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

    /**
     * Register application switcher
     * 
     * @param {string} appIdentifierPattern 
     * @param {Function} switcher 
     */
    registerAppSwitcher(appIdentifierPattern, switcher) {
        this.switchers = this.switchers || {};
        this.switchers[appIdentifierPattern] = switcher;
        Logger.log('AppManager::registerAppSwitcher', `registered switcher for app with bundleIdentifier - ${appIdentifierPattern}`);
    }

    _executeAppSwitcher(appName, launch = true, bundleIdentifier = "") {

        let switcher = this._findAppSwitcher(appName, bundleIdentifier);

        if (switcher === null) {
            return false;
        }

        Logger.log('AppManager::registerAppSwitcher', `found a switcher for app with bundleIdentifier - ${bundleIdentifier}`);

        switch (typeof (switcher)) {
            case "function":
                Logger.log('AppManager::registerAppSwitcher', `executing switcher for app with bundleIdentifier - ${bundleIdentifier}`);
                switcher.call(this, appName, launch, bundleIdentifier);
                break;
            case "object":
                if (!(switcher instanceof BaseAppSwitcher)) {
                    throw new TypeError("Custom switchers implemented as a class must be an instance of BaseAppSwitcher");
                }
                Logger.log('AppManager::registerAppSwitcher', `executing switcher for app with bundleIdentifier - ${bundleIdentifier}`);
                switcher.switchToApp.call(switcher, appName, launch, bundleIdentifier);
                break;
            default:
                throw new TypeError('invalid type of switcher');
        }

        return true;
    }

    _findAppSwitcher(appName, bundleIdentifier = "") {
        let a = appName,
            b = bundleIdentifier.length ? bundleIdentifier : null;

        const predicate = (e) => {
            let _e = e.replace('*', '');
            return a.includes(_e) || (b && b.includes(_e))
        };

        const switcher = _.get(this.switchers, _.keys(this.switchers).sort().find(predicate), null);

        Logger.log('AppManager::_findAppSwitcher()', `appName - ${a}, bundleId - ${b}, switcher - ${switcher}`)

        return switcher;
    }

}