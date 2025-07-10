import ShopifyProductsList from '@/components/shopify/ShopifyProductsList';

export default function Home() {
  return (
    <main>
      <h1 className="my-4 text-center text-2xl font-bold">Productos</h1>
      <ShopifyProductsList />
    </main>
  );
}
