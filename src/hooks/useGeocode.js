import { useState, useCallback } from 'react';
import axios from 'axios';

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
const LOCATIONIQ_URL = 'https://eu1.locationiq.com/v1/search';

// LocationIQ_KEY 從 .env 引入（Vite 會自動讀取）
const LOCATIONIQ_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY || null;

// 日後補強LocationIQ依舊不穩定有部分地址會查詢不到，所以需要申請google-mapAPI補強，
// 流程是LocationIQ失敗 => google-mapAPI => NOMINATIM(走道NOMINATIM大概率還是失敗，可能考慮移除NOMINATIM)
export const useGeocode = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null); // { lat, lng, displayName? }

  // 清理地址
  const cleanAddress = useCallback((address) => {
    if (!address) return '';

    let cleaned = address
      .replace(/[（(].*?[）)]/g, '') // 移除括號內容
      .replace(/(\d+)-(\d+)/g, '$1之$2')
      .replace(/[\d一二三四五六七八九十]+樓/g, '')
      .replace(/之\d+/g, '')
      .replace(/號之\d+/g, '號')
      .replace(/\s+/g, ' ') // 多空白壓成一個
      .trim();

    // === 關鍵優化：在「XX區」與路名之間強制插入一個空格 ===
    // 例：西屯區重慶路8號 → 西屯區 重慶路8號
    //     桃園區永安路968號 → 桃園區 永安路968號
    cleaned = cleaned.replace(
      /([台臺北新中南高桃][^市]?市?)\s*([^\s]+?區)\s*([^\s]+?(?:路|街|大道|東路|西路|南路|北路|巷|弄|橋))/g,
      '$1 $2 $3'
    );

    // 第二道保險（處理沒有縣市的短地址）
    cleaned = cleaned.replace(
      /([^\s]+區)\s*([^\s]+?(?:路|街|大道|東路|西路|南路|北路|巷|弄|橋))/g,
      '$1 $2'
    );

    return cleaned.trim();
  }, []);

  // 單一查詢函式
  const searchGeocode = useCallback(async (query, service = 'nominatim') => {
    try {
      let url, params;

      console.log(`正在使用 [${service}] 查詢:`, query);
      const baseQuery = query.trim();

      if (service === 'locationiq' && LOCATIONIQ_KEY) {
        url = LOCATIONIQ_URL;
        params = {
          key: LOCATIONIQ_KEY,
          q: baseQuery,
          format: 'json',
          limit: 3,
          countrycodes: 'tw',
          // 可再加上 addressdetails=1 來看詳細資訊（debug 用）
          addressdetails: 1,
        };
      } else {
        url = NOMINATIM_URL;
        params = {
          q: baseQuery,
          format: 'json',
          limit: 3,
          countrycodes: 'tw',
          addressdetails: 1,
        };
      }

      const res = await axios.get(url, { params });

      if (res.data && res.data.length > 0) {
        const first = res.data[0];
        console.log(`[${service}] 成功 - display_name:`, first.display_name);
        console.log(`[${service}] 地址細節:`, first.address); // addressdetails=1 才會有

        return {
          lat: parseFloat(first.lat),
          lng: parseFloat(first.lon),
          displayName: first.display_name,
        };
      }
      return null;
    } catch (err) {
      console.error(`[${service}] 錯誤:`, err.message);
      return null;
    }
  }, []);

  // 主查詢函式（給前端呼叫）
  const geocode = useCallback(
    async (address, storeName = '') => {
      setLoading(true);
      setError(null);
      setResult(null);

      const clean = cleanAddress(address);
      let finalResult = null;

      // 1. 先試乾淨地址
      if (clean.length > 5) {
        finalResult = await searchGeocode(
          clean,
          LOCATIONIQ_KEY ? 'locationiq' : 'nominatim'
        );
        if (!finalResult) {
          finalResult = await searchGeocode(clean, 'nominatim');
        }
      }

      // 2. Fallback：店名 + 地址
      if (!finalResult && storeName) {
        const combined = `${storeName} ${clean}`.trim();
        if (combined.length > 8) {
          finalResult = await searchGeocode(
            combined,
            LOCATIONIQ_KEY ? 'locationiq' : 'nominatim'
          );
          if (!finalResult)
            finalResult = await searchGeocode(combined, 'nominatim');
        }
      }

      // 3. Fallback：只用店名
      if (!finalResult && storeName && storeName.length > 3) {
        finalResult = await searchGeocode(
          storeName,
          LOCATIONIQ_KEY ? 'locationiq' : 'nominatim'
        );
        if (!finalResult)
          finalResult = await searchGeocode(storeName, 'nominatim');
      }

      // 4. Fallback：只用縣市 + 地址（台灣地址常見救命招）
      if (!finalResult) {
        const cityMatch = clean.match(/^([台臺北新中南高桃][^市]?市?)/);
        if (cityMatch) {
          const cityOnly =
            `${cityMatch[1]} ${clean.replace(cityMatch[1], '').trim()}`.trim();
          if (cityOnly.length > clean.length) {
            // 有實際去除多餘文字
            finalResult = await searchGeocode(
              cityOnly,
              LOCATIONIQ_KEY ? 'locationiq' : 'nominatim'
            );
            if (!finalResult)
              finalResult = await searchGeocode(cityOnly, 'nominatim');
          }
        }
      }

      if (finalResult) {
        setResult(finalResult);
      } else {
        setError('查詢失敗，請確認地址是否正確，或手動輸入座標');
      }

      setLoading(false);
      return finalResult;
    },
    [cleanAddress, searchGeocode]
  );

  return {
    geocode, // 主函式：geocode(address, storeName?)
    loading,
    error,
    result, // { lat, lng, displayName }
    reset: () => {
      setResult(null);
      setError(null);
    },
  };
};
