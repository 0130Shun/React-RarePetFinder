import HeroSection from './sections/HeroSection';
import InfoSection from './sections/InfoSection';
import HotSpot from './sections/HotSpot';
import Tranding from './sections/Tranding';
import Scam from './sections/Scam';
import RepostPost from './sections/RepostPost';

export default function Home() {
  return (
    <>
      <HeroSection />
      <Tranding />
      <InfoSection />
      <Scam />
      <RepostPost />
      <HotSpot />
    </>
  );
}
