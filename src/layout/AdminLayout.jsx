import { Outlet } from 'react-router-dom';
import Header from '@/components/Header'; // 可選
// import Footer from '@/components/Footer';
import GoTop from '@/components/shared/GoTop';

const AdminLayout = () => {
  return (
    <>
      <Header />
      <main className="container ui-layout">
        <Outlet />
      </main>
      <GoTop />
      {/* <Footer /> */}
    </>
  );
};

export default AdminLayout;
