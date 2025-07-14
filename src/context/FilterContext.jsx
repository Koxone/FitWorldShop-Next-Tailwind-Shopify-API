'use client';

import { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export function FilterContextProvider({ children }) {
  const [mainCategorieFilter, setMainCategorieFilter] = useState(null);
  const [sidebarCategorieFilter, setSidebarCategorieFilter] = useState();

  const categories = [
    { label: 'Todos', value: null },
    { label: 'Mujer', value: 'women' },
    { label: 'Hombre', value: 'men' },
    { label: 'Accesorios', value: 'accesories' },
    { label: 'Bodysuit', value: 'bodysuit' },
    { label: 'Bras', value: 'bras' },
    { label: 'Mochilas', value: 'bags' },
    { label: 'Gorras', value: 'hats' },
    { label: 'Calcetines', value: 'socks' },
    { label: 'Crops', value: 'crops' },
    { label: 'Hoodies', value: 'hoodies' },
    { label: 'Jogger', value: 'jogger' },
    { label: 'Leggings', value: 'legging' },
    { label: 'Novedades', value: 'new' },
    { label: 'Ofertas', value: 'sale' },
    { label: 'Playeras', value: 'shirts' },
    { label: 'Shorts', value: 'shorts' },
    { label: 'Sudaderas', value: 'jacket' },
    { label: 'Tanks', value: 'tanks' },
    { label: 'Tops', value: 'tops' },
    { label: 'Underware', value: 'underware' },
  ];

  return (
    <FilterContext.Provider
      value={{
        mainCategorieFilter,
        setMainCategorieFilter,
        categories,
        sidebarCategorieFilter,
        setSidebarCategorieFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export const useFilterContext = () => useContext(FilterContext);
