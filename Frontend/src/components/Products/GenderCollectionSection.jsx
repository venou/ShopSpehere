import React from "react";
import mensCollectionimg from "../../assets/mens-collection.webp";
import womensCollectionimg from "../../assets/womens-collection.webp";
import { Link } from "react-router-dom";

const GenderCollectionSection = () => {
  const collections = [
    {
      id: 1,
      title: "Women's Collection",
      description: "Elevate your style with our latest women's fashion",
      image: womensCollectionimg,
      link: "/collections/women",
      bgGradient: "from-pink-50/30 to-purple-50/30",
      hoverGradient: "from-pink-100/40 to-purple-100/40",
      accentColor: "text-rose-600",
    },
    {
      id: 2,
      title: "Men's Collection",
      description: "Modern essentials for the contemporary man",
      image: mensCollectionimg,
      link: "/collections/men",
      bgGradient: "from-blue-50/30 to-cyan-50/30",
      hoverGradient: "from-blue-100/40 to-cyan-100/40",
      accentColor: "text-blue-600",
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12 lg:mb-16">
          <span className="inline-block text-sm md:text-base font-semibold text-gray-600 mb-2">
            COLLECTIONS
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Shop By Gender
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover curated collections designed for every style and occasion
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="group relative overflow-hidden rounded-3xl md:rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Background Gradient Overlay */}
              <div
                className={`absolute inset-0 ${collection.bgGradient} group-hover:${collection.hoverGradient} transition-all duration-500 z-10`}
              />

              {/* Image Container */}
              <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8 lg:p-10">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div
                      className={`w-12 h-0.5 ${collection.accentColor.replace(
                        "text",
                        "bg"
                      )}`}
                    />
                    <span className="text-sm font-semibold uppercase tracking-wider text-white">
                      New Season
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                    {collection.title}
                  </h3>
                  <p className="text-lg text-gray-200 mb-6 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {collection.description}
                  </p>

                  {/* Shop Now Link */}
                  <Link
                    to={collection.link}
                    className="inline-flex items-center gap-3 bg-white text-gray-900 px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-300 group/btn shadow-lg w-fit"
                  >
                    <span>Shop Now</span>
                    <svg
                      className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-6 right-6">
                  <div
                    className={`w-24 h-24 rounded-full ${collection.accentColor.replace(
                      "text",
                      "bg"
                    )} opacity-20 blur-2xl`}
                  />
                </div>
              </div>

              {/* Border Animation on Hover */}
              <div className="absolute inset-0 rounded-3xl md:rounded-[2rem] border-2 border-transparent group-hover:border-white/30 transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* View All Collections Link (Optional) */}
        <div className="text-center mt-10 md:mt-12">
          <Link
            to="/collections"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium group/all transition-colors duration-300"
          >
            <span>View All Collections</span>
            <svg
              className="w-4 h-4 transform group-hover/all:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
