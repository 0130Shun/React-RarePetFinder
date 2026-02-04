import axios from 'axios';
const API_URL = 'http://localhost:3001';

// 建立 axios 實體
const apiRequest = axios.create({
  baseURL: API_URL, // 這是你的後端 Port
  timeout: 5000,
});

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
// 重大誤區提醒：GitHub Pages 與 db.json
// 這點非常重要，這可能是你之後會踩到的最大「暴雷」：
// GitHub Pages 本身是「靜態網頁託管」，它不支援執行 json-server。
// 如果你把 db.json 放在 GitHub Pages 上：它只會被當成一個「純文字檔」。
// 你的前端可以 fetch 到這個檔案的內容，但你無法使用 ?q= 搜尋，也無法透過 POST 新增資料（因為沒人幫你執行邏輯，檔案也不會被寫入）。
// 解決方案：
// Render / Railway / Fly.io：將 db.json 與 json-server 部署到這些免費（或有免費額度）的雲端平台。這樣你會有一個真正的 API 網址（例如 https://my-api.onrender.com）。
// 前端部署到 GitHub Pages：前端程式碼維持在那，但 API_URL 改連向上面那個網址並存放import.meta.env.VITE_API_URL。
// 開 2個CMD分頁，記得先啟動後端：
// npx json-server-auth db.json --port 3001
// 再啟動前端：
// npm run dev
// //範本： json-server 的 ?q= 語法，是專門去進行全文檢索
// export const fetchStores = async (query = '') => {
//   // json-server 支援 ?q= 進行全文檢索，或 ?area= 進行精確篩選
//   const response = await fetch(`${API_URL}/stores${query}`);
//   if (!response.ok) throw new Error('網路請求失敗');
//   return await response.json();
// };

/**
 * 【店家模組】
 * 只要呼叫：getStores({ keyword: '...' }) 即可， limit等於分頁的每一頁應該顯示的比數
 */
export const storeService = {
  // 1. 取得全部列表 (支援選填分頁)
  async getAllStores({ page = null, limit = 9 } = {}) {
    const config = { params: {} };
    if (page) {
      config.params._page = page;
      config.params._limit = limit;
    }

    // axios 會自動把 params 轉成查詢字串
    const res = await apiRequest.get('/stores', config);

    return {
      data: res.data, // axios 自動轉好 JSON 了
      total: res.headers['x-total-count'], // 注意 axios 抓 header 是小寫
    };
  },

  // 2. 取得列表 + 搜尋 + 分頁 (模仿圖 2 專業感)
  //   方法 C：繼續用 q，但在 db.json 加上一個方便搜尋的欄位（折衷）在每筆資料多加一個欄位，
  //   例如 typeText：{
  //   "type": ["診所", "賣家"],
  //   "typeText": "診所 賣家",
  //   ...
  // }q: type ? type : keyword || undefined,
  // 但這屬於「資料端作弊」，維護起來會比較麻煩。=>

  // 決定用前端過濾，getStoresByQuery 可以暫時不用getStoresByQueryapi，只用 getAllStores 載全部後分類
  async getStoresByQuery({
    page = 1,
    limit = 9,
    keyword = '',
    area = '',
    type = '',
    petTypes = '',
  } = {}) {
    const res = await apiRequest.get('/stores', {
      params: {
        _page: page,
        _limit: limit,
        // 對陣列欄位使用 _like 來做包含搜尋
        q: keyword || undefined, // 把 type 當關鍵字搜尋
        area: area || undefined,
        typeText_like: type || undefined || undefined,
        petTypesText_like: petTypes || undefined,
      },
    });

    return {
      data: res.data,
      total: res.headers['x-total-count'],
    };
  },

  // 3. 取得單一店家細節
  async getStoreDetail(id) {
    const res = await apiRequest.get(`/stores/${id}`);
    return res.data;
  },
};

/**
 * 【文章模組】
 */
// export const articleService = {
//   async getList() {
//     const res = await fetch(`${API_URL}/articles`);
//     return await res.json();
//   },
// };
