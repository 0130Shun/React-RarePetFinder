// variants/StoreDetailHero.jsx
import SubHero from '../components/SubHero';
import SubHeroBreadcrumb from '../components/SubHeroBreadcrumb';
import { Heart, Home, ShoppingBag, PlusSquare } from 'react-feather';

export default function StoreDetailHero({ store }) {
  if (!store) return null;

  return (
    <SubHero
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
          {/* 這裡完全照你原本的 JSX */}
          {/* <h1>{store.name}</h1> */}
          <h1>柯爾鴨精品休閒館-台中店</h1>
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
              <span className="ui-subHero__meta-item">
                <Home className="ui-breadcrumb__separator" size={20} /> 旅館
              </span>
              <span className="ui-subHero__meta-item">
                <ShoppingBag className="ui-breadcrumb__separator" size={20} />
                賣家
              </span>
              <span className="ui-subHero__meta-item">
                <PlusSquare className="ui-breadcrumb__separator" size={20} />
                診所
              </span>
            </div>
          </div>
        </div>

        <div className="ui-subHero__aside shadow-sm">
          <p>可接待的寵物：</p>
          {/* <p>{store.pets.join('、')}</p> */}
          <p> 🐁 倉鼠、🦆 柯爾鴨、🐢 烏龜、🦔 刺蝟</p>
        </div>
      </div>
    </SubHero>
  );
}
