# 📦 Shopify Product Fields Cheatsheet

Guía clara para obtener cada parte de un **producto de Shopify** en tu proyecto React/Next.

## ✅ 1️⃣ ID del producto

product.id;

## ✅ 2️⃣ Título del producto

product.title;

## ✅ 3️⃣ Handle (slug de URL)

product.handle;

## ✅ 4️⃣ Descripción

product.description;

## ✅ 5️⃣ Imagen destacada

product.featuredImage?.url || product.images.edges[0]?.node.url;

## ✅ 6️⃣ Todas las imágenes (array de URLs)

product.images.edges.map((edge) => edge.node.url);

## ✅ 7️⃣ Precio

**Precio:**

product.variants.edges[0].node.price.amount;

**Moneda:**

product.variants.edges[0].node.price.currencyCode;

## ✅ 8️⃣ Precio de comparación (oferta)

**Precio:**

product.variants.edges[0].node.compareAtPrice.amount;

**Moneda:**

product.variants.edges[0].node.compareAtPrice.currencyCode;

## ✅ 9️⃣ Variantes (array)

product.variants.edges.map((edge) => edge.node);

Cada `variant.node` incluye:

- `id`
- `title`
- `price.amount`
- `price.currencyCode`
- `compareAtPrice.amount`
- `compareAtPrice.currencyCode`
- `selectedOptions` (Color, Talla, Sexo objetivo)
- `image.url`

## ✅ 10️⃣ Colores disponibles

product.options.find((o) => o.name.toLowerCase() === 'color')?.values || [];

## ✅ 11️⃣ Tallas disponibles

product.options.find((o) => o.name.toLowerCase() === 'talla')?.values || [];

## ✅ 12️⃣ Sexo objetivo

product.options.find((o) => o.name.toLowerCase() === 'sexo objetivo')?.values ||
[];

## ✅ 13️⃣ Vendor (marca)

product.vendor;

## ✅ 14️⃣ Categoría

**Nombre:**

product.category?.name;

**ID:**

product.category?.id;

## ✅ 15️⃣ Rango de precios

**Precio mínimo:**

product.priceRange.minVariantPrice.amount;

**Precio máximo:**

product.priceRange.maxVariantPrice.amount;

**Moneda:**

product.priceRange.minVariantPrice.currencyCode;

## ✅ 16️⃣ Rango de precios de comparación

**Precio mínimo:**

product.compareAtPriceRange.minVariantPrice.amount;

**Precio máximo:**

product.compareAtPriceRange.maxVariantPrice.amount;

**Moneda:**

product.compareAtPriceRange.minVariantPrice.currencyCode;

## ✅ 17️⃣ Tags

product.tags || [];

## ✅ 18️⃣ Color, talla y precio de una variante específica

const variant = product.variants.edges[0].node;
const color = variant.selectedOptions.find(
(opt) => opt.name.toLowerCase() === 'color'
)?.value;
const size = variant.selectedOptions.find(
(opt) => opt.name.toLowerCase() === 'talla'
)?.value;
const price = variant.price.amount;

## 🛠️ Uso

Con estos campos podrás:

✅ Mostrar cards de producto.
✅ Mostrar detalles y variaciones correctamente.
✅ Construir selectores de color, talla y cantidades.
✅ Crear la lógica de `addToCart` y `Cart` sin confusiones.
✅ Construir filtros de tallas, colores y precios en tu tienda.

**Lista completa para consulta rápida mientras desarrollas tus proyectos Shopify + Next.js.**

✅ Avísame si quieres que te genere también **un hook `useProductDetails(product)` con todos estos valores listos** para mantener tu código limpio y ordenado.
