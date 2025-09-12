class Cmd {

    static shell(command, callback = _.noop) {

        Task.run(SHELL_PATH, ['-c', command], callback);

    }

    static readFile(path, callback = _.noop) {

        Cmd.shell(`cat ${path}`, ({ output }) => callback(output));

    }

    static readJSON(path, fallback = {}, callback = _.noop) {

        Cmd.readFile(path, content => {

            const parsed = _.attempt(JSON.parse, content),
                obj = _.isError(parsed) ? fallback : parsed;

            callback(obj);

        });

    }

    static osascript(script, callback = _.noop) {

        Task.run(OSASCRIPT_PATH, ['-e', script], callback);

    }

    static writeFile(path, content, callback = _.noop) {

        Cmd.shell(`echo '${content}' > ${path}`, callback);

    }

    static writeJSON(path, obj, callback = _.noop) {

        const str = JSON.stringify(obj, undefined, JSON_INDENTATION) || '{}',
            content = str.replace("'", "\\'");

        Cmd.writeFile(path, content, callback);

    }


}
