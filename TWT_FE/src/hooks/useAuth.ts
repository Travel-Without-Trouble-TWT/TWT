import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate, useNavigate } from 'react-router-dom';

import { joinFn } from '../api/auth';
import { JoinProps } from '../pages/Join';
import Alerts from '../components/Alerts';
const navigate = useNavigate();

//회원가입 mutation
export const useJoin = () => {
const { mutate: joinUser, isLoading: joining } = useMutation(
  (userData: JoinProps) => joinFn(userData),
  {
    onSuccess: () => { 
      return (
      <Alerts 
        type="success"
        title="🎉 회원가입"
        message="회원가입이 완료되었습니다!"
      />);
      navigate('/login');
    },
    onError: (error: any) => {
      if (Array.isArray((error as any).response.data.error)) {
        (error as any).response.data.error.forEach((element: any) => {
          return (
          <Alerts
            type="error"
            title="회원가입"
            message="회원가입에 실패하였습니다. 다시 시도해주세요."
          />);
          navigate('/join');
        });
      } else {
        //alert
      }
    },
  }
}