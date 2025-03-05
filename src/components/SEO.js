/*
@author       : Davide Taddia
@version      : 0.1
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : SEO component for improve Google searching and social media sharing
@email        : davide.taddia2@studio.unibo.it
*/
import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = () => {
  // Meta informazioni principali
  const title = "Davide Taddia | Computer Science Student & Developer";
  const description = "Portfolio di Davide Taddia, studente di Computer Science e developer specializzato in React, AI, Machine Learning e Data Analysis. Progetti e servizi di sviluppo web, analisi dati e soluzioni di AI.";
  
  // Parole chiave (importante per alcuni motori di ricerca)
  const keywords = [
    // Professione
    "Computer Science Student",
    "Web Developer",
    "React Developer",
    "Front-end Developer",
    "Full-stack Developer",
    "Software Engineer",
    "Data Analyst",
    
    // Competenze AI e ML
    "AI",
    "LLM",
    "Context Window",
    "Chain of Thought",
    "Fine-Tuning",
    "Machine Learning",
    "Artificial Intelligence",
    "Deep Learning",
    
    // Competenze tecniche
    "JavaScript development",
    "React.js expert",
    "TailwindCSS developer",
    "Node.js development",
    "Mobile app development",
    "UI/UX design",
    "Data Science",
    "Python Programming",
    
    // Servizi
    "Web application development",
    "Portfolio website design",
    "Custom software solutions",
    "Website development services",
    "Mobile application development",
    "AI solutions",
    "Data analysis services",
    
    // Valore unico
    "Innovative web solutions",
    "Creative coding",
    "Computer science expertise",
    "Modern web technologies",
    "AI integration",
    "Cutting-edge technology"
  ].join(", ");

  // URL del sito (modificalo con il tuo dominio quando sarà online)
  const siteUrl = "https://davidetaddia.dev";
  
  // Immagine per social media sharing (OG image)
  const ogImage = `${siteUrl}/og-image.jpg`; // Assicurati di creare e aggiungere questa immagine alla cartella public

  return (
    <Helmet>
      {/* Meta tag essenziali */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Davide Taddia" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />
      
      {/* Meta tag per i social media - Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Meta tag per Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Meta tag per controllo della viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Meta tag per il colore del tema */}
      <meta name="theme-color" content="#00ff7f" />
      
      {/* Meta tag per robots */}
      <meta name="robots" content="index, follow" />
      
      {/* Structured Data (Schema.org) per Google */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Davide Taddia",
            "url": "${siteUrl}",
            "image": "${ogImage}",
            "sameAs": [
              "https://github.com/davidetaddia"
            ],
            "jobTitle": "Computer Science Student & Developer",
            "worksFor": {
              "@type": "Organization",
              "name": "Freelance"
            },
            "description": "${description}",
            "knowsAbout": ["Web Development", "React", "JavaScript", "TailwindCSS", "AI", "Machine Learning", "Data Analysis", "LLM", "Fine-Tuning"]
          }
        `}
      </script>
    </Helmet>
  );
};

export default SEO;