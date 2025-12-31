import React from "react";
import mensCollectionimg from "../../assets/mens-collection.webp";
import womensCollectionimg from "../../assets/womens-collection.webp";
import { Link } from "react-router-dom";

const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-8">
      <div className="container mx-auto flex flex-col md:flex-row gap-6">
        {/* Women's Collection */}
        <div className="relative flex-1 overflow-hidden">
          <img
            src={womensCollectionimg}
            alt="Women's Collection"
            className="w-full h-[400px] sm:h-[500px] md:h-[600px] object-cover"
          />

          <div className="absolute bottom-6 left-6 bg-white/90 px-5 py-4 rounded-sm">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
              Women’s Collection
            </h2>
            <Link
              to="/collections/all?gender=women"
              className="text-sm font-medium text-gray-900 underline hover:text-gray-600 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Men's Collection */}
        <div className="relative flex-1 overflow-hidden">
          <img
            src={mensCollectionimg}
            alt="Men's Collection"
            className="w-full h-[400px] sm:h-[500px] md:h-[600px] object-cover"
          />

          <div className="absolute bottom-6 left-6 bg-white/90 px-5 py-4 rounded-sm">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
              Men’s Collection
            </h2>
            <Link
              to="/collections/all?gender=men"
              className="text-sm font-medium text-gray-900 underline hover:text-gray-600 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
