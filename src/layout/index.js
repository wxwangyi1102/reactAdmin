import { Outlet } from 'react-router-dom';
import Sider from './sider';
import Header from './header';
import styles from './index.module.scss';

export default function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <Sider />
        <Outlet />
      </div>
    </div>
  );
}
