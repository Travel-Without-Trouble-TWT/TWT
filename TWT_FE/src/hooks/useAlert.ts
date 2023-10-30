import { useRecoilState } from 'recoil';
import { alertState } from '../atom/recoil';
import { AlertsProps } from '../components/Alerts';

export const useAlert = () => {
  const [alert, setAlert] = useRecoilState(alertState);

  const showAlert = (alertData: AlertsProps) => {
    setAlert(alertData);
  };

  const hideAlert = () => {
    setAlert(null);
  };

  return { showAlert, hideAlert, alert };
};
