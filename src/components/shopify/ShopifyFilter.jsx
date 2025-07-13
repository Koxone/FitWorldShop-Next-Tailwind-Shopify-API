'use client';

import { useState } from 'react';
import ShopifyProductCard from '@/components/shopify/ShopifyProductCard';
import { useFilterContext } from '@/context/FilterContext';
import useFilteredProductsByCategory from '@/hooks/useProductCategorieFilter';

export default function ShopifyFilter({ className }) {
  const { categorieFilter, setCategorieFilter, categories } = useFilterContext();

  return (
    <main className="flex flex-col items-center gap-5">
      <div className="mb-4 flex gap-2 self-start">
        <button
          onClick={() => setCategorieFilter(null)}
          className={`font-poppins cursor-pointer rounded-md px-2 py-2 font-medium transition-all duration-200 md:px-6 ${
            categorieFilter === null
              ? 'bg-white text-gray-900'
              : 'border text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          TODOS
        </button>
        <button
          onClick={() => setCategorieFilter('Masculino')}
          className={`font-poppins cursor-pointer rounded-md px-1 py-2 font-medium transition-all duration-200 md:px-6 ${
            categorieFilter === 'Masculino'
              ? 'bg-white text-gray-900'
              : 'border text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          HOMBRES
        </button>
        <button
          onClick={() => setCategorieFilter('Femenino')}
          className={`font-poppins cursor-pointer rounded-md px-1 py-2 font-medium transition-all duration-200 md:px-6 ${
            categorieFilter === 'Femenino'
              ? 'bg-white text-gray-900'
              : 'border text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          MUJERES
        </button>
      </div>

      {/* <ShopifyProductCard categorieFilter={categorieFilter} /> */}
      <ShopifyProductCard
        className={`${className}`}
        categorieFilter={categorieFilter}
      />
    </main>
  );
}
