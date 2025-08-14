/*
@author       : Davide Taddia
@version      : 1.0
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : Main App component with routing configuration
@email        : davide.taddia2@studio.unibo.it
*/

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Card from './components/Card';
import Footer from './components/Footer'; 
import ContactForm from './components/ContactForm';
import SEO from './components/SEO'; 
import MasteryHubPage from './pages/MasteryHubPage'; // Import della nuova pagina
import useCardAnimation from './components/AnimatioHandler';
import './styles/styles.css';
import './styles/masteryhub.css'; // Import del nuovo CSS
import DarkLightModeToggle from './components/DarkLightModeToggle';
import MatrixEffect from './components/MatrixEffect';
import CookieBanner from './components/CookieBanner';
import ServiceHubPage from './pages/ServiceHubPage'; 


const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);

  // Check of system preferences at starting load for the choice of the theme
  useEffect(() => {
    // Manteniamo sempre il tema scuro per avere lo sfondo #080c13
    setIsDarkMode(true);
    updateTheme(true);
  }, []);

  // Applica il tema al documento
  const updateTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      // Imposta direttamente il colore di sfondo su #080c13
      document.body.style.backgroundColor = '#080c13';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      // Se si passa al tema chiaro, si ripristina il colore di sfondo predefinito
      document.body.style.backgroundColor = '#F8F8F8';
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

  // Home Page Component
  const HomePage = () => {
    // Editing Cards component: 
    const cards = [
      {
        id: 'masteryhub',
        title: '00 MasteryHub',
        description: 'My skills span both front-end and back-end development, making me a versatile candidate for your computer engineering team. Explore my technical competencies in AI, web development, and system architecture.',
        animatedShape: 'animated-circle',
        delay: 0
      },
      {
        id: 'wikidedia',
        title: '01 WikIDEDIA',
        description: 'Create, explore and collaborate on topics spanning from computer science to mathematics, featuring interactive Python and Manim diagrams. Browse through chapters, contribute to articles, and engage with a community of like-minded enthusiasts.',
        animatedShape: 'animated-triangle',
        delay: 0.2
      },
      
      
      {
        id: 'servicehub',
        title: '02 ServiceHub',
        description:  'Providing a suite of services to enhance your digital experience, from cloud computing solutions to data analytics and AI-driven insights. Explore how our services can transform your business operations.',
        animatedShape: 'animated-square',
        delay: 0.4
      }
    ];

    return (
      <div className="transition-colors duration-300 min-h-screen dark bg-[#080c13] text-white">
        {/* Componente SEO per i meta tag */}
        <SEO />
        
        {/* Matrix effect background */}
        <MatrixEffect />
        
        {/* Il toggle è ora in un div fixed, senza absolute, per seguire lo scrolling */}
        <div className="fixed bottom-4 right-4 z-50 theme-toggle-container">
          <DarkLightModeToggle 
            isDarkMode={isDarkMode} 
            toggleDarkMode={toggleDarkMode} 
          />
        </div>
        
        {/* Layout wrapper per mantenere una struttura coerente */}
        <div className="flex flex-col min-h-screen">
          <Navbar onHireMeClick={handleHireMeClick} />
          
          {/* Main content wrapper con padding-top per compensare la navbar fissa */}
          <main className="flex-grow pt-24 md:pt-28">
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
          
          {/* Footer component */}
          <Footer />
        </div>

        {/* Mostra il form di contatto quando showContactForm è true */}
        {showContactForm && <ContactForm onClose={closeContactForm} />}
        
        {/* Banner per i cookie */}
        <CookieBanner />
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        {/* Route per la home page */}
        <Route path="/" element={<HomePage />} />
        
        {/* Route per MasteryHub */}
        <Route path="/masteryhub" element={<MasteryHubPage />} />
        
        {/* Route per altre pagine (aggiungi qui le altre route) */}
        <Route path="/wikidedia" element={<div>WikiDEDIA Page - Coming Soon</div>} />
        <Route path="/servicehub" element={<ServiceHubPage />} />
        
        {/* Route di fallback per 404 */}
        <Route path="*" element={
          <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-green-400 mb-4">404</h1>
              <p className="text-xl text-gray-300 mb-8">Page not found</p>
              <a 
                href="/" 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Go Home
              </a>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;