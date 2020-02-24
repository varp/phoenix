
/* FINDER */

(new EventDispatcher()).setEventHandler('windowDidOpen', FinderAppSwitcher.layoutWindows);

(new EventDispatcher()).setEventHandler('windowDidOpen', FinderAppSwitcher.layoutWindowsSplitted);
