'use client';

import MainBanner from '@/components/banners/MainBanner';
import ImagesCarousel from '@/components/carousels/ImagesCarousel';
import ShopifyProductsList from '@/components/shopify/ShopifyProductCard';

export default function Home() {
  const heroItems = MainBanner();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10">
      <div>
        <ImagesCarousel
          items={heroItems}
          autoPlay={true}
          autoPlayInterval={5000}
          showDots={true}
          showArrows={true}
        />
      </div>

      <div className="mb-10 w-full overflow-x-auto px-4 md:max-w-2xl md:px-0 xl:max-w-7xl">
        <ShopifyProductsList className="flex flex-nowrap gap-4" />
      </div>
    </main>
  );
}
