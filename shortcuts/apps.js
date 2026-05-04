const switchers = [
    ["J", HYPER, ["Neovide"]],
    ["K", HYPER, ["cmux"]],
    ["O", HYPER, ["DataGrip"]],
    ["L", HYPER, ["DBeaver"]],
    [";", HYPER, ["DevDocs"]],
    ["H", HYPER, ["Zed"]],
    ["Y", HYPER, ["Code"]],
    ["U", HYPER, ["Goland"]],

    ["M", HYPER, ["Google Chrome"]],
    ["N", HYPER, ["Google Chrome Canary"]],

    ["A", HYPER, ["ChatGPT"]],
    ["S", HYPER, ["Perplexity"]],
    ["D", HYPER, ["Google Gemini"]],
    ["F", HYPER, ["Claude"]],

    [",", HYPER, ["Chatzone"]],
    ["/", HYPER, ["Obsidian"]],
    ["f12", HYPER, ["Activity Monitor"]],
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
