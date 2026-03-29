// src/constants 靜態資料

export const AREA_OPTIONS = [
  '',
  '新北',
  '台北',
  '桃園',
  '高雄',
  '台中',
  '台南',
  '嘉義',
  '新竹',
  '屏東',
];

export const AREA_OPTIONS_NO_EMPTY = AREA_OPTIONS.filter((a) => a !== '');

export const STORE_TYPE_OPTIONS = ['診所', '旅館', '賣家'];

export const PET_TYPE_OPTIONS = [
  '柯爾鴨',
  '鸚鵡',
  '倉鼠',
  '烏龜',
  '守宮',
  '刺蝟',
];

export const PAGE_SIZE = 9;

export const DEFAULT_FILTERS = {
  area: '',
  query: '',
  storeType: [],
  petType: [],
};

// DEFAULT_FILTERS和getDefaultFilters使用上邏輯一致，2選1
// export const getDefaultFilters = () => ({
//   area: '',
//   query: '',
//   storeType: [],
//   petType: [],
// });
