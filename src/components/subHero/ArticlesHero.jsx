// variants/ArticlesHero.jsx
import SubHeroLayout from './SubHeroLayout';
import SubHeroBreadcrumb from './SubHeroBreadcrumb';

export default function ArticlesHero() {
  return (
    <SubHeroLayout
      variant="warning"
      watermark="Information"
      breadcrumb={
        <SubHeroBreadcrumb
          items={[
            { label: '首頁', to: '/' },
            { label: '稀寵資訊', current: true },
          ]}
        />
      }
    >
      <div className="ui-container">
        <div className="ui-subHero__information">
          <h2>小心假冒「動保處」的釣魚簡訊！</h2>
          <p>
            近日有賣家收到謊稱「寵物登記異常」的簡訊，要求點擊連結補件。這是詐騙！
          </p>
        </div>
      </div>
    </SubHeroLayout>
  );
}
