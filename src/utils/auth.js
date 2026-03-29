// src/utils  function

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

export const getAuthToken = () => localStorage.getItem('accessToken');

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('accessToken', token); // 改成 accessToken
  } else {
    localStorage.removeItem('accessToken');
  }
};

export const clearAuthToken = () => {
  localStorage.removeItem('accessToken');
};

export const getPasswordStrength = (password) => {
  if (!password) return '';

  if (password.length < 6) return 'weak';
  if (password.length < 10) return 'medium';
  return 'strong';
};

// ────────────────────────────────────────────────

export const getAuthUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

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
