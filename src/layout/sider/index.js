import { useNavigate } from 'react-router-dom';
import { siderChildren as silders } from '../../router/app-router/siderChildren';
import { getLastPath } from '../../utils';
import icons from '../../assets/icons/1.png';
import styles from './sider.module.scss';
export default function Sider() {
  const navigate = useNavigate();
  // 激活选项卡
  const onGetItemStyle = (path) => {
    return getLastPath(window.location) === path
      ? {
          backgroundColor: '#007AEB',
        }
      : {};
  };
  const onGetSpanStyle = (path) => {
    return getLastPath(window.location) === path
      ? {
          color: '#ffffff',
          fontFamily: 'PingFang SC - Medium, PingFang SC',
        }
      : {};
  };
  // 跳转/折叠
  const handleToLink = (event) => {
    const { name } = event.target.dataset;
    if (!name) return;
    const { path } = silders.find((item) => name.indexOf(item.name) !== -1);
    path && navigate(path);
  };
  return (
    <div className={styles.container}>
      <div className={styles.body} onClick={(e) => handleToLink(e)}>
        {silders
          .filter((v) => v.path)
          .map((item) => (
            <div
              style={onGetItemStyle(item.path)}
              className={styles.item}
              data-name={item.name}
              key={item.path}
            >
              <div className={styles.icon}>
                <div>
                  <img alt={item.name} src={icons} />
                </div>
                <span style={onGetSpanStyle(item.path)}>{item.name} </span>
              </div>
              <div className={styles.icon_right}>下</div>
            </div>
          ))}
      </div>
    </div>
  );
}
