// variants/NotFoundHero.jsx
import SubHeroLayout from './SubHeroLayout';
import SubHeroBreadcrumb from './SubHeroBreadcrumb';
import { Link } from 'react-router-dom';

export default function NotFoundHero() {
  return (
    <SubHeroLayout
      variant="warning"
      watermark="404-NotFound"
      breadcrumb={
        <SubHeroBreadcrumb
          items={[
            { label: '首頁', to: '/' },
            { label: '404 NotFound', current: true },
          ]}
        />
      }
    >
      <div className="ui-container">
        <div className="ui-subHero__information">
          <h2>404 - Not Found！</h2>
          <p>抱歉，您訪問的頁面不存在。</p>
          <p>
            請檢查網址是否正確，或<Link to="/">返回首頁</Link>。
          </p>
        </div>
      </div>
    </SubHeroLayout>
  );
}
