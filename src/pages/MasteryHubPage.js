import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight, ChevronLeft, Code, Database, Server, Globe, Terminal, Cpu } from 'lucide-react';
import '../styles/styles.css';

const MasteryHubPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
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
  
  // Skill slides con dati di presentazione
  const slides = [
    {
      title: "Front-End Development",
      icon: <Code size={48} className="text-emerald-300 mb-4" />,
      skills: [
        { name: "React.js", level: 90 },
        { name: "JavaScript/TypeScript", level: 85 },
        { name: "HTML5/CSS3", level: 95 },
        { name: "TailwindCSS", level: 90 },
        { name: "Vue.js", level: 65 }
      ],
      description: "Specializzato nello sviluppo di interfacce moderne e reattive con React.js e TailwindCSS. Creazione di componenti riutilizzabili e ottimizzati per le prestazioni, con particolare attenzione all'esperienza utente e all'accessibilità."
    },
    {
      title: "Back-End Development",
      icon: <Server size={48} className="text-emerald-300 mb-4" />,
      skills: [
        { name: "Node.js", level: 80 },
        { name: "Express.js", level: 75 },
        { name: "Java", level: 70 },
        { name: "Spring Boot", level: 65 },
        { name: "RESTful APIs", level: 85 }
      ],
      description: "Implementazione di server robusti e scalabili con Node.js e Java. Sviluppo di API RESTful efficienti e sicure. Gestione di concorrenza e mutual exclusion per sistemi affidabili e performanti."
    },
    {
      title: "Database & Data",
      icon: <Database size={48} className="text-emerald-300 mb-4" />,
      skills: [
        { name: "SQL (MySQL, PostgreSQL)", level: 85 },
        { name: "MongoDB", level: 75 },
        { name: "Redis", level: 60 },
        { name: "Data Analysis", level: 80 },
        { name: "ETL Processes", level: 70 }
      ],
      description: "Progettazione e ottimizzazione di database relazionali e NoSQL. Sviluppo di query complesse e ottimizzate. Analisi dei dati per estrarre insights significativi e supportare decisioni basate sui dati."
    },
    {
      title: "AI & Machine Learning",
      icon: <Cpu size={48} className="text-emerald-300 mb-4" />,
      skills: [
        { name: "Python (NumPy, Pandas)", level: 85 },
        { name: "TensorFlow", level: 70 },
        { name: "PyTorch", level: 75 },
        { name: "Scikit-Learn", level: 80 },
        { name: "NLP & Computer Vision", level: 65 }
      ],
      description: "Sviluppo di soluzioni di machine learning per problemi di regressione e classificazione. Implementazione di reti neurali per l'elaborazione del linguaggio naturale e la visione artificiale. Analisi di dataset complessi con Pandas e NumPy."
    },
    {
      title: "DevOps & Tools",
      icon: <Terminal size={48} className="text-emerald-300 mb-4" />,
      skills: [
        { name: "Git & GitHub", level: 90 },
        { name: "Docker", level: 75 },
        { name: "CI/CD Pipelines", level: 70 },
        { name: "Linux/Bash", level: 85 },
        { name: "AWS/Cloud Services", level: 65 }
      ],
      description: "Configurazione e gestione di ambienti di sviluppo con Docker. Implementazione di pipeline CI/CD per automazione del deployment. Scripting avanzato con Bash e PowerShell per automazione di task ripetitivi."
    },
    {
      title: "Languages & Paradigms",
      icon: <Globe size={48} className="text-emerald-300 mb-4" />,
      skills: [
        { name: "C/C++", level: 80 },
        { name: "Python", level: 90 },
        { name: "Java", level: 75 },
        { name: "JavaScript", level: 85 },
        { name: "Functional Programming", level: 70 }
      ],
      description: "Padronanza di diversi paradigmi di programmazione: OOP, funzionale e procedurale. Sviluppo di software ottimizzato e thread-safe in C/C++. Esperienza con pattern di design e architetture software scalabili."
    }
  ];
  
  // Gestione navigazione tra le slide
  const nextSlide = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'light bg-white text-gray-900'}`}>
      {/* Matrix effect di background */}
      <div className="matrix"></div>
      
      {/* Header con navigazione */}
      <header className="w-full navbar-gradient py-4 px-6 flex justify-between items-center">
        <a 
          href="/" 
          className="flex items-center text-emerald-300 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="mr-2" />
          <span>Torna alla Home</span>
        </a>
        <h1 className="text-2xl md:text-3xl font-bold text-emerald-300">MasteryHub</h1>
        <div className="w-24"></div> {/* Spazio per bilanciare il layout */}
      </header>
      
      {/* Contenitore principale presentazione */}
      <main className="container mx-auto px-4 py-8">
        {/* Titolo sezione */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-emerald-300 mb-4">Le Mie Competenze Tecniche</h2>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
            Esplora le diverse aree della programmazione e dello sviluppo software in cui mi sono specializzato.
          </p>
        </div>
        
        {/* Indicatori di slides */}
        <div className="flex justify-center mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 mx-2 rounded-full transition-colors ${
                index === activeSlide ? 'bg-emerald-400' : 'bg-gray-600'
              }`}
              aria-label={`Vai alla slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Presentazione delle skills */}
        <div className="max-w-4xl mx-auto bg-neutral-800/30 rounded-xl overflow-hidden shadow-xl">
          {/* Controlli slide */}
          <div className="relative">
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-emerald-600/50 hover:bg-emerald-600 p-2 rounded-full z-10 text-white transition-colors"
              aria-label="Slide precedente"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-emerald-600/50 hover:bg-emerald-600 p-2 rounded-full z-10 text-white transition-colors"
              aria-label="Slide successiva"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Slide content */}
            <div className="p-8 md:p-12">
              <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between">
                <div className="text-center md:text-left mb-8 md:mb-0 md:w-1/2">
                  {slides[activeSlide].icon}
                  <h3 className="text-2xl md:text-3xl text-emerald-300 mb-4">
                    {slides[activeSlide].title}
                  </h3>
                  <p className="text-emerald-100 mb-6">
                    {slides[activeSlide].description}
                  </p>
                </div>
                
                <div className="w-full md:w-1/2 md:pl-8">
                  {slides[activeSlide].skills.map((skill, index) => (
                    <div key={index} className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-emerald-300 font-medium">{skill.name}</span>
                        <span className="text-emerald-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div 
                          className="bg-emerald-400 h-2.5 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Numerazione slide */}
          <div className="bg-neutral-900/50 py-3 px-6 flex justify-between items-center">
            <span className="text-emerald-300">
              {activeSlide + 1} / {slides.length}
            </span>
            <div className="flex space-x-2">
              {slides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`px-3 py-1 rounded ${
                    index === activeSlide 
                      ? 'bg-emerald-600 text-white' 
                      : 'text-emerald-300 hover:bg-emerald-600/30'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Sezione progetti correlati */}
        <div className="mt-16">
          <h3 className="text-2xl text-emerald-300 mb-6 text-center">Progetti Correlati</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Progetto 1 */}
            <div className="bg-neutral-800/30 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform">
              <div className="p-6">
                <h4 className="text-emerald-300 text-xl mb-2">Analisi Dataset Fugaku</h4>
                <p className="text-white text-sm mb-4">
                  Machine learning su dataset del supercomputer giapponese per predire consumi energetici.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-emerald-900/50 text-emerald-300 text-xs px-2 py-1 rounded">Python</span>
                  <span className="bg-emerald-900/50 text-emerald-300 text-xs px-2 py-1 rounded">TensorFlow</span>
                  <span className="bg-emerald-900/50 text-emerald-300 text-xs px-2 py-1 rounded">Data Analysis</span>
                </div>
              </div>
            </div>
            
            {/* Progetto 2 */}
            <div className="bg-neutral-800/30 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform">
              <div className="p-6">
                <h4 className="text-emerald-300 text-xl mb-2">Portfolio Website</h4>
                <p className="text-white text-sm mb-4">
                  Sviluppo di un sito web portfolio con React e TailwindCSS con effetti visivi avanzati.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-emerald-900/50 text-emerald-300 text-xs px-2 py-1 rounded">React</span>
                  <span className="bg-emerald-900/50 text-emerald-300 text-xs px-2 py-1 rounded">TailwindCSS</span>
                  <span className="bg-emerald-900/50 text-emerald-300 text-xs px-2 py-1 rounded">JavaScript</span>
                </div>
              </div>
            </div>
            
            {/* Progetto 3 */}
            <div className="bg-neutral-800/30 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform">
              <div className="p-6">
                <h4 className="text-emerald-300 text-xl mb-2">Sistema di Mutual Exclusion</h4>
                <p className="text-white text-sm mb-4">
                  Implementazione di algoritmi per garantire la mutual exclusion in sistemi distribuiti.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-emerald-900/50 text-emerald-300 text-xs px-2 py-1 rounded">C++</span>
                  <span className="bg-emerald-900/50 text-emerald-300 text-xs px-2 py-1 rounded">Multithreading</span>
                  <span className="bg-emerald-900/50 text-emerald-300 text-xs px-2 py-1 rounded">Distributed Systems</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="w-full mx-auto mt-12 footer-gradient">
        <div className="w-full h-full flex flex-col justify-center items-center text-white px-4 py-8 md:py-0 md:h-[150px]">
          <div className="text-center">
            <p className="text-base md:text-lg mb-2">Thanks for exploring my skills</p>
            <p className="text-xs md:text-sm">© 2025 Davide Taddia - All rights reserved</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4">
            <a href="/" className="hover:text-emerald-200 transition-colors">Home</a>
            <a href="#top" className="hover:text-emerald-200 transition-colors">Torna su</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MasteryHubPage;