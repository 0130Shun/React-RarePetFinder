// Header.jsx
// import React from 'react';
import { useEffect } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
// 如果使用 react-router，可改用 <Link> 取代 <a>
import { Link } from 'react-router-dom'; // 可選

import feather from 'feather-icons'; //react-feather可能版本有問題，暫時不要用

// import logo from '@/src/assets/logo.png';

// Header routes config (React Router v6 友善寫法)
const routes = [
  {
    type: 'link',
    label: '首頁',
    to: '/',
  },
  {
    type: 'dropdown',
    label: '稀寵資訊',
    items: [
      {
        label: '找診所',
        to: {
          pathname: '/rarepetfinder',
          search: '?storeType=clinic',
        },
      },
      {
        label: '找商家',
        to: {
          pathname: '/rarepetfinder',
          search: '?storeType=shop',
        },
      },
      {
        label: '找旅館',
        to: {
          pathname: '/rarepetfinder',
          search: '?storeType=hotel',
        },
      },
    ],
  },
  {
    type: 'link', // 暫時用一般連結，拆分後改成 type: 'dropdown',
    label: '投稿 / 回報',
    to: '/',
    //未來拆分的寫法
    // items: [
    //   {
    //     label: '投稿稀寵資訊',
    //     external: true,
    //     // href: 'https://forms.gle/XXXXXXX',
    //     href: '/', // 暫時用首頁代替
    //   },
    //   {
    //     label: '檢舉 / 回報問題',
    //     external: true,
    //     // href: 'https://forms.gle/YYYYYYY',
    //     href: '/', // 暫時用首頁代替
    //   },
    // ],
  },
  // ──────────────────
  // 登入 / 會員中心（假頁面，hash 切區塊）
  // ──────────────────
  {
    type: 'dropdown',
    label: '登入 / 註冊',
    items: [
      {
        label: '登入',
        to: { pathname: '/login', hash: '#login' },
      },
      {
        label: '註冊',
        to: { pathname: '/login', hash: '#register' },
      },
    ],
  },
  {
    type: 'link',
    label: '會員中心',
    to: '/login',
  },
];
// 用物件映射（當有多個特殊 icon+ route 時最好維護），使用時：
// const iconMap = {
//   會員中心: <i data-feather='user' className='me-1' />,
//   首頁: <i data-feather='home' className='me-1' />,
//   設定: <i data-feather='settings' className='me-1' />,
//   // ...
// };
// jsx內部使用時：
// {
//   iconMap[route.label] || null;
// }
// {
//   route.label;
// }

export default function Header() {
  useEffect(() => {
    feather.replace();
    //畫面渲染後初步載入_XXX
    // get_XXX();
  }, []);

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
            {/* <ul className='navbar-nav ui-nav ms-auto'>
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
            </ul> */}
            <ul className='navbar-nav ms-auto'>
              {routes.map(route => {
                // 一般連結 || 下拉選單
                if (route.type === 'link') {
                  return (
                    <li className='nav-item ui-nav-item' key={route.label}>
                      <NavLink className='nav-link' to={route.to}>
                        {route.label === '會員中心' ? (
                          <>
                            <i data-feather='user' className='me-1' />
                            {route.label}
                          </>
                        ) : (
                          route.label
                        )}
                      </NavLink>
                    </li>
                  );
                }

                if (route.type === 'dropdown') {
                  return (
                    <li
                      className='nav-item dropdown ui-nav-item'
                      key={route.label}
                    >
                      <a
                        className='nav-link dropdown-toggle'
                        href='#'
                        role='button'
                        data-bs-toggle='dropdown'
                        aria-expanded='false'
                      >
                        {route.label}
                      </a>
                      {/* <button
                        className='nav-link dropdown-toggle'
                        data-bs-toggle='dropdown'
                        type='button'
                      >
                        {route.label}
                      </button> */}

                      <ul className='dropdown-menu'>
                        {route.items.map(item => (
                          <li key={item.label}>
                            {item.external ? (
                              <a
                                className='dropdown-item'
                                href={item.href}
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                {item.label}
                              </a>
                            ) : (
                              <Link className='dropdown-item' to={item.to}>
                                {item.label}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }

                return null;
              })}
            </ul>
          </div>
        </div>
      </nav>
      <div className='nav-backdrop' />
    </header>
  );
}
