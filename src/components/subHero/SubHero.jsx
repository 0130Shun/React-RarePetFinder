// import { ChevronRight } from 'react-feather';
import FindStoresHero from './FindStoresHero';
import StoreDetailHero from './StoreDetailHero';
import ArticlesHero from './ArticlesHero';

const HERO_MAP = {
  findStores: FindStoresHero,
  storeDetail: StoreDetailHero,
  articles: ArticlesHero,
};

// SubHero僅派工 / 入口，不負責頁面規劃
export default function SubHero({ variant, ...props }) {
  const Hero = HERO_MAP[variant];
  if (!Hero) return null;

  return <Hero {...props} />;
}
