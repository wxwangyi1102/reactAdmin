import { Route, Routes, Outlet } from 'react-router-dom';
import { routes } from './app-router';

export default function AppRouter() {
  // 包含layOut路由，首页，错误页面，登录页面
  //请求页面路径需要验证 && 没有登录 -> 跳转登录页 ， 后续考虑登录后是否自动跳转被拦截路径

  const RouteNav = (param) => {
    const routesWithElement = param.map((item) => {
      const isHasLeaf = !!item?.children && !!item.children.length;
      // layout 配置除外
      return (
        <Route
          path={item.path}
          key={item.path}
          element={isHasLeaf && !item?.layout ? <Outlet /> : item.element}
        >
          {isHasLeaf && RouteNav(item.children)}
        </Route>
      );
    });
    return routesWithElement;
  };
  return <Routes>{RouteNav(routes)}</Routes>;
}
