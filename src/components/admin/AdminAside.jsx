import { NavLink } from 'react-router-dom';
import { useState } from 'react';

import {
  Activity,
  Box,
  Users,
  ShoppingBag,
  BookOpen,
  AlertCircle,
  ThumbsUp,
  Menu,
  Calendar,
} from 'react-feather';

const menu = [
  {
    name: 'Dashboard',
    path: '/admin',
    icon: <Activity size={18} />,
    end: true,
  },
  {
    name: '會員管理',
    path: '/admin/members',
    icon: <Users size={18} />,
  },
  {
    name: '店家管理',
    path: '/admin/stores',
    icon: <ShoppingBag size={18} />,
  },
  // {
  //   name: '專文管理',
  //   path: '/admin/articles',
  //   icon: <BookOpen size={18} />,
  // },
  // {
  //   name: '公告資訊',
  //   path: '/admin/announcements',
  //   icon: <AlertCircle size={18} />,
  // },
  // {
  //   name: '舉辦活動(events)', // 後續再補上，提供給前台user或後台管理員舉辦活動，或是提供給店家舉辦活動的功能
  //   path: '/admin/events',
  //   icon: <Calendar size={18} />,
  // },
  // {
  //   name: '店家評論(reviews)', // 後續再補上，僅觀看評論內容大多不編輯，除非有違規評論需要處理
  //   path: '/admin/reviews',
  //   icon: <ThumbsUp size={18} />,
  // },
  {
    name: '回到前台',
    path: '/',
    icon: <ShoppingCart size={18} />,
  },
];

const AdminAside = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      (<Box size={18} />
      ), (<BookOpen size={18} />
      ), (<AlertCircle size={18} />
      ), (<ThumbsUp size={18} />
      ), (<Calendar size={18} />
      )(
      <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
        {/* Header */}
        <div className="admin-sidebar__brand">
          <span>稀寵後台</span>
          <button onClick={() => setCollapsed(!collapsed)}>
            <Menu size={18} />
          </button>
        </div>

        {/* Menu */}
        <nav className="admin-sidebar__menu">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `admin-sidebar__item ${isActive ? 'active' : ''}`
              }
            >
              <span className="icon">{item.icon}</span>
              <span className="text">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      )
    </>
  );
};

export default AdminAside;
