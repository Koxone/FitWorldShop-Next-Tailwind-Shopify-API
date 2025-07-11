'use client';

import { useState } from 'react';
import ShopifyProductsList from '@/components/shopify/ShopifyProductCard';

export default function ShopifyFilter() {
  const [genderFilter, setGenderFilter] = useState(null);

  return (
    <main className="flex flex-col items-center gap-5 p-4">
      <div className="mb-4 flex gap-2 self-start">
        <button
          onClick={() => setGenderFilter(null)}
          className={`font-poppins cursor-pointer rounded-md px-6 py-2 font-medium transition-all duration-200 ${
            genderFilter === null
              ? 'bg-white text-gray-900'
              : 'border text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          TODOS
        </button>
        <button
          onClick={() => setGenderFilter('Masculino')}
          className={`font-poppins cursor-pointer rounded-md px-6 py-2 font-medium transition-all duration-200 ${
            genderFilter === 'Masculino'
              ? 'bg-white text-gray-900'
              : 'border text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          HOMBRES
        </button>
        <button
          onClick={() => setGenderFilter('Femenino')}
          className={`font-poppins cursor-pointer rounded-md px-6 py-2 font-medium transition-all duration-200 ${
            genderFilter === 'Femenino'
              ? 'bg-white text-gray-900'
              : 'border text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          MUJERES
        </button>
      </div>

      {/* <ShopifyProductsList genderFilter={genderFilter} /> */}
      <ShopifyProductsList
        className="flex flex-nowrap gap-4"
        genderFilter={genderFilter}
      />
    </main>
  );
}
