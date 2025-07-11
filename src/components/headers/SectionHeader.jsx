'use client';

import React, { useState } from 'react';
import useShopifyValue from '@/hooks/useShopifyValue';
import ShopifyFilter from '../shopify/ShopifyFilter';

function SectionHeader({ title, subtitle }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const products = useShopifyValue('products');
  return (
    <div className="flex flex-col items-start">
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
        <ShopifyFilter />
      </div>
    </div>
  );
}

export default SectionHeader;
