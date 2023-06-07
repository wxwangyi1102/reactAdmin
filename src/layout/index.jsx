import { Outlet } from 'react-router-dom';
import Sider from './sider';
import Header from './header';
import styles from './index.module.scss';

export default function Layout() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div>
          <Sider />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
