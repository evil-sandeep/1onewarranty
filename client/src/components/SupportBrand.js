// src/components/SupportBrand.jsx
import React, { useState } from 'react';
import allBrands from '../Data/AllBrands';
import brandLinks from '../Data/BrandLink';

const ROWS = 8;
const BRANDS_PER_ROW = 20;

const SupportBrand = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBrands = allBrands.filter((brand) =>
    brand.trim().toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  // chunk into rows
  const chunkedBrands = [];
  for (let i = 0; i < filteredBrands.length && chunkedBrands.length < ROWS; i += BRANDS_PER_ROW) {
    chunkedBrands.push(filteredBrands.slice(i, i + BRANDS_PER_ROW));
  }

  const isSearching = searchTerm.trim().length > 0;

  return (
    <section className="support-brand-full text-white flex flex-col items-center justify-center">
      {/* header + search */}
      <div className="w-full px-4 md:px-8 lg:px-16 py-8 max-w-none">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h3 className="text-2xl md:text-3xl font-semibold text-center md:text-left">Brands We Support</h3>

          <div className="w-full md:w-1/3">
            <label htmlFor="brand-search" className="sr-only">Search Brand</label>
            <input
              id="brand-search"
              type="text"
              placeholder="Search Brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-700 bg-gray-800 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* marquee rows container - full width */}
      <div className="w-full flex-1 flex flex-col justify-center gap-6 px-2 md:px-8 lg:px-16">
        {chunkedBrands.length === 0 ? (
          <p className="text-center text-gray-400">No brands found.</p>
        ) : (
          chunkedBrands.map((row, index) => {
            // choose animation class per row (alternating)
            const animationClass = isSearching ? 'marquee-paused' : (index % 2 === 1 ? 'animate-marquee-reverse' : 'animate-marquee');

            return (
              <div key={index} className="overflow-hidden relative w-full">
                {/* marquee wrapper — will animate; use animationClass here */}
                <div className={`marquee-wrap ${animationClass}`}>
                  {/* single track (one copy) */}
                  <div className="marquee-track">
                    {row.map((brand, i) => (
                      <BrandPill key={`a-${brand}-${i}`} brand={brand} />
                    ))}
                  </div>

                  {/* duplicated track (exact same content) */}
                  <div className="marquee-track" aria-hidden="true">
                    {row.map((brand, i) => (
                      <BrandPill key={`b-${brand}-${i}`} brand={brand} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

function BrandPill({ brand }) {
  const brandKey = brand.trim().toLowerCase();
  const redirectUrl = brandLinks[brandKey] || brandLinks[brand];

  const open = () => {
    if (redirectUrl) window.open(redirectUrl, '_blank', 'noopener,noreferrer');
    else alert(`No warranty page found for ${brand}`);
  };

  return (
    <div
      onClick={open}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && open()}
      aria-label={`Open warranty page for ${brand}`}
      className="
        inline-flex items-center justify-center
        cursor-pointer select-none
        px-4 py-2
        mx-2 mb-2
        text-sm font-medium text-gray-800
        bg-white
        border border-gray-300
        rounded-lg
        shadow-sm
        hover:bg-gray-100
        hover:shadow-md
        hover:border-gray-400
        transition-all duration-200
        focus:outline-none
        focus:ring-2 focus:ring-blue-500
      "
    >
      {brand}
    </div>
  );
}

export default SupportBrand;
