class DoubleKeyDetector {
    constructor(resolveCallback, context = null) {
        this._lastKeyPressTimestamp = 0;
        this._doubleKeyWasDetected = false;
        this._keyPressedCount = 0;

        this._onDetectCallback = resolveCallback;
        this._context = context;
    }


    _resolvePromise() {
        Logger.log('DoubleKeyDetector::detectProxy', '_resolving promise');
        const ctx = this._context !== null ? this._context : this;

        if (this._keyPressedCount >= 2 && this._doubleKeyWasDetected) {
            this._onDetectCallback.call(ctx, this._keyPressedCount, this._doubleKeyWasDetected);
            this._resetState();
        } else {
            this._onDetectCallback.call(ctx, this._keyPressedCount, this._doubleKeyWasDetected);
            this._resetState();
        }
    }

    _resetState() {
        this._keyPressedCount = 0;
        this._doubleKeyWasDetected = false;
    }

    detectProxy() {
        const timestamp = Date.now(),
            diff = timestamp - this._lastKeyPressTimestamp;

        this._keyPressedCount++;
        if (this._keyPressedCount == 1) {
            this._time = setTimeout(this._resolvePromise.bind(this), DOUBLE_KEY_INTERVAL + 200);
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