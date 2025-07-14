'use client';

import { useFilterContext } from '@/context/FilterContext';
import { useState } from 'react';

function SideBarMenu() {
  const {
    mainCategorieFilter,
    setMainCategorieFilter,
    categories,
    sidebarCategorieFilter,
    setSidebarCategorieFilter,
  } = useFilterContext();

  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => setShowMore((prev) => !prev);

  const sortOptions = [
    { label: 'Destacados', value: 'featured' },
    { label: 'Novedades', value: 'newest' },
    { label: 'Precio: Menor a mayor', value: 'price-low' },
    { label: 'Precio: Mayor a menor', value: 'price-high' },
    { label: 'Mejor calificados', value: 'rating' },
  ];

  return (
    <aside className="sticky top-24 hidden h-[calc(100vh-6rem)] w-full max-w-[200px] flex-col overflow-y-auto pr-4 md:flex">
      {/* Tabs */}
      <div className="mb-4">
        <h3 className="mb-2 text-sm font-semibold text-neutral-300">
          Categoría
        </h3>
        <div className="flex flex-col gap-2">
          {/* Show the first 5 tabs */}
          {categories.slice(0, 5).map(({ label, value }) => (
            <button
              key={label}
              onClick={() => setSidebarCategorieFilter(value)}
              className={`cursor-pointer rounded px-3 py-1 text-left text-sm capitalize transition ${
                sidebarCategorieFilter === value
                  ? 'bg-neutral-700 text-white'
                  : 'text-neutral-400 hover:bg-neutral-800'
              }`}
            >
              {label}
            </button>
          ))}

          {/* Show more button */}
          {showMore &&
            categories.slice(5).map(({ label, value }) => (
              <button
                key={label}
                onClick={() => setSidebarCategorieFilter(value)}
                className={`cursor-pointer rounded px-3 py-1 text-left text-sm capitalize transition ${
                  sidebarCategorieFilter === value
                    ? 'bg-neutral-700 text-white'
                    : 'text-neutral-400 hover:bg-neutral-800'
                }`}
              >
                {label}
              </button>
            ))}

          <button
            onClick={toggleShowMore}
            className="mt-2 cursor-pointer text-sm text-white underline hover:text-neutral-300"
          >
            {showMore ? 'Ver menos' : 'Ver más'}
          </button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="mb-4">
        <h3 className="mb-2 text-sm font-semibold text-neutral-300">
          Filtros rápidos
        </h3>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm text-neutral-400">
            <input
              type="checkbox"
              //   checked={showSaleOnly}
              //   onChange={() => setShowSaleOnly(!showSaleOnly)}
              className="accent-neutral-600"
            />
            En oferta
          </label>
          <label className="flex items-center gap-2 text-sm text-neutral-400">
            <input
              type="checkbox"
              //   checked={showNewOnly}
              //   onChange={() => setShowNewOnly(!showNewOnly)}
              className="accent-neutral-600"
            />
            Novedades
          </label>
        </div>
      </div>

      {/* Price */}
      <div className="mb-4">
        <h3 className="mb-2 text-sm font-semibold text-neutral-300">Precio</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            // value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-1/2 rounded border border-neutral-600 bg-neutral-800 p-1 text-xs text-neutral-300"
          />
          <input
            type="number"
            placeholder="Max"
            // value={maxPrice === Infinity ? '' : maxPrice}
            onChange={(e) =>
              setMaxPrice(
                e.target.value === '' ? Infinity : Number(e.target.value)
              )
            }
            className="w-1/2 rounded border border-neutral-600 bg-neutral-800 p-1 text-xs text-neutral-300"
          />
        </div>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <h3 className="mb-2 text-sm font-semibold text-neutral-300">
          Calificación mínima
        </h3>
        <input
          type="range"
          min={0}
          max={5}
          step={0.5}
          //   value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          className="w-full accent-neutral-600"
        />
        {/* <div className="mt-1 text-xs text-neutral-400">★ {minRating} o más</div> */}
      </div>

      {/* Sort */}
      <div className="mb-4">
        <h3 className="mb-2 text-sm font-semibold text-neutral-300">
          Ordenar por
        </h3>
        <div className="flex flex-col gap-1">
          {/* {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value)}
              className={`rounded px-3 py-1 text-left text-sm transition ${
                sortBy === option.value
                  ? 'bg-neutral-700 text-white'
                  : 'text-neutral-400 hover:bg-neutral-800'
              }`}
            >
              {option.label}
            </button>
          ))} */}
        </div>
      </div>

      {/* Colors */}
      <div className="mb-4">
        <h3 className="mb-2 text-sm font-semibold text-neutral-300">Colores</h3>
        <div className="flex flex-wrap gap-2">
          {/* {colors.map((color, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedColor(color)}
              className={`h-6 w-6 rounded border transition ${
                selectedColor === color
                  ? 'border-white ring-2 ring-white'
                  : 'border-neutral-600'
              }`}
              style={{ backgroundColor: color }}
            ></button>
          ))} */}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="mb-2 text-sm font-semibold text-neutral-300">Tallas</h3>
        <div className="flex flex-wrap gap-2">
          {/* {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`rounded border px-2 py-1 text-xs uppercase transition ${
                selectedSize === size
                  ? 'border-neutral-500 bg-neutral-700 text-white'
                  : 'border-neutral-600 text-neutral-400 hover:bg-neutral-800'
              }`}
            >
              {size}
            </button>
          ))} */}
        </div>
      </div>
    </aside>
  );
}
export default SideBarMenu;
