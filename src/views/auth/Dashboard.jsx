import React, { useState, useEffect } from 'react';

// services
import { adminService } from '@/services/adminService';
// components
import FullPageLoader from '@/components/shared/FullPageLoader';
// hook;
import { useToast } from '@/hook/useToast';
// utils
import { extractErrorMessage } from '@/utils/errorHandler';
// config
import { STORE_TYPE_ICON_MAP, PET_ICON_MAP } from '@/config/iconMap';

const Dashboard = () => {
  const { showError } = useToast();
  const { getUsers, getStores, getArticles, getAnnouncements, getEvents } =
    adminService;

  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [mockFavorites, setMockFavorites] = useState([]);
  const [articles, setArticles] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);

  // const recentUsers = users.slice(-3).reverse();
  const totalUsers = users.length;
  const totalStores = stores.length;
  const recentStores = stores.slice(-3).reverse();
  const totalArticles = articles.length;
  const recentAnnouncements = announcements.slice(-3).reverse();
  const recentEvents = events.slice(-3).reverse();

  // 所有 petTypes 去重
  const petTypes = new Set(stores.flatMap((store) => store.petTypes));
  petTypes.size;

  const getHotStores = (stores, favorites) => {
    const countMap = {};

    // 計算每個 store 被收藏幾次
    favorites.forEach((fav) => {
      countMap[fav.storeId] = (countMap[fav.storeId] || 0) + 1;
    });

    // 把 count 塞回 store
    const withCount = stores.map((store) => ({
      ...store,
      favoriteCount: countMap[store.id] || 0,
    }));

    // 排序 + 取前 9
    return withCount
      .sort((a, b) => b.favoriteCount - a.favoriteCount)
      .slice(0, 9);
  };

  const hotStores = getHotStores(stores, mockFavorites);

  const truncateText = (text, maxLength = 30) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  useEffect(() => {
    const load = async () => {
      setIsScreenLoading(true);

      try {
        const users = await getUsers();
        const stores = await getStores();
        const articles = await getArticles();
        const announcements = await getAnnouncements();
        const events = await getEvents();
        // 隨機生成 10 筆 favorites，storeId 從現有的 stores 中隨機選取
        const favorites = Array.from({ length: 10 }, () => ({
          storeId: Math.floor(Math.random() * stores.length),
        }));

        setUsers(users);
        setStores(stores);
        setMockFavorites(favorites);
        setArticles(articles);
        setAnnouncements(announcements);
        setEvents(events);
      } catch (error) {
        const errorMessage = extractErrorMessage(
          error,
          null,
          '後台預覽資料載入失敗，請稍後重新刷新。'
        );
        showError(errorMessage);
      } finally {
        setIsScreenLoading(false);
      }

      setIsScreenLoading(false);
    };

    load();
  }, []);

  return (
    <>
      <div className="admin-page">
        <div className="admin-grid mb-4">
          <div className="admin-stat">
            <div>
              <div className="admin-stat__title">會員數</div>
              <div className="admin-stat__value">{totalUsers}</div>
            </div>
          </div>

          <div className="admin-stat">
            <div>
              <div className="admin-stat__title">店家數</div>
              <div className="admin-stat__value">{totalStores}</div>
            </div>
          </div>

          <div className="admin-stat">
            <div>
              <div className="admin-stat__title">投稿數</div>
              <div className="admin-stat__value">{totalArticles}</div>
            </div>
          </div>
        </div>

        <div className="admin-card mb-4">
          <div className="admin-card__header">最近加入店家</div>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>店家編號</th>
                  <th>店家名稱</th>
                  <th>店家類型</th>
                  <th>寵物類型</th>
                </tr>
              </thead>
              <tbody>
                {recentStores.map((store) => {
                  return (
                    <tr key={store.id}>
                      <td>{store.id}</td>
                      <td>{store.storeName}</td>
                      <td>
                        {store.type.map((typeItem, i) => {
                          const Icon = STORE_TYPE_ICON_MAP[typeItem];
                          if (!Icon) return null;
                          return (
                            <span
                              key={typeItem}
                              className="ui-subHero__meta-item d-flex align-items-center"
                            >
                              <Icon size={20} className="me-1" />
                              {typeItem}
                              {i < store.type.length - 1 && '、'}
                            </span>
                          );
                        })}
                      </td>

                      <td>
                        {store.petTypes.map((pet, i) => (
                          <span key={pet} className="me-2">
                            {PET_ICON_MAP[pet]} {pet}
                            {i < store.petTypes.length - 1 && '、'}
                          </span>
                        ))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-card mb-4">
          <div className="admin-card__header">最近新上架公告</div>
          <div className="admin-scroll">
            {recentAnnouncements.map((announcement) => {
              return (
                <div className="admin-scroll__item" key={announcement.id}>
                  <div className="admin-card">
                    <div className="admin-card__body">
                      <div className="admin-card__img" />
                      <div>{announcement.title}</div>
                      <div>{truncateText(announcement.content, 40)}</div>
                      <div>
                        {announcement.type == 'alert' ? '[警示]' : '[資訊]'}
                      </div>
                      <div>{announcement.date || '未知上架日期'}</div>
                      <div>{announcement.isSticky ? '置頂' : '未置頂狀態'}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="admin-card mb-4">
          <div className="admin-card__header">最近新增活動</div>
          <div className="admin-scroll">
            {recentEvents.map((event) => {
              return (
                <div className="admin-scroll__item" key={event.id}>
                  <div className="admin-card">
                    <div className="admin-card__body">
                      <div className="admin-card__img" />
                      <div>{event.title}</div>
                      <div>{truncateText(event.description, 40)}</div>
                      <div>{event.petTypes.join(', ')}</div>
                      <div>
                        {event.location || '未知地點'} |{' '}
                        {event.date || '未知日期'}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card__header">熱門店家</div>
          <div className="admin-scroll">
            {hotStores.map((store) => {
              return (
                <div className="admin-scroll__item" key={store.id}>
                  <div className="admin-card">
                    <div className="admin-card__body">
                      <div className="admin-card__img" />
                      <div>{store.storeName}</div>
                      <div>{store.area}</div>
                      <div>❤️ {store.favoriteCount}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* old */}
        {/* <div className="admin-grid mb-4">
          <div className="admin-stat">
            <div>
              <div className="admin-stat__title">訂單數</div>
              <div className="admin-stat__value">128</div>
            </div>
          </div>
          <div className="admin-stat">
            <div>
              <div className="admin-stat__title">營收</div>
              <div className="admin-stat__value">$12,300</div>
            </div>
          </div>

          <div className="admin-stat">
            <div>
              <div className="admin-stat__title">會員數</div>
              <div className="admin-stat__value">56</div>
            </div>
          </div>
        </div>
        <div className="admin-card mb-4">
          <div className="admin-card__header">最近訂單</div>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>訂單編號</th>
                  <th>客戶</th>
                  <th>金額</th>
                  <th>狀態</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#001</td>
                  <td>王小明</td>
                  <td>$300</td>
                  <td>已完成</td>
                </tr>
                <tr>
                  <td>#002</td>
                  <td>李小美</td>
                  <td>$520</td>
                  <td>處理中</td>
                </tr>
                <tr>
                  <td>#003</td>
                  <td>陳先生</td>
                  <td>$180</td>
                  <td>已取消</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="admin-card mb-4">
          <div className="admin-card__header">最近活動</div>
          <div className="admin-card__body">
            <ul>
              <li>新增商品：精品咖啡豆</li>
              <li>會員註冊：user123</li>
              <li>訂單完成：#001</li>
            </ul>
          </div>
        </div>
        <div className="admin-card">
          <div className="admin-card__header">熱門商品</div>
          <div className="admin-grid">
            {[...Array(6)].map((_, i) => (
              <div className="admin-card" key={i}>
                <div className="admin-card__body">
                  <div
                    style={{
                      height: '100px',
                      background: '#eee',
                      marginBottom: '10px',
                    }}
                  />
                  <div>商品名稱 {i + 1}</div>
                  <div>$ {100 + i * 50}</div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
      {/* ScreenLoading */}
      <FullPageLoader show={isScreenLoading} zIndex={2000} />
    </>
  );
};

export default Dashboard;
