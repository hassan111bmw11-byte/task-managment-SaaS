import HomeFeatures from "../components/HomeFeatures";
import HomeHero from "../components/HomeHero";
import HomeNavBar from "../components/HomeNavBar";
import HomeGuide from "../components/HomeGuide";
import HomeStats from "../components/HomeStats";
import HomeCopyRight from "../components/HomeCopyRight";

export default function landingPage() {
  return (
    // navbar
    <div className="w-full flex flex-col items-center bg-zinc-300">
      <HomeNavBar />
      <HomeHero />
      <HomeFeatures />
      <HomeGuide />
      <HomeStats />
      <HomeCopyRight />
    </div>
  );
}
