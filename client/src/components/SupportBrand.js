// src/components/SupportBrand.jsx
import React, { useMemo, useState } from "react";
import allBrands from "../Data/AllBrands";
import brandLinks from "../Data/BrandLink";

const ROWS = 6; // reduce rows for small screens if you like
const BRANDS_PER_ROW = 18;

export default function SupportBrand() {
  const [searchTerm, setSearchTerm] = useState("");
  const [touchPaused, setTouchPaused] = useState(false);

  // filter brands
  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return allBrands;
    return allBrands.filter((b) => b.toLowerCase().includes(q));
  }, [searchTerm]);

  // chunk into rows
  const chunked = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < filtered.length && chunks.length < ROWS; i += BRANDS_PER_ROW) {
      chunks.push(filtered.slice(i, i + BRANDS_PER_ROW));
    }
    // if not enough rows, replicate content so there is always something to scroll
    if (chunks.length === 0 && filtered.length > 0) chunks.push(filtered);
    return chunks;
  }, [filtered]);

  // small helper to compute animation duration by row length (so speed looks consistent)
  const durationForRow = (rowLength) => {
    // base length multiplier - tweak these values to taste
    const base = Math.max(18, Math.min(40, rowLength * 1.8)); // seconds
    return `${base}s`;
  };

  // touch handlers to pause marquee on mobile
  const handleTouchStart = () => setTouchPaused(true);
  const handleTouchEnd = () => setTouchPaused(false);

  return (
    <section className="w-screen bg-white text-gray-900">
      {/* marquee CSS (self-contained) */}
      <style>{`
        :root { --marquee-ease: linear; }

        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }

        .marquee-wrap { display:flex; width:100%; overflow:hidden; }
        .marquee-track { display:flex; min-width:200%; align-items:center; gap:0.5rem; }
        .marquee-list { display:inline-flex; gap:0.5rem; align-items:center; padding:0.5rem 0; }

        .marquee-play-left { animation-name: marquee-left; animation-timing-function: var(--marquee-ease); animation-iteration-count: infinite; animation-fill-mode: forwards; }
        .marquee-play-right { animation-name: marquee-right; animation-timing-function: var(--marquee-ease); animation-iteration-count: infinite; animation-fill-mode: forwards; }

        /* pause on hover (desktop) */
        .marquee-wrap:hover .marquee-play-left,
        .marquee-wrap:hover .marquee-play-right {
          animation-play-state: paused;
        }

        /* respects reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .marquee-play-left, .marquee-play-right { animation: none !important; transform: none !important; }
        }
      `}</style>

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-gray-100">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

    {/* LEFT — Title */}
    <div className="text-left">
      <h3 className="text-2xl md:text-3xl font-semibold">Brands We Support</h3>
      <p className="text-sm text-gray-500 mt-1">Tap a brand to open its warranty page</p>
    </div>

    {/* RIGHT — Search Bar */}
    <div className="w-full md:w-auto md:flex md:justify-end">
      <div className="w-full sm:w-96 md:w-96">
        <label htmlFor="site-search" className="sr-only">Search serial or brand</label>
        <div className="relative">
          <input
            id="site-search"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search brand or serial — e.g. SNX200A93847"
            className="w-full px-4 py-2 rounded-full border border-gray-200 bg-white placeholder-gray-400 text-sm
                       focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm select-none">⌕</span>
        </div>
      </div>
    </div>

  </div>
</div>


      <div className="w-full">
        {chunked.length === 0 ? (
          <div className="py-10 text-center text-gray-500">No brands found.</div>
        ) : (
          <div className="space-y-6 py-6">
            {chunked.map((row, rowIndex) => {
              const direction = rowIndex % 2 === 0 ? "left" : "right";
              const duration = durationForRow(row.length);
              // apply pause on touch by overriding animation-play-state via inline style
              const playState = touchPaused ? "paused" : "running";

              return (
                <div key={rowIndex} className="w-full overflow-hidden">
                  {/* full-screen marquee — uses w-screen to ensure edge-to-edge */}
                  <div
                    className="marquee-wrap"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    // also pause on mouseenter for fine control
                    onMouseEnter={() => {}}
                    onMouseLeave={() => {}}
                    aria-hidden={false}
                  >
                    <div
                      className="marquee-track"
                      // set animation via style (duration + direction + play state)
                      style={{
                        // pick play class
                        animationDuration: duration,
                        animationPlayState: playState,
                      }}
                    >
                      {/* first copy */}
                      <div
                        className="marquee-list"
                        style={{
                          // assign animation class using direction
                          animationName: direction === "left" ? "marquee-left" : "marquee-right",
                          animationDuration: duration,
                          animationTimingFunction: "linear",
                          animationIterationCount: "infinite",
                          animationPlayState: playState,
                        }}
                      >
                        {row.map((brand, i) => (
                          <BrandPill key={`a-${rowIndex}-${i}`} brand={brand} />
                        ))}
                      </div>

                      {/* duplicated copy */}
                      <div
                        className="marquee-list"
                        aria-hidden="true"
                        style={{
                          animationName: direction === "left" ? "marquee-left" : "marquee-right",
                          animationDuration: duration,
                          animationTimingFunction: "linear",
                          animationIterationCount: "infinite",
                          animationPlayState: playState,
                        }}
                      >
                        {row.map((brand, i) => (
                          <BrandPill key={`b-${rowIndex}-${i}`} brand={brand} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* <div className="w-full px-4 md:px-8 lg:px-16 py-4 text-center text-sm text-gray-500">
        Tip: Hover to pause (desktop) • Tap to pause (mobile) • Tap a brand to open its warranty page
      </div> */}
    </section>
  );
}

/* BrandPill — responsive sizes for different screen widths */
function BrandPill({ brand }) {
  const brandKey = brand.trim().toLowerCase();
  const redirectUrl = brandLinks[brandKey] || brandLinks[brand];

  const open = () => {
    if (redirectUrl) window.open(redirectUrl, "_blank", "noopener,noreferrer");
    else alert(`No warranty page found for ${brand}`);
  };

  return (
    <button
      onClick={open}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && open()}
      tabIndex={0}
      aria-label={`Open warranty page for ${brand}`}
      className="flex-shrink-0 inline-flex items-center justify-center px-3 py-2 mx-2 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md text-xs sm:text-sm md:text-sm lg:text-base font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
    >
      {brand}
    </button>
  );
}
