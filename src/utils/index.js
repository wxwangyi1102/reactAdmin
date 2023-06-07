export const getLastPath = (location) => {
  const { pathname } = location;
  return pathname ? pathname.split('/').at(-1) : '';
};
export const addPreFixWithMenus = (list, prefix = '/') => {
  return list.map((item) => {
    const path = item.path !== '' && prefix !== '/' ? `${prefix}/${item.path}` : item.path;
    if (item?.children) {
      item.children = addPreFixWithMenus(item.children, path);
    }
    item.path = path;
    return item;
  });
};
export const searchItemWithTree = (list, val, n) => {
  let searchItem = {};
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const curName = item[n];
    if (curName === val) {
      searchItem = item;
      break;
    }
    if (item.children) {
      const deepItem = searchItemWithTree(item.children, val, n);
      if (deepItem[n]) return deepItem;
    }
  }
  return searchItem;
};

/**
 * @description
 */
export const treeToListWithTree = (list, pkey = null, isLeaf) => {
  if (!list || !list.length) return;
  let resultList = [];
  for (let i = 0; i < list.length; i++) {
    const { children, ...item } = list[i];
    const isNoEmpty = children && children.length;
    item.pkey = pkey;
    item.isLeaf = !isNoEmpty;
    resultList.push(item);
    if (isNoEmpty) {
      resultList.push(...treeToListWithTree(children, item.path, true));
    }
  }
  return resultList;
};
