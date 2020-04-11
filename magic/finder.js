/* FINDER */

const edF = new EventDispatcher();
// edF.setEventHandler('windowDidOpen', FinderAppSwitcher.layoutWindowsSplitted);
edF.setEventHandler('windowDidClose', (w) => {
    (new FinderAppSwitcher()).layoutWindowsSplitted(w);
});