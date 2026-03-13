//主控layout 放header、footer、main

import { Outlet, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header'; // 可選
import Footer from '../components/Footer';
import GoTop from '@/components/shared/GoTop';

import { useAuthInit } from '@/hook/useAuthInit';

const BackendLayout = () => {
  useAuthInit();

  useEffect(() => {}, []);

  return (
    <>
      <Header />
      <main className="container ui-layout">
        <Outlet />
      </main>
      <GoTop />
      <Footer />
    </>
  );
};

export default BackendLayout;
