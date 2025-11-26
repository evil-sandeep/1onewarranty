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
    <section className="support-brand-full  flex flex-col items-center justify-center ">
      {/* header + search */}
      <div className="w-full bg-white px-4 md:px-8 lg:px-16 py-6import { alpha } from '@mui/material/styles';
import { gray } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const surfacesCustomizations = {
  MuiAccordion: {
    defaultProps: {
      elevation: 0,
      disableGutters: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        padding: 4,
        overflow: 'clip',
        backgroundColor: (theme.vars || theme).palette.background.default,
        border: '1px solid',
        borderColor: (theme.vars || theme).palette.divider,
        ':before': {
          backgroundColor: 'transparent',
        },
        '&:not(:last-of-type)': {
          borderBottom: 'none',
        },
        '&:first-of-type': {
          borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
          borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
        },
        '&:last-of-type': {
          borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
          borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
        },
      }),
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: ({ theme }) => ({
        border: 'none',
        borderRadius: 8,
        '&:hover': { backgroundColor: gray[50] },
        '&:focus-visible': { backgroundColor: 'transparent' },
        ...theme.applyStyles('dark', {
          '&:hover': { backgroundColor: gray[800] },
        }),
      }),
    },
  },
  MuiAccordionDetails: {
    styleOverrides: {
      root: { mb: 20, border: 'none' },
    },
  },
  MuiPaper: {
    defaultProps: {
      elevation: 0,
    },
  },
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => {
        return {
          padding: 16,
          gap: 16,
          transition: 'all 100ms ease',
          backgroundColor: gray[50],
          borderRadius: (theme.vars || theme).shape.borderRadius,
          border: `1px solid ${(theme.vars || theme).palette.divider}`,
          boxShadow: 'none',
          ...theme.applyStyles('dark', {
            backgroundColor: gray[800],
          }),
          variants: [
            {
              props: {
                variant: 'outlined',
              },
              style: {
                border: `1px solid ${(theme.vars || theme).palette.divider}`,
                boxShadow: 'none',
                background: 'hsl(0, 0%, 100%)',
                ...theme.applyStyles('dark', {
                  background: alpha(gray[900], 0.4),
                }),
              },
            },
          ],
        };
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: 0,
        '&:last-child': { paddingBottom: 0 },
      },
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
  MuiCardActions: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
}; shadow-sm border-b border-gray-200">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

    {/* Title */}
    <h3 className="text-3xl font-semibold text-gray-900 tracking-tight text-center md:text-left">
      Brands We Support
    </h3>

    {/* Search */}
    <div className="w-full md:w-1/3">
      <label htmlFor="brand-search" className="sr-only">Search Brand</label>

      <div className="relative">
        {/* Search icon */}
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>

        <input
          id="brand-search"
          type="text"
          placeholder="Search brands..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
            w-full pl-12 pr-4 py-3
            rounded-xl
            bg-gray-50
            text-gray-900
            placeholder-gray-400
            border border-gray-300
            focus:bg-white
            focus:border-indigo-500
            focus:ring-2
            focus:ring-indigo-400
            transition
            shadow-sm
          "
        />
      </div>
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
