const switchers = [
    ['N', HYPER, ['Obsidian']],
    ['D', HYPER, ['DataGrip']],
    ['T', HYPER, ['Wezterm']],
    ['P', HYPER, ['PhpStorm']],
    ['O', HYPER, ['GoLand']],
    ['P', HYPER_SHIFT, ['Postman']],
    ['V', HYPER, ['Visual Studio Code']],
    // ['F', HYPER, ['Finder']], // replace with creation of new Finder window
    ['K', HYPER, ['Chatzone']],
    ['f12', HYPER, ['Activity Monitor']]
];

const repetitiveSwitchers = [
    // ['F', HYPER, ['Finder', true, 'com.apple.finder']],
    ['C', HYPER, ['Google Chrome', true, 'com.google.Chrome']],
    ['M', HYPER, ['Telegram', true]], // Switching to WhatsApp and Telegram
];

/**
 * @type {AppManager}
 */
let appManager = AppManager.instance;
const handler = (appName, launch, bid) => {
    return appManager.switchToApp(appName, launch, bid);
};

appManager.registerAppSwitcher('com.google.Chrome.*', new ChromeVersionsAppSwitcher());
appManager.registerAppSwitcher('(Telegram|WhatsApp)', new ImSwitcher());


const ed = new EventDispatcher();
ed.setHandlers(handler, switchers);
ed.setHandlers(handler, repetitiveSwitchers, false);
