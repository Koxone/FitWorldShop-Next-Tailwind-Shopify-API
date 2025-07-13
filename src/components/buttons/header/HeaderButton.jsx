import React from 'react';

function HeaderButton({ onClick, text }) {
  if (text === 'Todo') {
    return (
      <div className="group relative inline-block">
        <button
          onClick={onClick}
          className="font-poppins hover-lift cursor-pointer font-semibold tracking-wide text-gray-300 uppercase transition-all duration-300 hover:scale-125 hover:text-white"
        >
          {text}
        </button>

        <div className="invisible absolute left-0 z-50 mt-2 w-40 translate-y-2 rounded-md border border-gray-900 bg-white/10 opacity-0 shadow-lg backdrop-blur transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
          <ul
            className="divide-y divide-white/10 text-sm text-white"
            onMouseEnter={(e) => e.stopPropagation()}
          >
            <li>
              <button
                onClick={() => onClick('calcetines')}
                className="w-full cursor-pointer rounded-t-md px-4 py-2 text-left transition hover:bg-white/20"
              >
                Calcetines
              </button>
            </li>
            <li>
              <button
                onClick={() => onClick('bras')}
                className="w-full cursor-pointer px-4 py-2 text-left transition hover:bg-white/20"
              >
                Bras
              </button>
            </li>
            <li>
              <button
                onClick={() => onClick('jackets')}
                className="w-full cursor-pointer px-4 py-2 text-left transition hover:bg-white/20"
              >
                Jackets
              </button>
            </li>
            <li>
              <button
                onClick={() => onClick('leggings')}
                className="w-full cursor-pointer rounded-b-md px-4 py-2 text-left transition hover:bg-white/20"
              >
                Leggings
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  // Default button
  return (
    <button
      onClick={onClick}
      className="font-poppins hover-lift cursor-pointer font-semibold tracking-wide text-gray-300 uppercase transition-all duration-300 hover:scale-125 hover:text-white"
    >
      {text}
    </button>
  );
}

export default HeaderButton;
