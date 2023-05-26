export const getLastPath = (location) => {
  const { pathname } = location;
  return pathname ? pathname.split('/').at(-1) : '';
};
