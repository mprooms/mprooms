import roomsState from './state/rooms'
import reservationsState from './state/reservations'

import App from "./App.svelte";

roomsState.load()
reservationsState.load()

window.addEventListener('focus', () => reservationsState.load());

export default new App({ target: document.body });

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    app.$destroy();
  });
}
