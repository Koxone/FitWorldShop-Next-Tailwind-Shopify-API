'use client';

import { useState } from 'react';
import ShopifyProductCard from '@/components/shopify/ShopifyProductCard';
import { usePathname } from 'next/navigation';

export default function ShopifyFilter({ className, tagFilter }) {
  const [genderFilter, setGenderFilter] = useState(null);

  const pathname = usePathname();

  return (
    <main className="flex flex-col items-center gap-5">
      <div
        className={`mb-4 gap-2 self-start ${
          pathname.startsWith('/product-open') ? 'hidden' : 'flex'
        } ${
          pathname === '/'
            ? 'px-0 md:px-0'
            : pathname.startsWith('/all-products')
              ? 'px-3 md:px-0'
              : 'px-0 md:px-0'
        } md:px-0`}
      >
        <button
          onClick={() => setGenderFilter(null)}
          className={`font-poppins cursor-pointer rounded-md px-2 py-2 font-medium transition-all duration-200 md:px-6 ${
            genderFilter === null
              ? 'bg-white text-gray-900'
              : 'border text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          TODOS
        </button>
        <button
          onClick={() => setGenderFilter('Masculino')}
          className={`font-poppins cursor-pointer rounded-md px-1 py-2 font-medium transition-all duration-200 md:px-6 ${
            genderFilter === 'Masculino'
              ? 'bg-white text-gray-900'
              : 'border text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          HOMBRES
        </button>
        <button
          onClick={() => setGenderFilter('Femenino')}
          className={`font-poppins cursor-pointer rounded-md px-1 py-2 font-medium transition-all duration-200 md:px-6 ${
            genderFilter === 'Femenino'
              ? 'bg-white text-gray-900'
              : 'border text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          MUJERES
        </button>
      </div>

      <ShopifyProductCard
        tagFilter={tagFilter}
        className={`${className}`}
        genderFilter={genderFilter}
      />
    </main>
  );
}
