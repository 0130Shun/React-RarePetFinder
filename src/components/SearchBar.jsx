import { useState } from 'react';
import { Search, ChevronDown } from 'react-feather';
import { useNavigate, createSearchParams } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [area, setArea] = useState('台北');
  const [petType, setPetType] = useState('柯爾鴨');
  const [storeType, setStoreType] = useState('旅館');

  const areas = [
    '台北',
    '新北',
    '桃園',
    '新竹',
    '台中',
    '彰化',
    '嘉義',
    '台南',
    '高雄',
    '屏東',
  ];
  const petTypes = ['刺蝟', '守宮', '倉鼠', '鸚鵡', '烏龜', '柯爾鴨'];
  const storeTypes = ['診所', '旅館', '賣家'];

  return (
    <div className="search-pill d-md-flex align-items-center ">
      <div className="d-flex flex-column gap-4 py-1 px-2 flex-md-row  p-md-0 dropdown-select">
        {/* 地區 */}
        <div className="dropdown searchBarDropdown flex-md-fill">
          <button
            className="btn-dropdown"
            type="button"
            data-bs-toggle="dropdown"
            data-bs-display="static"
          >
            <div className="text-start">
              <div className="search-pill-label">地區</div>
              <div className="search-pill-value">{area}</div>
            </div>
            <ChevronDown className="feather" />
          </button>
          <ul className="dropdown-menu ">
            {areas.map((item) => (
              <li key={item}>
                <button
                  className={`dropdown-item ${area === item ? 'active' : ''}`}
                  onClick={() => setArea(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 寵物類別 */}
        <div className="dropdown searchBarDropdown flex-md-fill">
          <button
            className="btn-dropdown"
            type="button"
            data-bs-toggle="dropdown"
            data-bs-display="static"
          >
            <div className="text-start">
              <div className="search-pill-label">寵物類別</div>
              <div className="search-pill-value">{petType}</div>
            </div>
            <ChevronDown className="feather" />
          </button>
          <ul className="dropdown-menu ">
            {petTypes.map((item) => (
              <li key={item}>
                <button
                  className={`dropdown-item ${petType === item ? 'active' : ''}`}
                  onClick={() => setPetType(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 全部 (店家種類) */}
        <div className="dropdown searchBarDropdown flex-md-fill">
          <button
            className="btn-dropdown"
            type="button"
            data-bs-toggle="dropdown"
            data-bs-display="static"
          >
            <div className="text-start">
              <div className="search-pill-label">全部</div>
              <div className="search-pill-value">{storeType}</div>
            </div>
            <ChevronDown className="feather" />
          </button>
          <ul className="dropdown-menu ">
            {storeTypes.map((item) => (
              <li key={item}>
                <button
                  className={`dropdown-item ${storeType === item ? 'active' : ''}`}
                  onClick={() => setStoreType(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* 搜尋按鈕 */}
      <button
        type="button"
        onClick={() => {
          navigate(
            `/findstores?${createSearchParams({ area, petType, storeType }).toString()}`
          );
        }}
        className="btn-search border-0  d-flex align-items-center justify-content-center "
      >
        立即搜尋 <Search className="feather" />
      </button>
    </div>
  );
};

export default SearchBar;
