import React, { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const newArrivals = [
    {
      _id: "1",
      name: "Stylish Jacket",
      price: 120,
      images: [{ url: "https://picsum.photos/500/500?random=1" }],
    },
    {
      _id: "2",
      name: "Stylish Jacket",
      price: 120,
      images: [{ url: "https://picsum.photos/500/500?random=2" }],
    },
    {
      _id: "3",
      name: "Stylish Jacket",
      price: 120,
      images: [{ url: "https://picsum.photos/500/500?random=3" }],
    },
    {
      _id: "4",
      name: "Stylish Jacket",
      price: 120,
      images: [{ url: "https://picsum.photos/500/500?random=4" }],
    },
    {
      _id: "5",
      name: "Stylish Jacket",
      price: 120,
      images: [{ url: "https://picsum.photos/500/500?random=5" }],
    },
    {
      _id: "6",
      name: "Stylish Jacket",
      price: 120,
      images: [{ url: "https://picsum.photos/500/500?random=6" }],
    },
    {
      _id: "7",
      name: "Stylish Jacket",
      price: 120,
      images: [{ url: "https://picsum.photos/500/500?random=7" }],
    },
  ];

  return (
    <section className="p-4">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the new styles straight off the runway, freshly added to keep
          your wardrobe on the cutting edge of fashion.
        </p>
        {/* Scroll button */}
        <div className=" absolute right-0 -bottom-7.5 flex space-x-2">
          <button className="p-2 rounded cursor-pointer hover:bg-gray-100 text-black bg-white">
            <FiChevronLeft className="text-2xl" />
          </button>
          <button className="p-2 rounded cursor-pointer hover:bg-gray-100 text-black bg-white">
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>
      {/* Scrollable Content */}
      <div className="container mx-auto overflow-x-scroll flex space-x-6 relative">
        {newArrivals.map((products) => (
          <div
            key={products._id}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%]"
          >
            <img
              src={products.images[0]?.url}
              alt={products.images[0]?.altext || products.name}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
              <Link to={`/product/${products._id}`} className="block ">
                <h4 className="font-medium">{products.name}</h4>
                <p className="mt-1">$ {products.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
