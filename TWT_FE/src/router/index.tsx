import { Component, Suspense, lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

//컴포넌트 호출
import Login from '../pages/Login';
import Join from '../pages/Join';
import Main from '../pages/Main';
import Selected from '../pages/Selected';

const authRoutes: RouteObject = {
  path: '*',
  children: [
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'join',
      element: <Join />,
    },
  ],
};

const normalRoutes: RouteObject = {
  path: '*',
  children: [
    {
      index: true,
      element: <Main />,
    },
    {
      path: 'location',
      element: <Selected />,
    },
  ],
};

const routes: RouteObject[] = [authRoutes, normalRoutes];
export default routes;
