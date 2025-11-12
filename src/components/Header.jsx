import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Package, Truck, RotateCcw } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const PetHeroSection = () => {
  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1200&q=80",
      title: "The Right Diet",
      subtitle: "for Your Pet",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      buttonText: "SHOP NOW",
      bgColor: "bg-gray-100",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&q=80",
      title: "Premium Pet Care",
      subtitle: "Products",
      description:
        "Quality nutrition and care products designed specifically for your beloved pets",
      buttonText: "EXPLORE NOW",
      bgColor: "bg-blue-50",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=1200&q=80",
      title: "Healthy & Happy",
      subtitle: "Pets",
      description:
        "Everything your pet needs for a healthy, active, and joyful life",
      buttonText: "DISCOVER MORE",
      bgColor: "bg-amber-50",
    },
  ];

  const features = [
    {
      icon: <Package className="w-12 h-12" />,
      title: "24X7 FRIENDLY SUPPORT",
      description: "Round the clock customer service",
    },
    {
      icon: <Truck className="w-12 h-12" />,
      title: "FREE SHIPPING",
      description: "On all orders above $50",
    },
    {
      icon: <RotateCcw className="w-12 h-12" />,
      title: "10DAYS EASY RETURN",
      description: "Hassle-free returns policy",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Slider Section */}
      <div className="relative">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={1000}
          pagination={{
            clickable: true,
            bulletActiveClass: "swiper-pagination-bullet-active bg-rose-400",
          }}
          className="pet-hero-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className={`relative h-screen w-full ${slide.bgColor} dark:bg-slate-800`}
              >
                <div
                  className="h-screen w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
                  {/* optional overlay */}
                  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center gap-3">
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-4xl font-bold text-white dark:text-white"
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="text-lg text-white/90 dark:text-white/80"
                    >
                      {slide.description}
                    </motion.p>
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-classic"
                    >
                      {slide.buttonText}
                    </motion.button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination Styling */}
      </div>

      {/* Features Section (Cards below slider) */}
      <div className="bg-white dark:bg-slate-800 py-8 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ translateY: -5 }}
                className="card bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="card-body items-center text-center p-8">
                  <div className="mb-4 text-gray-700 dark:text-gray-200">
                    {feature.icon}
                  </div>
                  <h3 className="card-title text-gray-900 dark:text-gray-100 font-bold text-sm tracking-wider">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetHeroSection;
