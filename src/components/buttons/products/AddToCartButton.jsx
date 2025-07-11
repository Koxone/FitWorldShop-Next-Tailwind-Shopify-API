'use client';

import { usePurchase } from '@/context/PurchaseContext';

function AddToCartButton({ product, selectedSize, selectedColor, quantity }) {
  const { addToCart } = usePurchase();

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Selecciona talla y color antes de agregar al carrito.');
      return;
    }

    const variant = product.variants.edges.find((variant) =>
      variant.node.selectedOptions.every((option) => {
        const optionName = option.name.toLowerCase().trim();
        const optionValue = option.value.toLowerCase().trim();

        if (optionName === 'color') {
          return optionValue === selectedColor.toLowerCase().trim();
        }
        if (optionName === 'talla') {
          return optionValue === selectedSize.toLowerCase().trim();
        }
        return true; 
      })
    );

    if (!variant) {
      alert(
        'No se encontró el variant correspondiente con la talla y color seleccionados.'
      );
      return;
    }

    const variantId = variant.node.id;

    addToCart({
      id: product.id,
      handle: product.handle,
      title: product.title,
      description: product.description,
      selectedSize,
      selectedColor,
      quantity,
      price: variant.node.price.amount,
      image:
        variant.node.image?.url ||
        product.featuredImage?.url ||
        product.images.edges[0]?.node.url,
      variantId,
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex-1 cursor-pointer rounded-lg bg-white px-4 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-300 md:text-base"
    >
      Agregar al Carrito
    </button>
  );
}

export default AddToCartButton;
