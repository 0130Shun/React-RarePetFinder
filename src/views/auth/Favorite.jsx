import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
// import { Controller, useForm } from 'react-hook-form'; // 引入 RHF

// services
import { getFavoriteStores } from '@/services/favoriteService';
// hook
import { useToast } from '@/hook/useToast';
//components
import SubHero from '@/components/subHero/SubHero';
import FullPageLoader from '@/components/shared/FullPageLoader';
import StoreCard from '@/components/StoreCard.jsx';
// utils
import { handleApiError } from '@/utils/apiErrorHandler';

//每頁顯示 9 筆店家
const PAGE_SIZE = 9;

const Favorite = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user.user); // 從state取出會員資料
  const { showError, warning } = useToast();
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [allFavorites, setAllFavorites] = useState([]); //從 API 抓回來的「全部店家」

  console.log('Favorite Testting render');

  useEffect(() => {
    if (!user) {
      warning('請先登入帳號後再使用收藏店家，即將跳轉到登入頁面。');
      navigate('/login', {
        state: { from: location },
        replace: true,
      });
      return;
    }

    const loadFavorites = async () => {
      setIsScreenLoading(true);
      try {
        // json-server沒辦法處理太過複雜的撈取，
        // 所以抓回資料(favorites+ stores )自己前端做 join（聽說是標準做法）
        // 取得收藏 + 店家完整資料(已經join favorites + stores 的 API)
        const favorites = await getFavoriteStores(user.id);
        // console.log('API回傳:', favorites);
        setAllFavorites(favorites);
      } catch (error) {
        const errorMessage = handleApiError(
          error,
          null,
          '載入藏店家失敗，請重新刷新頁面。'
        );
        showError(errorMessage);
      } finally {
        setIsScreenLoading(false);
      }
    };

    loadFavorites();
  }, [user]); ///// eslint-disable-next-line react-hooks/exhaustive-deps

  if (!user) return <div>請重新登入</div>;

  return (
    <>
      <SubHero variant="favorite" />
      <section className="container ui-container mt-md-5">
        <div className="row g-4">
          {allFavorites.length === 0 && !isScreenLoading && (
            <div className="text-center text-muted py-5">尚未收藏任何店家</div>
          )}

          {allFavorites.map((store) => (
            <div key={store.id} className="col-lg-4 col-md-6 col-12">
              <StoreCard store={store} />
            </div>
          ))}
        </div>
      </section>
      {/* ScreenLoading */}
      <FullPageLoader show={isScreenLoading} zIndex={2000} />
    </>
  );
};

export default Favorite;
