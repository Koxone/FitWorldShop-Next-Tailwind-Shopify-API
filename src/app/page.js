'use client';

import MainBanner from '@/components/banners/MainBanner';
import ImagesCarousel from '@/components/carousels/ImagesCarousel';
import ShopifyProductsList from '@/components/shopify/ShopifyProductCard';

export default function Home() {
  const heroItems = MainBanner();
  return (
    <main className="min-h-screen">
      <div>
        <ImagesCarousel
          items={heroItems}
          autoPlay={true}
          autoPlayInterval={5000}
          showDots={true}
          showArrows={true}
        />
      </div>

      <div className="flex w-full max-w-7xl flex-col gap-6 justify-self-center md:px-10">
        <ShopifyProductsList />
      </div>
    </main>
  );
}
