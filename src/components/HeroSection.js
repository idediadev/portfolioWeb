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
           My journey into computer science started out of pure curiosity and quickly turned into a passion. I’ve always been fascinated by how technology works and how it shapes our world. From coding and software development to exploring new advancements in AI and machine learning, there’s always something new and exciting to learn. Right now, I’m mainly focusing on building a solid foundation in programming and honing my problem-solving skills, but I’m also keen to dive deeper into areas like data science and NLP as I progress.
           <br /> <br />
           Even though I’m still a student, I firmly believe that every small step counts. Every project I take on or every challenge I face pushes me closer to becoming the professional I aspire to be. That’s why I see this page as more than just a showcase—it’s a timeline of my growth, learning experiences, and the knowledge I gather along the way
           <br /> <br /> 
               
            For now, it might just be a collection of experiments and simple projects, but I hope it will gradually turn into a portfolio of more ambitious and impactful work. Stay tuned for more updates and projects as I continue learning and evolving!
            ...NLP work in progress...</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
