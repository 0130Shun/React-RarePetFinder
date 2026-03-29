import FindStoresHero from './FindStoresHero';
import LoginRegisterHero from './LoginRegisterHero';
import MemberCenterHero from './MemberCenterHero';
import FavoriteStoreHero from './FavoriteStoreHero';
import NotFoundHero from './NotFoundHero';

import StoreDetailHero from './StoreDetailHero';
import ArticlesHero from './ArticlesHero';

// findStores和articles實際上樣式有很大差異故不合併，
// 如果可以合併且僅需要調整樣式的話，可以參考storeDetail的store...props，
// 透過樣式字串的塞入在實際的版面選擇樣板，ex: findStores => .bg--primary，articles => .bg--warning
const HERO_MAP = {
  findStores: FindStoresHero,
  loginRegister: LoginRegisterHero,
  memberCenter: MemberCenterHero,
  favorite: FavoriteStoreHero,
  notFound: NotFoundHero,

  storeDetail: StoreDetailHero,
  articles: ArticlesHero,
};

// SubHero僅派工 / 入口，不負責頁面規劃
export default function SubHero({ variant, ...props }) {
  const Hero = HERO_MAP[variant];
  if (!Hero) return null;

  return <Hero {...props} />;
}
