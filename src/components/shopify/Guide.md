# 📦 Shopify Product Fields Cheatsheet

Guía clara para obtener cada parte de un **producto de Shopify** en tu proyecto React/Next.

## ✅ 1️⃣ ID del producto

```javascript
product.id;
```

## ✅ 2️⃣ Título del producto

```javascript
product.title;
```

## ✅ 3️⃣ Handle (slug de URL)

```javascript
product.handle;
```

## ✅ 4️⃣ Descripción

```javascript
product.description;
```

## ✅ 5️⃣ Imagen destacada

```javascript
product.featuredImage?.url || product.images.edges[0]?.node.url;
```

**ID de imagen destacada:**

```javascript
product.featuredImage?.id;
```

**Alt text de imagen destacada:**

```javascript
product.featuredImage?.altText;
```

## ✅ 6️⃣ Todas las imágenes (array de URLs)

```javascript
product.images.edges.map((edge) => edge.node.url);
```

**Con alt text:**

```javascript
product.images.edges.map((edge) => ({
  url: edge.node.url,
  altText: edge.node.altText,
}));
```

## ✅ 7️⃣ Precio

**Precio:**

```javascript
product.variants.edges[0].node.price.amount;
```

**Moneda:**

```javascript
product.variants.edges[0].node.price.currencyCode;
```

## ✅ 8️⃣ Precio de comparación (oferta)

**Precio:**

```javascript
product.variants.edges[0].node.compareAtPrice?.amount;
```

**Moneda:**

```javascript
product.variants.edges[0].node.compareAtPrice?.currencyCode;
```

## ✅ 9️⃣ Variantes (array)

```javascript
product.variants.edges.map((edge) => edge.node);
```

Cada `variant.node` incluye:

- `id`
- `title`
- `price.amount`
- `price.currencyCode`
- `compareAtPrice.amount`
- `compareAtPrice.currencyCode`
- `selectedOptions` (Color, Talla, Sexo objetivo)
- `image.url`

## ✅ 🔟 Colores disponibles

```javascript
product.options.find((o) => o.name.toLowerCase() === 'color')?.values || [];
```

## ✅ 1️⃣1️⃣ Tallas disponibles

```javascript
product.options.find((o) => o.name.toLowerCase() === 'talla')?.values || [];
```

## ✅ 1️⃣2️⃣ Sexo objetivo

```javascript
product.options.find((o) => o.name.toLowerCase() === 'sexo objetivo')?.values ||
  [];
```

## ✅ 1️⃣3️⃣ Vendor (marca)

```javascript
product.vendor;
```

## ✅ 1️⃣4️⃣ Categoría

**Nombre:**

```javascript
product.category?.name;
```

**ID:**

```javascript
product.category?.id;
```

## ✅ 1️⃣5️⃣ Rango de precios

**Precio mínimo:**

```javascript
product.priceRange.minVariantPrice.amount;
```

**Precio máximo:**

```javascript
product.priceRange.maxVariantPrice.amount;
```

**Moneda:**

```javascript
product.priceRange.minVariantPrice.currencyCode;
```

## ✅ 1️⃣6️⃣ Rango de precios de comparación

**Precio mínimo:**

```javascript
product.compareAtPriceRange.minVariantPrice.amount;
```

**Precio máximo:**

```javascript
product.compareAtPriceRange.maxVariantPrice.amount;
```

**Moneda:**

```javascript
product.compareAtPriceRange.minVariantPrice.currencyCode;
```

## ✅ 1️⃣7️⃣ Tags

```javascript
product.tags || [];
```

## ✅ 1️⃣8️⃣ Metafields (campos personalizados)

```javascript
product.metafield?.value;
```

## ✅ 1️⃣9️⃣ Opciones del producto (con IDs)

**Todas las opciones:**

```javascript
product.options;
```

**Opción específica por nombre:**

```javascript
product.options.find((option) => option.name === 'Color');
```

**ID de opción:**

```javascript
product.options[0].id;
```

**Valores de opción:**

```javascript
product.options[0].values;
```

## ✅ 2️⃣0️⃣ Color, talla y precio de una variante específica

```javascript
const variant = product.variants.edges[0].node;
const color = variant.selectedOptions.find(
  (opt) => opt.name.toLowerCase() === 'color'
)?.value;
const size = variant.selectedOptions.find(
  (opt) => opt.name.toLowerCase() === 'talla'
)?.value;
const targetGender = variant.selectedOptions.find(
  (opt) => opt.name.toLowerCase() === 'sexo objetivo'
)?.value;
const price = variant.price.amount;
```

## ✅ 2️⃣1️⃣ ID de variante

```javascript
product.variants.edges[0].node.id;
```

## ✅ 2️⃣2️⃣ Título de variante

```javascript
product.variants.edges[0].node.title;
```

## ✅ 2️⃣3️⃣ Imagen específica de variante

```javascript
product.variants.edges[0].node.image?.url;
```

**Con alt text:**

```javascript
product.variants.edges[0].node.image?.altText;
```

## ✅ 2️⃣4️⃣ Verificar si tiene descuento

```javascript
const hasDiscount = product.variants.edges.some(
  (variant) => variant.node.compareAtPrice?.amount > variant.node.price.amount
);
```

## ✅ 2️⃣5️⃣ Calcular porcentaje de descuento

```javascript
const calculateDiscount = (variant) => {
  const price = parseFloat(variant.price.amount);
  const comparePrice = parseFloat(variant.compareAtPrice?.amount || 0);

  if (comparePrice > price) {
    return Math.round(((comparePrice - price) / comparePrice) * 100);
  }
  return 0;
};
```

## ✅ 2️⃣6️⃣ Obtener variante por opciones específicas

```javascript
const getVariantByOptions = (product, color, size, gender) => {
  return product.variants.edges.find(({ node }) => {
    const selectedColor = node.selectedOptions.find(
      (opt) => opt.name === 'Color'
    )?.value;
    const selectedSize = node.selectedOptions.find(
      (opt) => opt.name === 'Talla'
    )?.value;
    const selectedGender = node.selectedOptions.find(
      (opt) => opt.name === 'Sexo objetivo'
    )?.value;

    return (
      selectedColor === color &&
      selectedSize === size &&
      selectedGender === gender
    );
  })?.node;
};
```

## ✅ 2️⃣7️⃣ Verificar disponibilidad de combinación

```javascript
const isVariantAvailable = (product, color, size, gender) => {
  return getVariantByOptions(product, color, size, gender) !== undefined;
};
```

## ✅ 2️⃣8️⃣ Obtener todas las opciones únicas

```javascript
// Todos los colores únicos
const allColors = [
  ...new Set(
    product.variants.edges
      .map(
        ({ node }) =>
          node.selectedOptions.find((opt) => opt.name === 'Color')?.value
      )
      .filter(Boolean)
  ),
];

// Todas las tallas únicas
const allSizes = [
  ...new Set(
    product.variants.edges
      .map(
        ({ node }) =>
          node.selectedOptions.find((opt) => opt.name === 'Talla')?.value
      )
      .filter(Boolean)
  ),
];
```
