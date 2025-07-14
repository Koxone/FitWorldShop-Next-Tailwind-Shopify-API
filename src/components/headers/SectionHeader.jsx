'use client';

import { usePathname } from 'next/navigation';
import ShopifyFilter from '../shopify/ShopifyFilter';

function SectionHeader({ title, subtitle, className }) {
  const pathname = usePathname();
  return (
    <div
      className={`${
        pathname === '/'
          ? 'px-4 md:px-0'
          : pathname.startsWith('/product-open')
            ? 'px-0 md:px-0'
            : 'px-0 md:px-10'
      } flex flex-col items-start`}
    >
      <div className="animate-fade-in text-left">
        <h2 className="text-lg font-bold tracking-wider text-neutral-400">
          {subtitle}
        </h2>
        <h2 className="mb-4 text-2xl font-bold tracking-wider text-white uppercase">
          {title}
        </h2>
      </div>

      {/* Filters */}
      <div className="animate-slide-in-left w-full">
        <ShopifyFilter className={className} />
      </div>
    </div>
  );
}

export default SectionHeader;
