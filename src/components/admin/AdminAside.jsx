import { NavLink } from 'react-router-dom';

const AdminAside = () => {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">My Admin</div>

      <nav className="admin-sidebar__menu">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `admin-sidebar__item ${isActive ? 'active' : ''}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `admin-sidebar__item ${isActive ? 'active' : ''}`
          }
        >
          Members
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `admin-sidebar__item ${isActive ? 'active' : ''}`
          }
        >
          Stores
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminAside;
