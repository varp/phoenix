class ChromeVersionsAppSwitcher extends BaseAppSwitcher {
    constructor() {
        super();

        this._doubleKetDetector = new DoubleKeyDetector(this._switchToChrome);
    }

    _switchToChrome(keyPressCount, keySequenceDetected) {
        const bundleIdentifier = keySequenceDetected === true ? 'com.google.Chrome' : 'com.google.Chrome.canary',
            appName = keySequenceDetected === true ? 'Google Chrome' : 'Google Chrome Canary';

        Logger.log('ChromeVersionsAppSwitcher::switchToApp', `bundleId - ${bundleIdentifier}, appName - ${appName}`);

        AppManager.instance.defaultAppSwitcher(appName, true, bundleIdentifier);
    }

    switchToApp(appName, launch = true, bundleIdentifier = "") {

        this._doubleKetDetector.detectProxy();

    }



}