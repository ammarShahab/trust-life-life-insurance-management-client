import { Suspense, use } from "react";
import AuthContext from "../../../context/AuthContext/AuthContext";
import GalleryCarousel from "../ReviewCard/ReviewCard";
import HeroSlider from "../HeroSlider/HeroSlider";
import Loading from "../../../components/Loading/Loading";
import Benefits from "../Benefits/Benefits";
import PopularPolicies from "../PopularPolicies/PopularPolicies";
import ReviewCard from "../ReviewCard/ReviewCard";
import LatestBlogs from "../LatestBlogs/LatestBlogs";
import NewsletterSubscription from "../NewsletterSubscription/NewsletterSubscription";
import MeetOurAgent from "../MeetOurAgent/MeetOutAgent";
import { Helmet } from "react-helmet-async";
import TrendingPartners from "../TrendingPartners/TrendingPartners";

const Home = () => {
  const { isLoading } = use(AuthContext);
  return (
    <>
      <Helmet>
        <title>Trust Life | Home</title>
      </Helmet>
      <HeroSlider></HeroSlider>
      <Suspense fallback={<Loading></Loading>}>
        <Benefits></Benefits>
      </Suspense>
      <PopularPolicies></PopularPolicies>
      <LatestBlogs></LatestBlogs>
      <ReviewCard></ReviewCard>
      <NewsletterSubscription></NewsletterSubscription>
      <MeetOurAgent></MeetOurAgent>
      <TrendingPartners></TrendingPartners>
    </>
  );
};

export default Home;
