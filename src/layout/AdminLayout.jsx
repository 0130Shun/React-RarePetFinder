import { Outlet } from 'react-router-dom';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminAside from '@/components/admin/AdminAside';
import GoTop from '@/components/shared/GoTop';

const AdminLayout = () => {
  return (
    <>
      <div className="admin">
        <div className="admin-layout">
          <AdminHeader />
          <div className="admin-wrapper">
            <AdminAside />
            <main className="admin-main">
              <div className="admin-content">
                <Outlet />
              </div>
            </main>
          </div>
          <GoTop />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
