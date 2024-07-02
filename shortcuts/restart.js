/* RESTART */


(new EventDispatcher()).setHandler('r', HYPER, () => {

    const app = App.focused();
    if (!app || _.includes(QUIT_BLACKLIST, app.name())) return;

    const appName = app.name(),
        bundleId = app.bundleIdentifier(),
        pid = app.processIdentifier();
    (new Alert()).show(`Terminating the ${appName}...`, App.get('Phoenix').icon());

    const result = app.terminate();
    if (!result) {
        (new Alert()).show(`Failed to terminate the ${appName}... Try again.`, App.get('Phoenix').icon());
    }


    Event.on('appDidTerminate', (function () {

        if (!pid) {
            return;
        }


        const timer = Timer.every(0.5, () => {

            const findProcess = `
            tell application "System Events" to set processIsRunning to exists (processes where unix id is ${pid})
            processIsRunning
            `
            
            Cmd.osascript(findProcess, (task) => {
                
                
                if (task.status === 0) {

                    if (task.output.includes("true")) {
                        Logger.log(`AppRestarter: App ${appName}, PID ${pid}, TASK is running - ${task.output}`);
                        return;
                    };

                    Logger.log(`AppRestarter: App ${appName}, PID ${pid}, TASK is running - ${task.output}`);

                    (new Alert()).show(`Starting the ${appName}...`, App.get('Phoenix').icon())
        
                    Task.run('/usr/bin/open', ['-b', bundleId], (task) => {
                        Timer.off(timer);
                        if (task.status !== 0) {
                            (new Alert()).show(`Failed to start the ${appName}... Try again.`, App.get('Phoenix').icon());
                        }
                    });
                }
            });


        });
        
    })(appName, bundleId, pid));

});