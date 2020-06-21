import { readable } from 'svelte/store';

const breakPointLarge = 900;
const breakPointMiddle = 768;
const breakPointSmall = 512;

const columnStore = readable(7, (set) => {
  let resizeCallback = () => {
    let width = window.innerWidth;

    if (width > breakPointLarge) {
      set(7);
    } else if (width > breakPointMiddle) {
      set(5);
    } else if (width > breakPointSmall) {
      set(4);
    } else {
      set(3);
    }
  };

  resizeCallback();
  window.addEventListener('resize', resizeCallback);

  return () => window.removeEventListener('resize', resizeCallback);
});

export default columnStore;
