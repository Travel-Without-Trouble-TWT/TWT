import { Component, Suspense, lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

//컴포넌트 호출
import Login from '../pages/Login';

const authRoutes: RouteObject = {
  path: '*',
  children: [
    {
      path: 'login',
      element: <Login />,
    },
  ],
};
