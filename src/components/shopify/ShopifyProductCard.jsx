'use client';

import useProducts from '@/hooks/useProducts';
import Image from 'next/image';

export default function ShopifyProductsList({ className = '', genderFilter }) {
  const { products, isLoading, isError } = useProducts();

  if (isLoading)
    return <div className="p-4 text-center">Cargando productos...</div>;
  if (isError)
    return (
      <div className="p-4 text-center text-red-500">
        Error al cargar productos
      </div>
    );

  const filteredProducts = genderFilter
    ? products.filter((product) =>
        product.variants.edges.some((variant) =>
          variant.node.selectedOptions.some(
            (opt) => opt.name === 'Sexo objetivo' && opt.value === genderFilter
          )
        )
      )
    : products;

  return (
    <div
      className={`${className} mx-auto flex w-full flex-nowrap gap-5 overflow-x-auto`}
    >
      {filteredProducts.map(
        (
          product // <-- Aquí corregido
        ) => (
          <div
            key={product.id}
            className="group hover-lift relative max-w-[300px] min-w-[250px] flex-shrink-0 overflow-hidden rounded-lg border border-neutral-300/10 bg-gray-800 transition-all duration-300"
          >
            {/* Imagen del producto */}
            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src={
                  product.featuredImage?.url ||
                  product.images.edges[0]?.node.url
                }
                alt={product.title}
                width={500}
                height={500}
                className="w-full cursor-pointer object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 500px"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button className="focus-ring w-full cursor-pointer rounded bg-white px-4 py-2 font-semibold text-gray-900 transition-colors duration-200 hover:bg-gray-300">
                  Quick View
                </button>
              </div>
            </div>

            {/* Detalles del producto */}
            <div className="flex flex-col gap-1 p-4">
              {/* Selector de colores */}
              {product.options?.find(
                (o) => o.name.toLowerCase() === 'color'
              ) && (
                <div className="mt-2 flex gap-1">
                  {product.options
                    .find((o) => o.name.toLowerCase() === 'color')
                    .values.map((color, index) => (
                      <span
                        key={index}
                        className="h-5 w-5 rounded-full border border-gray-600"
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      />
                    ))}
                </div>
              )}
              {/* Text Content */}
              <div>
                {/* Title */}
                <h2 className="font-montserrat mb-1 text-lg font-semibold text-white group-hover:text-gray-300">
                  {product.title}
                </h2>
                {/* Description */}
                <p className="font-inter mb-2 max-h-20 overflow-y-auto text-sm text-gray-400">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="flex gap-2">
                {/* Original */}
                <p className="font-poppins text-lg font-bold text-white">
                  ${product.variants.edges[0].node.price.amount}{' '}
                  {product.variants.edges[0].node.price.currencyCode}
                </p>
                {/* Discount */}
                {product.compareAtPriceRange?.maxVariantPrice?.amount && (
                  <p className="font-poppins text-sm text-gray-500 line-through">
                    ${product.compareAtPriceRange.maxVariantPrice.amount}{' '}
                    {product.compareAtPriceRange.maxVariantPrice.currencyCode}
                  </p>
                )}
              </div>
              {/* Vendor */}
              {product.vendor && (
                <p className="mt-1 text-xs text-gray-500">
                  Vendedor: {product.vendor}
                </p>
              )}
              {/* Categories */}
              {product.category?.name && (
                <p className="text-xs text-gray-500">
                  Categoría: {product.category.name}
                </p>
              )}
              {/* Sizes */}
              {product.options?.find(
                (o) => o.name.toLowerCase() === 'talla'
              ) && (
                <div className="mt-2 flex flex-wrap justify-between gap-1">
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
        )
      )}
    </div>
  );
}
