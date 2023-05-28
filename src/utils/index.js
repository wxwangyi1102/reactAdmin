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
      searchItem = searchItemWithTree(item.children, val, n);
      break;
    }
  }
  return searchItem;
};
