import SubHeroLayout from './SubHeroLayout';
import SubHeroBreadcrumb from './SubHeroBreadcrumb';

export default function FavoriteStoreHero() {
  return (
    <SubHeroLayout
      watermark="Search Results"
      breadcrumb={
        <SubHeroBreadcrumb
          items={[
            { label: '首頁', to: '/' },
            { label: '收藏店家', current: true },
          ]}
        />
      }
    >
      <div className="ui-container ui-subHero__layout">
        <div className="ui-subHero__content">
          <h1>收藏你的專屬名單</h1>
          <p>喜歡的店家，一鍵保存不迷路</p>
        </div>

        <div className="ui-subHero__aside shadow-sm">
          <p>快速查看、隨時回訪，打造你的寵物生活地圖</p>
        </div>
      </div>
    </SubHeroLayout>
  );
}
