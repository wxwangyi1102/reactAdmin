import styles from './index.module.scss';

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.left_title}>
        {/* <div></div> */}
        <div className={styles.icon}>
          <span>**</span>
        </div>
        <div className={styles.title}>
          <span>总办目标管理</span>
        </div>
      </div>
    </div>
  );
}
