import { useState } from "react";
import { Search, ChevronDown } from "react-feather";

const SearchBar = () => {
  const [location, setLocation] = useState("台北");
  const [pet, setPet] = useState("柯爾鴨");
  const [type, setType] = useState("旅館");

  const locations = [
    "台北",
    "新北",
    "桃園",
    "新竹",
    "台中",
    "彰化",
    "嘉義",
    "台南",
    "高雄",
    "屏東",
  ];
  const pets = ["刺蝟", "守宮", "倉鼠", "鸚鵡", "烏龜", "柯爾鴨"];
  const types = ["診所", "旅館", "賣家"];

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
              <div className="search-pill-value">{location}</div>
            </div>
            <ChevronDown className="feather" />
          </button>
          <ul className="dropdown-menu ">
            {locations.map((item) => (
              <li key={item}>
                <button
                  className={`dropdown-item ${location === item ? "active" : ""}`}
                  onClick={() => setLocation(item)}
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
              <div className="search-pill-value">{pet}</div>
            </div>
            <ChevronDown className="feather" />
          </button>
          <ul className="dropdown-menu ">
            {pets.map((item) => (
              <li key={item}>
                <button
                  className={`dropdown-item ${pet === item ? "active" : ""}`}
                  onClick={() => setPet(item)}
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
              <div className="search-pill-value">{type}</div>
            </div>
            <ChevronDown className="feather" />
          </button>
          <ul className="dropdown-menu ">
            {types.map((item) => (
              <li key={item}>
                <button
                  className={`dropdown-item ${type === item ? "active" : ""}`}
                  onClick={() => setType(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* 搜尋按鈕 */}
      <button className="btn-search border-0 fw-bold d-flex align-items-center justify-content-center ">
        立即搜尋 <Search className="feather" />
      </button>
    </div>
  );
};

export default SearchBar;
