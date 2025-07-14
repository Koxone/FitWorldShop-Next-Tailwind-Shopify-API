'use client';

import useProducts from '@/hooks/useProducts';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCarousel() {
  const { products, isLoading, isError } = useProducts();

  const duplicatedProducts = [...products, ...products];

  return (
    <div className="relative w-full overflow-hidden pt-1 pb-6">
      <ul className="animate-scroll-x flex w-max gap-4">
        {duplicatedProducts.map((product, i) => (
          <li
            key={`${product.handle}-${i}`}
            className="relative aspect-square h-[30vh] max-h-[250px] w-2/3 max-w-fit flex-none md:w-1/3"
          >
            <Link
              href={`/product-open/${product.handle}`}
              className="relative block h-full w-full"
            >
              <div className="group relative flex h-fit w-full items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-white hover:border-blue-600 dark:border-neutral-800 dark:bg-black">
                <Image
                  src={
                    product.featuredImage?.url ||
                    product.images.edges[0]?.node.url
                  }
                  alt={product.title}
                  fill
                  className="object-cover transition duration-300 ease-in-out group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4">
                  <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
                    <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">
                      {product.title}
                    </h3>
                    <p className="flex-none rounded-full bg-blue-600 p-2 text-white">
                      ${product.variants.edges[0].node.price.amount}{' '}
                      <span className="ml-1 hidden sm:inline">USD</span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
