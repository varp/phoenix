/* RESTART */


(new EventDispatcher()).setHandler('r', HYPER, () => {

    const app = App.focused();
    if (!app || _.includes(QUIT_BLACKLIST, app.name())) return;

    const appName = app.name(),
        bundleId = app.bundleIdentifier();
    (new Alert()).show(`Terminating the ${appName}...`, App.get('Phoenix').icon());

    const result = app.terminate({force: true});
    if (!result) {
        (new Alert()).show(`Failed to terminate the ${appName}... Try again.`, App.get('Phoenix').icon());
    }


    Event.on('appDidTerminate', () => {
        const timer = Timer.after(3, () => {
            (new Alert()).show(`Starting the ${appName}...`, App.get('Phoenix').icon())

            Task.run('/usr/bin/open', ['-b', bundleId], (task) => {
                if (task.status !== 0) {
                    (new Alert()).show(`Failed to start the ${appName}... Try again.`, App.get('Phoenix').icon());
                }
            });
        });
    });

});