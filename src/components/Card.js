import React from 'react';

const Card = ({ id, title, description, animatedShape, delay = 0 }) => {
  return (
    <section id={id} className="w-full max-w-[1440px] h-[490px] mx-auto mt-8">
      <div 
        className="w-[1100px] h-[450px] mx-auto flex bg-neutral-800/30 rounded-lg overflow-hidden card-trigger"
        style={{ animationDelay: `${delay}s` }}
      >
        <div className="w-[550px] h-[450px] p-12 flex flex-col justify-center">
          <h2 className="text-emerald-300 text-3xl mb-6">
            {title}
          </h2>
          <p className="text-white text-lg mb-8">
            {description}
          </p>
          <a 
            href={`#${id}`}
            className="text-emerald-300 hover:text-emerald-400 transition-colors text-lg"
          >
            → {title === "01 MadebyMe" ? "View Projects" : `Explore ${id}`}
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
