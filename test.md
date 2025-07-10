# 🛠️ Shopify ➔ ProductCard Mapping (Actualizado)

| 🏢 **Dato en Shopify**                           | 🎨 **Uso en tu `ProductCard`**                      |
| ------------------------------------------------ | --------------------------------------------------- |
| `featuredImage.url`                              | 🖼️ Imagen principal del producto (negro ahora)      |
| `images.edges[].node.url`                        | 🖼️ Galería de imágenes (opcional swipe)             |
| `options[name="Color"].values`                   | 🎨 Lista de colores disponibles (selector de color) |
| `variants[].selectedOptions[name="Color"].value` | 🎨 Color actual seleccionado en variante            |
| `variants[].selectedOptions[name="Talla"].value` | 📏 Talla seleccionada (para selector de tallas)     |
| `variants[].image.url`                           | 🖼️ Imagen de la variante por color                  |
| `title`                                          | 🏷️ Nombre del producto                              |
| `description`                                    | 📝 Descripción corta/resumen                        |
| `descriptionHtml`                                | 📝 Descripción rica en HTML (detalles page)         |
| `priceRange.minVariantPrice.amount`              | 💰 Precio mínimo entre variantes                    |
| `priceRange.maxVariantPrice.amount`              | 💰 Precio máximo entre variantes                    |
| `compareAtPriceRange.minVariantPrice.amount`     | 💸 Precio tachado mínimo (precio original)          |
| `compareAtPriceRange.maxVariantPrice.amount`     | 💸 Precio tachado máximo                            |
| `vendor`                                         | 🏭 Marca (opcional)                                 |
| `productType`                                    | 🐂️ Tipo de producto (opcional)                     |
| `tags`                                           | 🏷️ Etiquetas (opcional para filtros o badges)       |
| `createdAt`                                      | 🆕 Badge “New” (si es reciente)                     |
| `availableForSale`                               | ✅ Disponibilidad para “Agotado” o CTA              |
| `onlineStoreUrl`                                 | 🔗 Link al producto en Shopify (si lo publicas)     |
| `category.name`                                  | 🐂️ Categoría (opcional para breadcrumb/filtros)    |

---

## 🚩 Lo que **no** te da Shopify (aún necesitas implementar):

❌ **Ratings (estrellas)** → Judge.me, Firestore, Yotpo o manual con Firestore.
❌ **Reviews** → Igual que arriba, Shopify no los genera por default.
❌ **Badges dinámicos** (descuento %, best seller) → Calculado en frontend.
❌ **Filtros avanzados tipo Fit, Material** → Usar `metafields` si requieres estos filtros adicionales.

---

## 💪 **Notas:**

- Ahora tienes `options` también para `Talla` y `Sexo objetivo`, permitiendo selector de tallas y color en tu UI.
- Puedes mostrar badges de descuento con `compareAtPriceRange` vs `priceRange`.
- Usa `descriptionHtml` para la vista de detalle enriquecida.

Si deseas, puedo generar el JSON de ejemplo limpio para conectar directamente a tu `ProductCard` en Next.js.
