//把 URL 的 "診所,賣家" 這種字串 → 轉成 ["診所","賣家"]
export function splitCSV(value) {
  return (value || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}
//把 URL 參數讀出來，轉成 filters 物件（含 page）
//回傳{ area, query, storeType, petType, page }
export function parseFilters(searchParams) {
  const area = searchParams.get('area') || '';
  const query = searchParams.get('query') || '';
  const storeType = splitCSV(searchParams.get('storeType'));
  const petType = splitCSV(searchParams.get('petType'));

  const pageRaw = parseInt(searchParams.get('page'), 10);
  const page = Number.isNaN(pageRaw) || pageRaw < 1 ? 1 : pageRaw;

  return { area, query, storeType, petType, page };
}
//把 filters 物件 → 組回 URLSearchParams
//回傳 params，拿去 setSearchParams(params)
export function buildSearchParams(filters) {
  const params = new URLSearchParams();

  if (filters.area) params.set('area', filters.area);

  const query = (filters.query || '').trim();
  if (query) params.set('query', query);

  const storeType = Array.isArray(filters.storeType) ? filters.storeType : [];
  if (storeType.length > 0) params.set('storeType', storeType.join(','));

  const petType = Array.isArray(filters.petType) ? filters.petType : [];
  if (petType.length > 0) params.set('petType', petType.join(','));

  const page = Number(filters.page) || 1;
  if (page > 1) params.set('page', String(page));

  return params;
}

// ##  篩選工具：交集判斷 + 關鍵字比對

//判斷「店家的某個欄位陣列」和「使用者選的條件陣列」有沒有交集
export function hasIntersection(storeValues, selectedValues) {
  if (!Array.isArray(selectedValues) || selectedValues.length === 0)
    return true;
  if (!Array.isArray(storeValues) || storeValues.length === 0) return false;
  return selectedValues.some((v) => storeValues.includes(v));
}

// 關鍵字搜尋 query 比對欄位：name/description/area/type/petTypes 都比對
export function matchQuery(store, query) {
  const keyword = (query || '').trim().toLowerCase();
  if (!keyword) return true;

  const haystack = [
    store.storeName,
    store.description,
    store.area,
    ...(Array.isArray(store.type) ? store.type : []),
    ...(Array.isArray(store.petTypes) ? store.petTypes : []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return haystack.includes(keyword);
}
