
/* RELOAD */

/** 
 * Reloads phoenix config. 
 * 
 * @deprecated
 * Phoenix automatically reload itself on the configuration changes
 *
 */
setHandler('R', HYPER_SHIFT, () => {
  Phoenix.reload();
  new Alert().show('', App.get('Phoenix').icon());
});
