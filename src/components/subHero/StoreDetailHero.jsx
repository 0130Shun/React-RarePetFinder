// variants/StoreDetailHero.jsx
import SubHeroLayout from './SubHeroLayout';
import SubHeroBreadcrumb from './SubHeroBreadcrumb';
import { Heart } from 'react-feather';
import { STORE_TYPE_ICON_MAP, PET_ICON_MAP } from '@/config/iconMap';

//store 是 StoreDetail所傳入的店家物件資料
export default function StoreDetailHero({ store }) {
  if (!store) return null;

  return (
    <SubHeroLayout
      watermark="Results Info"
      breadcrumb={
        <SubHeroBreadcrumb
          items={[
            { label: '首頁', to: '/' },
            { label: '搜尋頁面結果', to: '/findstores' },
            { label: '店家資訊', current: true },
          ]}
        />
      }
    >
      <div className="ui-container ui-subHero__layout">
        <div className="ui-subHero__content">
          {/* meta 區 */}
          {/* ui-subHero__meta 根據 store 去map顯示樣式 + 資訊 */}
          <h1>{store.storeName}</h1>
          <div className="ui-subHero__meta d-flex align-items-center">
            <div className="ui-subHero__meta-group">
              <span className="ui-subHero__meta-item">
                <Heart className="ui-breadcrumb__separator" size={20} />
                153
              </span>
              <span className="ui-subHero__meta-divider">|</span>
              <span className="ui-subHero__meta-item">10 則評論</span>
            </div>

            <div className="ui-subHero__meta-group">
              {store.type.map((typeItem, i) => {
                const Icon = STORE_TYPE_ICON_MAP[typeItem];
                if (!Icon) return null;

                return (
                  <span key={typeItem} className="ui-subHero__meta-item">
                    <Icon size={20} className="me-1" />
                    {typeItem}
                    {i < store.type.length - 1 && '、'}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* ui-subHero__aside 根據 store 去map顯示樣式 + 資訊 */}
        <div className="ui-subHero__aside shadow-sm">
          <p>可接待的寵物：</p>
          <p>
            {store.petTypes.map((pet, i) => (
              <span key={pet} className="me-2">
                {PET_ICON_MAP[pet]} {pet}
                {i < store.petTypes.length - 1 && '、'}
              </span>
            ))}
          </p>
        </div>
      </div>
    </SubHeroLayout>
  );
}
