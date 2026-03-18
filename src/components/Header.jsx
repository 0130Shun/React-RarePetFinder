// Header.jsx
// import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { User, Briefcase, Menu, X } from 'react-feather';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// assets
import logo from '@/assets/logo.png';
// // Slice
// import { logout } from '@/features/authSlice';
// import { clearUser } from '@/features/userSlice';
// // hook
// import { useToast } from '@/hook/useToast';
import { useLogout } from '@/hook/useLogout';
// // auth
// import { clearAuth } from '@/utils/auth';

const routes = [
  {
    type: 'dropdown',
    label: '搜尋頁',
    items: [
      {
        label: '找診所',
        to: '/findstores?storeType=診所',
      },
      {
        label: '找旅館',
        to: '/findstores?storeType=旅館',
      },
      {
        label: '找賣家',
        to: '/findstores?storeType=賣家',
      },
    ],
  },
  {
    type: 'link',
    label: '稀寵資訊',
    to: '/articles',
  },
  {
    type: 'link', // 暫時用一般連結回首頁，拆分後改成 type: 'dropdown',
    label: '投稿 / 回報',
    to: '/',
    // <li key={item.label}>
    //   {item.external ? (
    //     <a
    //       className="dropdown-item"
    //       href={item.href}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       onClick={closeMenu}
    //     >
    //       {item.label}
    //     </a>
    //   ) : (
    //     <Link
    //       className="dropdown-item"
    //       to={item.to}
    //       onClick={closeMenu}
    //     >
    //       {item.label}
    //     </Link>
    //   )}
    // </li>
    //未來拆分的寫法+google form連結
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
  // 登入 / 註冊 & 會員中心（先連線到login頁面，hash 切區塊，日後在拆分功能）
  // ──────────────────
  // {
  //   type: 'dropdown',
  //   label: '登入 / 註冊',
  //   items: [
  //     {
  //       label: '登入',
  //       to: '/login#logindiv',
  //     },
  //     {
  //       label: '註冊',
  //       to: '/login#register',
  //     },
  //   ],
  // },
  {
    type: 'dropdown',
    label: '登入 / 註冊',
    items: [
      {
        isAuth: false,
        label: '登入',
        to: '/login#logindiv',
      },
      {
        isAuth: false,
        label: '註冊',
        to: '/login#register',
      },
      {
        isAuth: true,
        label: '收藏夾',
        to: '/membercenter#logindiv',
      },
      {
        isAuth: true,
        label: '回後台',
        to: '/admin',
      },
      {
        isAuth: true,
        label: '登出',
        to: '/login#register',
      },
    ],
  },
  {
    type: 'link',
    label: '會員中心',
    to: '/login#membercenter',
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

const getAuthMenu = (user) => {
  if (!user) {
    return [
      { label: '登入', to: '/login#logindiv' },
      { label: '註冊', to: '/login#register' },
    ];
  }

  return [
    { label: '收藏夾', to: '/membercenter#logindiv' },
    ...(user.role === 'admin' ? [{ label: '回後台', to: '/admin' }] : []),
    { type: 'divider' },
    { label: '登出', action: 'logout' },
  ];
};

const Header = () => {
  // // 初始化 dispatch
  // const dispatch = useDispatch();
  // // 初始化 navigate
  // const navigate = useNavigate();

  // // const { success, showError, warning } = useToast();
  // const { success } = useToast();

  // TODO: 除了寫法1、2，還有優化寫法 Redux user 結構，避免 state.user.user
  // const { user } = useSelector((state) => state.user); // 寫法1
  const user = useSelector((state) => state.user.user); // 寫法2
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const togglerRef = useRef(null);
  const closeMenu = () => {
    if (isOpen && togglerRef.current) {
      togglerRef.current.click();
    }
  };

  // const handleLogout = () => {
  //   const username = user?.userName || '使用者';
  //   clearAuth();
  //   dispatch(logout());
  //   dispatch(clearUser());
  //   success(`「${username}」已登出將導向首頁。`);
  //   setTimeout(() => {
  //     navigate('/');
  //   }, 300);
  // };
  // hook抽出練習
  const logout = useLogout();
  const handleLogout = () => {
    logout(user?.userName);
  };

  // 處理 Body Class 的邏輯
  useEffect(() => {
    const navElement = navRef.current;
    if (!navElement) return;

    // 監聽 Bootstrap 的事件來同步 React 狀態
    const handleShow = () => {
      setIsOpen(true);
      document.body.classList.add('is-nav-open');
    };
    const handleHide = () => {
      setIsOpen(false);
      document.body.classList.remove('is-nav-open');
    };

    navElement.addEventListener('show.bs.collapse', handleShow);
    navElement.addEventListener('hidden.bs.collapse', handleHide);

    return () => {
      navElement.removeEventListener('show.bs.collapse', handleShow);
      navElement.removeEventListener('hidden.bs.collapse', handleHide);
      document.body.classList.remove('is-nav-open');
    };
  }, []);

  return (
    <header className="header ui-layout">
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container ui-container d-flex align-items-center">
          {/* 品牌區 */}
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="稀寵搜尋.logo" className="me-2" />
          </Link>

          {/* 漢堡按鈕 */}
          <button
            ref={togglerRef}
            className={`navbar-toggler ${isOpen ? '' : 'collapsed'}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="close-icon" size={24} />
            ) : (
              <Menu className="hamburger" size={24} />
            )}
          </button>

          {/* 導覽內容 */}
          <div className="collapse navbar-collapse" id="mainNav" ref={navRef}>
            <ul className="navbar-nav ms-auto">
              {/* Auth dropdown */}
              {/* {user && (
                <li className="nav-item dropdown ui-nav-item">
                  <a
                    className="nav-link nav-link-isAuth dropdown-toggle d-flex align-items-center"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Briefcase size={24} className="me-2" />
                    {user.userName}
                  </a>

                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/login#membercenter">
                        收藏夾
                      </Link>
                    </li>

                    {user?.role === 'admin' && (
                      <li>
                        <Link className="dropdown-item" to="/admin">
                          回後台
                        </Link>
                      </li>
                    )}

                    <li>
                      <hr className="dropdown-divider" />
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          handleLogout();
                          closeMenu();
                        }}
                      >
                        登出
                      </button>
                    </li>
                  </ul>
                </li>
              )} */}
              {/* 收藏夾獨立page但未實作 */}
              {/* {user ? (
                <li className="nav-item dropdown ui-nav-item">
                  <a
                    className="nav-link nav-link-isAuth dropdown-toggle d-flex align-items-center"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Briefcase size={20} className="me-2" />
                    {user.userName}
                  </a>

                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/login#membercenter"
                        onClick={closeMenu}
                      >
                        收藏夾
                      </Link>
                    </li>

                    {user?.role === 'admin' && (
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/admin"
                          onClick={closeMenu}
                        >
                          回後台
                        </Link>
                      </li>
                    )}

                    <li className={user ? '' : 'd-none'}>
                      <hr className="dropdown-divider" />
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          handleLogout();
                          closeMenu();
                        }}
                      >
                        登出
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login" onClick={closeMenu}>
                    登入 / 註冊
                  </NavLink>
                </li>
              )} */}

              {routes.map((route) => {
                // 一般連結 || 下拉選單
                if (route.type === 'link') {
                  return (
                    <li className="nav-item ui-nav-item" key={route.label}>
                      <NavLink
                        className="nav-link"
                        to={route.to}
                        onClick={closeMenu}
                      >
                        {route.label === '會員中心' ? (
                          <>
                            <User className="me-2" size={24}></User>
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
                      className="nav-item dropdown ui-nav-item"
                      key={route.label}
                    >
                      <a
                        className="nav-link dropdown-toggle"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        onClick={(e) => e.preventDefault()}
                      >
                        {route.label === '登入 / 註冊' && user
                          ? user.userName
                          : route.label}
                      </a>
                      <ul className="dropdown-menu">
                        {route.label === '登入 / 註冊' && user
                          ? route.items
                              .filter((item) => item.isAuth == true)
                              .map((item) => (
                                <li key={item.label}>
                                  {item.label === '登出' ? (
                                    <button
                                      className="dropdown-item"
                                      onClick={() => {
                                        handleLogout();
                                        closeMenu();
                                      }}
                                    >
                                      登出
                                    </button>
                                  ) : (
                                    <Link
                                      className="dropdown-item"
                                      to={item.to}
                                      onClick={closeMenu}
                                    >
                                      {item.label}
                                    </Link>
                                  )}
                                </li>
                              ))
                          : route.label === '登入 / 註冊'
                            ? route.items
                                .filter((item) => item.isAuth == false)
                                .map((item) => (
                                  <li key={item.label}>
                                    <Link
                                      className="dropdown-item"
                                      to={item.to}
                                      onClick={closeMenu}
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                ))
                            : route.items.map((item) => (
                                <li key={item.label}>
                                  <Link
                                    className="dropdown-item"
                                    to={item.to}
                                    onClick={closeMenu}
                                  >
                                    {item.label}
                                  </Link>
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
      <div className="nav-backdrop" />
    </header>
  );
};

export default Header;
