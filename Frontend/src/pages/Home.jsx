import React, { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductsDetails from "../components/Products/ProductsDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedProducts from "../components/Products/FeaturedProducts";
import FeaturesSection from "../components/Products/FeaturesSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productSlice";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSeller, setBestSeller] = useState(null);

  useEffect(() => {
    // fetch product for specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      }),
    );
    // Fetch best seller products
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/products/best-seller`,
        );
        setBestSeller(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />
      {/* Best Sellers */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Sellers</h2>
      {bestSeller ? (
        <ProductsDetails productId={bestSeller._id} />
      ) : (
        <p className="text-center">Loading best seller products ...</p>
      )}

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeaturedProducts />
      <FeaturesSection />
    </div>
  );
};

export default Home;
