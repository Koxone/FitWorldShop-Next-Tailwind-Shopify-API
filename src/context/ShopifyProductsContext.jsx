'use client';

import { createContext, useContext, useState } from 'react';

const GeneralContext = createContext();

export function ShopifyProductsProvider({ children }) {
  // Header Handlers
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [productImages, setProductImages] = useState({});
  const [currentColor, setCurrentColor] = useState();
  return (
    <GeneralContext.Provider
      value={{
        quantity,
        setQuantity,
        selectedSize,
        setSelectedSize,
        isWishlisted,
        setIsWishlisted,
        productImages,
        setProductImages,
        currentColor,
        setCurrentColor,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
}

export const useShopifyProductContext = () => useContext(GeneralContext);
