class BaseAppSwitcher {
  switchToApp(app) {
    throw new Error("Must be implemented in inherited class");
  }
}