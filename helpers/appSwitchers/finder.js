class FinderAppSwitcher extends BaseAppSwitcher {

    constructor() {
        super();

        this._appName = 'Finder';
        this._bundleIdentifier = 'com.apple.Finder';
        this._doubleKeyWasDetected = false;

        this._doubleKeyDetector = new DoubleKeyDetector(this._switchToFinder, this);
    }


    layoutWindowsSplitted(window) {

        if (!this._filterWindows(window)) return;

        Logger.log('FinderAppSwitcher::layoutWindowsSplitted', window.app().name(), window);


        let windows = window.app().windows().filter((v) => {
            return v.isNormal() || v.isMain();
        });
        this._windows = windows.length >= 2 ? windows.slice(-2) : windows;

        if (this._windows.length === 2 && this._doubleKeyWasDetected) {
            const firstWindow = this._windows[0];
            const secondWindow = this._windows[1];


            const vm = new WindowManager();
            vm.setFrame('half-1', firstWindow);
            vm.setFrame('half-2', secondWindow);

            firstWindow.raise()
            firstWindow.focus();

        }

        if (this._windows.length < 2) {

            Logger.log('FinderAppSwitcher::layoutWindows', window.app().name(), window);

            window.maximize();
            window.raise();
            window.focus();
        }


    }

    _layoutWindows(app) {
        let window = _.first(app.windows({
            visible: true
        }));

        this.layoutWindowsSplitted(window);
    }

    _filterWindows(window) {

        if (!window || !window.isNormal() || !window.isMain()) return false;

        const name = window.app().name(),
            title = window.title();

        if (!/Finder/.test(name)) return false;

        if (!title || /(Quick Look)|(About Finder)|(Finder Preferences)|(Info$)|(Volume)/.test(title)) return false;

        return true;
    }

    switchToApp(appName, launch = true, bundleIdentifier = "") {

        this._doubleKeyDetector.detectProxy();

    }

    _switchToFinder(keyPressCount, keySequenceDetected) {
        let script = `
            tell application "Finder"
                if (count Finder windows) = 0 then
                make new Finder window to (new window target of Finder preferences)
                end if
                activate (get the index of front Finder window)
                select the first item of front Finder window
            end tell
            `;

        let doubleKeyScript = `
            tell application "Finder"
                if (count Finder windows) = 0 then
                make new Finder window to (new window target of Finder preferences)
                make new Finder window to (new window target of Finder preferences)
                else if (count Finder windows) = 1 then
                make new Finder window to (new window target of Finder preferences)
                end if
                
                activate (get the index of front Finder window)
                select the first item of front Finder window
            end tell
            `;


        const layoutCallback = (task) => {
            this.layoutWindowsSplitted(AppManager.instance.findApp(this._appName, true, this._bundleIdentifier).mainWindow());
        };

        if (keySequenceDetected) {
            this._doubleKeyWasDetected = true;
            Cmd.osascript(doubleKeyScript, layoutCallback);
        } else {
            Cmd.osascript(script, layoutCallback);
        }
    }
}