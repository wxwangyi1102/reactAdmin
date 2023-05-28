import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import { siderChildren } from '../../router/app-router/siderChildren';
import { addPreFixWithMenus, searchItemWithTree } from '../../utils';
import { onChooseIcon } from '../../utils/icons';
import styles from './index.module.scss';

// 调整路由path结构--
const defaultMenus = addPreFixWithMenus(cloneDeep(siderChildren));

export default function Sider({ child, show = true }) {
  const menus = child?.children || defaultMenus;
  // 控制菜单显示
  const [isShow, setIsShow] = useState(false);
  // 设置当前级别菜单选中
  const [expandName, setExpandName] = useState('');

  const navigate = useNavigate();
  // 激活item背景色
  const onGetItemStyle = (selectPath) => {
    const curpath = window.location.pathname.slice(1);
    return curpath === selectPath ? { backgroundColor: '#007AEB' } : {};
  };
  // 激活文字
  const onGetSpanStyle = (selectPath) => {
    const curpath = window.location.pathname.slice(1);
    return curpath === selectPath
      ? {
          color: '#ffffff',
          fontFamily: 'PingFang SC - Medium, PingFang SC',
        }
      : {};
  };
  // 查找当前路径对应的菜单数据(默认通过name)
  const searchCurPathOfMenus = (name, field = 'name') => {
    const searchItem = searchItemWithTree(menus, name, field);
    return searchItem;
  };
  // 默认选中
  const defaultSelect = () => {
    const { pathname } = window.location;
    const { name } = searchCurPathOfMenus(pathname.slice(1), 'path') || {};
    if (!name) return;
    setExpandName(name);
  };
  // 动作 跳转/折叠
  const handleToLink = (event) => {
    event.stopPropagation(); // 组织冒泡
    const { item } = event.target.dataset;
    if (!item) return;
    const { name, children } = (item && JSON.parse(item)) || {};
    // 设置单个side选中项
    setExpandName(name);
    const isLeaf = children && children.length;
    // 父节点则展开
    if (isLeaf) {
      setIsShow(!isShow);
      return;
    }
    // 根据name查找数据--末级节点，切换路由
    const { path } = searchCurPathOfMenus(name) || {};
    // 跳转则折起当前级别节点
    if (path) {
      setIsShow(false);
      navigate(path);
    }
  };
  // 刷新时
  useEffect(() => {
    // 作用，刷新后可以回到菜单里面（非完善）
    defaultSelect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={styles.container}
      style={{ display: show ? 'block' : 'none' }}
      onClick={(e) => handleToLink(e)}
    >
      {menus
        .filter((v) => v.path)
        .map((item) => (
          <div
            style={onGetItemStyle(item.path)}
            className={styles.item}
            key={item.path}
            data-item={JSON.stringify(item)}
          >
            <div className={styles.icon}>
              <div>{item.icon && <img alt={item.name} src={onChooseIcon(item.icon)} />}</div>
              <span style={onGetSpanStyle(item.path)}>{item.name} </span>
            </div>
            {/* 展开箭头 */}
            <div
              style={{ opacity: item?.children && item.children.length ? 1 : 0 }}
              className={styles.icon_right}
            >
              <img alt={item.name} src={onChooseIcon(expandName !== item.name ? 'up' : 'down')} />
            </div>
            {/* 二级菜单--地柜组件必须携带条件 */}
            {item?.children && <Sider child={item} show={isShow} />}
          </div>
        ))}
    </div>
  );
}
