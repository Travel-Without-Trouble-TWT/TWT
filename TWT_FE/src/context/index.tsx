import { IUser } from '../api/type';
import React from 'react';

type State = {
  authUser: IUser | null;
};

type Action = {
  type: string;
  payload: IUser | null;
};

type Dispatch = (action: Action) => void;

const initialState: State = {
  authUser: null,
};

type StateContextProviderProps = { children: React.ReactNode };

const StateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const stateReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        authUser: action.payload,
      };
    }
    default: {
      throw new Error('로그인을 해주세요.');
    }
  }
};

const StateContextProvider = ({ children }: StateContextProviderProps) => {
  const [state, dispatch] = React.useReducer(stateReducer, initialState);
  const value = { state, dispatch };
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

const useStateContext = () => {
  const context = React.useContext(StateContext);

  if (context) {
    return context;
  }
  throw new Error(
    'useStateContext는 StateContextProvider 내에서 사용해야 합니다.'
  );
};

export { StateContextProvider, useStateContext };
