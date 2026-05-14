import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";
import ShopByCategory from "../components/ShopByCategory";
import HeroCarousel from "../components/HeroCarousel";

const Home = () => {
  return (
    <div className="page-transition">
      <HeroCarousel />
      <Hero />
      <ShopByCategory />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
};

export default Home;
