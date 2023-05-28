import { Navigate } from 'react-router-dom';
import Home from '@/pages/home';
import GlobalUser from '@/pages/system-configuration/global-user';
import TargetPlate from '@/pages/system-configuration/target-plate';
import ErrPage from '../..//pages/error';

export const siderChildren = [
  // 占位路由
  {
    path: '',
    element: <Navigate to="home" replace />,
  },
  {
    path: 'home',
    name: '首页',
    icon: 'home',
    auth: false,
    element: <Home />,
  },
  {
    path: 'system',
    name: '系统配置',
    icon: 'system',
    auth: false,
    children: [
      {
        path: 'global-user',
        name: '全局角色',
        element: <GlobalUser />,
      },
      {
        path: 'target-plate',
        name: '目标板块',
        element: <TargetPlate />,
        children: [
          {
            path: 'errPage',
            name: '测试页面1',
            element: <ErrPage />,
          },
        ],
      },
    ],
  },
];
