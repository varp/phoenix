let _lastKeyPressTimestamp = 0;
let _doubleKeyWasDetected = false;


class FinderAppSwitcher extends BaseAppSwitcher {

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


  static layoutWindowsSplitted(window) {

    if (!FinderAppSwitcher.filterWindows(window)) return;

    Logger.log('FinderAppSwitcher::layoutWindowsSplitted', window.app().name(), window);


    let windows = window.app().windows().filter((v) => { return v.isNormal() || v.isMain(); });
    FinderAppSwitcher._windows = windows.length >= 2 ? windows.slice(-2) : [];

    if (FinderAppSwitcher._windows.length === 2 && FinderAppSwitcher.doubleWasDetected) {
      const firstWindow = FinderAppSwitcher._windows[0];
      const secondWindow = FinderAppSwitcher._windows[1];

      firstWindow.focus();

      const vm = new WindowManager();
      vm.setFrame('half-1', firstWindow);
      vm.setFrame('half-2', secondWindow);
    }
  }

  static layoutWindows(window) {
    if (!FinderAppSwitcher.filterWindows(window)) return;

    Logger.log('FinderAppSwitcher::layoutWindows', window.app().name(), window);

    window.maximize();
    window.focus();

  }

  static filterWindows(window) {

    if (!window.isNormal() || !window.isMain()) return false;

    const name = window.app().name(),
      title = window.title();

    if (!/Finder/.test(name)) return false;

    if (!title || /(Quick Look)|(About Finder)|(Finder Preferences)|(Info$)|(Volume)/.test(title)) return false;

    return true;
  }

  switchToApp(app) {


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

    // debugger;

    FinderAppSwitcher.detectDoubleKey();

    if (FinderAppSwitcher.doubleWasDetected) {
      Cmd.osascript(doubleKeyScript);
    } else {
      Cmd.osascript(script);
    }

  }
}
