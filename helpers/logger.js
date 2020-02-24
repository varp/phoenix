
/* LOG */

class Logger {

  /**
   * Logs data either to stdout or developer tools console depending on
   * is in the Storage value with `PHOENIX_DEBUG_KEY` set to `true`;
   * @param  {...any} data  Data to be logged
   */
  static log(...data) {

    if (Storage.get(DEBUG_MODE_KEY) === true) {
      data.unshift("DEBUG CONFIG");
      console.log(...data);
      Phoenix.log(...data);
    }
  }
}

