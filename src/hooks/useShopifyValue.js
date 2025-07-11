// src/hooks/useShopifyValue.js
'use client';

import useProducts from '@/hooks/useProducts';
import { useMemo } from 'react';

export default function useShopifyValue(path) {
  const { products, isLoading, isError } = useProducts();

  const values = useMemo(() => {
    if (isLoading || isError || !products.length) return [];
    return products.map((product) => {
      try {
        // eslint-disable-next-line no-new-func
        return Function('product', `return product.${path}`)(product);
      } catch (e) {
        console.error(`❌ Error al acceder a ${path}`, e);
        return undefined;
      }
    });
  }, [products, path, isLoading, isError]);

  return { values, isLoading, isError };
}

// import useShopifyValue from '@/hooks/useShopifyValue';

// const { values: titles, isLoading, isError } = useShopifyValue('title');

// if (isLoading) return <div>Loading...</div>;
// if (isError) return <div>Error</div>;

// return (
//   <div>
//     {titles.map((title, i) => (
//       <p key={i}>{title}</p>
//     ))}
//   </div>
// );

// ✅ 'title' → título del producto
// ✅ 'description' → descripción
// ✅ 'featuredImage.url' → URL de imagen principal
// ✅ 'variants.edges[0].node.price.amount' → precio
// ✅ 'options.find(o => o.name === "Color").values' → array de colores
// ✅ 'options.find(o => o.name === "Talla").values' → array de tallas
// ✅ 'collections.edges[0].node.title' → nombre de la colección
