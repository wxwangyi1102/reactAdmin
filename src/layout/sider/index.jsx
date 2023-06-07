import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import { siderChildren } from '../../router/app-router/siderChildren';
import { addPreFixWithMenus, treeToListWithTree } from '../../utils';
import { onChooseIcon } from '../../utils/icons';
import styles from './index.module.scss';

const defaultMenus = addPreFixWithMenus(cloneDeep(siderChildren));

// 维护一份树类型列表用作菜单
const listWithTree = treeToListWithTree(cloneDeep(defaultMenus));

export default function Sider() {
  // 控制菜单显示
  // 设置当前级别菜单选中
  const [menus, setMenus] = useState(listWithTree.filter((v) => v.path && v.pkey === null));
  // 根据pkey显示菜单

  const navigate = useNavigate();
  // 激活item背景色
  const onGetItemStyle = (selectPath) => {
    const curpath = window.location.pathname.slice(1);
    return curpath === selectPath
      ? {
          backgroundColor: '#007AEB',
        }
      : {};
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
  // 动作 跳转/折叠
  const handleToLink = (event) => {
    event.stopPropagation(); // 阻止冒泡
    const { isLeaf, pkey, path } = event.target.dataset;
    if (!path) return;
    // 判断是否在已选中系列里面（树特性）
    // 判断是否叶子
    if (JSON.parse(isLeaf)) {
      !pkey && setMenus(listWithTree.filter((v) => v.path && v.pkey === null));
      path && navigate(path);
    } else {
      const isCanHide = menus.some((item) => item.pkey === path);
      if (isCanHide) {
        const newMenus = menus.filter((item) => item.pkey === null || item.pkey !== path);
        setMenus(newMenus);
        // 折叠
      } else {
        // 新的
        const list = listWithTree.filter((v) => v.path && v.pkey === path);
        const index = menus.findIndex((item) => item.path === path);
        const newMenus = [...menus];
        newMenus.splice(index + 1, 0, ...list);
        setMenus(newMenus);
      }
    }
  };
  return (
    <div className={styles.container} onClick={(e) => handleToLink(e)}>
      {menus.map((item) => (
        <div
          style={onGetItemStyle(item.path)}
          className={[styles.item].join(' ')}
          key={item.path}
          data-is-leaf={item.isLeaf}
          data-pkey={item.pkey}
          data-path={item.path}
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
            <img alt={item.name} src={onChooseIcon(menus.includes(item.pkey) ? 'up' : 'down')} />
          </div>
        </div>
      ))}
    </div>
  );
}
