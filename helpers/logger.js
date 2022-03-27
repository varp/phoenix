/* LOG */

Storage.set(DEBUG_MODE_KEY, true);
class Logger {

    /**
     * Logs data either to stdout or developer tools console depending on
     * is in the Storage (~/Library/Application Support/Phoenix/storage.json) 
     * value with `PHOENIX_DEBUG_KEY` set to `true`;
     * 
     * @param  {...any} data  Data to be logged
     */
    static log(...data) {

        if (Storage.get(DEBUG_MODE_KEY) === true) {
            data.unshift("DEBUG:");
            console.log(...data);
        }
    }

    static expandFrame(frame, name) {
        const data = [`Frame ${name}:`, 'x', frame.x, 'y', frame.y, 'width', frame.width, 'height', frame.height];
        return data.join(' ');
    }
}