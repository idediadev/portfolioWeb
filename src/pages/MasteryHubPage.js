/*
@author       : Davide Taddia
@version      : 1.1
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : MasteryHub - Skills presentation page (Fixed import)
@email        : davide.taddia2@studio.unibo.it
*/

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Settings, Edit3, Save, X, Github, Linkedin, Mail, ChevronDown } from 'lucide-react';

const MasteryHubPage = () => {
  // Stati per gestione tema e admin
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Stati per contenuti modificabili
  const [editableContent, setEditableContent] = useState({
    heroTitle: "My Technical Skills",
    heroSubtitle: "Explore the different areas of programming and software development in which I'm specialized.",
    footerText: "Thanks for exploring my skills"
  });

  // Dati delle competenze organizzate per sezioni
  const [skillSections] = useState([
    {
      id: 'ai-ml',
      title: 'AI & Machine Learning',
      icon: '🤖',
      description: 'Development of machine learning solutions for regression and classification for various implementations including computer vision and NLP. Experience with dataset manipulation and statistical modeling for large-scale data analysis.',
      skills: [
        { name: "Python", level: 90, color: "blue", description: "Advanced data manipulation and ML model development" },
        { name: "TensorFlow", level: 85, color: "orange", description: "Deep learning frameworks and neural networks" },
        { name: "Pandas/NumPy", level: 92, color: "purple", description: "Data analysis and numerical computing" },
        { name: "Scikit-Learn", level: 88, color: "cyan", description: "Machine learning algorithms and preprocessing" },
        { name: "Computer Vision", level: 82, color: "pink", description: "Image processing and object detection" }
      ],
      projects: [
        {
          title: "Image Classification System",
          description: "CNN-based image classifier with 95% accuracy using TensorFlow",
          tags: ["Python", "TensorFlow", "OpenCV", "Keras"]
        },
        {
          title: "Predictive Analytics Platform",
          description: "Real-time prediction system for business intelligence",
          tags: ["Scikit-Learn", "Pandas", "Flask", "PostgreSQL"]
        }
      ]
    },
    {
      id: 'web-dev',
      title: 'Web Development',
      icon: '🌐',
      description: 'Full-stack web development with modern frameworks and libraries. Experience with responsive design, state management, RESTful APIs, and progressive web applications.',
      skills: [
        { name: "React", level: 95, color: "blue", description: "Component-based UI development and state management" },
        { name: "JavaScript", level: 90, color: "yellow", description: "Modern ES6+ features and asynchronous programming" },
        { name: "Node.js", level: 85, color: "green", description: "Server-side development and API creation" },
        { name: "TypeScript", level: 82, color: "indigo", description: "Type-safe development and large-scale applications" },
        { name: "CSS/SCSS", level: 88, color: "red", description: "Advanced styling and responsive design" }
      ],
      projects: [
        {
          title: "E-commerce Platform",
          description: "Full-stack e-commerce solution with payment integration",
          tags: ["React", "Node.js", "MongoDB", "Stripe"]
        },
        {
          title: "Real-time Chat Application",
          description: "WebSocket-based chat with file sharing capabilities",
          tags: ["React", "Socket.io", "Express", "Redis"]
        }
      ]
    },
    {
      id: 'backend-sys',
      title: 'Backend & Systems',
      icon: '⚙️',
      description: 'Implementation of algorithms to ensure mutual exclusion in distributed systems with focus on thread safety, system architecture, and high-performance computing.',
      skills: [
        { name: "C++", level: 88, color: "indigo", description: "System programming and performance optimization" },
        { name: "Java", level: 82, color: "orange", description: "Enterprise applications and object-oriented design" },
        { name: "Database Design", level: 85, color: "teal", description: "SQL optimization and database architecture" },
        { name: "System Architecture", level: 80, color: "violet", description: "Scalable system design and microservices" },
        { name: "DevOps", level: 78, color: "cyan", description: "CI/CD pipelines and infrastructure automation" }
      ],
      projects: [
        {
          title: "Distributed Cache System",
          description: "High-performance caching solution with Redis clustering",
          tags: ["C++", "Redis", "Docker", "Kubernetes"]
        },
        {
          title: "Microservices Architecture",
          description: "Scalable backend system with service mesh",
          tags: ["Java", "Spring Boot", "Docker", "AWS"]
        }
      ]
    }
  ]);

  // Logo fallback component - SEMPRE USATO per evitare errori import
  const LogoFallback = () => (
    <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-green-400 font-bold text-xl bg-transparent rounded-full border-2 border-green-400">
      <span className="font-mono">DT</span>
    </div>
  );

  // Logo component con fallback automatico
  const Logo = ({ size = "w-16 h-16" }) => (
    <div className={`${size} flex items-center justify-center text-green-400 font-bold text-xl bg-transparent rounded-full border-2 border-green-400`}>
      <span className="font-mono">DT</span>
    </div>
  );

  // Gestione scroll per navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      
      // Determina sezione attiva in base allo scroll
      const sections = ['hero', 'ai-ml', 'web-dev', 'backend-sys'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gestione del tema
  useEffect(() => {
    setIsDarkMode(true);
    updateTheme(true);
  }, []);

  const updateTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.body.style.backgroundColor = '#080c13';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.body.style.backgroundColor = '#F8F8F8';
    }
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    updateTheme(newMode);
  };

  // Scroll to section
  const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    // Scroll super fluido con durata personalizzata
    const startPosition = window.pageYOffset;
    const distance = offsetPosition - startPosition;
    const duration = 1500; // 1.5 secondi invece del default
    let startTime = null;

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);
      
      window.scrollTo(0, startPosition + distance * ease);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  }
};
  // Color mapping per evitare problemi con Tailwind dynamic classes
  const getColorClasses = (color) => {
    const colorMap = {
      blue: { bg: "bg-blue-900/30", text: "text-blue-300", border: "border-blue-500/30", bar: "from-blue-400 to-blue-600", glow: "shadow-blue-500/25" },
      orange: { bg: "bg-orange-900/30", text: "text-orange-300", border: "border-orange-500/30", bar: "from-orange-400 to-orange-600", glow: "shadow-orange-500/25" },
      purple: { bg: "bg-purple-900/30", text: "text-purple-300", border: "border-purple-500/30", bar: "from-purple-400 to-purple-600", glow: "shadow-purple-500/25" },
      cyan: { bg: "bg-cyan-900/30", text: "text-cyan-300", border: "border-cyan-500/30", bar: "from-cyan-400 to-cyan-600", glow: "shadow-cyan-500/25" },
      pink: { bg: "bg-pink-900/30", text: "text-pink-300", border: "border-pink-500/30", bar: "from-pink-400 to-pink-600", glow: "shadow-pink-500/25" },
      yellow: { bg: "bg-yellow-900/30", text: "text-yellow-300", border: "border-yellow-500/30", bar: "from-yellow-400 to-yellow-600", glow: "shadow-yellow-500/25" },
      red: { bg: "bg-red-900/30", text: "text-red-300", border: "border-red-500/30", bar: "from-red-400 to-red-600", glow: "shadow-red-500/25" },
      green: { bg: "bg-green-900/30", text: "text-green-300", border: "border-green-500/30", bar: "from-green-400 to-green-600", glow: "shadow-green-500/25" },
      indigo: { bg: "bg-indigo-900/30", text: "text-indigo-300", border: "border-indigo-500/30", bar: "from-indigo-400 to-indigo-600", glow: "shadow-indigo-500/25" },
      violet: { bg: "bg-violet-900/30", text: "text-violet-300", border: "border-violet-500/30", bar: "from-violet-400 to-violet-600", glow: "shadow-violet-500/25" },
      teal: { bg: "bg-teal-900/30", text: "text-teal-300", border: "border-teal-500/30", bar: "from-teal-400 to-teal-600", glow: "shadow-teal-500/25" }
    };
    return colorMap[color] || colorMap.blue;
  };

  // Funzioni per gestione contenuti
  const handleContentChange = (field, value) => {
    setEditableContent(prev => ({ ...prev, [field]: value }));
  };

  const saveChanges = () => {
    console.log('Saving changes:', editableContent);
    setIsEditing(false);
    alert('Changes saved successfully!');
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Floating Navbar che segue lo scroll */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-900/95 backdrop-blur-lg border-b border-gray-700/50 py-3' 
          : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo e brand */}
            <div className="flex items-center space-x-4">
              <a href="/" className="flex items-center space-x-3 text-green-400 hover:text-green-300 transition-colors duration-200">
                <ArrowLeft size={20} strokeWidth={1.5} />
                <span className="text-sm font-medium">Home</span>
              </a>
              
              <div className="hidden md:flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
                  <span className="text-white text-sm font-semibold">M</span>
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-white">MasteryHub</h1>
                  <p className="text-xs text-gray-400">Technical Skills</p>
                </div>
              </div>
            </div>

            {/* Navigation Links - mostrati solo quando scrolled */}
            {scrolled && (
              <div className="hidden lg:flex items-center space-x-8">
                {skillSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      activeSection === section.id 
                        ? 'text-green-400' 
                        : 'text-gray-300 hover:text-green-400'
                    }`}
                  >
                    <span className="mr-2">{section.icon}</span>
                    {section.title}
                  </button>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center space-x-3">
              {/* Toggle tema */}
              <button
                onClick={toggleDarkMode}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ${
                  isDarkMode ? 'bg-green-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
              
              {/* Admin controls */}
              <button
                onClick={() => setIsAdmin(!isAdmin)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                  isAdmin 
                    ? 'bg-green-600 text-white shadow-lg shadow-green-500/25' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Settings size={16} strokeWidth={1.5} />
                <span className="text-sm font-medium hidden sm:inline">Admin</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Sfondo con particelle animate */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-10 animate-pulse"
              style={{
                width: Math.random() * 6 + 2 + 'px',
                height: Math.random() * 6 + 2 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                background: [
                  '#60a5fa', '#fb923c', '#c084fc', '#67e8f9', '#f472b6', '#10b981'
                ][Math.floor(Math.random() * 6)],
                animationDelay: Math.random() * 3 + 's',
                animationDuration: (Math.random() * 3 + 2) + 's'
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            {isEditing ? (
              <input
                type="text"
                value={editableContent.heroTitle}
                onChange={(e) => handleContentChange('heroTitle', e.target.value)}
                className="text-5xl md:text-7xl font-bold bg-transparent border-b-2 border-green-500 text-center text-white outline-none w-full"
              />
            ) : (
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                {editableContent.heroTitle}
              </h1>
            )}
            
            {isEditing ? (
              <textarea
                value={editableContent.heroSubtitle}
                onChange={(e) => handleContentChange('heroSubtitle', e.target.value)}
                className="text-xl text-gray-300 max-w-3xl bg-transparent border border-green-400 p-4 rounded text-center resize-none outline-none w-full"
                rows="3"
              />
            ) : (
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {editableContent.heroSubtitle}
              </p>
            )}
          </div>

          {/* Admin controls per hero */}
          {isAdmin && (
            <div className="flex justify-center gap-4 mb-8">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/25"
                >
                  <Edit3 size={16} strokeWidth={1.5} />
                  <span>Edit Hero</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={saveChanges}
                    className="flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/25"
                  >
                    <Save size={16} strokeWidth={1.5} />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 bg-gray-700 hover:bg-gray-600 text-white"
                  >
                    <X size={16} strokeWidth={1.5} />
                    <span>Cancel</span>
                  </button>
                </>
              )}
            </div>
          )}

          {/* Scroll indicator */}
          <div className="flex flex-col items-center">
            <p className="text-gray-400 text-sm mb-4">Scroll to explore my skills</p>
            <button 
              onClick={() => scrollToSection('ai-ml')}
              className="animate-bounce"
            >
              <ChevronDown size={24} className="text-green-400" />
            </button>
          </div>
        </div>
      </section>

      {/* Skills Sections */}
      {skillSections.map((section, sectionIndex) => (
        <section 
          key={section.id} 
          id={section.id} 
          className="min-h-screen py-20 relative"
          style={{
            background: `linear-gradient(135deg, 
              rgba(${sectionIndex === 0 ? '59, 130, 246' : sectionIndex === 1 ? '16, 185, 129' : '139, 92, 246'}, 0.05) 0%, 
              rgba(0, 0, 0, 0.8) 50%, 
              rgba(${sectionIndex === 0 ? '147, 51, 234' : sectionIndex === 1 ? '59, 130, 246' : '236, 72, 153'}, 0.05) 100%)`
          }}
        >
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="text-6xl mr-4">{section.icon}</div>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  {section.title}
                </h2>
              </div>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {section.description}
              </p>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {section.skills.map((skill) => {
                const colors = getColorClasses(skill.color);
                return (
                  <div
                    key={skill.name}
                    className={`${colors.bg} rounded-2xl p-6 border ${colors.border} hover:scale-105 transition-all duration-300 backdrop-blur-sm hover:shadow-2xl ${colors.glow}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`text-xl font-bold ${colors.text}`}>{skill.name}</h3>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text} border ${colors.border}`}>
                        {skill.level}%
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                        <div 
                          className={`bg-gradient-to-r ${colors.bar} h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                          style={{ width: `${skill.level}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className={`${colors.text} opacity-75`}>Proficiency</span>
                        <span className={`${colors.text} font-medium`}>
                          {skill.level >= 90 ? 'Expert' : 
                           skill.level >= 80 ? 'Advanced' : 
                           skill.level >= 70 ? 'Intermediate' : 'Beginner'}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Projects Section */}
            <div className="bg-gray-800/30 rounded-3xl p-8 backdrop-blur-sm border border-gray-700/50">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Featured Projects</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {section.projects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50 hover:scale-105 transition-all duration-300 hover:shadow-xl"
                  >
                    <h4 className="text-xl font-bold text-green-400 mb-3">{project.title}</h4>
                    <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => {
                        const colors = getColorClasses(['blue', 'orange', 'purple', 'cyan'][tagIndex % 4]);
                        return (
                          <span 
                            key={tag} 
                            className={`${colors.bg} ${colors.text} text-xs px-3 py-1 rounded-full border ${colors.border} hover:scale-110 transition-transform cursor-default`}
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="relative bg-gradient-to-t from-black to-gray-900 text-white pt-16 pb-8">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-green-400"></div>
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and about section */}
            <div className="flex flex-col items-center md:items-start">
              <div className="mb-4">
                <Logo />
              </div>
              <h3 className="text-xl font-bold mb-2 text-green-400">Davide Taddia</h3>
              <p className="text-gray-300 text-sm text-center md:text-left">
                Computer Science Student & Developer specializing in AI, web development, and system architecture.
              </p>
            </div>

            {/* Explore section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Explore</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-300 hover:text-green-400 transition-colors">Home</a></li>
                <li><a href="/masteryhub" className="text-gray-300 hover:text-green-400 transition-colors">00 MasteryHub</a></li>
                <li><a href="/wikidedia" className="text-gray-300 hover:text-green-400 transition-colors">01 WikIDEDIA</a></li>
                <li><a href="/servicehub" className="text-gray-300 hover:text-green-400 transition-colors">02 ServiceHub</a></li>
              </ul>
            </div>

            {/* Connect section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://github.com/idediadev" className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-2">
                    <Github size={16} />GitHub
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/davidetaddia/" className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-2">
                    <Linkedin size={16} />LinkedIn
                  </a>
                </li>
                <li>
                  <a href="mailto:davide.taddia2@studio.unibo.it" className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-2">
                    <Mail size={16} />Email
                  </a>
                </li>
              </ul>
            </div>

            {/* Stay Updated section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Stay Updated</h3>
              <p className="text-gray-300 text-sm mb-4">Subscribe for updates on new skills and projects</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-green-400 focus:outline-none flex-1"
                />
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            {isEditing ? (
              <input
                type="text"
                value={editableContent.footerText}
                onChange={(e) => handleContentChange('footerText', e.target.value)}
                className="bg-transparent border-b border-green-400 text-center mb-2 outline-none text-white"
              />
            ) : (
              <p className="text-base md:text-lg mb-2">{editableContent.footerText}</p>
            )}
            <p className="text-xs md:text-sm text-gray-400">© 2025 Davide Taddia - All rights reserved</p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4">
              <a href="/" className="hover:text-green-400 transition-colors">Home</a>
              <a href="#hero" className="hover:text-green-400 transition-colors">Back to Top</a>
              <a href="/privacy" className="hover:text-green-400 transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MasteryHubPage;
