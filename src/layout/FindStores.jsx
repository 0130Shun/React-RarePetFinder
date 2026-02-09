import React from 'react';
import '../../styles/helpers/_custom-text.scss';
import '../../styles/helpers/_variables.scss';
import '../../styles/layout/_findStores.scss'; 
import StoreCard from '..//StoreCard';
import Sliders from '../../assets/img/sliders.png';
import Search from '../../assets/img/search.svg';



const FindStores = () => {
    return(
    <>
    <div className="container ui-container">
        <div className="row">
            <div className="col-12 d-md-none p-3">
                <div className="search mb-36 mobile-search">
                    <div className="d-flex justify-content-between">
                        <span className="span-style">搜尋</span>
                        <button type="button" className="fw-bold shadow-sm btn-style" data-bs-toggle="offcanvas" data-bs-target="#searchOffcanvas">
                        進階篩選<img className='sliders' src={Sliders} alt="" /> 
                        </button>
                    </div>
                    <div className="search-group mt-12">
                        <div className="search-bar text">
                            <input type="text" placeholder="搜尋關鍵字" />
                            <button type="button">
                                <img src={Search} alt="" />
                            </button>
                        </div>
                        <div className="search-button">
                            <button type="button">重置</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <aside className="col-lg-3">
                <div className="offcanvas-lg offcanvas-top h-100" tabindex="-1" id="searchOffcanvas">
                    {/*<!-- 彈跳視窗上方 --*/}
                    <div className="offcanvas-header d-lg-none">
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#searchOffcanvas"></button>
                    </div>
                    {/*<!-- 彈跳視窗內容 -->*/}
                    <div className="offcanvas-body sidebar-sticky">
                    <div className="p-3 w-100">
                        {/*<!-- 搜尋關鍵字 -->*/}
                        <div className="search mb-36">
                            <span className="span-style">搜尋</span>
                            <div className="search-group mt-12">
                                <div className="search-bar tc-1-small-regular">
                                    <input type="text" placeholder="搜尋關鍵字" />
                                    <button type="button">
                                        <img src={Search} alt="" />
                                    </button>
                                </div>
                                <div className="search-button">
                                    <button type="button">重置</button>
                                </div>
                            </div>
                        </div>
                        {/* <!-- 縣市 --> */}
                        <div className="city mb-36">
                            <span className="span-style">縣市</span>
                            <div className="mt-12 city-select">
                                <select className="form-select form-select-lg select-arrow tc-1-small-regular" aria-label=".form-select-lg example">
                                    <option selected>請選擇縣市</option>
                                    <option value="">台北</option>
                                    <option value="">台中</option>
                                    <option value="">高雄</option>
                                </select>
                            </div>
                        </div>
                        {/* <!-- 鄉鎮市區 --> */}
                        <div className="township mb-36">
                            <span className="span-style">鄉鎮地區</span>
                            <div className="mt-12 township-select">
                                <select className="form-select form-select-lg select-arrow" aria-label=".form-select-lg example">
                                    <option selected>請選擇鄉鎮地區</option>
                                    <option value="1">大同區</option>
                                    <option value="2">神岡區</option>
                                    <option value="3">三民區</option>
                                </select>
                            </div>
                        </div>
                        {/* <!-- 店家種類 --> */}
                        <div className="storeTypes mb-36">
                            <span className="span-style">店家種類</span>
                            <div className="mt-12">
                                <div className="clinicCheckbox">
                                    <input className="form-check-input checkbox-input" type="checkbox" id="clinicCheck" />
                                    <label className="form-check-label checkbox-label" htmlFor="clinicCheck">診所</label>
                                </div>
                                <div className="hostelCheckbox mt-12">
                                    <input className="form-check-input checkbox-input" type="checkbox" id="hostelCheck" />
                                    <label className="form-check-label checkbox-label" htmlFor="hostelCheck">旅館</label>
                                </div>
                                <div className="legitimateStoresCheckbox mt-12">
                                    <input className="form-check-input checkbox-input" type="checkbox" id="legitimateStoresCheck" />
                                    <label className="form-check-label checkbox-label" htmlFor="legitimateStoresCheck">合法店家</label>
                                </div>
                            </div>
                        </div>
                        {/* <!-- 寵物種類 --> */}
                        <div className="petTypes mb-36">
                            <span className="span-style">寵物種類</span>
                            <div className="mt-12">
                                <div className="parrotCheckbox">
                                    <input className="form-check-input checkbox-input" type="checkbox" id="parrotCheck" />
                                    <label className="form-check-label checkbox-label" htmlFor="parrotCheck">鸚鵡</label>
                                </div>
                                <div className="callDuckCheckbox mt-12">
                                    <input className="form-check-input checkbox-input" type="checkbox" id="callDuckCheck" />
                                    <label className="form-check-label checkbox-label" htmlFor="callDuckCheck">柯爾鴨</label>
                                </div>
                                <div className="turtleCheckbox mt-12">
                                    <input className="form-check-input checkbox-input" type="checkbox" id="turtleCheck" />
                                    <label className="form-check-label checkbox-label" htmlFor="turtleCheck">烏龜</label>
                                </div>
                                <div className="geckoCheckbox mt-12">
                                    <input className="form-check-input checkbox-input" type="checkbox" id="geckoCheck" />
                                    <label className="form-check-label checkbox-label" htmlFor="geckoCheck">守宮</label>
                                </div>
                                <div className="hedgehogCheckbox mt-12">
                                    <input className="form-check-input checkbox-input" type="checkbox" id="hedgehogCheck" />
                                    <label className="form-check-label checkbox-label" htmlFor="hedgehogCheck">刺蝟</label>
                                </div>
                                <div className="thamsterCheckbox mt-12">
                                    <input className="form-check-input checkbox-input" type="checkbox" id="hamsterCheck" />
                                    <label className="form-check-label checkbox-label" htmlFor="hamsterCheck">倉鼠</label>
                                </div>
                            </div>
                        </div>
                        {/* <!-- 搜尋按鈕 --> */}
                        <div className="search-btn">
                            <button type="button">搜尋</button>
                        </div>
                    </div>
                    </div>
                </div>
            </aside>
            <main className="col-lg-9 text-center text-lg-start">
                <span className="searchResults text-center text-lg-start">搜尋結果</span>
                    <div className="row g-3 mt-16">

                    </div>
            </main>
        </div>
    </div>
    </>
    );
};

export default FindStores;