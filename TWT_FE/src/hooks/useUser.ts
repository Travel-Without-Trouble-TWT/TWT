import { AxiosResponse } from 'axios';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getUserFn, nicknameFn, verifyFn } from '../api/auth';
import { useStateContext } from '../context';

export function useUser() {
  const stateContext = useStateContext();
  const queryClient = useQueryClient();
  const { isSuccess, isLoading, refetch, isError, error, data } = useQuery(
    ['authUser'],
    getUserFn,
    {
      enabled: false,
      select: (data) => data.data.user,
      retry: 1,
      onSuccess: (data) => {
        stateContext.dispatch({ type: 'SET_USER', payload: data });
      },
      onError: (error) => {},
    }
  );
}
