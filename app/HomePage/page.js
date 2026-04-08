import HomeFeatures from "../components/HomeFeatures";
import HomeHero from "../components/HomeHero";
import HomeNavBar from "../components/HomeNavBar";
import HomeGuide from "../components/HomeGuide";
import HomeStats from "../components/HomeStats";
import HomeCopyRight from "../components/HomeCopyRight";
import ContactwithMe from "../components/HomeContactWithMe";

export default function landingPage() {
  return (
    // navbar
    <div 
    // style={{ backgroundColor: "#0D1A63" }}
     className="w-full flex flex-col items-center bg-linear-to-r from-blue-900 via-blue-500 to-blue-900">
      <HomeNavBar />
      <HomeHero />
      <HomeFeatures />
      <HomeGuide />
      <HomeStats />
      {/* <ContactwithMe /> */}
      <HomeCopyRight />
    </div>
  );
}
