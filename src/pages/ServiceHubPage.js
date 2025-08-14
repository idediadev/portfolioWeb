/*
@author       : Davide Taddia
@version      : 1.2
@copyright    : IdediaDEV (Davide Taddia) - 2025  
@license      : GPL-3.0 
@description  : ServiceHub - Professional Services Page (FIXED)
@email        : davide.taddia2@studio.unibo.it
*/
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Settings, Edit3, Save, X, Github, Linkedin, Mail, ChevronDown, Code, Brain, Database, Users, Clock, Search, Plus, Trash2, Eye, EyeOff } from 'lucide-react';

const ServiceHubPage = () => {
  // Stati per gestione tema e admin
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPrices, setShowPrices] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);

  // Stati per contenuti modificabili
  const [editableContent, setEditableContent] = useState({
    heroTitle: "Professional Services",
    heroSubtitle: "Explore the professional services I offer, from web development to machine learning solutions.",
    footerText: "Need a custom service? Let's discuss your project"
  });

  // Servizi organizzati per categorie (ora modificabile)
  const [serviceCategories, setServiceCategories] = useState([
    {
      id: 'development',
      title: 'Development Services',
      icon: '💻',
      description: 'Custom web development and application solutions using modern technologies and frameworks.',
      services: [
        {
          id: 'web-dev',
          title: 'Web Development',
          description: 'Custom website and web application development using modern frameworks like React, Node.js, and TailwindCSS.',
          price: '$2000',
          timeframe: '2-8 weeks',
          technologies: ['React', 'Node.js', 'TailwindCSS', 'TypeScript', 'PostgreSQL'],
          featured: true,
          color: 'blue',
          icon: '🌐'
        },
        {
          id: 'mobile-dev',
          title: 'Mobile Development',
          description: 'Cross-platform mobile applications with React Native for iOS and Android.',
          price: '$3000',
          timeframe: '4-12 weeks',
          technologies: ['React Native', 'Expo', 'Firebase', 'Redux'],
          featured: false,
          color: 'green',
          icon: '📱'
        }
      ]
    },
    {
      id: 'ai-ml',
      title: 'AI & Machine Learning',
      icon: '🤖',
      description: 'Custom machine learning models and AI solutions for prediction, classification, and data analysis.',
      services: [
        {
          id: 'ml-models',
          title: 'Machine Learning Models',
          description: 'Custom machine learning models for prediction, classification, and data analysis using Python and TensorFlow.',
          price: '$2500',
          timeframe: '3-10 weeks',
          technologies: ['Python', 'TensorFlow', 'Scikit-Learn', 'Pandas', 'Jupyter'],
          featured: true,
          color: 'purple',
          icon: '🧠'
        },
        {
          id: 'data-viz',
          title: 'Data Visualization',
          description: 'Transform complex data into clear, interactive visualizations using D3.js, Chart.js, and modern libraries.',
          price: '$1800',
          timeframe: '1-6 weeks',
          technologies: ['D3.js', 'Chart.js', 'React', 'Python', 'R'],
          featured: false,
          color: 'cyan',
          icon: '📊'
        }
      ]
    },
    {
      id: 'consulting',
      title: 'Technical Consulting',
      icon: '👥',
      description: 'Expert advice on technology selection, architecture design, and implementation strategies.',
      services: [
        {
          id: 'tech-consulting',
          title: 'Technical Consulting',
          description: 'Expert advice on technology selection, architecture design, code reviews, and best practices.',
          price: '$120/hour',
          timeframe: 'Ongoing',
          technologies: ['Architecture Design', 'Code Review', 'DevOps', 'Security'],
          featured: false,
          color: 'orange',
          icon: '💡'
        }
      ]
    }
  ]);

  // Gestione scroll per navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      
      const sections = ['hero', 'development', 'ai-ml', 'consulting'];
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

  // Scroll to section con easing personalizzato
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = 1200;
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

  // Funzioni per editing
  const updateService = (categoryId, serviceId, updates) => {
    setServiceCategories(categories => 
      categories.map(category => 
        category.id === categoryId 
          ? {
              ...category,
              services: category.services.map(service =>
                service.id === serviceId ? { ...service, ...updates } : service
              )
            }
          : category
      )
    );
  };

  const addNewService = (categoryId) => {
    const newService = {
      id: `service-${Date.now()}`,
      title: 'New Service',
      description: 'Service description',
      price: '$0',
      timeframe: '1 week',
      technologies: ['Technology'],
      featured: false,
      color: 'blue',
      icon: '⚡'
    };

    setServiceCategories(categories =>
      categories.map(category =>
        category.id === categoryId
          ? { ...category, services: [...category.services, newService] }
          : category
      )
    );
  };

  const deleteService = (categoryId, serviceId) => {
    setServiceCategories(categories =>
      categories.map(category =>
        category.id === categoryId
          ? {
              ...category,
              services: category.services.filter(service => service.id !== serviceId)
            }
          : category
      )
    );
  };

  // Color mapping
  const getColorClasses = (color) => {
    const colorMap = {
      blue: { bg: "bg-blue-900/30", text: "text-blue-300", border: "border-blue-500/30", accent: "bg-blue-600" },
      green: { bg: "bg-green-900/30", text: "text-green-300", border: "border-green-500/30", accent: "bg-green-600" },
      purple: { bg: "bg-purple-900/30", text: "text-purple-300", border: "border-purple-500/30", accent: "bg-purple-600" },
      cyan: { bg: "bg-cyan-900/30", text: "text-cyan-300", border: "border-cyan-500/30", accent: "bg-cyan-600" },
      orange: { bg: "bg-orange-900/30", text: "text-orange-300", border: "border-orange-500/30", accent: "bg-orange-600" }
    };
    return colorMap[color] || colorMap.blue;
  };

  // Filtra servizi in base alla ricerca
  const filteredServices = serviceCategories.map(category => ({
    ...category,
    services: category.services.filter(service =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })).filter(category => category.services.length > 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Admin Panel Overlay */}
      {showAdminPanel && isAdmin && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-green-400">Admin Panel</h2>
              <button
                onClick={() => setShowAdminPanel(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content Management */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Hero Section</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                    <input
                      type="text"
                      value={editableContent.heroTitle}
                      onChange={(e) => setEditableContent(prev => ({ ...prev, heroTitle: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-green-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle</label>
                    <textarea
                      value={editableContent.heroSubtitle}
                      onChange={(e) => setEditableContent(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-green-400 focus:outline-none"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Price Visibility Control */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Display Settings</h3>
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <span className="text-white font-medium">Show Prices</span>
                    <p className="text-gray-400 text-sm">Toggle price visibility for all services</p>
                  </div>
                  <button
                    onClick={() => setShowPrices(!showPrices)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      showPrices ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'
                    }`}
                  >
                    {showPrices ? <Eye size={16} /> : <EyeOff size={16} />}
                    <span>{showPrices ? 'Hide' : 'Show'}</span>
                  </button>
                </div>
              </div>

              {/* Services Management */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Services Management</h3>
                {serviceCategories.map((category) => (
                  <div key={category.id} className="mb-4 p-4 bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-white">{category.title}</span>
                      <button
                        onClick={() => addNewService(category.id)}
                        className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                      >
                        <Plus size={14} />
                        <span>Add Service</span>
                      </button>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{category.services.length} services</p>
                    
                    <div className="space-y-2">
                      {category.services.map((service) => (
                        <div key={service.id} className="flex items-center justify-between p-2 bg-gray-600 rounded">
                          <span className="text-white text-sm">{service.title}</span>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingServiceId(editingServiceId === service.id ? null : service.id)}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={() => deleteService(category.id, service.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Save Changes */}
              <div className="flex space-x-4">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors">
                  Save All Changes
                </button>
                <button
                  onClick={() => setShowAdminPanel(false)}
                  className="px-6 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-900/95 backdrop-blur-lg border-b border-gray-700/50 py-3' 
          : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="/" className="flex items-center space-x-3 text-green-400 hover:text-green-300 transition-colors duration-200"> {/* ✅ LINK CORRETTO */}
                <ArrowLeft size={20} strokeWidth={1.5} />
                <span className="text-sm font-medium">Home</span>
              </a>
              
              <div className="hidden md:flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
                  <span className="text-white text-sm font-semibold">S</span>
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-white">ServiceHub</h1>
                  <p className="text-xs text-gray-400">Professional Services</p>
                </div>
              </div>
            </div>

            {scrolled && (
              <div className="hidden lg:flex items-center space-x-8">
                {serviceCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => scrollToSection(category.id)}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      activeSection === category.id 
                        ? 'text-green-400' 
                        : 'text-gray-300 hover:text-green-400'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.title}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-3">
              {isAdmin && (
                <button
                  onClick={() => setShowPrices(!showPrices)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                    showPrices 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {showPrices ? <Eye size={16} /> : <EyeOff size={16} />}
                  <span className="text-sm font-medium hidden sm:inline">Prices</span>
                </button>
              )}

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
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-10 animate-pulse"
              style={{
                width: Math.random() * 40 + 20 + 'px',
                height: Math.random() * 40 + 20 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                background: [
                  '#60a5fa', '#10b981', '#c084fc', '#06b6d4', '#f59e0b'
                ][Math.floor(Math.random() * 5)],
                borderRadius: Math.random() > 0.5 ? '50%' : '8px',
                animationDelay: Math.random() * 3 + 's',
                animationDuration: (Math.random() * 4 + 3) + 's'
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            {isEditing ? (
              <div className="space-y-4 mb-6">
                <input
                  type="text"
                  value={editableContent.heroTitle}
                  onChange={(e) => setEditableContent(prev => ({ ...prev, heroTitle: e.target.value }))}
                  className="w-full text-5xl md:text-7xl font-bold bg-transparent border-2 border-green-400 rounded-lg px-4 py-2 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
                />
                <textarea
                  value={editableContent.heroSubtitle}
                  onChange={(e) => setEditableContent(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                  className="w-full text-xl md:text-2xl bg-transparent border-2 border-green-400 rounded-lg px-4 py-2 text-center text-gray-300"
                  rows={3}
                />
              </div>
            ) : (
              <>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  {editableContent.heroTitle}
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                  {editableContent.heroSubtitle}
                </p>
              </>
            )}

            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-800/50 backdrop-blur-sm text-white border border-gray-600 focus:outline-none focus:border-green-400 transition-colors"
                />
                <Search className="absolute left-4 top-4 text-green-400 w-5 h-5" />
              </div>
            </div>
          </div>

          {isAdmin && (
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/25"
              >
                <Edit3 size={16} strokeWidth={1.5} />
                <span>{isEditing ? 'Save' : 'Edit Hero'}</span>
              </button>
              <button
                onClick={() => setShowAdminPanel(true)}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25"
              >
                <Settings size={16} strokeWidth={1.5} />
                <span>Admin Panel</span>
              </button>
            </div>
          )}

          <div className="flex flex-col items-center">
            <p className="text-gray-400 text-sm mb-4">Explore our services</p>
            <button 
              onClick={() => scrollToSection('development')}
              className="animate-bounce"
            >
              <ChevronDown size={24} className="text-green-400" />
            </button>
          </div>
        </div>
      </section>

      {/* Service Categories Sections */}
      {filteredServices.map((category, categoryIndex) => (
        <section 
          key={category.id} 
          id={category.id} 
          className="min-h-screen py-20 relative"
          style={{
            background: `linear-gradient(135deg, 
              rgba(${categoryIndex === 0 ? '59, 130, 246' : categoryIndex === 1 ? '139, 92, 246' : '16, 185, 129'}, 0.05) 0%, 
              rgba(0, 0, 0, 0.8) 50%, 
              rgba(${categoryIndex === 0 ? '16, 185, 129' : categoryIndex === 1 ? '59, 130, 246' : '139, 92, 246'}, 0.05) 100%)`
          }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="text-6xl mr-4">{category.icon}</div>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  {category.title}
                </h2>
                {isAdmin && (
                  <button
                    onClick={() => addNewService(category.id)}
                    className="ml-4 p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                )}
              </div>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {category.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {category.services.map((service) => {
                const colors = getColorClasses(service.color);
                const isEditingThis = editingServiceId === service.id;
                
                return (
                  <div
                    key={service.id}
                    className={`${colors.bg} rounded-2xl p-8 border ${colors.border} hover:scale-105 transition-all duration-300 backdrop-blur-sm hover:shadow-2xl relative overflow-hidden`}
                  >
                    {service.featured && (
                      <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                        Featured
                      </div>
                    )}

                    {isAdmin && (
                      <div className="absolute top-4 left-4 flex space-x-2">
                        <button
                          onClick={() => setEditingServiceId(isEditingThis ? null : service.id)}
                          className="p-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => deleteService(category.id, service.id)}
                          className="p-1 bg-red-600 hover:bg-red-700 text-white rounded"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}

                    <div className="text-4xl mb-4">{service.icon}</div>

                    <div className="mb-6">
                      {isEditingThis ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={service.title}
                            onChange={(e) => updateService(category.id, service.id, { title: e.target.value })}
                            className="w-full text-2xl font-bold bg-gray-700 text-white rounded px-3 py-2"
                          />
                          <textarea
                            value={service.description}
                            onChange={(e) => updateService(category.id, service.id, { description: e.target.value })}
                            className="w-full bg-gray-700 text-white rounded px-3 py-2"
                            rows={3}
                          />
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={service.price}
                              onChange={(e) => updateService(category.id, service.id, { price: e.target.value })}
                              className="flex-1 bg-gray-700 text-white rounded px-3 py-2"
                              placeholder="Price"
                            />
                            <input
                              type="text"
                              value={service.timeframe}
                              onChange={(e) => updateService(category.id, service.id, { timeframe: e.target.value })}
                              className="flex-1 bg-gray-700 text-white rounded px-3 py-2"
                              placeholder="Timeframe"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <h3 className={`text-2xl font-bold ${colors.text} mb-3`}>{service.title}</h3>
                          <p className="text-gray-300 leading-relaxed mb-4">
                            {service.description}
                          </p>
                          
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center text-gray-400">
                              <Clock size={16} className="mr-2" />
                              <span className="text-sm">{service.timeframe}</span>
                            </div>
                            <div className={`text-2xl font-bold ${colors.text}`}>
                              {showPrices || isAdmin ? service.price : '••••••'}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span 
                            key={tech} 
                            className={`${colors.bg} ${colors.text} text-xs px-3 py-1 rounded-full border ${colors.border} font-medium`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className={`w-full py-3 rounded-xl font-medium transition-all duration-200 ${colors.accent} hover:opacity-90 text-white shadow-lg`}>
                      Get Started
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="relative bg-gradient-to-t from-black to-gray-900 text-white pt-16 pb-8">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-green-400"></div>
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center md:items-start">
              <div className="mb-4">
                <div className="w-16 h-16 flex items-center justify-center text-green-400 font-bold text-xl bg-transparent rounded-full border-2 border-green-400">
                  <span className="font-mono">DT</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-green-400">Davide Taddia</h3>
              <p className="text-gray-300 text-sm text-center md:text-left">
                Professional development services from web applications to AI solutions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Services</h3>
              <ul className="space-y-2">
                <li><a href="#development" className="text-gray-300 hover:text-green-400 transition-colors">💻 Development</a></li>
                <li><a href="#ai-ml" className="text-gray-300 hover:text-green-400 transition-colors">🤖 AI & ML</a></li>
                <li><a href="#consulting" className="text-gray-300 hover:text-green-400 transition-colors">👥 Consulting</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-2">
                    <Github size={16} />GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-2">
                    <Linkedin size={16} />LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-2">
                    <Mail size={16} />Email
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Get Started</h3>
              <p className="text-gray-300 text-sm mb-4">Ready to discuss your project?</p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors w-full font-medium">
                Contact Me
              </button>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            {isEditing ? (
              <input
                type="text"
                value={editableContent.footerText}
                onChange={(e) => setEditableContent(prev => ({ ...prev, footerText: e.target.value }))}
                className="w-full max-w-md mx-auto bg-transparent border-2 border-green-400 rounded-lg px-4 py-2 text-center text-white mb-2"
              />
            ) : (
              <p className="text-base md:text-lg mb-2">{editableContent.footerText}</p>
            )}
            <p className="text-xs md:text-sm text-gray-400">© 2025 Davide Taddia - All rights reserved</p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4">
              <a href="#" className="hover:text-green-400 transition-colors">Home</a>
              <a href="#hero" className="hover:text-green-400 transition-colors">Back to Top</a>
              <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServiceHubPage; 