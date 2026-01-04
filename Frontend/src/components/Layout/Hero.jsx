import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Vacation Ready",
      subtitle: "Summer Collection 2024",
      description:
        "Explore vacation-ready outfits with fast worldwide shipping.",
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1333&q=80",
      buttonText: "Shop Collection",
      link: "/collections/summer",
      bgColor: "bg-gradient-to-br from-cyan-500/20 to-blue-600/20",
      accentColor: "text-cyan-300",
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Spring Styles",
      description: "Fresh styles for the new season. Limited time offers.",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000",
      buttonText: "Shop New Arrivals",
      link: "/new-arrivals",
      bgColor: "bg-gradient-to-br from-pink-500/20 to-rose-600/20",
      accentColor: "text-pink-300",
    },
    {
      id: 3,
      title: "Premium Essentials",
      subtitle: "Luxury Collection",
      description: "Elevate your wardrobe with premium quality essentials.",
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000",
      buttonText: "Explore Luxury",
      link: "/collections/luxury",
      bgColor: "bg-gradient-to-br from-amber-500/20 to-orange-600/20",
      accentColor: "text-amber-300",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Slides Container */}
      <div className="relative h-[380px] sm:h-[480px] md:h-[600px] lg:h-[700px] xl:h-[800px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-initial ${
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full"
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 ${slide.bgColor}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl lg:max-w-3xl xl:max-w-4xl">
                  {/* Subtitle */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-16 h-0.5 ${slide.accentColor.replace(
                        "text",
                        "bg"
                      )}`}
                    />
                    <span className="text-sm md:text-base font-semibold uppercase tracking-widest text-white/90">
                      {slide.subtitle}
                    </span>
                  </div>

                  {/* Main Title */}
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 md:mb-6 leading-tight">
                    <span className="block">{slide.title.split(" ")[0]}</span>
                    <span className={`block ${slide.accentColor}`}>
                      {slide.title.split(" ").slice(1).join(" ")}
                    </span>
                  </h1>

                  {/* Description */}
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 md:mb-8 max-w-xl">
                    {slide.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to={slide.link}
                      className="group relative inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-4 md:px-10 md:py-5 text-sm md:text-base font-semibold rounded-full hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl"
                    >
                      <span>{slide.buttonText}</span>
                      <FiArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                      <div className="absolute inset-0 rounded-full border-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>

                    <Link
                      to="/collections/all"
                      className="group inline-flex items-center justify-center gap-3 bg-transparent text-white border-2 border-white/50 px-8 py-4 md:px-10 md:py-5 text-sm md:text-base font-semibold rounded-full hover:bg-white/10 hover:border-white transition-all duration-300"
                    >
                      <span>View All</span>
                      <FiArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 hidden md:flex items-center justify-center"
          aria-label="Previous slide"
        >
          <FiChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 hidden md:flex items-center justify-center"
          aria-label="Next slide"
        >
          <FiChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 hidden lg:block animate-bounce">
          <div className="text-white/60 text-sm font-medium uppercase tracking-widest">
            Scroll
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">
                1000+
              </div>
              <div className="text-sm text-gray-600">Premium Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">
                50+
              </div>
              <div className="text-sm text-gray-600">Countries Shipped</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">
                24/7
              </div>
              <div className="text-sm text-gray-600">Customer Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">
                Free
              </div>
              <div className="text-sm text-gray-600">Shipping Worldwide*</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
