// node src/scripts/geocode.js或 npm run geocode 執行指令說明：
// node src/scripts/geocode.js = 用 Node.js 執行這支 JS 腳本（script），
// 此腳本的目的是為了將 db.json 中的店家地址轉換成經緯度（latitude 和 longitude），
// 以便在地圖上顯示店家位置，目前採用兩個地理編碼服務：LocationIQ（需要 API Key）和 Nominatim（免費但有使用限制），
// 腳本會先嘗試用 LocationIQ 查詢，如果失敗再用 Nominatim 查詢，並且有一些清理地址的邏輯來提高成功率，
// 最後會將結果寫回 db.json 中，以便會未來的Leaflet地圖使用。

/* global process */
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

// 取得當前資料夾路徑（ESM寫法）
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '../../.env');

// 使用 Node.js 內建方式載入 .env（不需要安裝任何套件）
import('node:process').then(({ loadEnvFile }) => {
  try {
    loadEnvFile(envPath);
    console.log('✅ .env 檔案載入成功');
  } catch (error) {
    console.log('⚠️ 無法載入 .env 檔案（若不需要 LocationIQ 可忽略）', error);
  }
});

// 等待一點時間讓 .env 載入完成（臨時腳本用）
await new Promise((resolve) => setTimeout(resolve, 100));

// db.json 與 failed 檔案路徑
const dbPath = path.join(__dirname, '../../db.json');
const failedPath = path.join(__dirname, '../../failed-geocode.json');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ==================== 設定區 ====================
const LOCATIONIQ_KEY =
  process.env.LocationIQ_API_KEY || process.env.LOCATIONIQ_API_KEY || '';

const USE_LOCATIONIQ = !!LOCATIONIQ_KEY;
// 如果暫時不想用 LocationIQ，可以直接把這兩行改成空字串和 false，或是直接註解掉這兩行，腳本會自動跳過 LocationIQ 的查詢。
// const LOCATIONIQ_KEY = '';
// const USE_LOCATIONIQ = false;
// ===============================================

// 加強版清理地址
const cleanAddress = (address) => {
  if (!address) return '';

  return address
    .replace(/[（(].*?[）)]/g, '')
    .replace(/(\d+)-(\d+)/g, '$1之$2') // 解決 477-2 → 477之2
    .replace(/[\d一二三四五六七八九十]+樓/g, '')
    .replace(/之\d+/g, '')
    .replace(/號之\d+/g, '號')
    .replace(/\s+/g, ' ')
    .replace(/段(\d+)/g, '第$1段')
    .replace(/巷(\d+)/g, '$1巷')
    .replace(/弄(\d+)/g, '$1弄')
    .trim();
};

// 單一查詢函式
const searchGeocode = async (query, service = 'locationiq') => {
  try {
    let url, params;

    if (service === 'locationiq' && LOCATIONIQ_KEY) {
      url = 'https://eu1.locationiq.com/v1/search';
      params = {
        key: LOCATIONIQ_KEY,
        q: query + ' 台灣',
        format: 'json',
        limit: 3,
        countrycodes: 'tw',
      };
    } else {
      url = 'https://nominatim.openstreetmap.org/search';
      params = {
        q: query + ' 台灣',
        format: 'json',
        limit: 3,
        countrycodes: 'tw',
      };
    }

    console.log(`👉 ${service.toUpperCase()} 查詢: ${query}`);

    const res = await axios.get(url, {
      params,
      headers: { 'User-Agent': 'rarepetfinder-app' },
    });

    if (res.data && res.data.length > 0) {
      const { lat, lon } = res.data[0];
      return { lat: parseFloat(lat), lng: parseFloat(lon) };
    }
    return null;
  } catch (err) {
    console.error(`[${service}] 錯誤:`, err.message);
    return null;
  }
};

// 主 geocode 函式
const geocode = async (address, simpleName) => {
  const fuzzyKeywords = [
    '私訊',
    'IG',
    '不開放',
    '不提供',
    '線上詢問',
    '仁德(IG',
  ];
  if (fuzzyKeywords.some((kw) => (address || '').includes(kw))) {
    console.log('⚠️ 地址模糊，跳過自動 geocode（建議手動補座標）');
    return null;
  }

  let result = null;
  const clean = cleanAddress(address);

  if (clean.length > 5) {
    if (USE_LOCATIONIQ) result = await searchGeocode(clean, 'locationiq');
    if (!result) result = await searchGeocode(clean, 'nominatim');
  }

  if (!result) {
    const combined = `${simpleName} ${clean}`.trim();
    if (combined.length > 8) {
      console.log('↪ fallback：店名 + 地址');
      if (USE_LOCATIONIQ) result = await searchGeocode(combined, 'locationiq');
      if (!result) result = await searchGeocode(combined, 'nominatim');
    }
  }

  if (!result && simpleName.length > 3) {
    console.log('↪ fallback：只用店名');
    if (USE_LOCATIONIQ) result = await searchGeocode(simpleName, 'locationiq');
    if (!result) result = await searchGeocode(simpleName, 'nominatim');
  }

  return result;
};

// ==================== 主流程 ====================
const run = async () => {
  console.log('開始 geocode...\n');

  const rawData = fs.readFileSync(dbPath);
  const db = JSON.parse(rawData);

  let success = 0;
  let skip = 0;
  let failedList = [];

  for (const store of db.stores) {
    if (store.lat && store.lng) {
      console.log(`⏭️ 已存在：${store.storeName}`);
      skip++;
      continue;
    }

    console.log(`🔍 查詢：${store.storeName}`);

    const simpleName = store.storeName
      .replace(/\(.*?\)/g, '')
      .replace(/[-｜|].*$/, '')
      .trim();

    const result = await geocode(store.address, simpleName);

    if (result) {
      console.log(`  取得：lat ${result.lat}、lng ${result.lng}`);
      store.lat = result.lat;
      store.lng = result.lng;
      console.log(`✅ 成功`);
      success++;
    } else {
      console.log(`❌ 失敗：${store.storeName} | ${store.address || '無地址'}`);
      failedList.push({
        id: store.id,
        storeName: store.storeName,
        address: store.address || '無地址',
      });
    }

    await delay(1000);
  }

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  if (failedList.length > 0) {
    fs.writeFileSync(failedPath, JSON.stringify(failedList, null, 2));
    console.log(
      `\n⚠️ 有 ${failedList.length} 筆失敗，已記錄到 failed-geocode.json`
    );
  }

  console.log('\n🎉 完成！');
  console.log(`✅ 成功：${success}`);
  console.log(`⏭️ 跳過：${skip}`);
  console.log(`❌ 失敗：${failedList.length}`);
};

run();
