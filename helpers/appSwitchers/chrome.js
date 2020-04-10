class ChromeVersionsAppSwitcher extends BaseAppSwitcher {
    constructor() {
        super();

        this._doubleKetDetector = new DoubleKeyDetector(
            this._switchToChromeCanary,
            this._switchToChrome
        );
    }

    _switchToChromeCanary() {
        let bundleIdentifier = 'com.google.Chrome.canary',
            appName = 'Google Chrome Canary';

        Logger.log('ChromeVersionsAppSwitcher::switchToApp', `doubleKeyDetected, bundleId - ${bundleIdentifier}, appName - ${appName}`);

        AppManager.instance.defaultAppSwitcher(appName, launch, bundleIdentifier);
    }

    _switchToChrome() {
        let bundleIdentifier = 'com.google.Chrome',
            appName = 'Google Chrome';

        Logger.log('ChromeVersionsAppSwitcher::switchToApp', `bundleId - ${bundleIdentifier}, appName - ${appName}`);

        AppManager.instance.defaultAppSwitcher(appName, launch, bundleIdentifier);
    }

    switchToApp(appName, launch = true, bundleIdentifier = "") {

        this._doubleKetDetector.detectProxy();

    }



}