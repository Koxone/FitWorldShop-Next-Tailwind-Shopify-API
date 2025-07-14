import useProducts from '@/hooks/useProducts';

export default function useFilteredProductsByCategory(categoryLabel) {
  const { products, isLoading, isError } = useProducts();

  const labelToTagMap = {
    Accesorios: 'accesories',
    Bodysuit: 'bodysuits',
    Bras: 'bras',
    Mochilas: 'bags',
    Gorras: 'hats',
    Calcetines: 'socks',
    Crops: 'crops',
    Hombre: 'men',
    Hoodies: 'hoodies',
    Jogger: 'jogger',
    Leggings: 'leggings',
    Mujer: 'women',
    Novedades: 'new',
    Ofertas: 'sale',
    Playeras: 'shirts',
    Shorts: 'short',
    Sudaderas: 'jackets',
    Tanks: 'tanks',
    Todos: null,
    Tops: 'tops',
    Underware: 'underware',
  };

  const tag = labelToTagMap[categoryLabel];

  const filteredProducts =
    tag === null
      ? products
      : products?.filter((product) => product.tags.includes(tag));

  return {
    products: filteredProducts,
    isLoading,
    isError,
  };
}
