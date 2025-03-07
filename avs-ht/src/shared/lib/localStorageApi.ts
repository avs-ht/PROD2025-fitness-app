export const getStorage = <E>(storageName: string) => {
  const storage = JSON.parse(localStorage.getItem(storageName) || '[]');
  return storage as E;
};

export const setStorage = (storageName: string, storage: unknown) => {
  localStorage.setItem(storageName, JSON.stringify(storage || '[]'));
};
