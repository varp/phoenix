let _lastKeyPressTimestamp = 0;
let _doubleKeyWasDetected = false;

class BaseAppSwitcher {
  static get doubleWasDetected() {
    return _doubleKeyWasDetected;
  }



  static detectDoubleKey() {

    const timestamp = Date.now();


    Logger.log('FinderAppSwitcher::detectDoubleKey', `timestamp ${timestamp} - ${_lastKeyPressTimestamp}`);


    const diff = timestamp - _lastKeyPressTimestamp;

    Logger.log('FinderAppSwitcher::detectDoubleKey', `time passed between calls (ms) - ${diff}`);

    if (diff <= DOUBLE_KEY_INTERVAL) {
      Logger.log('FinderAppSwitcher::detectDoubleKey', `double was key detected`);
      _lastKeyPressTimestamp = 0;
      _doubleKeyWasDetected = true;
      return _doubleKeyWasDetected;
    }

    _lastKeyPressTimestamp = timestamp;
    _doubleKeyWasDetected = false;
    return _doubleKeyWasDetected;

  }


  switchToApp(appName, launch = true, bundleIdentifier = "") {
    BaseAppSwitcher.detectDoubleKey();
  }
}