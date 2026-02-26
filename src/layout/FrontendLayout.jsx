//主控layout 放header、footer、main

import { Outlet, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header'; // 可選
import Footer from '../components/Footer';
import feather from 'feather-icons'; //react-feather 等之後整合後啟用，feather-icons + feather.replace();暫時不關閉
// import GoTop from '@/components/shared/GoTop';

export default function FrontendLayout() {
  useEffect(() => {
    feather.replace();
    //畫面渲染後初步載入_XXX
    // get_XXX();
  }, []);
  return (
    <>
      <Header />
      <main className="container ui-layout">
        <Outlet />
      </main>
      {/* <GoTop /> */}
      {/* <hr /> */}
      {/* <footer className="mt-4 text-center">
        <p>footer</p>
      </footer> */}
      <Footer />
    </>
  );
}
