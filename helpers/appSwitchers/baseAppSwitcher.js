class BaseAppSwitcher {
    switchToApp(appName, launch = true, bundleIdentifier = "") {
        throw new Error("Must be implemented in inherited class");
    }
}