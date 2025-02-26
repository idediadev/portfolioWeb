import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full max-w-[1440px] mx-auto mt-5 footer-gradient">
      <div className="w-full h-full flex flex-col justify-center items-center text-white px-4 py-8 md:py-0 md:h-[150px]">
        <div className="text-center">
          <p className="text-base md:text-lg mb-2">Thanks for visiting my portfolio</p>
          <p className="text-xs md:text-sm">© 2025 Davide Taddia - All rights reserved</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4">
          <a href="#masteryhub" className="hover:text-emerald-200 transition-colors">MasteryHub</a>
          <a href="#madebyme" className="hover:text-emerald-200 transition-colors">MadebyMe</a>
          <a href="#servicehub" className="hover:text-emerald-200 transition-colors">ServiceHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;