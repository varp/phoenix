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

class DoubleKeyDetector {
    constructor(resolveCallback, rejectCallback) {
        this._lastKeyPressTimestamp = 0;
        this._doubleKeyWasDetected = false;
        this._keyPressedCount = 0;

        this._onDetectCallback = resolveCallback;
        this._onRejectCallback = rejectCallback;
    }


    _resolvePromise() {
        Logger.log('DoubleKeyDetector::detectProxy', '_resolving promise');

        if (this._keyPressedCount >= 2 && this._doubleKeyWasDetected) {
            this._resetState();
            this._onDetectCallback.call(this);
        } else {
            this._resetState();
            this._onRejectCallback.call(this);
        }
    }

    _resetState() {
        this._keyPressedCount = 0;
        this.doubleWasDetected = false;
    }

    detectProxy() {
        const timestamp = Date.now(),
            diff = timestamp - this._lastKeyPressTimestamp;

        this._keyPressedCount++;
        if (this._keyPressedCount == 1) {
            this._time = Timer.after(
                1,
                this._resolvePromise.bind(this)
            );
        }

        Logger.log('DoubleKeyDetector::detectProxy', `timestamp: ${timestamp} lastTimestamp: ${this._lastKeyPressTimestamp} diff (ms): ${diff} times pressed: ${this._keyPressedCount}`);

        if (diff <= DOUBLE_KEY_INTERVAL) {
            Logger.log('DoubleKeyDetector::detectProxy', `double was key detected`);
            this._lastKeyPressTimestamp = 0;
            this._doubleKeyWasDetected = true;
        }

        this._lastKeyPressTimestamp = timestamp;
    }
}