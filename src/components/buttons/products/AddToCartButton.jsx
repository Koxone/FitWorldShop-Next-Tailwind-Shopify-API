'use client';

import { usePurchase } from '@/context/PurchaseContext';

function AddToCartButton({ product, selectedSize, selectedColor, quantity }) {
  const { addToCart } = usePurchase();

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Selecciona talla y color antes de agregar al carrito.');
      return;
    }

    addToCart({
      id: product.id,
      title: product.title,
      handle: product.handle,
      description: product.description,
      selectedSize,
      selectedColor,
      quantity,
      price: product.variants.edges[0].node.price.amount,
      image: product.featuredImage?.url || product.images.edges[0]?.node.url,
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
