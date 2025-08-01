const switchers = [
    ['J', HYPER, ['GoLand']],
    ['K', HYPER, ['Ghostty']],
    ['L', HYPER, ['DataGrip']],
    [';', HYPER, ['DevDocs']],
    ['H', HYPER, ['Neovide']],
    ['M', HYPER, ['Zen']],
    ['N', HYPER, ['Google Chrome']],
    [',', HYPER, ['Chatzone']],
    ['.', HYPER, ['Obsidian']],
    ['f12', HYPER, ['Activity Monitor']]
];

const repetitiveSwitchers = [
    // ['M', HYPER, ['Google Chrome', true, 'com.google.Chrome']],
    // ['M', HYPER, ['Telegram', true]], // Switching to WhatsApp and Telegram
];

/**
 * @type {AppManager}
 */
let appManager = AppManager.instance;
const handler = (appName, launch, bid) => {
    return appManager.switchToApp(appName, launch, bid);
};

// appManager.registerAppSwitcher('com.google.Chrome.*', new ChromeVersionsAppSwitcher());
// appManager.registerAppSwitcher('(Telegram|WhatsApp)', new ImSwitcher());


const ed = new EventDispatcher();
ed.setHandlers(handler, switchers);
// ed.setHandlers(handler, repetitiveSwitchers, false);
