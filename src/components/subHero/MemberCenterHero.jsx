import SubHeroLayout from './SubHeroLayout';
import SubHeroBreadcrumb from './SubHeroBreadcrumb';

const MemberCenterHero = () => {
  return (
    <SubHeroLayout
      watermark="Member Center"
      breadcrumb={
        <SubHeroBreadcrumb
          items={[
            { label: '首頁', to: '/' },
            { label: 'MemberCenter', current: true },
          ]}
        />
      }
    >
      <div className="ui-container ui-subHero__layout">
        <div className="ui-subHero__content">
          <h1>歡迎回來，管理你的會員中心</h1>
          <p>查看個人資料與偏好設定</p>
        </div>

        <div className="ui-subHero__aside shadow-sm">
          <p>收藏店家・寵物偏好・快速整理</p>
        </div>
      </div>
    </SubHeroLayout>
  );
};

export default MemberCenterHero;
