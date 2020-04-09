class ChromeVersionsAppSwitcher extends BaseAppSwitcher {


  switchToApp(appName, launch = true, bundleIdentifier = "") {
    super.switchToApp(appName, launch, bundleIdentifier);


    bundleIdentifier = ChromeVersionsAppSwitcher.doubleWasDetected ? 'com.google.Chrome.canary' :
      'com.google.Chrome';
    appName = ChromeVersionsAppSwitcher.doubleWasDetected ? 'Google Chrome Canary' : 'Google Chrome';

    Logger.log('ChromeVersionsAppSwitcher::switchToApp', `doubleKeyDetected - ${ChromeVersionsAppSwitcher.doubleWasDetected}, bundleId - ${bundleIdentifier}, appName - ${appName}`)

    AppManager.instance.defaultAppSwitcher(appName, launch, bundleIdentifier);
  }



}