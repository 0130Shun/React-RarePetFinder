import { NavLink } from 'react-router-dom';
import { useState } from 'react';
// import {
//   FaTachometerAlt,
//   FaBoxOpen,
//   FaShoppingCart,
//   FaBars,
// } from 'react-icons/fa';

import { Activity, Box, ShoppingCart, Menu } from 'react-feather';

const menu = [
  {
    name: 'Dashboard',
    path: '/admin',
    icon: <Activity size={18} />,
    end: true,
  },
  {
    name: 'Products',
    path: '/admin/products',
    icon: <Box size={18} />,
  },
  {
    name: 'Orders',
    path: '/admin/orders',
    icon: <ShoppingCart size={18} />,
  },
];

const AdminAside = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Header */}
      <div className="admin-sidebar__brand">
        <span>My Admin</span>
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
  );
};

export default AdminAside;
