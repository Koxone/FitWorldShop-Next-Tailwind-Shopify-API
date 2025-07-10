'use client';

import useProducts from '@/hooks/useProducts';

export default function ShopifyProductsList() {
  const { products, isLoading, isError } = useProducts();

  if (isLoading)
    return <div className="p-4 text-center">Cargando productos...</div>;
  if (isError)
    return (
      <div className="p-4 text-center text-red-500">
        Error al cargar productos
      </div>
    );

  return (
    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <div key={product.id} className="rounded-lg border border-white p-2">
          <img
            src={product.images.edges[0]?.node.url}
            alt={product.title}
            className="h-64 w-full rounded object-cover"
          />
          <h2 className="mt-2 font-semibold">{product.title}</h2>
          <p className="text-sm text-gray-600">
            ${product.variants.edges[0].node.price.amount}{' '}
            {product.variants.edges[0].node.price.currencyCode}
          </p>
        </div>
      ))}
    </div>
  );
}
