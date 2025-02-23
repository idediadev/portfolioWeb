import React from "react";

const Card = ({ id, title, description, animatedShape, delay = 0 }) => {
  const icons = {
    masteryhub: (
      <svg className="w-8 h-8 mr-3 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <svg className="w-8 h-8 mr-3 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    servicehub: (
      /*<svg className="w-8 h-8 mr-3 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>  */
      <div className="w-[550px] h-[450px] flex items-center justify-center floating-element">
  <svg viewBox="0 0 200 200" className="w-64 h-64">
    {/* Ruota */}
    <circle 
      cx="100" 
      cy="100" 
      r="70" 
      className="text-gray-400" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="4"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 100 100"
        to="360 100 100"
        dur="3s"
        repeatCount="indefinite"
      />
    </circle>
    
    {/* Criceto */}
    <g transform="translate(100, 100)">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 0 0"
        to="-360 0 0"
        dur="3s"
        repeatCount="indefinite"
      />
      {/* Corpo */}
      <circle cx="0" cy="-40" r="15" fill="#FFE4E1"/>
      {/* Testa */}
      <circle cx="0" cy="-60" r="10" fill="#FFFFFF"/>
      {/* Orecchie */}
      <circle cx="-8" cy="-68" r="4" fill="#FFA07A"/>
      <circle cx="8" cy="-68" r="4" fill="#FFA07A"/>
      {/* Zampe */}
      <rect x="-12" y="-35" width="4" height="10" fill="#FFB6C1" rx="2"/>
      <rect x="8" y="-35" width="4" height="10" fill="#FFB6C1" rx="2"/>
      {/* Occhi e naso */}
      <circle cx="-3" cy="-62" r="1" fill="#000000"/>
      <circle cx="3" cy="-62" r="1" fill="#000000"/>
      <circle cx="0" cy="-58" r="1.5" fill="#FFA07A"/>
    </g>
  </svg>
</div>
    )
  };

  return (
    <section id={id} className={`w-full max-w-[1440px] h-[490px] mx-auto ${id === 'masteryhub' ? 'mt-[100px]' : 'mt-8'}`}>
      <div 
        className="w-[1100px] h-[450px] mx-auto flex bg-neutral-800/30 rounded-lg overflow-hidden card-trigger"
        style={{ animationDelay: `${delay}s` }}
      >
        <div className="w-[550px] h-[450px] p-12 flex flex-col justify-start">
          <div className="flex items-center mb-6">
            {icons[id]}
            <h2 className="text-emerald-300 text-3xl">
              {title}
            </h2>
          </div>
          <div className="overflow-y-auto flex-grow pr-4" style={{ maxHeight: "300px" }}>
            <p className="text-white text-lg mb-8">
              {description}
            </p>
          </div>
          <a 
            href={`#${id}`}
            className="text-emerald-300 hover:text-emerald-400 transition-colors text-lg"
          >
            → {id === "madebyme" ? "View Projects" : `Explore ${id}`}
          </a>
        </div>
        
        <div className="w-[550px] h-[450px] flex items-center justify-center floating-element">
          <div className={animatedShape}></div>
        </div>
      </div>
    </section>
  );
};

export default Card;