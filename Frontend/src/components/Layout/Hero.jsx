import React from "react";
import heroImg from "../../assets/shopSphere-hero.webp";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-full">
      <img
        src={heroImg}
        alt="ShopSphere hero"
        className="w-full h-[380px] sm:h-[480px] md:h-[600px] lg:h-[700px] object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
        <div className="text-center text-white px-4 sm:px-6 max-w-2xl">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tight leading-tight mb-4">
            Vacation <br /> Ready
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6">
            Explore vacation-ready outfits with fast worldwide shipping.
          </p>

          <Link
            to="#"
            className="inline-block bg-white text-gray-900 px-7 py-3 text-sm sm:text-base font-medium rounded-sm
                       hover:bg-gray-100 transition-all duration-200"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
