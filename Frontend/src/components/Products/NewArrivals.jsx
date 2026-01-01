import React, { useRef, useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const scrollContainerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const newArrivals = [
    {
      _id: "1",
      name: "Premium Leather Jacket",
      price: 199.99,
      images: [{ url: "https://picsum.photos/500/500?random=1" }],
    },
    {
      _id: "2",
      name: "Wool Blend Coat",
      price: 159.99,
      images: [{ url: "https://picsum.photos/500/500?random=2" }],
    },
    {
      _id: "3",
      name: "Denim Overshirt",
      price: 89.99,
      images: [{ url: "https://picsum.photos/500/500?random=3" }],
    },
    {
      _id: "4",
      name: "Bomber Jacket",
      price: 129.99,
      images: [{ url: "https://picsum.photos/500/500?random=4" }],
    },
    {
      _id: "5",
      name: "Trench Coat",
      price: 249.99,
      images: [{ url: "https://picsum.photos/500/500?random=5" }],
    },
    {
      _id: "6",
      name: "Lightweight Windbreaker",
      price: 79.99,
      images: [{ url: "https://picsum.photos/500/500?random=6" }],
    },
    {
      _id: "7",
      name: "Quilted Gilet",
      price: 99.99,
      images: [{ url: "https://picsum.photos/500/500?random=7" }],
    },
  ];

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftButton(container.scrollLeft > 0);
      setShowRightButton(
        container.scrollLeft + container.clientWidth < container.scrollWidth - 1
      );
    }
  };

  const scrollLeftHandler = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRightHandler = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Mouse drag functionality
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollButtons);
      checkScrollButtons(); // Initial check

      // Cleanup
      return () => {
        container.removeEventListener("scroll", checkScrollButtons);
      };
    }
  }, []);

  return (
    <section className="py-8 px-4 md:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Explore New Arrivals
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover the new styles straight off the runway, freshly added to
            keep your wardrobe on the cutting edge of fashion.
          </p>

          {/* Scroll buttons */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex space-x-2">
            <button
              onClick={scrollLeftHandler}
              disabled={!showLeftButton}
              className={`p-3 rounded-full cursor-pointer transition-all duration-200 ${
                showLeftButton
                  ? "bg-white text-black hover:bg-gray-100 shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              aria-label="Scroll left"
            >
              <FiChevronLeft className="text-2xl" />
            </button>
            <button
              onClick={scrollRightHandler}
              disabled={!showRightButton}
              className={`p-3 rounded-full cursor-pointer transition-all duration-200 ${
                showRightButton
                  ? "bg-white text-black hover:bg-gray-100 shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              aria-label="Scroll right"
            >
              <FiChevronRight className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide gap-6 pb-4"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          {newArrivals.map((product) => (
            <div
              key={product._id}
              className="min-w-[280px] sm:min-w-[300px] md:min-w-[320px] lg:min-w-[350px] flex-shrink-0 group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <Link
                    to={`/product/${product._id}`}
                    className="block text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    <h4 className="font-semibold text-lg mb-1">
                      {product.name}
                    </h4>
                    <p className="text-xl font-bold">
                      ${product.price.toFixed(2)}
                    </p>
                    <span className="inline-block mt-3 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Details →
                    </span>
                  </Link>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    NEW
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile navigation dots */}
        <div className="flex justify-center mt-8 md:hidden">
          <div className="flex space-x-2">
            {newArrivals.map((_, index) => (
              <button
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/shop/new-arrivals"
            className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-900 transition-colors duration-300"
          >
            View All New Arrivals
            <FiChevronRight className="text-lg" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
