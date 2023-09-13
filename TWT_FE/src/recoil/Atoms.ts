import { atom } from 'recoil';

export const dateRangeState = atom({
  key: 'dateRangeState',
  default: [null, null],
});
