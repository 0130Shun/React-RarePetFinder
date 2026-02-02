//主控layout 放header、footer、main

import { Outlet, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header'; // 可選
import feather from 'feather-icons'; //react-feather可能版本有問題，暫時不要用

export default function FrontendLayout() {
  useEffect(() => {
    feather.replace();
    //畫面渲染後初步載入_XXX
    // get_XXX();
  }, []);
  return (
    <>
      <Header />
      <main class='container ui-layout'>
        <Outlet />
      </main>
      <hr />
      <footer className='mt-4 text-center'>
        <p>footer</p>
      </footer>
    </>
  );
}