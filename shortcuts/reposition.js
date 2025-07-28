(new EventDispatcher()).setHandler('w', HYPER, () => {
    // It emulates double click on a window title bar which has an effect of repositioning a window
    // and maximize window to whole screen taking into account of dock size
    // It's useful when you switched form big screen size display to builtin display of mac book and
    // windows stay incorrect positioned and with size behind which gets behind the dock
    const script = `tell application "System Events"
                  perform action "AXZoomWindow" of (first button whose subrole is "AXFullScreenButton") \
                  of (first window whose subrole is "AXStandardWindow") \
                  of (first process whose frontmost is true)
                end tell`;

    Cmd.osascript(script);
});
