'use client';

import SectionHeader from '@/components/headers/SectionHeader';
import SideBarMenu from '@/components/nav/SideBarMenu';

export default function ProductsView() {
  return (
    <div className="grid min-h-screen grid-cols-[auto_1fr] overflow-x-hidden bg-gray-900 py-8 text-white sm:px-6 lg:px-8">
      {/* Sidebar */}
      <div className="hidden md:block">
        {/* Aquí puedes colocar el componente FiltersSidebar */}
        <div className="rounded-lg bg-gray-800 p-4">
          <SideBarMenu />
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-7xl">
        {/* Heading */}
        <div className='md:px-10 px-3'>
          <h1 className="font-montserrat mb-2 text-2xl font-bold uppercase md:text-3xl">
            todos los productos
          </h1>
          <p className="font-inter mb-6 text-gray-400">
            Descubre nuestra coleccion completa de Ropa y Accesorios.
          </p>
        </div>

        {/* Products Grid */}
        <div className="">
          <SectionHeader className="flex md:w-full md:flex-wrap md:pr-0" />
        </div>
      </div>
    </div>
  );
}
