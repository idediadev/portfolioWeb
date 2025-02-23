import React from 'react';

const HeroSection = () => {
  return (
    <section className="w-full max-w-[1440px] h-[875px] mx-auto mt-5">
      <div className="w-[1100px] h-[825px] mx-auto flex">
        <div className="w-[550px] h-[825px] flex items-center justify-center">
          <img 
            src="/api/placeholder/550/825" 
            alt="Hero Image" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="w-[550px] h-[825px] flex flex-col justify-center p-12 slide-in-section">
          <h1 className="text-emerald-300 text-4xl mb-6">
            Davide Taddia
          </h1>
          <p className="text-emerald-300 text-lg">
            I'm really passionate about computer science and everything related to it. Right now, I'm just a university student, but I'm working hard every day to get closer to my goals. I set up this page as a style exercise, and hopefully, one day, I'll fill it with bigger and more interesting projects.
            <br /><br />
            My journey into computer science started out of pure curiosity and quickly turned into a passion...
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
