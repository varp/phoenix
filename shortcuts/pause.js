
/* PAUSE */

(new EventDispatcher()).setHandler('f8', HYPER, () => {

  Cmd.osascript('tell application "System Events" to return name of first process whose frontmost is true', ({ output }) => {

    const app = _.trim(output),
      isStopped = !Window.focused(); // If the app is stopped this will return undefined

    Cmd.shell(`killall -${isStopped ? 'CONT' : 'STOP'} -c '${app}'`);

  });

});
