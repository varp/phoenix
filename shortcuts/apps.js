

const switchers = [
  ['`', HYPER, ['Trello']],
  ['D', HYPER, ['Dash']],
  ['M', HYPER, ['WhatsApp']],
  ['M', HYPER_SHIFT, ['Telegram']],
  ['C', HYPER, ['Google Chrome', true, 'com.google.Chrome']],
  ['C', HYPER_SHIFT, ['Google Chrome Canary', true, 'com.google.Chrome.canary']],
  ['T', HYPER, ['iTerm']],
  ['P', HYPER, ['PhpStorm']],
  ['P', HYPER_SHIFT, ['GoLand']],
  ['V', HYPER, ['Code']],
  ['R', HYPER, ['Microsoft Remote Desktop']],
  ['f12', HYPER, ['Activity Monitor']]
];

const repetitiveSwitchers = [
  ['F', HYPER, ['Finder', true, 'com.apple.finder']],
];

let appManager = AppManager.instance;

const handler = (appName, launch, bid) => {
  return appManager.switchToApp(appName, launch, bid);
};

appManager.registerAppSwitcher('com.apple.finder', new FinderAppSwitcher());


const ed = new EventDispatcher();
ed.setHandlers(handler, switchers);
ed.setHandlers(handler, repetitiveSwitchers, false);
