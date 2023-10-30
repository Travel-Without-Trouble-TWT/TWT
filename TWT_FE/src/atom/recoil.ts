import { atom } from 'recoil';
import { AlertsProps } from '../components/Alerts';

export const alertState = atom<AlertsProps | null>({
  key: 'alertState',
  default: null,
});
