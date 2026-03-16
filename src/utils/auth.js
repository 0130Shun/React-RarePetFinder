export const getCookieToken = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)RarePetFinder\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
};
export const clearCookieToken = () => {
  document.cookie =
    'RarePetFinder=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
};

export const getAuthToken = () => localStorage.getItem('token');

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export const clearAuthToken = () => {
  localStorage.removeItem('token');
};

// ────────────────────────────────────────────────

export const getAuthUser = () => localStorage.getItem('user');

export const setAuthUser = (user) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
};

export const clearAuthUser = () => {
  localStorage.removeItem('user');
};

// ────────────────────────────────────────────────

// 常用組合方法
export const getAuth = () => ({
  token: getAuthToken(),
  user: getAuthUser(),
});

export const clearAuth = () => {
  clearAuthToken();
  clearAuthUser();
};

// 檢查是否已登入
export const isAuthenticated = () => {
  return !!getAuthToken();
};
