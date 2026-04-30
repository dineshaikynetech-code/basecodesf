import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";


import slide1 from '@/assets/images/business-listing-final.png'
import slide2 from '@/assets/images/competitors-final.png'
import slide3 from '@/assets/images/local-search.png'
import slide4 from '@/assets/images/reviews-final.png'
import slide5 from '@/assets/images/storefries-ai-final.png'

type Slide = {
  // title: string;
  // desc: string;
  img: string;
};

const slides: Slide[] = [
  {
    // title: "Track competitors effortlessly",
    // desc: "Monitor your local competition in real-time",
    img: slide1,
  },
  {
    // title: "Understand market trends",
    // desc: "Make smarter decisions with insights",
    img: slide2,
  },
  {
    // title: "Grow your business",
    // desc: "Join thousands scaling with Storefries",
    img: slide3,
  },
  {
    // title: "Grow your business",
    // desc: "Join thousands scaling with Storefries",
    img: slide4,
  },
  {
    // title: "Grow your business",
    // desc: "Join thousands scaling with Storefries",
    img: slide5,
  },
];

export default function LeftHeroCarousel() {
  const [index, setIndex] = useState(0);

  // autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const getPosition = (i: number) => {
    const diff = i - index;
    if (diff < -1) return slides.length + diff;
    if (diff > 1) return diff - slides.length;
    return diff;
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center ">

     

      {/* 🎯 CAROUSEL */}
      <div className="relative w-full max-w-7xl h-[520px] flex items-center justify-center perspective-[1600px]">
        {slides.map((slide, i) => {
          const pos = getPosition(i);
          const isActive = pos === 0;

          return (
            <motion.div
              key={i}
              className="absolute flex justify-center items-center"
              animate={{
                x: pos * 360, // Adjust this value if images still feel too far apart or too close
                scale: isActive ? 1 : 0.75,
                rotateY: pos === -1 ? 35 : pos === 1 ? -35 : 0,
                opacity: Math.abs(pos) > 1 ? 0 : isActive ? 1 : 0.5, // Lower opacity for side images
                filter: isActive ? "blur(0px)" : "blur(3px)",
                zIndex: isActive ? 20 : 10,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 18,
              }}
            >
              <img
                src={slide.img}
                alt=""
                // className="max-w-[520px] w-full h-auto object-contain"
                className="w-[480px] h-auto object-contain drop-shadow-2xl"
              />
            </motion.div>
          );
        })}
      </div>

      {/* DOTS */}
      <div className="absolute bottom-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-primary" : "w-2 bg-muted"
              }`}
          />
        ))}
      </div>
    </div>
  );
}