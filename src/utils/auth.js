export const getToken = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)RarePetFinder\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
};

export const clearToken = () => {
  document.cookie =
    'RarePetFinder=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
};
