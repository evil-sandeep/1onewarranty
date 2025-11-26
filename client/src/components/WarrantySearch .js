import React from 'react';
// import allBrands from '../data/AllBrands';
import AllBrands from '../Data/AllBrands';




const WarrantySearch = ({ regNo, setRegNo, brand, setBrand, handleSearch, error }) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        {/* Input Field */}
        <div className="w-full sm:w-1/2">
          <label htmlFor="regNo" className="block text-sm font-medium   mb-1">
            Registration No.
          </label>
          <input
            id="regNo"
            type="text"
            placeholder="Enter Registration No."
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white-800 text-white border border-white-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Select Field */}
        <div className="w-full sm:w-1/3">
          <label htmlFor="brand" className="block text-sm font-medium   mb-1">
            Select Brand
          </label>
          <select
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white-800 text-white border border-white-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="" disabled>Select Brand</option>
            {allBrands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <div className="w-full sm:w-auto mt-1 sm:mt-6">
          <button
            onClick={handleSearch}
            className="w-full  px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold "
          >
            Search
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 font-medium text-sm mt-1">
          ⚠️ {error}
        </p>
      )}
    </>
  );
};

export default WarrantySearch;