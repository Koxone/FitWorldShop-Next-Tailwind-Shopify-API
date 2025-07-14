import { useFilterContext } from '@/context/FilterContext';

function MainFilterButton() {
  const {
    mainCategorieFilter,
    setMainCategorieFilter,
    categories,
    sidebarCategorieFilter,
    setSidebarCategorieFilter,
  } = useFilterContext();

  return (
    <button
      className={`font-poppins cursor-pointer rounded-md px-2 py-2 font-medium transition-all duration-200 md:px-6 ${
        mainCategorieFilter === null
          ? 'bg-white text-gray-900'
          : 'border text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      TODOS
    </button>
  );
}

export default MainFilterButton;
