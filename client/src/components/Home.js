// src/components/Home.jsx
import React from 'react';
import SupportBrand from './SupportBrand';
import WarrantyCheck from './WarrantyCheck'; // optional, if you want it on home

const Home = () => {
  return (
    <div>
      {/* SupportBrand only renders on home */}
      <SupportBrand />
    </div>
  );
};

export default Home;
