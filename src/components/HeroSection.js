import React from 'react';

const HeroSection = () => {
  return (
    <section className="w-full mx-auto relative min-h-screen">
      {/* Rimuoviamo il canvas di animazione dalla HeroSection perché ora usiamo EnhancedMatrixEffect */}
      
      {/* Overlay scuro semi-trasparente per migliorare la leggibilità */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>
      
      {/* Contenuto della hero section */}
      <div className="relative z-20 flex flex-col md:flex-row max-w-6xl mx-auto h-full pt-20 pb-10">
        <div className="w-full md:w-1/2 mb-8 md:mb-0 flex items-center justify-center p-8">
          <div className="text-center">
            <h2 className="text-emerald-300 text-3xl md:text-4xl font-bold mb-4">Davide Taddia</h2>
            <p className="text-white text-lg md:text-xl">Computer Science Student & Developer</p>
            <div className="mt-6 border-t border-emerald-700 pt-4 w-3/4 mx-auto">
              <p className="text-emerald-100 text-sm md:text-base italic">
                "Turning passion into code, one project at a time."
              </p>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col justify-center p-4 md:p-12 slide-in-section">
          <h1 className="text-emerald-300 text-3xl md:text-4xl mb-6">
            About Me
          </h1>
          <p className="text-emerald-300 text-base md:text-lg">
            I'm really passionate about computer science and everything related to it. Right now, I'm just a university student, but I'm working hard every day to get closer to my goals. I set up this page as a style exercise, and hopefully, one day, I'll fill it with bigger and more interesting projects.
            <br /><br />
            My journey into computer science started out of pure curiosity and quickly turned into a passion...
            <br /><br />
            Even though I'm still a student, I firmly believe that every small step counts. Every project I take on or every challenge I face pushes me closer to becoming the professional I aspire to be. That's why I see this page as more than just a showcase—it's a timeline of my growth, learning experiences, and the knowledge I gather along the way.
            <br /><br />
            For now, it might just be a collection of experiments and simple projects, but I hope it will gradually turn into a portfolio of more ambitious and impactful work. Stay tuned for more updates and projects as I continue learning and evolving!
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;