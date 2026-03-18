// import { ChevronRight } from 'react-feather';
import FindStoresHero from './FindStoresHero';
import StoreDetailHero from './StoreDetailHero';
import ArticlesHero from './ArticlesHero';
import NotFoundHero from './NotFoundHero';
import LoginRegisterHero from './LoginRegisterHero';

// findStores和articles實際上樣式有很大差異故不合併，
// 如果可以合併且僅需要調整樣式的話，可以參考storeDetail的store...props，
// 透過樣式字串的塞入在實際的版面選擇樣板，ex: findStores => .bg--primary，articles => .bg--warning
const HERO_MAP = {
  findStores: FindStoresHero,
  storeDetail: StoreDetailHero,
  articles: ArticlesHero,
  notFound: NotFoundHero,
  loginRegister: LoginRegisterHero,
};

// SubHero僅派工 / 入口，不負責頁面規劃
export default function SubHero({ variant, ...props }) {
  const Hero = HERO_MAP[variant];
  if (!Hero) return null;

  return <Hero {...props} />;
}
