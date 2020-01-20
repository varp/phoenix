
/* CORNERS */

const corners = [
  ['q', HYPER, ['top-left']],
  ['w', HYPER, ['top-right']],
  ['s', HYPER, ['bottom-right']],
  ['a', HYPER, ['bottom-left']]
];

let wmCorners = new WindowManager();

(new EventDispatcher()).setHandlers(wmCorners.setFrame.bind(wmCorners), corners);
