class AppManager {
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

        Logger.log(`switchToApp app - ${appName} active - ${isAppActive} hidden - ${isAppHidden}`);


        let res = app.focus();
        Logger.log(`switchToApp app - ${appName} result of focusing to the app - ${res}`);

        if (appWindows.length === 0) {
            // TODO: open an issue for the inability to focus the app main window due to tccd daemons incorrect interaction
            res = appMainWindow.focus();
            Logger.log(`switchToApp app - ${appName} result of focusing to the app's main window - ${res}`);
        }

    }

}