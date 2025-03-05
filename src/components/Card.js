/*
@author       : Davide Taddia
@version      : 0.1
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : Card component to display the project cards
@email        : davide.taddia2@studio.unibo.it
*/
import React from "react";

const Card = ({ id, title, description, animatedShape, delay = 0, className = "" }) => {
  const icons = {
    masteryhub: (
      <svg className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          d="M12 14l9-5-9-5-9 5 9 5z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          d="M12 14v7"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          d="M4.5 12l7.5 4 7.5-4"
        />
      </svg>
    ),
    wikidedia: (
      <svg className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    servicehub: (
      <svg className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
    madebyme: (
      <svg className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    )
  };

  // Function to get the URL based on ID
  const getPageUrl = (id) => {
    switch(id) {
      case 'masteryhub':
        return '/masteryhub';
      case 'wikidedia':
        return '/wikidedia';
      case 'servicehub':
        return '/servicehub';
      case 'madebyme':
        return '/madebyme';
      default:
        return `#${id}`;
    }
  };

  return (
    <section id={id} className={`w-full max-w-[1440px] mx-auto px-4 ${className}`}>
      <div 
        className="w-full max-w-[1100px] mx-auto flex flex-col md:flex-row bg-neutral-800/30 rounded-lg overflow-hidden card-trigger"
        style={{ animationDelay: `${delay}s` }}
      >
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-start">
          <div className="flex items-center mb-4 md:mb-6">
            {icons[id]}
            <h2 className="text-emerald-300 text-2xl md:text-3xl">
              {title}
            </h2>
          </div>
          <div className="overflow-y-auto flex-grow pr-2 md:pr-4" style={{ maxHeight: "300px" }}>
            <p className="text-white text-base md:text-lg mb-4 md:mb-8">
              {description}
            </p>
          </div>
          <a 
            href={getPageUrl(id)}
            className="text-emerald-300 hover:text-emerald-400 transition-colors text-base md:text-lg"
          >
            → {id === "madebyme" ? "View Projects" : `Explore ${id}`}
          </a>
        </div>
        
        <div className="w-full md:w-1/2 h-[200px] md:h-[450px] flex items-center justify-center floating-element">
          <div className={`${animatedShape} scale-75 md:scale-100`}></div>
        </div>
      </div>
    </section>
  );
};

export default Card;