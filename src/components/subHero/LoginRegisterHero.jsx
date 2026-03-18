import SubHeroLayout from './SubHeroLayout';
import SubHeroBreadcrumb from './SubHeroBreadcrumb';

const FindStoresHero = () => {
  return (
    <SubHeroLayout
      watermark="Login / Register"
      breadcrumb={
        <SubHeroBreadcrumb
          items={[
            { label: '首頁', to: '/' },
            { label: 'Login', current: true },
          ]}
        />
      }
    >
      <div className="ui-container ui-subHero__layout">
        <div className="ui-subHero__content">
          <h1>歡迎回來，繼續你的寵物生活</h1>
          <p>登入或註冊，開始收藏與管理你的店家</p>
        </div>

        <div className="ui-subHero__aside shadow-sm">
          <p>收藏・比較・管理 一次完成</p>
        </div>
      </div>
    </SubHeroLayout>
  );
};

export default FindStoresHero;
