(new EventDispatcher()).setHandler('w', HYPER, () => {
    // it emulates double click on a window title bar
    // which has an effect of repositioning a window on the screen taking in account of dock
    // after you switched form big screen size display to builtin display of mac book
    const script = `tell application "System Events"
                  perform action "AXZoomWindow" of (first button whose subrole is "AXFullScreenButton") \
                  of (first window whose subrole is "AXStandardWindow") \
                  of (first process whose frontmost is true)
                end tell`;

    Cmd.osascript(script);
});
