'use client';

import { useFilterContext } from '@/context/FilterContext';
import useProducts from '@/hooks/useProducts';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ShopifyProductCard({ className = '', genderFilter }) {
  const pathname = usePathname();
  const { sidebarCategorieFilter, mainCategorieFilter } = useFilterContext();
  const { products, isLoading, isError } = useProducts();
  const [productImages, setProductImages] = useState({});
  const router = useRouter();

  const activeCategoryFilter = pathname.startsWith('/all-products')
    ? sidebarCategorieFilter
    : mainCategorieFilter;

  if (isLoading)
    return <div className="p-4 text-center">Cargando productos...</div>;

  if (isError)
    return (
      <div className="p-4 text-center text-red-500">
        Error al cargar productos
      </div>
    );

  let filteredProducts = [...products];

  if (genderFilter) {
    filteredProducts = filteredProducts.filter((product) =>
      product.variants.edges.some((variant) =>
        variant.node.selectedOptions.some(
          (opt) =>
            opt.name.toLowerCase() === 'sexo objetivo' &&
            opt.value.toLowerCase() === genderFilter.toLowerCase()
        )
      )
    );
  }

  if (activeCategoryFilter) {
    filteredProducts = filteredProducts.filter((product) =>
      product.tags.some(
        (tag) => tag.toLowerCase() === activeCategoryFilter.toLowerCase()
      )
    );
  }

  const handleColorClick = (productId, product, color) => {
    const variant = product.variants.edges.find((variant) =>
      variant.node.selectedOptions.some(
        (opt) => opt.name.toLowerCase() === 'color' && opt.value === color
      )
    );
    if (variant?.node.image?.url) {
      setProductImages((prev) => ({
        ...prev,
        [productId]: variant.node.image.url,
      }));
    }
  };

  const isValidCSSColor = (color) => {
    const s = new Option().style;
    s.color = '';
    s.color = color;
    return s.color !== '';
  };

  return (
    <div
      className={`${className} ${
        pathname === '/' || pathname.startsWith('/product-open')
          ? 'mx-auto flex w-full flex-nowrap gap-5 overflow-x-auto'
          : 'grid grid-cols-[1fr_1fr] gap-2 px-2 lg:grid-cols-[1fr_1fr_1fr] xl:grid-cols-4'
      }`}
    >
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className={`group hover-lift relative overflow-hidden rounded-lg border border-neutral-300/10 bg-gray-800 transition-all duration-300 ${
            pathname === '/' || pathname.startsWith('/product-open')
              ? 'max-w-[300px] min-w-[250px] flex-shrink-0'
              : 'w-full'
          }`}
        >
          {/* IMAGE */}
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              placeholder="blur"
              blurDataURL="/path/to/lowres.jpg"
              priority
              src={
                productImages[product.id] ||
                product.featuredImage?.url ||
                product.images.edges[0]?.node.url
              }
              alt={product.title}
              width={500}
              height={500}
              className="w-full cursor-pointer object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 500px"
              onClick={() => router.push(`/product-open/${product.handle}`)}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:p-4">
              <button
                onClick={() => router.push(`/product-open/${product.handle}`)}
                className="focus-ring hidden w-full cursor-pointer rounded bg-white px-4 py-2 font-semibold text-gray-900 transition-colors duration-200 hover:bg-gray-300 md:block"
              >
                Vista Rápida
              </button>
            </div>
          </div>

          {/* DETAILS */}
          <div className="flex flex-col gap-1 p-3 md:p-4">
            {/* COLOR SELECTOR */}
            {product.options?.find((o) => o.name.toLowerCase() === 'color') && (
              <div className="mt-2 flex gap-1">
                {product.options
                  .find((o) => o.name.toLowerCase() === 'color')
                  .values.map((color, index) => (
                    <span
                      key={index}
                      onClick={() =>
                        handleColorClick(product.id, product, color)
                      }
                      className="h-5 w-5 cursor-pointer rounded-full border border-gray-600 transition-colors hover:border-gray-400"
                      style={{
                        backgroundColor: isValidCSSColor(color)
                          ? color.toLowerCase()
                          : `#${color}`,
                      }}
                      title={color}
                    />
                  ))}
              </div>
            )}

            <h2 className="font-montserrat text-lg font-semibold text-white group-hover:text-gray-300 md:mb-1">
              {product.title}
            </h2>

            <p className="font-inter mb-2 hidden max-h-20 overflow-y-auto text-sm text-gray-400 md:block">
              {product.description}
            </p>

            <div className="md:flex md:gap-2">
              <p className="text-sm font-bold text-white md:text-lg">
                ${product.variants.edges[0].node.price.amount}{' '}
                {product.variants.edges[0].node.price.currencyCode}
              </p>

              {product.compareAtPriceRange?.maxVariantPrice?.amount && (
                <p className="text-xs text-gray-500 line-through md:text-sm">
                  ${product.compareAtPriceRange.maxVariantPrice.amount}{' '}
                  {product.compareAtPriceRange.maxVariantPrice.currencyCode}
                </p>
              )}
            </div>

            {product.vendor && (
              <p className="mt-1 hidden text-xs text-gray-500 md:block">
                Vendedor: {product.vendor}
              </p>
            )}

            {product.category?.name && (
              <p className="text-xs text-gray-500">
                Categoría:{' '}
                {product.tags
                  .map((tag) =>
                    tag
                      .split(' ')
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(' ')
                  )
                  .join(', ')}
              </p>
            )}

            {/* SIZE SELECTOR */}
            {product.options?.find((o) => o.name.toLowerCase() === 'talla') && (
              <div className="mt-2 hidden flex-wrap justify-start gap-1 md:block">
                {product.options
                  .find((o) => o.name.toLowerCase() === 'talla')
                  .values.map((size, index) => (
                    <span
                      key={index}
                      className="rounded border border-gray-500 px-3 py-1.5 text-xs text-white"
                    >
                      {size}
                    </span>
                  ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
