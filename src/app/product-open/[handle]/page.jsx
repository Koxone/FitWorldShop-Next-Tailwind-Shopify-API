'use client';

import { useParams, usePathname } from 'next/navigation';
import Image from 'next/image';
import useProducts from '@/hooks/useProducts';
import ExpandableText from '@/components/text/ExpandableText';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  ShareIcon,
  StarIcon,
} from '@/components/icons/Icons';
import { useShopifyProductContext } from '@/context/ShopifyProductsContext';
import AddToCartButton from '@/components/buttons/products/AddToCartButton';
import { useEffect, useMemo, useState } from 'react';
import SectionHeader from '@/components/headers/SectionHeader';
import ViewAllButton from '@/components/buttons/products/ViewAllButton';
import PromoSectionContainer from '@/components/containers/PromoSectionContainer';
import ProductCarousel from '@/components/carousels/ProductCarousel';

export default function OpenProductView() {
  const [currentTab, setCurrentTab] = useState('Description');
  const [randomTag, setRandomTag] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const tags = useMemo(() => ['accesories', 'sale', 'new'], []);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith('/product-open')) {
      const tag = tags[Math.floor(Math.random() * tags.length)];
      setRandomTag(tag);
    }
  }, [pathname, tags]);

  if (!pathname.startsWith('/product-open')) return null;

  // Shopify Context
  const {
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
  } = useShopifyProductContext();

  // Hooks
  const { handle } = useParams();
  const { products, isLoading, isError } = useProducts();

  // Utility functions
  const toPascalCase = (str) => {
    return str
      ?.split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  };

  // Quantity Handler
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleColorClick = (productId, product, color) => {
    const variant = product.variants.edges.find((variant) =>
      variant.node.selectedOptions.some(
        (opt) => opt.name.toLowerCase() === 'color' && opt.value === color
      )
    );
    if (variant && variant.node.image?.url) {
      setProductImages((prev) => ({
        ...prev,
        [productId]: variant.node.image.url,
      }));
    }
  };

  // Loading and error states
  if (isLoading) return <p className="p-10 text-white">Cargando producto...</p>;
  if (isError)
    return <p className="p-10 text-red-500">Error al cargar producto.</p>;

  // Data processing
  const product = products.find((p) => p.handle === handle);
  const images = product.images.edges;
  const currentImage =
    productImages[product.id] ||
    images[selectedImageIndex]?.node.url ||
    product.featuredImage?.url;

  if (!product)
    return <p className="p-10 text-white">Producto no encontrado.</p>;

  const sizes =
    product.options.find((o) => o.name.toLowerCase() === 'talla')?.values || [];

  return (
    <div className="flex w-full max-w-[1200px] grid-cols-1 flex-wrap gap-12 self-center p-8 md:grid-cols-[1fr_1fr] md:p-10">
      <div className="grid w-full grid-cols-1 items-center justify-between md:flex">
        {/* Product Images */}
        <div className="animate-slide-in-left flex h-full max-h-[750px] max-w-[550px] flex-col items-center justify-between">
          {/* Main Image */}
          <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-lg bg-gray-800">
            <Image
              placeholder="blur"
              blurDataURL="/path/to/lowres.jpg"
              priority
              src={currentImage}
              alt={product.title}
              width={800}
              height={800}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />

            {/* Left arrow */}
            {selectedImageIndex > 0 && (
              <button
                onClick={() => setSelectedImageIndex((prev) => prev - 1)}
                className="absolute top-1/2 left-3 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-black/60 p-2 text-white hover:bg-black"
              >
                <ChevronLeftIcon />
              </button>
            )}

            {/* Right arrow */}
            {selectedImageIndex < images.length - 1 && (
              <button
                onClick={() => setSelectedImageIndex((prev) => prev + 1)}
                className="absolute top-1/2 right-3 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-black/60 p-2 text-white hover:bg-black"
              >
                <ChevronRightIcon />
              </button>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 lg:flex lg:w-full lg:overflow-x-auto">
            {images.slice(0, 5).map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`aspect-square overflow-hidden rounded-lg border ${
                  selectedImageIndex === index
                    ? 'border-blue-500'
                    : 'border-gray-600'
                } cursor-pointer bg-gray-800 transition-all duration-200 hover:border-gray-400 lg:min-w-[190px]`}
              >
                <Image
                  placeholder="blur"
                  blurDataURL="/path/to/lowres.jpg"
                  priority
                  src={img.node.url}
                  alt={`${product.title} thumbnail ${index + 1}`}
                  width={200}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="animate-slide-in-right max-w-[500px] rounded-lg text-white">
          {/* Badge, Title and Description */}
          <div>
            <span className="mb-4 inline-block rounded bg-white px-3 py-1 text-xs font-semibold text-gray-900">
              NEW
            </span>
            <h1 className="font-montserrat mb-5 text-3xl font-bold md:text-4xl lg:text-5xl">
              {product.title}
            </h1>

            <div className="font-inter mb-4 max-h-[200px] text-base text-gray-300 md:text-lg">
              <ExpandableText text={`${product.description}`} />
            </div>
          </div>

          {/* Rating */}
          <div className="mb-4 flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  size={16}
                  filled={i < Math.floor(product.rating)}
                  className="text-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm text-gray-400">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mb-6 flex items-center gap-3">
            <span className="text-2xl font-bold text-white md:text-3xl">
              ${product.variants.edges[0].node.price.amount}{' '}
              {product.variants.edges[0].node.price.currencyCode}
            </span>
            {product.compareAtPriceRange?.maxVariantPrice?.amount && (
              <span className="text-lg text-gray-500 line-through">
                ${product.compareAtPriceRange.maxVariantPrice.amount}{' '}
                {product.compareAtPriceRange.maxVariantPrice.currencyCode}
              </span>
            )}
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="mb-2 text-sm font-semibold md:text-base">
              Color: {currentColor}
            </h3>
            {product.options?.find((o) => o.name.toLowerCase() === 'color') && (
              <div className="mt-2 flex gap-1">
                {product.options
                  .find((o) => o.name.toLowerCase() === 'color')
                  .values.map((color, index) => (
                    <span
                      key={index}
                      onClick={() => {
                        handleColorClick(product.id, product, color);
                        setCurrentColor(toPascalCase(color));
                      }}
                      className="h-10 w-10 cursor-pointer rounded-full border-2 transition duration-200 hover:scale-110"
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
              </div>
            )}
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-semibold md:text-base">Size</h3>
            <div className="grid grid-cols-5 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`cursor-pointer rounded-lg border px-3 py-2 text-sm font-medium transition duration-200 ${
                    selectedSize === size
                      ? 'border-white bg-white text-gray-900'
                      : 'border-gray-600 text-gray-300 hover:border-white hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <button className="mt-2 text-xs text-gray-400 underline hover:text-white">
              Size Guide
            </button>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-semibold md:text-base">
              Quantity
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="cursor-pointer rounded bg-gray-700 p-2 hover:bg-gray-600"
              >
                <MinusIcon size={14} />
              </button>
              <span className="px-3 font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="cursor-pointer rounded bg-gray-700 p-2 hover:bg-gray-600"
              >
                <PlusIcon size={14} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-8 flex gap-3">
            <AddToCartButton
              product={product}
              selectedColor={currentColor}
              selectedSize={selectedSize}
              quantity={quantity}
            />
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`w-fit cursor-pointer rounded-lg border p-3 transition ${
                isWishlisted
                  ? 'border-red-500 bg-red-500 text-white'
                  : 'border-gray-600 text-gray-300 hover:border-white hover:text-white'
              }`}
            >
              <HeartIcon size={18} filled={isWishlisted} />
            </button>
            <button className="w-fit cursor-pointer rounded-lg border border-gray-600 p-3 text-gray-300 transition hover:border-white hover:text-white">
              <ShareIcon size={18} />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-700 pt-6">
            <div className="mb-4 flex gap-4">
              {['Description', 'Features', 'Care'].map((tab) => (
                <button
                  onClick={() => setCurrentTab(tab)}
                  key={tab}
                  className="cursor-pointer text-sm font-medium text-gray-400 capitalize transition hover:text-white"
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-300">
              <ExpandableText
                text={
                  currentTab === 'Description'
                    ? product.description
                    : currentTab === 'Features'
                      ? product.metafield?.value || 'No features available.'
                      : 'Care instructions here.'
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-10">
        {/* Product Info */}
        {randomTag && (
          <SectionHeader
            tagFilter={randomTag}
            className="flex flex-nowrap gap-4"
            title="mas productos"
          />
        )}

        <ViewAllButton />
        <PromoSectionContainer
          title="Categorias"
          subtitle="podria interesarte"
          type="categories"
        />
        <ProductCarousel />
      </div>
    </div>
  );
}
