import React, { useEffect, useState } from "react";

const FilterSideBar = () => {
  // Simulating URL params with state for demonstration
  const [urlParams, setUrlParams] = useState(new URLSearchParams());
  const [priceRange, setPriceRange] = useState([0, 100]);
  const categories = ["Top Wear", "Bottom Wear"];
  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "Navy",
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyester",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];
  const brands = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Beach Breeze",
    "Fashionista",
    "ChicStyle",
  ];
  const genders = ["Men", "Women"];
  const [filter, setFilter] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filter };
    
    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else if (type === "range") {
      newFilters.maxPrice = value;
      setPriceRange([0, value]);
    } else {
      newFilters[name] = value;
    }
    
    setFilter(newFilters);
    updateURLParams(newFilters);
    console.log(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key] && newFilters[key] !== 0) {
        params.append(key, newFilters[key]);
      }
    });
    
    setUrlParams(params);
    // Update browser URL without page reload
    window.history.pushState({}, '', `?${params.toString()}`);
  };

  useEffect(() => {
    // Read URL params on component mount
    const params = new URLSearchParams(window.location.search);
    const paramsObj = Object.fromEntries([...params]);

    setFilter({
      category: paramsObj.category || "",
      gender: paramsObj.gender || "",
      color: paramsObj.color || "",
      size: paramsObj.size ? paramsObj.size.split(",") : [],
      material: paramsObj.material ? paramsObj.material.split(",") : [],
      brand: paramsObj.brand ? paramsObj.brand.split(",") : [],
      minPrice: paramsObj.minPrice || 0,
      maxPrice: paramsObj.maxPrice || 100,
    });
    setPriceRange([0, paramsObj.maxPrice || 100]);
  }, []);

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>
      
      {/* Category filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">
          Category
        </label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              onChange={handleFilterChange}
              value={category}
              name="category"
              checked={filter.category === category}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/* Gender Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Gender</label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-1">
            <input
              type="radio"
              name="gender"
              value={gender}
              onChange={handleFilterChange}
              checked={filter.gender === gender}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{gender}</span>
          </div>
        ))}
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={(e) => {
                e.target.name = "color";
                e.target.value = color;
                handleFilterChange(e);
              }}
              className={`w-8 h-8 rounded-full border-2 cursor-pointer transition hover:scale-105 ${
                filter.color === color ? "border-blue-500" : "border-gray-300"
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            ></button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Sizes</label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="size"
              value={size}
              onChange={handleFilterChange}
              checked={filter.size.includes(size)}
              className="h-4 w-4 mr-2 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>

      {/* Material */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">
          Materials
        </label>
        {materials.map((material) => (
          <div key={material} className="flex items-center mb-1">
            <input
              type="checkbox"
              value={material}
              onChange={handleFilterChange}
              name="material"
              checked={filter.material.includes(material)}
              className="h-4 w-4 mr-2 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{material}</span>
          </div>
        ))}
      </div>

      {/* Brand */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Brand</label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              onChange={handleFilterChange}
              checked={filter.brand.includes(brand)}
              className="h-4 w-4 mr-2 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{brand}</span>
          </div>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">
          Price Range
        </label>
        <input
          type="range"
          name="pricerange"
          value={priceRange[1]}
          onChange={handleFilterChange}
          min={0}
          max={100}
          className="bg-gray-300 rounded-lg w-full h-2 appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;