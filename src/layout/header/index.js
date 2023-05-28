import { onChooseIcon } from '../../utils/icons';
import styles from './index.module.scss';
export default function Header() {
  const { name } = JSON.parse(localStorage.getItem('token'));
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={styles.icons_container}>
          <img alt="总办目标管理" src={onChooseIcon('titleLeft')} />
        </div>
        <span className={styles.title}>总办目标管理</span>
      </div>
      <div className={styles.right}>
        <span>{name}</span>
      </div>
    </div>
  );
}
