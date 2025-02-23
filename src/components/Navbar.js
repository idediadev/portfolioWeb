import React from 'react';
import '../styles/styles.css';
import logo from '../assets/images/logoDavideTaddia.jpeg';

const Navbar = () => {
  return (
    <nav className="w-full max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between navbar-gradient">
    <div className="flex items-center">
    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-300 flex items-center justify-center">
          <img 
            src={logo}
            alt="Logo Davide Taddia"
            className="w-full h-full object-cover"
          />
        </div>
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
