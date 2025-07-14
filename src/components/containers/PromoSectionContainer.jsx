'use client';

import { useFilterContext } from '@/context/FilterContext';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

function PromoSectionContainer({ title, subtitle, type }) {
  const shopData = {
    categories: [
      {
        title: 'Playeras',
        route: 'shirts',
        href: '/collections/mens-shirts',
        img: '/More/shirts.png',
      },
      {
        title: 'Shorts',
        route: 'shorts',
        href: '/collections/mens-shorts',
        img: '/More/shorts.png',
      },
      {
        title: 'Pants',
        route: 'jogger',
        href: '/collections/mens-joggers',
        img: '/More/pants.png',
      },
    ],
    promos: [
      {
        title: 'PARA ELLA',
        subtitle: 'Ropa que no solo es comoda, se ve bien!',
        image:
          'https://alphaleteathletics.com/cdn/shop/files/forher5x12_9c986f9b-3ebd-4427-9b66-6dbb35ccf525.jpg?v=1751560816&width=960',
        buttonText: 'COMPRA YA',
      },
      {
        title: 'PARA EL',
        subtitle: 'Sientete seguro en cualquier momento',
        image:
          'https://alphaleteathletics.com/cdn/shop/files/forhim4x5_e6a226e9-6f4d-40e6-a91e-b224801b7d86.jpg?crop=center&v=1751560816&width=960',
        buttonText: 'COMPRA YA',
      },
      {
        title: 'ACCESORIOS',
        subtitle: 'No importa la ocasion, lo tenemos!',
        image: '/promo5.jpg',
        buttonText: 'COMPRA YA',
      },
    ],
    businesses: [
      {
        title: 'Etereah',
        subtitle: 'Los mejores Perfumes Arabes',
        image: '/etereah.webp',
        buttonText: 'COMPRA YA',
        url: 'https://www.etereah.com/',
      },
      {
        title: 'koxland',
        subtitle: 'Desarrollo Web a tu medida',
        image: 'koxland.png',
        buttonText: 'conocenos',
        url: 'https://koxland.dev/',
      },
      {
        title: 'fit world shop',
        subtitle: 'Suplementos Deportivos',
        image: '/fws.png',
        buttonText: 'COMPRA YA',
        url: 'https://www.fitworldshop.com.mx/',
      },
    ],
  };

  const pathname = usePathname();
  const { setSidebarCategorieFilter } = useFilterContext();
  const router = useRouter();
  return (
    <section
      className={`flex w-full flex-col items-start justify-center ${
        pathname === '/'
          ? 'px-4 md:px-0'
          : pathname.startsWith('/product-open')
            ? 'px- md:px-0'
            : 'px-0 md:px-10'
      }`}
    >
      <div className="animate-fade-in mb-4 pl-5 text-left md:pl-0">
        <h2 className="text-lg font-bold tracking-wider text-neutral-400 uppercase">
          {subtitle}
        </h2>
        <h2 className="text-2xl font-bold tracking-wider text-white uppercase">
          {title}
        </h2>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex w-full snap-x snap-mandatory justify-between gap-4 overflow-x-auto pb-4 md:px-0">
        {shopData[type]?.map((section, idx) => {
          let imgClass = 'object-cover';

          if (
            type === 'businesses' &&
            section.title.toLowerCase() === 'koxland'
          ) {
            imgClass = 'object-contain p-6';
          } else if (idx === 0) {
            imgClass += ' translate-y-0';
          } else if (idx === 1) {
            imgClass += ' -translate-y-2';
          } else if (type === 'businesses' && idx === 2) {
            imgClass += 'md:ml-0 -ml-5 md:-ml-0 -translate-y-10 md:-translate-y-0';
          }

          return (
            <div
              key={idx}
              className="group relative aspect-square w-[400px] min-w-[80%] cursor-pointer snap-center overflow-hidden rounded-lg border border-neutral-600/40 sm:min-w-[60%] md:min-w-[40%] lg:min-w-[30%]"
            >
              <div
                onClick={() => {
                  if (type !== 'businesses') {
                    setSidebarCategorieFilter(section.route);
                    router.push('/all-products');
                  } else if (section.url) {
                    window.open(section.url, '_blank');
                  }
                }}
                className="absolute inset-0"
              >
                <img
                  src={section.image || section.img}
                  alt={section.title}
                  className={`absolute inset-0 h-full w-full transition-transform duration-1000 ease-out group-hover:scale-125 ${imgClass}`}
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>

              <div className="absolute bottom-0 left-0 flex flex-col p-6">
                <h3 className="text-lg font-bold text-white uppercase md:text-2xl">
                  {section.title}
                </h3>
                <h3 className="mb-4 text-white">{section.subtitle}</h3>
                <div
                  onClick={() => {
                    if (type !== 'businesses') {
                      setSidebarCategorieFilter(section.route);
                      router.push('/all-products');
                    } else if (section.url) {
                      window.open(section.url, '_blank');
                    }
                  }}
                  className="cursor-pointer rounded-full bg-white px-10 py-2 text-center font-semibold text-black uppercase transition-all duration-300 ease-in-out hover:bg-neutral-300"
                >
                  {section.buttonText || 'Shop Now'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PromoSectionContainer;
