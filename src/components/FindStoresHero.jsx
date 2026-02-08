import SubHero from '../components/SubHero';
import SubHeroBreadcrumb from '../components/SubHeroBreadcrumb';

export default function FindStoresHero() {
  return (
    <SubHero
      watermark="Search Results"
      breadcrumb={
        <SubHeroBreadcrumb
          items={[
            { label: '首頁', to: '/' },
            { label: '搜尋結果', current: true },
          ]}
        />
      }
    >
      <div className="ui-container ui-subHero__layout">
        <div className="ui-subHero__content">
          <h1>你負責愛，我們負責搜</h1>
          <p>找寵物商店，就從這裡</p>
        </div>

        <div className="ui-subHero__aside shadow-sm">
          <p>吃的、洗的、住的、醫療一次找齊</p>
        </div>
      </div>
    </SubHero>
  );
}
