/*
@author       : Davide Taddia
@version      : 0.1
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : Footer component with categories and social links
@email        : davide.taddia2@studio.unibo.it
*/
import React, { useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

// Import the logo image directly
// Make sure the path is correct based on your project structure
import logoImage from './logoDavideTaddia.png';

const Footer = () => {
  // State for logo error handling
  const [logoError, setLogoError] = useState(false);
  
  // Logo fallback component
  const LogoFallback = () => (
    <div className="w-16 h-16 flex items-center justify-center text-dark-highlight font-bold text-xl bg-transparent rounded-full border-2 border-dark-highlight">
      <span className="font-mono">DT</span>
    </div>
  );

  // Categories for the footer
  const categories = [
    { name: "00 MasteryHub", link: "/masteryhub" },
    { name: "01 WikiDEDIA", link: "/wikidedia" },
    { name: "02 ServiceHub", link: "/servicehub" }
  ];

  // Social links
  const socialLinks = [
    { 
      name: "GitHub", 
      icon: <Github size={20} />, 
      link: "https://github.com/idediadev",
      aria: "Visit Davide Taddia's GitHub profile"
    },
    { 
      name: "LinkedIn", 
      icon: <Linkedin size={20} />, 
      link: "https://www.linkedin.com/in/davidetaddia/", 
      aria: "Visit Davide Taddia's LinkedIn profile"
    },
    { 
      name: "Email", 
      icon: <Mail size={20} />, 
      link: "mailto:davide.taddia2@studio.unibo.it",
      aria: "Send an email to Davide Taddia" 
    }
  ];

  // Current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-t from-black to-gray-900 text-white pt-16 pb-8">
      {/* Green accent line at the top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-dark-accent to-dark-highlight"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and about section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-4">
              {!logoError ? (
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-dark-highlight flex items-center justify-center">
                  <img 
                    src={logoImage}
                    alt="Logo Davide Taddia"
                    className="w-full h-full object-cover"
                    onError={() => setLogoError(true)}
                  />
                </div>
              ) : (
                <LogoFallback />
              )}
            </div>
            <h3 className="text-xl font-bold text-dark-highlight mb-2">Davide Taddia</h3>
            <p className="text-gray-400 text-sm text-center md:text-left">
              Computer Science Student & Developer specializing in web development, AI, and data analysis.
            </p>
          </div>
          
          {/* Categories */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-dark-highlight mb-4">Explore</h3>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={index}>
                  <a 
                    href={category.link} 
                    className="text-gray-400 hover:text-dark-highlight transition-colors"
                    aria-label={`Navigate to ${category.name}`}
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Connect */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-dark-highlight mb-4">Connect</h3>
            <ul className="space-y-2">
              {socialLinks.map((social, index) => (
                <li key={index}>
                  <a 
                    href={social.link} 
                    className="text-gray-400 hover:text-dark-highlight transition-colors flex items-center gap-2"
                    target={social.name !== "Contact" ? "_blank" : undefined}
                    rel={social.name !== "Contact" ? "noopener noreferrer" : undefined}
                    aria-label={social.aria}
                  >
                    {social.icon}
                    <span>{social.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter/Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-dark-highlight mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe for updates on new projects and articles.
            </p>
            <div className="w-full">
              <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Your email" 
                  aria-label="Your email address"
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-dark-highlight flex-grow"
                />
                <button 
                  type="submit"
                  className="px-4 py-2 bg-dark-accent hover:bg-dark-highlight transition-colors text-white rounded-lg font-medium"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>
        
        {/* Bottom section with copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} Davide Taddia. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="/privacy-policy" className="text-gray-500 hover:text-dark-highlight text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-500 hover:text-dark-highlight text-sm transition-colors">
              Terms of Service
            </a>
            <a href="/cookies" className="text-gray-500 hover:text-dark-highlight text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;