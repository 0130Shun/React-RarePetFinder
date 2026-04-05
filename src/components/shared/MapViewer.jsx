import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // 雖然 main.jsx 已引入，這裡再保險一次也沒問題

// utils
// 修復React + Vite + Leaflet 在 GitHub Pages 部署問題
import '@/utils/fixLeafletIcons';

// 讓地圖在 Modal 或隱藏容器中正確顯示大小
function MapResizer({ delay = 350 }) {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize({ animate: false });
    }, delay);

    return () => clearTimeout(timer);
  }, [map, delay]);

  return null;
}

function MapController({ lat, lng }) {
  const map = useMap();

  useEffect(() => {
    if (!lat || !lng) return;

    // 強制重新置中 + 平滑移動（比 invalidateSize 更好）
    map.flyTo([lat, lng], 17, {
      animate: true,
      duration: 1.2, // 1.2 秒平滑移動
    });

    // 同時確保地圖大小正確（給 Modal 用）
    const timer = setTimeout(() => {
      map.invalidateSize({ animate: false });
    }, 100);

    return () => clearTimeout(timer);
  }, [map, lat, lng]); // ← 關鍵：依賴 lat / lng 變化

  return null;
}

const MapViewer = ({
  lat,
  lng,
  storeName = '',
  height = '360px', // 可透過 props 調整高度
  zoom = 16,
  className = '',
  scrollWheelZoom = true,
  showPopup = true,
}) => {
  // 沒有座標時不渲染地圖
  if (!lat || !lng) {
    return (
      <div
        className={`d-flex align-items-center justify-content-center bg-light text-muted rounded ${className}`}
        style={{ height }}
      >
        請先輸入地址並點擊「地址定位」按鈕
      </div>
    );
  }

  return (
    <>
      {/* 在 StoreModal.jsx 中的使用範例（後台）
      <StoreMap
        lat={tempStore.lat}
        lng={tempStore.lng}
        storeName={tempStore.storeName}
        size="large" // 使用 .map-container--large
        // height="450px"      // 如果想強制指定高度也可以傳這個（優先）
        className="shadow-sm"
      /> */}
      {/* 樣式套版，但是現在先不用 */}
      {/* <div
        className={`map-container map-container--${size} ${variant ? `map-container--${variant}` : ''} ${className}`}
        style={height !== '360px' ? { height } : {}} // 如果有傳 height props 就用 inline style 覆蓋
      ></div> */}
      <div
        className={`rounded overflow-hidden border ${className}`}
        style={{ height, width: '100%' }}
      >
        <MapContainer
          center={[lat, lng]}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={scrollWheelZoom}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={[lat, lng]}>
            {showPopup && (
              <Popup>
                <strong>{storeName || '店家位置'}</strong>
              </Popup>
            )}
          </Marker>
          <MapResizer delay={350} />
          <MapController lat={lat} lng={lng} /> {/* ← 新增這一行 */}
        </MapContainer>
      </div>
    </>
  );
};

export default MapViewer;
