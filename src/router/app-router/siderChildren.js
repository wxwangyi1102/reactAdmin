import { Navigate } from 'react-router-dom';
import Home from '@/pages/home';
import Plate from '@/pages/system-configuration/plate';
import Target from '@/pages/system-configuration/target';
import User from '@/pages/system-configuration/user';
import Sea from '@/pages/user/sea';
import Sun from '@/pages/user/sun';

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
        path: 'plate',
        name: '模块配置',
        element: <Plate />,
      },
      {
        path: 'target',
        name: '目标配置',
        element: <Target />,
      },
      {
        path: 'user',
        name: '角色配置',
        element: <User />,
      },
    ],
  },
  {
    path: 'user',
    name: '隐秘的角落',
    icon: 'target',
    children: [
      {
        path: 'sea',
        name: '海日生残夜',
        element: <Sea />,
      },
      {
        path: 'sun',
        name: '太阳放光明',
        element: <Sun />,
      },
    ],
  },
];
