import { Navigate } from 'react-router-dom';
import Layout from '../../layout';
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
