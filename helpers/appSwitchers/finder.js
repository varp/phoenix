class FinderAppSwitcher extends BaseAppSwitcher {


  static layoutWindowsSplitted(window) {

    if (!FinderAppSwitcher.filterWindows(window)) return;

    Logger.log('FinderAppSwitcher::layoutWindowsSplitted', window.app().name(), window);


    let windows = window.app().windows().filter((v) => {
      return v.isNormal() || v.isMain();
    });
    FinderAppSwitcher._windows = windows.length >= 2 ? windows.slice(-2) : windows;

    if (FinderAppSwitcher._windows.length === 2 && FinderAppSwitcher.doubleWasDetected) {
      const firstWindow = FinderAppSwitcher._windows[0];
      const secondWindow = FinderAppSwitcher._windows[1];


      const vm = new WindowManager();
      vm.setFrame('half-1', firstWindow);
      vm.setFrame('half-2', secondWindow);

      firstWindow.raise()
      firstWindow.focus();

    }

    if (FinderAppSwitcher._windows.length < 2) {

      Logger.log('FinderAppSwitcher::layoutWindows', window.app().name(), window);

      window.maximize();
      window.raise();
      window.focus();
    }


  }

  static layoutWindows(app) {
    let window = _.first(app.windows({
      visible: true
    }));

    FinderAppSwitcher.layoutWindowsSplitted(window);
  }

  static filterWindows(window) {

    if (!window || !window.isNormal() || !window.isMain()) return false;

    const name = window.app().name(),
      title = window.title();

    if (!/Finder/.test(name)) return false;

    if (!title || /(Quick Look)|(About Finder)|(Finder Preferences)|(Info$)|(Volume)/.test(title)) return false;

    return true;
  }

  switchToApp(appName, launch = true, bundleIdentifier = "") {

    super.switchToApp(appName, launch, bundleIdentifier);

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


    const layoutCallback = (task) => {

      FinderAppSwitcher.layoutWindowsSplitted(AppManager.instance.findApp(appName, launch, bundleIdentifier).mainWindow());
    };

    if (FinderAppSwitcher.doubleWasDetected) {
      Cmd.osascript(doubleKeyScript, layoutCallback);
    } else {
      Cmd.osascript(script, layoutCallback);
    }

  }
}