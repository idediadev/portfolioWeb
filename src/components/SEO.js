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
  // Main meta tags
  const title = "Davide Taddia | Computer Science Student & Developer";
  const description = "Portfolio di Davide Taddia, studente di Computer Science e developer specializzato in React, AI, Machine Learning e Data Analysis. Progetti e servizi di sviluppo web, analisi dati e soluzioni di AI.";
  
  // keywords 
  const keywords = [
    // Professional Title
    "Computer Science Student",
    "Web Developer",
    "React Developer",
    "Front-end Developer",
    "Full-stack Developer",
    "Software Engineer",
    "Data Analyst",
    
    // AI e ML
    "AI",
    "LLM",
    "Context Window",
    "Chain of Thought",
    "Fine-Tuning",
    "Machine Learning",
    "Artificial Intelligence",
    "Deep Learning",
    
    // Skills
    "JavaScript development",
    "React.js expert",
    "TailwindCSS developer",
    "Node.js development",
    "Mobile app development",
    "UI/UX design",
    "Data Science",
    "Python Programming",
    
    // Services
    "Web application development",
    "Portfolio website design",
    "Custom software solutions",
    "Website development services",
    "Mobile application development",
    "AI solutions",
    "Data analysis services",
    
    // Unique Selling Points
    "Innovative web solutions",
    "Creative coding",
    "Computer science expertise",
    "Modern web technologies",
    "AI integration",
    "Cutting-edge technology"
  ].join(", ");

  // URL
  const siteUrl = "https://davidetaddia.dev";
  
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // Immagine for the Open Graph
  const ogImage = `${siteUrl}/public/og-image.jpg`; 
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  return (
    <Helmet>
      {/* Meta tag  */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Davide Taddia" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />
      
      {/* Meta tag  for the social- Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Meta tag for Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Meta tag for manageviewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Meta tag theme control */}
      <meta name="theme-color" content="#00ff7f" />
      
      {/* Meta tag ofr robots */}
      <meta name="robots" content="index, follow" />
      
      {/* Structured Data (Schema.org) --> Google */}
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