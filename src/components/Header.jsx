// Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { User, Menu, X } from 'react-feather';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Dropdown } from 'bootstrap';

// assets
import logo from '@/assets/logo.png';

// Slice
// import { logout } from '@/features/authSlice';
// import { clearUser } from '@/features/userSlice';
// hook
// import { useToast } from '@/hook/useToast';
import { useLogout } from '@/hook/useLogout';
// config
import { ISAUTH_ICON_MAP } from '@/config/iconMap';
// 用物件映射（當有多個特殊 icon+ route 時最好維護)
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
  // {
  //   type: 'link',
  //   label: '投稿 / 回報',
  //   to: '/',
  // },
  // ──────────────────
  // 登入 / 註冊 & 會員中心（拆分到authDropdown）
  // ──────────────────
  {
    type: 'authDropdown',
    label: '登入 / 註冊',
  },
];

const getAuthMenu = (user) => {
  if (!user) {
    return [
      { label: '登入', to: '/login#logindiv' },
      { label: '註冊', to: '/login#register' },
    ];
  }

  return [
    { label: '會員中心', to: '/membercenter' },
    { label: '收藏店家', to: '/favorite' },
    // 暫時關閉回到後台
    // ...(user.role === 'admin' ? [{ label: '回後台', to: '/admin' }] : []),
    { type: 'divider' },
    { label: '登出', action: 'logout' },
  ];
};

const Header = () => {
  // TODO: 除了寫法1、2，還有優化寫法 Redux user 結構，避免 state.user.user
  // const { user } = useSelector((state) => state.user); // 寫法1
  const user = useSelector((state) => state.user.user); // 寫法2
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const togglerRef = useRef(null);
  // const dropdownRef = useRef(null);
  const authDropdownRef = useRef(null);
  const closeMenu = () => {
    if (isOpen && togglerRef.current) {
      togglerRef.current.click();
    }
  };

  // hook抽出
  const logout = useLogout();

  // 使用 import { Dropdown } from 'bootstrap';
  // 改成authDropdownRef才使用 React ref，避免多個 DOM 共用同一個 ref
  // 多if (!el) return;，避免讀取不到DOM
  const handleLogout = () => {
    logout(user?.userName);

    if (authDropdownRef.current) {
      const el = authDropdownRef.current.querySelector(
        '[data-bs-toggle="dropdown"]'
      );

      if (!el) return;

      const instance = Dropdown.getInstance(el) || new Dropdown(el);
      instance.hide();
    }
  };

  const link = (route) => {
    return (
      <li className="nav-item ui-nav-item" key={route.label}>
        <NavLink className="nav-link" to={route.to} onClick={closeMenu}>
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
  };

  // 普通 dropdown 移除 ref，避免多個 DOM 共用同一個 ref
  // 未來要把e.preventDefault()改成 e.stopPropagation();
  const dropdown = (route) => {
    return (
      <li className="nav-item dropdown ui-nav-item" key={route.label}>
        <a
          className="nav-link dropdown-toggle"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {route.label}
        </a>
        <ul className="dropdown-menu">
          {route.items.map((item) => (
            <li key={item.label}>
              <Link className="dropdown-item" to={item.to} onClick={closeMenu}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    );
  };

  // 普通 authDropdownRef 才用 ref，避免多個 DOM 共用同一個 ref
  const renderAuthDropdown = (route) => {
    const menuItems = getAuthMenu(user);
    const Icon = ISAUTH_ICON_MAP[!!user] || User;

    return (
      <li
        className="nav-item dropdown ui-nav-item"
        ref={authDropdownRef}
        key={user?.id || 'guest'}
      >
        <a
          className={`nav-link ${user ? 'nav-link-isAuth' : ''} dropdown-toggle d-flex align-items-center`}
          role="button"
          data-bs-toggle="dropdown"
          onClick={(e) => e.preventDefault()}
        >
          <Icon size={20} className="me-2" />
          {user ? user.userName : route.label}
        </a>

        <ul className="dropdown-menu dropdown-menu--lg dropdown-menu-end">
          {menuItems.map((item, index) => {
            if (item.type === 'divider') {
              return (
                <li key={`divider-${index}`}>
                  <hr className="dropdown-divider" />
                </li>
              );
            }

            if (item.action === 'logout') {
              return (
                <li key="logout">
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
              );
            }

            return (
              <li key={item.label}>
                <Link
                  className="dropdown-item"
                  to={item.to}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </li>
    );
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
              {/* 收藏夾獨立page但未實作 */}

              {routes.map((route) => {
                switch (route.type) {
                  case 'link':
                    return link(route);

                  case 'dropdown':
                    return dropdown(route);

                  case 'authDropdown':
                    return renderAuthDropdown(route);

                  default:
                    return null;
                }
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
