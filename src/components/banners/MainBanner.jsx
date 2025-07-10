'use client';

import React from 'react';

export default function MainBanner() {
  const heroData = [
    {
      image: '/Banner/Main-Banner-1.jpg',
      title: '10% DE DESCUENTO',
      description:
        '¡Nuestra nueva línea de ropa ha llegado! ¡Descuentos en toda la tienda!',
      button: 'MUJERES',
    },
    {
      image: '/Banner/Main-Banner-2.png',
      title: 'PRESENTAMOS PUMP',
      description:
        'Desarrollado para moldearse a tu cuerpo y mostrar tu mejor figura.',
      button: 'HOMBRES',
    },
    {
      image: '/Banner/Main-Banner-3.png',
      title: 'ESENCIALES DE VERANO',
      description: 'Esenciales básicos hechos para ti...',
      button: 'COMPRA AHORA',
    },
    {
      image: '/Banner/Main-Banner-4.jpg',
      title: 'TODO PARA TUS ENTRENAMIENTOS',
      description: 'Encuentra todo lo que necesitas para rendir al máximo.',
      button: 'COMPRA AHORA',
    },
  ];

  return heroData.map((item, index) => (
    <div
      key={index}
      className="relative flex h-[60vh] items-center justify-center bg-cover bg-center text-center md:h-[70vh]"
      style={{ backgroundImage: `url(${item.image})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 mx-auto max-w-4xl px-4">
        <h1 className="font-montserrat mb-4 text-4xl font-bold tracking-wider text-white md:text-6xl lg:text-8xl">
          {item.title}
        </h1>
        <p className="font-inter mb-6 text-lg text-white md:text-xl lg:text-2xl">
          {item.description}
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button className="hover-lift focus-ring font-poppins cursor-pointer rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 transition-all duration-200 hover:bg-gray-100 md:px-8 md:py-4">
            {item.button}
          </button>
        </div>
      </div>
    </div>
  ));
}
