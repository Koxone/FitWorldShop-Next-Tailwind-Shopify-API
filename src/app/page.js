'use client';

import MainBanner from '@/components/banners/MainBanner';
import ViewAllButton from '@/components/buttons/products/ViewAllButton';
import ImagesCarousel from '@/components/carousels/ImagesCarousel';
import PromoSectionContainer from '@/components/containers/PromoSectionContainer';
import SectionHeader from '@/components/headers/SectionHeader';
import NewsLetter from '@/components/newsletter/Newsletter';

export default function Home() {
  const heroItems = MainBanner();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10">
      {/* Hero Carousel Component */}
      <ImagesCarousel
        items={heroItems}
        autoPlay={true}
        autoPlayInterval={5000}
        showDots={true}
        showArrows={true}
      />

      <div className="flex w-full max-w-7xl flex-col gap-6 justify-self-center md:px-10">
        {/* Products */}
        <div>
          <SectionHeader className="flex flex-nowrap gap-4" subtitle="SHOP" title="drop #1" />
        </div>
        <ViewAllButton />

        {/* Categories Sections */}
        <PromoSectionContainer
          title="Categorias"
          subtitle="podria interesarte"
          type="categories"
        />

        {/* Promotional Sections */}
        <PromoSectionContainer
          title="Buscas algo mas?"
          subtitle="podria interesarte"
          type="promos"
        />

        {/* Newsletter */}
        <NewsLetter />
      </div>
    </main>
  );
}
