import React from 'react';
import { Button } from '@/shared/components/ui/button';
import FeatureSection from '../components/FeatureSection';

// Assets (Paths assumed based on instructions)
// import HeroIllustration from '@/assets/local-business-hero.svg';
// import BusinessInfoImg from '@/assets/business-info-ui.svg';
// import ReviewsImg from '@/assets/customer-reviews.svg';
// import InsightsImg from '@/assets/review-insights.svg';
// import CompetitorsImg from '@/assets/competitors-strategy.svg';
// import FeatureSection from '../components/FeatureSection';

import MapBgLeft from '@/assets/images/listing-dashboard-hero-map-left.png';
import MapBgRight from '@/assets/images/listing-dashboard-hero-map-left.png';
import StoreIllustration from '@/assets/images/listing-dashboard-hero-map-store-illustration.png';
import { useNavigate } from 'react-router-dom';
interface FeatureData {
  category: string;
  title: string;
  description: string;
  image: string;
  isReversed?: boolean;
}

const FEATURE_CONFIG: FeatureData[] = [
  {
    category: "BUSINESS INFO",
    title: "Get your Business Info",
    description: "View and manage your Local Business info in one place. Keep your details accurate and help customers reach you easily.",
    image: "null",
    isReversed: false,
  },
  {
    category: "REVIEWS",
    title: "Customer Reviews",
    description: "Start to collect reviews from your customers. Avoiding the awkward & time-consuming manual reaching out. We highlight negative and unreplied customer reviews separately for better tracking.",
    image: "ReviewsImg",
    isReversed: true,
  },
  {
    category: "REPUTATION",
    title: "Review Insights",
    description: "We analyze your customer reviews to provide valuable insights that help you understand performance, identify areas of improvement, and enhance customer satisfaction.",
    image: "InsightsImg",
    isReversed: false,
  },
  {
    category: "COMPETITORS",
    title: "Know your Competitors",
    description: "Stay ahead by understanding your competitors better. Track their performance, customer feedback, and online presence to identify new opportunities and refine your own strategy.",
    image: "CompetitorsImg",
    isReversed: true,
  }
];

const ListingDashboard: React.FC = () => {

  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full h-fulloverflow-y-auto scroll-smooth">
      {/* Hero Section */}
      <section className="p-4 md:p-6">
        <div className="relative w-full min-h-[480px] md:min-h-[440px] rounded-[24px] md:rounded-[32px] bg-primary overflow-hidden flex flex-col md:flex-row items-center px-6 md:px-16 py-12 md:py-0">

          {/* Map Background Layers - Absolute Positioned */}
          <img
            src={MapBgLeft}
            className="absolute left-0 top-0 h-auto w-auto  pointer-events-none object-cover"
            alt=""
          />
          <img
            src={MapBgRight}
            className="absolute -right-20 top-0 h-auto w-auto  pointer-events-none object-cover"
            alt=""
          />

          {/* Text Content Layer */}
          <div className="relative z-20 w-full md:max-w-xl space-y-6 text-center md:text-left">
            <h1 className="text-h1 text-white md:text-[44px] leading-[1.1] font-bold">
              Empower your local Business
            </h1>
            <p className="text-body text-white/90 leading-relaxed max-w-md mx-auto md:mx-0">
              Manage your Google Business Profile and online reviews, automatically post business listings, and get precise local rankings data.
            </p>
            <div className="pt-2">
              <Button
              onClick={()=>navigate('/location/listing-dashboard/add-business')}
                className="w-full sm:w-auto bg-[#B5FFB3] hover:bg-[#9ded9a] text-[#004236] font-bold h-12 md:h-14 px-8 text-base md:text-lg rounded-md transition-all shadow-lg border-none"
              >
                Add your Business
              </Button>
            </div>
          </div>

          {/* Main Illustration Layer */}
          <div className="relative z-10 md:absolute md:right-8 md:bottom-0 h-64 md:h-[90%] w-full md:w-3/5 mt-8 md:mt-0 flex items-end justify-center md:justify-end select-none">
            <img
              src={StoreIllustration}
              alt="Local business growth illustration"
              className="max-h-full w-auto object-contain object-bottom"
            />
          </div>
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-10 md:py-16 px-6 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#111827] max-w-3xl mx-auto">
          Experience the growth and success of your local business firsthand.
        </h2>
      </section>

      {/* Feature Sections */}
      <div className="max-w-7xl mx-auto px-6 space-y-20 md:space-y-32 pb-24">
        {FEATURE_CONFIG.map((feature, index) => (
          <FeatureSection
            key={index}
            category={feature.category}
            title={feature.title}
            description={feature.description}
            image={feature.image}
            isReversed={feature.isReversed}
          />
        ))}
      </div>
    </div>
  );
};

export default ListingDashboard;