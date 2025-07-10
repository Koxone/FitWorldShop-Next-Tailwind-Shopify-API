'use client';

import MainBanner from '@/components/banners/MainBanner';
import ImagesCarousel from '@/components/carousels/ImagesCarousel';
import ShopifyProductsList from '@/components/shopify/ShopifyProductsList';

export default function Home() {
  const heroItems = MainBanner();
  return (
    <main>
      <ImagesCarousel
        items={heroItems}
        autoPlay={true}
        autoPlayInterval={5000}
        showDots={true}
        showArrows={true}
        className="rounded-lg"
      />
      <h1 className="my-4 text-center text-2xl font-bold">Productos</h1>
      <ShopifyProductsList />
    </main>
  );
}
