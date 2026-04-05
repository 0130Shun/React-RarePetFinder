import { useState, useRef, useEffect } from 'react';
import { Menu, User, LogOut } from 'react-feather';
import { useSelector } from 'react-redux';
import { useLogout } from '@/hooks/useLogout';

const AdminHeader = ({ onToggleSidebar }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Redux 取 user
  const user = useSelector((state) => state.user?.user);

  const logout = useLogout();

  //  點外部關閉 dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="admin-header">
      {/* 左側 */}
      <div className="admin-header__left">
        <button className="admin-header__toggle" onClick={onToggleSidebar}>
          <Menu size={18} />
        </button>

        {/* Breadcrumb / Title */}
        <div className="admin-header__title">Dashboard</div>
      </div>

      {/* 右側 */}
      <div className="admin-header__right" ref={dropdownRef}>
        <button className="admin-header__user" onClick={() => setOpen(!open)}>
          <User size={18} />
          <span>{user?.userName || 'Admin'}</span>
        </button>

        {open && (
          <div className="admin-header__dropdown">
            {/* 日後可以加更多額外資訊 */}
            <div className="dropdown-item">
              👤 {user?.email || 'admin@email.com'}
            </div>

            <div className="dropdown-divider" />

            <button
              className="dropdown-item logout"
              onClick={() => logout(user?.userName)}
            >
              <LogOut size={18} />
              登出
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
