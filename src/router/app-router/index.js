import { Navigate } from 'react-router-dom';

import Layout from '../../layout';
import Login from '../..//pages/login';
import ErrPage from '../..//pages/error';
import { siderChildren } from './siderChildren';

export const routes = [
  {
    path: '/',
    auth: false,
    layout: true,
    element: <Layout />,
    children: siderChildren,
  },
  {
    path: '/login',
    auth: false,
    element: <Login />,
  },
  {
    path: '/errPage',
    auth: false,
    element: <ErrPage />,
  },
  {
    path: '/*',
    auth: false,
    element: <Navigate to="/errPage" replace={true}></Navigate>,
  },
];
