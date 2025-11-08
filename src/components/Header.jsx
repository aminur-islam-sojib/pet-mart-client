import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Package, Truck, RotateCcw } from "lucide-react";

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
              <div className={`relative min-h-[600px] ${slide.bgColor}`}>
                <div className="container mx-auto px-4 py-12 lg:py-20">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Left Content */}
                    <div className="space-y-6 order-2 lg:order-1">
                      <div className="space-y-2">
                        <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                          {slide.title}
                        </h1>
                        <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                          {slide.subtitle}
                        </h2>
                      </div>

                      <p className="text-gray-600 text-lg max-w-md">
                        {slide.description}
                      </p>

                      <button className="bg-rose-400 hover:bg-rose-500 text-white font-semibold px-8 py-4 rounded-none transition-all duration-300 shadow-md hover:shadow-lg">
                        {slide.buttonText}
                      </button>
                    </div>

                    {/* Right Image */}
                    <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                      <div className="relative w-full max-w-xl">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-auto object-contain drop-shadow-2xl"
                        />

                        {/* Decorative floating elements */}
                        <div
                          className="absolute top-10 right-10 w-16 h-16 bg-amber-400 rounded-full opacity-70 animate-bounce"
                          style={{
                            animationDelay: "0s",
                            animationDuration: "3s",
                          }}
                        ></div>
                        <div
                          className="absolute bottom-20 left-5 w-12 h-12 bg-rose-300 rounded-full opacity-60 animate-bounce"
                          style={{
                            animationDelay: "1s",
                            animationDuration: "4s",
                          }}
                        ></div>
                        <div
                          className="absolute top-1/2 right-5 w-10 h-10 bg-blue-300 rounded-full opacity-50 animate-bounce"
                          style={{
                            animationDelay: "2s",
                            animationDuration: "3.5s",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination Styling */}
        <style jsx>{`
          .pet-hero-swiper .swiper-pagination {
            bottom: 20px;
          }

          .pet-hero-swiper .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            background: rgba(0, 0, 0, 0.3);
            opacity: 1;
            transition: all 0.3s ease;
          }

          .pet-hero-swiper .swiper-pagination-bullet-active {
            width: 32px;
            border-radius: 6px;
            background: #fb7185 !important;
          }
        `}</style>
      </div>

      {/* Features Section (Cards below slider) */}
      <div className="bg-white py-8 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="card-body items-center text-center p-8">
                  <div className="mb-4 text-gray-700">{feature.icon}</div>
                  <h3 className="card-title text-gray-900 font-bold text-sm tracking-wider">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetHeroSection;
