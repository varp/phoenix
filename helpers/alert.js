/* ALERT */

class Alert {

  show(text, icon, duration = ALERT_DURATION) {
    const frame = Screen.main().visibleFrame();

    Modal.build({
      origin(mFrame) {
        return {
          x: frame.x + frame.width / 2 - mFrame.width / 2,
          y: frame.height / 2 - mFrame.height / 2 + frame.y
        };
      },
      weight: ALERT_WEIGHT,
      duration,
      animationDuration: ALERT_ANIMATION_DURATION,
      appearance: ALERT_APPEARANCE,
      text,
      icon
    }).show();
  }

}