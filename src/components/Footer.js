/*
@author       : Davide Taddia
@version      : 0.1
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : footer component of the homepage
@email        : davide.taddia2@studio.unibo.it
*/
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full mx-auto mt-5 footer-gradient">
      <div className="w-full h-full flex flex-col justify-center items-center text-current px-4 py-8 md:py-0 md:h-[150px]">
        <div className="text-center">
          <p className="text-base md:text-lg mb-2">Thanks for visiting my portfolio</p>
          <p className="text-xs md:text-sm">© 2025 Davide Taddia - All rights reserved</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4">
          <a href="#masteryhub" className="text-action hover:text-primary transition-colors">MasteryHub</a>
          <a href="#madebyme" className="text-action hover:text-primary transition-colors">MadebyMe</a>
          <a href="#servicehub" className="text-action hover:text-primary transition-colors">ServiceHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;