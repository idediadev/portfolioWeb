import React from "react";

const Card = ({ id, title, description, animatedShape, delay = 0 }) => {
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
    madebyme: (
      <svg className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    servicehub: (
      <svg className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    )
  };

  // Funzione per ottenere l'URL basato sull'ID
  const getPageUrl = (id) => {
    switch(id) {
      case 'masteryhub':
        return '/masteryhub';
      case 'madebyme':
        return '/madebyme';
      case 'servicehub':
        return '/servicehub';
      default:
        return `#${id}`;
    }
  };

  return (
    <section id={id} className={`w-full max-w-[1440px] mx-auto px-4 ${id === 'masteryhub' ? 'mt-8 md:mt-[100px]' : 'mt-8'}`}>
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