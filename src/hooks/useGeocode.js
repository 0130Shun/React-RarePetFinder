import { useState, useCallback } from 'react';
import axios from 'axios';

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
const LOCATIONIQ_URL = 'https://eu1.locationiq.com/v1/search';

// 你可以之後再把 LocationIQ_KEY 從 .env 引入（Vite 會自動讀取）
const LOCATIONIQ_KEY = import.meta.env.LOCATIONIQ_API_KEY || '';

export const useGeocode = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null); // { lat, lng, displayName? }

  // 清理地址（跟之前一樣）
  const cleanAddress = useCallback((address) => {
    if (!address) return '';
    return address
      .replace(/[（(].*?[）)]/g, '')
      .replace(/(\d+)-(\d+)/g, '$1之$2')
      .replace(/[\d一二三四五六七八九十]+樓/g, '')
      .replace(/之\d+/g, '')
      .replace(/號之\d+/g, '號')
      .replace(/\s+/g, ' ')
      .replace(/段(\d+)/g, '第$1段')
      .replace(/巷(\d+)/g, '$1巷')
      .replace(/弄(\d+)/g, '$1弄')
      .trim();
  }, []);

  // 單一查詢函式
  const searchGeocode = useCallback(async (query, service = 'nominatim') => {
    try {
      let url, params;

      if (service === 'locationiq' && LOCATIONIQ_KEY) {
        url = LOCATIONIQ_URL;
        params = {
          key: LOCATIONIQ_KEY,
          q: query + ' 台灣',
          format: 'json',
          limit: 3,
          countrycodes: 'tw',
        };
      } else {
        url = NOMINATIM_URL;
        params = {
          q: query + ' 台灣',
          format: 'json',
          limit: 3,
          countrycodes: 'tw',
        };
      }

      const res = await axios.get(url, { params });

      if (res.data && res.data.length > 0) {
        const { lat, lon, display_name } = res.data[0];
        return {
          lat: parseFloat(lat),
          lng: parseFloat(lon),
          displayName: display_name,
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
