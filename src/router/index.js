import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { routes } from './app-router';
import { getLastPath } from '../utils';

export default function AppRouter() {
  const exPath = getLastPath(useLocation());
  const isLogin = false;
  // 包含layOut路由，首页，错误页面，登录页面
  //请求页面路径需要验证 && 没有登录 -> 跳转登录页 ， 后续考虑登录后是否自动跳转被拦截路径
  const RouteNav = (param) => {
    return param.map((item) => {
      return (
        <Route
          path={item.path}
          key={item.path}
          element={
            item.path === exPath && item.auth && !isLogin ? (
              <Navigate to="/login" replace={true}></Navigate>
            ) : (
              item.element
            )
          }
        >
          {item?.child && RouteNav(item.child)}
        </Route>
      );
    });
  };

  return <Routes>{RouteNav(routes)}</Routes>;
}
