const switchers = [
    ['`', HYPER, ['Notion']],
    ['D', HYPER, ['DataGrip']],
    ['T', HYPER, ['iTerm']],
    ['P', HYPER, ['PhpStorm']],
    ['O', HYPER, ['GoLand']],
    ['P', HYPER_SHIFT, ['Postman']],
    ['V', HYPER, ['Visual Studio Code']],
    ['R', HYPER, ['Microsoft Remote Desktop']],
    ['F', HYPER, ['Commander One']],
    ['K', HYPER, ['Slack']],
    ['f12', HYPER, ['Activity Monitor']]
];

const repetitiveSwitchers = [
    // ['F', HYPER, ['Finder', true, 'com.apple.finder']],
    ['C', HYPER, ['Google Chrome', true, 'com.google.Chrome']],
    ['M', HYPER, ['WhatsApp', true]], // Switching to WhatsApp and Telegram
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