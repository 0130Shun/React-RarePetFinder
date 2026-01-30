// Header.jsx
import React from 'react';

// 如果使用 react-router，可改用 <Link> 取代 <a>
import { Link } from 'react-router-dom'; // 可選

// import logo from '@/src/assets/logo.png';

// const routes = [
//   { path: '/', name: '首頁' },
//   { path: '/about', name: '關於我們' },
//   { path: '/product', name: '商品列表' },
//   { path: '/favorite', name: '關注商品' },
// ];

export default function Header() {
  return (
    <header className='header ui-layout'>
      <nav className='navbar navbar-expand-lg bg-white'>
        <div className='container ui-container d-flex align-items-center'>
          {/* 品牌區 */}
          <a className='navbar-brand' href='/'>
            <img
              src='/src/assets/logo.png'
              alt='稀寵搜尋.logo'
              className='me-2'
            />
          </a>

          {/* 漢堡按鈕 */}
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#mainNav'
            aria-controls='mainNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <i data-feather='align-justify' className='hamburger' />
            <i data-feather='x' className='close-icon' />
          </button>

          {/* 導覽內容 */}
          <div className='collapse navbar-collapse' id='mainNav'>
            <ul className='navbar-nav ui-nav ms-auto'>
              {' '}
              {/* ms-auto 靠右對齊，可依需求調整 */}
              {/* 搜尋頁 下拉 */}
              <li className='nav-item dropdown ui-nav-item'>
                <a
                  className='nav-link dropdown-toggle'
                  href='#'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  搜尋頁
                </a>
                <ul className='dropdown-menu'>
                  <li>
                    <a className='dropdown-item' href='/'>
                      找診所
                    </a>
                  </li>
                  <li>
                    <a className='dropdown-item' href='/'>
                      找旅館
                    </a>
                  </li>
                  <li>
                    <a className='dropdown-item' href='/'>
                      找賣家
                    </a>
                  </li>
                </ul>
              </li>
              <li className='nav-item ui-nav-item'>
                <a className='nav-link' href='/'>
                  稀寵資訊
                </a>
              </li>
              <li className='nav-item ui-nav-item'>
                <a className='nav-link' href='/'>
                  投稿/回報
                </a>
              </li>
              {/* 登入/註冊 下拉 */}
              <li className='nav-item dropdown ui-nav-item'>
                <a
                  className='nav-link dropdown-toggle'
                  href='#'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  登入/註冊
                </a>
                <ul className='dropdown-menu'>
                  <li>
                    <a className='dropdown-item' href='/'>
                      登入會員
                    </a>
                  </li>
                  <li>
                    <a className='dropdown-item' href='/'>
                      註冊會員
                    </a>
                  </li>
                </ul>
              </li>
              <li className='nav-item ui-nav-item'>
                <a className='nav-link' href='/'>
                  <i data-feather='user' className='me-1' />
                  會員中心
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className='nav-backdrop' />
    </header>
  );
}
