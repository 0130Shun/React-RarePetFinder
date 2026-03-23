//主控layout 放header、footer、main

import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import feather from 'feather-icons'; //react-feather 等之後整合後啟用，feather-icons + feather.replace();暫時不關閉

//components
import Header from '@/components/Header'; // 可選
import Footer from '@/components/Footer';
import GoTop from '@/components/shared/GoTop';
// hook
import { useAuthInit } from '@/hook/useAuthInit';

export default function FrontendLayout() {
  // Hook 必須在「component 最外層」呼叫
  useAuthInit();

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
