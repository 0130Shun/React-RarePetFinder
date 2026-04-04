// node src/scripts/geocode.js或 npm run geocode 執行指令說明：
// node src/scripts/geocode.js = 用 Node.js 執行這支 JS 腳本（script），
// 此腳本的目的是為了將 db.json 中的店家地址轉換成經緯度（latitude 和 longitude），以便在地圖上顯示店家位置。

import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

// 取得當前資料夾路徑（ESM寫法）
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// db.json 路徑（往上一層）
const dbPath = path.join(__dirname, '../../db.json');

// 延遲（避免 API 被封）
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Geocode function（用 OpenStreetMap）
const geocode = async (address) => {
  try {
    const res = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: address,
        format: 'json',
        limit: 1,
      },
      headers: {
        'User-Agent': 'rarepetfinder-app', // 必加
      },
    });

    if (res.data.length === 0) {
      console.log(`❌ 找不到地址：${address}`);
      return null;
    }

    const { lat, lon } = res.data[0];

    return {
      lat: parseFloat(lat),
      lng: parseFloat(lon),
    };
  } catch (error) {
    console.log(`❌ ${address}，API錯誤：${error.message}`);
    return null;
  }
};

// 主流程
const run = async () => {
  console.log('開始 geocode...\n');

  const rawData = fs.readFileSync(dbPath);
  const db = JSON.parse(rawData);

  let success = 0;
  let skip = 0;

  for (const store of db.stores) {
    // 已有 lat/lng 就跳過
    if (store.lat && store.lng) {
      console.log(`⏭️ 已存在：${store.storeName}`);
      skip++;
      continue;
    }

    console.log(`🔍 查詢：${store.storeName}`);

    const result = await geocode(store.address);

    if (result) {
      store.lat = result.lat;
      store.lng = result.lng;
      console.log(`✅ 成功：${store.lat}, ${store.lng}`);
      success++;
    }

    // 筆延遲 1 秒（避免被封）
    await delay(1000);
  }

  // 寫回 db.json
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  console.log('\n🎉 完成！');
  console.log(`✅ 成功：${success}`);
  console.log(`⏭️ 跳過：${skip}`);
};

run();
