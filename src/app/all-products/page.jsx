'use client';

import { FilterIcon } from '@/components/icons/Icons';
import ShopifyProductCard from '@/components/shopify/ShopifyProductCard';
// import ProductCard from '../../components/cards/ProductCard';

export default function ProductsView() {
  return (
    <div className="grid min-h-screen grid-cols-[auto_1fr] gap-4 overflow-x-hidden bg-gray-900 px-4 py-8 text-white sm:px-6 lg:px-8">
      {/* Sidebar */}
      <div className="hidden md:block">
        {/* Aquí puedes colocar el componente FiltersSidebar */}
        <div className="rounded-lg bg-gray-800 p-4">
          <p className="text-gray-400">Filters Sidebar Placeholder</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-7xl">
        {/* Heading */}
        <h1 className="font-montserrat mb-2 text-3xl font-bold">
          All Products
        </h1>
        <p className="font-inter mb-6 text-gray-400">
          Discover our complete collection of premium athletic wear.
        </p>

        {/* Filters and Controls */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 transition hover:bg-gray-700 md:hidden">
              <FilterIcon size={18} />
              <span>Filters</span>
            </button>

            <button className="font-poppins cursor-pointer rounded-md bg-white px-6 py-2 font-medium text-gray-900 transition-all duration-200">
              Todos
            </button>

            <button className="font-poppins cursor-pointer rounded-md border px-6 py-2 font-medium text-gray-300 transition-all duration-200 hover:bg-gray-700 hover:text-white">
              Mujeres
            </button>

            <button className="font-poppins cursor-pointer rounded-md border px-6 py-2 font-medium text-gray-300 transition-all duration-200 hover:bg-gray-700 hover:text-white">
              Hombres
            </button>
          </div>

          <div className="flex items-center gap-2">
            <select className="rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:ring-white focus:outline-none">
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <p className="font-inter mb-4 text-gray-400">Showing X products</p>

        {/* Products Grid */}
        <div className="">
          <ShopifyProductCard className="flex w-full flex-wrap" />
        </div>
      </div>
    </div>
  );
}
