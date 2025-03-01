import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Card from './components/Card';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';
import SEO from './components/SEO'; // Importiamo il componente SEO
import useCardAnimation from './components/AnimatioHandler';
import './styles/styles.css';
import DarkLightModeToggle from './components/DarkLightModeToggle';
import MatrixEffect from './components/MatrixEffect';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  // Controllo delle preferenze di sistema al caricamento iniziale
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);
    updateTheme(prefersDarkMode);
  }, []);

  // Applica il tema al documento
  const updateTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  };

  // Funzione per cambiare modalità
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    updateTheme(newMode);
  };

  // Funzione per gestire il click su "HIRE ME"
  const handleHireMeClick = () => {
    setShowContactForm(true);
  };

  // Funzione per chiudere il modulo di contatto
  const closeContactForm = () => {
    setShowContactForm(false);
  };

  useCardAnimation();

  const cards = [
    {
      id: 'masteryhub',
      title: '00 MasteryHub',
      description: 'My skills span both front-end and back-end development, making me a versatile candidate for your computer engineering team. On the back end, I excel at addressing concurrency challenges and ensuring mutual exclusion—skills that are essential when developing components of operating systems and establishing reliable server-client communications over the TCP/IP protocol. I have a proven track record with server technologies such as Tomcat and Node.js, which enable me to build robust, scalable, and responsive web applications. On the front end, I leverage modern frameworks like React and TailwindCSS to develop complex, user-friendly, and seamless applications. My experience extends to developing solutions that run in both local and remote runtime environments. I am proficient in a variety of programming languages and tools. My core languages include C, C++, C#, Java, and Python for object-oriented programming—enhanced by extensive use of Python libraries such as Manim, PyTorch, Pandas, NumPy, and TensorFlow. In addition, I work effectively with JavaScript and TypeScript, and I utilize Microsoft SQL for managing IBM databases. I also have strong scripting skills with Bash for Linux/Mac systems and Microsoft PowerShell, and I regularly employ advanced programming constructs such as lambda expressions and regular expressions (RegEx).Furthermore, I possess a solid foundation in artificial intelligence, with a particular focus on machine learning. I have developed AI solutions that harness dataset-driven approaches to tackle specialized tasks, demonstrating my capability to integrate AI into practical applications.',
      animatedShape: 'animated-circle',
      delay: 0
    },
    {
      id: 'madebyme',
      title: '01 MadebyMe',
      description: '-> This website ;-) ->Analysis of datasets from Fugaku, the Japanese supercomputer, with the aim of developing machine learning tasks, including predicting the exit state, duration, and computational power consumption of a job through regression problems.',
      animatedShape: 'animated-triangle',
      delay: 0.2
    },
    {
      id: 'servicehub',
      title: '02 ServiceHub',
      description: 'The services currently offered are still being defined; for now, our hamsters are hard at work.',
      animatedShape: 'animated-square',
      delay: 0.4
    }
  ];

  return (
    <div className={`transition-colors duration-300 min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'light bg-white text-gray-900'}`}>
      {/* Componente SEO per i meta tag */}
      <SEO />
      
      <MatrixEffect />
      <div className="absolute bottom-4 right-4 z-50">
        <DarkLightModeToggle 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode} 
        />
      </div>
      
      {/* Layout wrapper per mantenere una struttura coerente */}
      <div className="flex flex-col min-h-screen">
        <Navbar onHireMeClick={handleHireMeClick} />
        
        {/* Main content wrapper */}
        <main className="flex-grow">
          <HeroSection />
          <div className="container mx-auto px-4">
            {cards.map((card, index) => (
              <Card 
                key={card.id}
                {...card}
                className={index === 0 ? "mt-[700px]" : ""}
              />
            ))}
          </div>
        </main>
        
        <Footer />
      </div>

      {/* Mostra il form di contatto quando showContactForm è true */}
      {showContactForm && <ContactForm onClose={closeContactForm} />}
    </div>
  );
};

export default App;