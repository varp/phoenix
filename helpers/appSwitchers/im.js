class ImSwitcher extends BaseAppSwitcher {
    constructor() {
        super();

        this._doubleKeyDetector = new DoubleKeyDetector(this._switchToIm);
    }

    _switchToIm(keyPressCount, keySequenceDetected) {
        const appName = keySequenceDetected === true ? 'WhatsApp' : 'Telegram';

        Logger.log('ImSwitcher::switchToApp', `appName - ${appName}`);

        AppManager.instance.defaultAppSwitcher(appName, true);
    }

    switchToApp(appName, launch = true, bundleIdentifier = "") {
        this._doubleKeyDetector.detectProxy();
    }
}