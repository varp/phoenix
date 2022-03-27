/* FULLSCREEN */


(new EventDispatcher()).setHandler('space', HYPER_SHIFT, () => {

    const LOG_PREFIX = 'ExpandOnNextScreen:';

    const mainScreen = Screen.main();
    Logger.log('Main Screen', mainScreen.identifier());

    const window = Window.focused() || Window.at(Mouse.location());
    if (window === undefined || (window && !window.isVisible())) {
        Logger.log(LOG_PREFIX, 'Notice. There is no window to move or it is not visible.');
        return;
    }

    window.focus();
    const windowCurrentScreen = window.screen(),
        windowCurrentSpace = windowCurrentScreen.currentSpace(),
        nextScreen = windowCurrentScreen.next(),
        nextScreenCurrentSpace = nextScreen.currentSpace();

    Logger.log(LOG_PREFIX, 'Window', window.title(), 'currentScreen', windowCurrentScreen.identifier(), 'currentSpace', windowCurrentSpace.hash());
    Logger.log(LOG_PREFIX, Logger.expandFrame(windowCurrentScreen.flippedVisibleFrame(), 'currentScreen'), windowCurrentScreen.identifier());
    Logger.log(LOG_PREFIX, Logger.expandFrame(nextScreen.flippedVisibleFrame(),'nextScreen'), nextScreen.identifier());

     
    window.setFrame(nextScreen.flippedVisibleFrame());
    window.focus();

    expansionCache && delete expansionCache[window.hash()];

});