import { useState, useEffect } from 'react';

//// hook
// import { useToast } from '@/hook/useToast';
//components
import SubHero from '@/components/subHero/SubHero';
// import FullPageLoader from '@/components/shared/FullPageLoader';

const Favorite = () => {
  // const [isScreenLoading, setIsScreenLoading] = useState(false);

  useEffect(() => {}, []);

  return (
    <>
      <SubHero variant="loginRegister" />
      <div className="container">
        <h1>這是前台會員登入後的收藏店家</h1>
      </div>
      {/* ScreenLoading */}
      {/* <FullPageLoader show={isScreenLoading} zIndex={2000} /> */}
    </>
  );
};

export default Favorite;
