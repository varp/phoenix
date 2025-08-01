/* IMPORT */

// require('./config/phoenix.js');
require('./config/constants.js');

require('./helpers/logger.js');
require('./helpers/alert.js');
require('./helpers/doubleKeyDetector.js');
require('./helpers/windowManager.js');
require('./helpers/eventDispatcher.js');
// require('./helpers/spaceManager.js');

require('./helpers/appManager.js');
require('./helpers/appSwitchers/baseAppSwitcher.js');
require('./helpers/appSwitchers/finder.js');
require('./helpers/appSwitchers/chrome.js');
require('./helpers/appSwitchers/im.js');

require('./helpers/cmd.js');

// require('./shortcuts/center.js');
// require('./shortcuts/corners.js');
// require('./shortcuts/expand.js');
require('./shortcuts/reposition.js');

// require('./shortcuts/expandOnNextScreen.js');
// require('./shortcuts/grow.js');
// require('./shortcuts/halves.js');
// require('./shortcuts/sides.js');
// require('./shortcuts/spaces.js');
// require('./shortcuts/sixths.js');
// require('./shortcuts/split_view.js');
// require('./shortcuts/thirds.js');

// require('./shortcuts/info.js');
// require('./shortcuts/pause.js');
require('./shortcuts/quit.js');
require('./shortcuts/reload.js');
require('./shortcuts/restart.js');

require('./shortcuts/apps.js');

// require('./magic/chrome.js');
// require('./magic/finder.js');
// require('./magic/iterm.js');
// require('./magic/terminal.js');
// require('./magic/vscode.js');
// require('./magic/dialogs.js');

/* LOADED */

/** @global App */
(new Alert()).show('', App.get('Phoenix').icon());
