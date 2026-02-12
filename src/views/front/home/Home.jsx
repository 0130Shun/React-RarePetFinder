import HeroSection from './sections/HeroSection';
import InfoSection from './sections/InfoSection';
import HotSpot from './sections/HotSpot';
import Trending from './sections/Trending';
import Scam from './sections/Scam';
import RepostPost from './sections/RepostPost';

export default function Home() {
  return (
    <>
      <HeroSection />
      <Trending />
      <InfoSection />
      <Scam />
      <RepostPost />
      <HotSpot />
    </>
  );
}
