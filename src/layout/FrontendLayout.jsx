//主控layout 放header、footer、main

import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import feather from 'feather-icons'; //react-feather 等之後整合後啟用，feather-icons + feather.replace();暫時不關閉

import Header from '@/components/Header'; // 可選
import Footer from '@/components/Footer';
import GoTop from '@/components/shared/GoTop';

export default function FrontendLayout() {
  useEffect(() => {
    feather.replace();
  }, []);

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
}
