import { Navigate } from 'react-router-dom';
import Home from '../../pages/home';
import Table from '../..//pages/table';
export const siderChildren = [
  // 占位路由
  {
    path: '',
    element: <Navigate to="home" replace />,
  },
  {
    path: 'home',
    name: '首页',
    auth: false,
    element: <Home />,
  },
  {
    path: 'system',
    name: '系统配置',

    auth: false,
    element: <Table />,
  },
];
