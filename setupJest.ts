import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();

const noop = (x: number, y: number) => {
  document.documentElement.scrollTop = y;
};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
