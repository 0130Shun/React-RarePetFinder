// 腳本 geocode.js執行指令說明： node src/scripts/geocode.js或 npm run geocode
// node src/scripts/geocode.js = 用 Node.js 執行這支 JS 腳本（script），
// 此腳本的目的是為了將 db.json 中的店家地址轉換成經緯度（latitude 和 longitude），
// 以便在地圖上顯示店家位置，目前採用兩個地理編碼服務：LocationIQ（需要 API Key）和 Nominatim（免費但有使用限制），
// 腳本會先嘗試用 LocationIQ 查詢，如果失敗再用 Nominatim 查詢，並且有一些清理地址的邏輯來提高成功率，
// 最後會將結果寫回 db.json 中，以便會未來的Leaflet地圖使用。

// 日後補強LocationIQ依舊不穩定有部分地址會查詢不到，所以需要申請google-mapAPI補強，
// 流程是LocationIQ失敗 => google-mapAPI => NOMINATIM(走道NOMINATIM大概率還是失敗，可能考慮移除NOMINATIM)

/* global process */
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

// 取得當前資料夾路徑（ESM寫法）
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '../../.env');

// 載入 .env
import('node:process').then(({ loadEnvFile }) => {
  try {
    loadEnvFile(envPath);
    console.log('✅ .env 檔案載入成功');
  } catch (error) {
    console.log('⚠️ 無法載入 .env 檔案（若不需要 LocationIQ 可忽略）', error);
  }
});

// 等待 .env 載入
await new Promise((resolve) => setTimeout(resolve, 100));

const dbPath = path.join(__dirname, '../../db.json');
const failedPath = path.join(__dirname, '../../failed-geocode.json');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ==================== 設定區 ====================
const LOCATIONIQ_KEY =
  process.env.LocationIQ_API_KEY || process.env.LOCATIONIQ_API_KEY || '';

const USE_LOCATIONIQ = !!LOCATIONIQ_KEY;
// ===============================================

// ==================== 清理地址（與前端 hook 保持一致） ====================
const cleanAddress = (address) => {
  if (!address) return '';

  let cleaned = address
    .replace(/[（(].*?[）)]/g, '')
    .replace(/(\d+)-(\d+)/g, '$1之$2')
    .replace(/[\d一二三四五六七八九十]+樓/g, '')
    .replace(/之\d+/g, '')
    .replace(/號之\d+/g, '號')
    .replace(/\s+/g, ' ')
    .trim();

  // 主正則：處理縣市 + 區 + 路（最重要的一段）
  cleaned = cleaned.replace(
    /([台臺北新中南高桃][^市]?市?)\s*([^\s]+?區)\s*([^\s]+?(?:路|街|大道|東路|西路|南路|北路|巷|弄|橋))/g,
    '$1 $2 $3'
  );

  // 保險正則（處理沒有縣市的短地址）
  cleaned = cleaned.replace(
    /([^\s]+區)\s*([^\s]+?(?:路|街|大道|東路|西路|南路|北路|巷|弄|橋))/g,
    '$1 $2'
  );

  return cleaned.trim();
};

// ==================== 單一查詢函式 ====================
const searchGeocode = async (query, service = 'nominatim') => {
  try {
    let url, params;
    const baseQuery = query.trim();

    if (service === 'locationiq' && LOCATIONIQ_KEY) {
      url = 'https://eu1.locationiq.com/v1/search';
      params = {
        key: LOCATIONIQ_KEY,
        q: baseQuery,
        format: 'json',
        limit: 3,
        countrycodes: 'tw',
        addressdetails: 1,
      };
    } else {
      url = 'https://nominatim.openstreetmap.org/search';
      params = {
        q: baseQuery,
        format: 'json',
        limit: 3,
        countrycodes: 'tw',
        addressdetails: 1,
      };
    }

    console.log(`👉 使用 [${service.toUpperCase()}] 查詢 → ${baseQuery}`);

    const res = await axios.get(url, {
      params,
      headers: { 'User-Agent': 'rarepetfinder-geocode-script' },
    });

    if (res.data && res.data.length > 0) {
      const first = res.data[0];
      console.log(
        `✅ ${service.toUpperCase()} 成功 | display_name: ${first.display_name}`
      );

      return {
        lat: parseFloat(first.lat),
        lng: parseFloat(first.lon),
      };
    }

    console.log(`❌ ${service.toUpperCase()} 無結果`);
    return null;
  } catch (err) {
    console.error(`❌ [${service}] 錯誤:`, err.message);
    return null;
  }
};

// ==================== 主 geocode 函式 ====================
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
    console.log('⚠️ 地址模糊，跳過自動 geocode');
    return null;
  }

  let result = null;
  const clean = cleanAddress(address);

  console.log(`   清理後地址: ${clean}`);

  // 1. 先試乾淨地址
  if (clean.length > 5) {
    if (USE_LOCATIONIQ) result = await searchGeocode(clean, 'locationiq');
    if (!result) result = await searchGeocode(clean, 'nominatim');
  }

  // 2. Fallback：店名 + 地址
  if (!result && simpleName) {
    const combined = `${simpleName} ${clean}`.trim();
    if (combined.length > 8) {
      console.log('↪ fallback：店名 + 地址');
      if (USE_LOCATIONIQ) result = await searchGeocode(combined, 'locationiq');
      if (!result) result = await searchGeocode(combined, 'nominatim');
    }
  }

  // 3. Fallback：只用店名
  if (!result && simpleName && simpleName.length > 3) {
    console.log('↪ fallback：只用店名');
    if (USE_LOCATIONIQ) result = await searchGeocode(simpleName, 'locationiq');
    if (!result) result = await searchGeocode(simpleName, 'nominatim');
  }

  return result;
};

// ==================== 主流程 ====================
const run = async () => {
  console.log('🚀 開始批次 Geocode 處理...\n');

  const rawData = fs.readFileSync(dbPath);
  const db = JSON.parse(rawData);

  let success = 0;
  let skip = 0;
  let failedList = [];

  for (const store of db.stores) {
    if (store.lat && store.lng) {
      console.log(`⏭️ 已存在座標：${store.storeName}`);
      skip++;
      continue;
    }

    console.log(`🔍 處理：${store.storeName}`);

    const simpleName = store.storeName
      .replace(/\(.*?\)/g, '')
      .replace(/[-｜|].*$/, '')
      .trim();

    const result = await geocode(store.address, simpleName);

    if (result) {
      store.lat = result.lat;
      store.lng = result.lng;
      console.log(`✅ 成功 → lat: ${result.lat}, lng: ${result.lng}\n`);
      success++;
    } else {
      console.log(
        `❌ 失敗 → ${store.storeName} | ${store.address || '無地址'}\n`
      );
      failedList.push({
        id: store.id,
        storeName: store.storeName,
        address: store.address || '無地址',
      });
    }

    await delay(1000); // 避免被 ban
  }

  // 寫回 db.json
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  if (failedList.length > 0) {
    fs.writeFileSync(failedPath, JSON.stringify(failedList, null, 2));
    console.log(
      `⚠️ 有 ${failedList.length} 筆失敗，已記錄到 failed-geocode.json`
    );
  }

  console.log('\n🎉 批次處理完成！');
  console.log(`✅ 成功：${success}`);
  console.log(`⏭️ 跳過：${skip}`);
  console.log(`❌ 失敗：${failedList.length}`);
};

run().catch(console.error);
