// 日期調整(zh-TW版)
export const formatDateZh = (isoString) => {
  return new Date(isoString).toLocaleString('zh-TW', {
    timeZone: 'Asia/Taipei',
  });
};
// 日期調整(常見年月版)
export const formatDate = (isoString) => {
  if (!isoString) return '-';

  const date = new Date(isoString);
  if (isNaN(date)) return '-';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
