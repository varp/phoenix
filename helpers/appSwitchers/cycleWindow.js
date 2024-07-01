class CycleWindow extends BaseAppSwitcher {
    constructor(appManager) {
        super();


        this.windowsOfApps = this.windowsOfApps || {};
        this.appManager = appManager;

    }

    switchToApp(appName, launch = true, bundleIdentifier = "") {
        let app = this.windowsOfApps[appName || bundleIdentifier]
        if (app) {
            this.appManager.findApp(appName, bundleIdentifier);
        } else {
            this.windowsOfApps[appName || bundleIdentifier] = {
                lastWindowIndex: 0
            };
        }

        // this.appManager.defaultAppSwitcher(appName, true, bundleIdentifier);
    }
}
