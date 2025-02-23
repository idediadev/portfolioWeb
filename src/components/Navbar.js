import React from 'react';
import '../styles/styles.css';

const Navbar = () => {
  return (
    <nav className="w-full max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between navbar-gradient">
      <div className="flex items-center">
        <svg
          className="w-10 h-10 text-emerald-300"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" />
          <path
            d="M12 20L28 20M28 20L22 14M28 20L22 26"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex gap-6">
          <a href="#masteryhub" className="text-emerald-300 hover:text-emerald-400">00 MasteryHub</a>
          <a href="#madebyme" className="text-emerald-300 hover:text-emerald-400">01 MadebyMe</a>
          <a href="#servicehub" className="text-emerald-300 hover:text-emerald-400">02 ServiceHub</a>
        </div>

        <button className="bg-fuchsia-500 text-amber-500 px-6 py-2 rounded-lg hover:bg-fuchsia-600 transition-colors pulse-animation">
          HIRE ME
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
