const switchers = [
    ['`', HYPER, ['Dash']],
    ['D', HYPER, ['DataGrip']],
    ['T', HYPER, ['iTerm']],
    ['P', HYPER, ['PhpStorm']],
    ['O', HYPER, ['WebStorm']],
    ['P', HYPER_SHIFT, ['GoLand']],
    ['V', HYPER, ['Code']],
    ['R', HYPER, ['Microsoft Remote Desktop']],
    ['f12', HYPER, ['Activity Monitor']]
];

const repetitiveSwitchers = [
    ['F', HYPER, ['Finder', true, 'com.apple.finder']],
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


appManager.registerAppSwitcher('com.apple.finder', new FinderAppSwitcher());
appManager.registerAppSwitcher('com.google.Chrome*', new ChromeVersionsAppSwitcher());
appManager.registerAppSwitcher('WhatsApp', new ImSwitcher());
appManager.registerAppSwitcher('Telegram', new ImSwitcher());


const ed = new EventDispatcher();
ed.setHandlers(handler, switchers);
ed.setHandlers(handler, repetitiveSwitchers, false);