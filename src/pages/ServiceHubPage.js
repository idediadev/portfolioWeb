/*
@author       : Davide Taddia
@version      : 0.1
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : ServiceHubPage component for the homepage. Must be edited
@email        : davide.taddia2@studio.unibo.it
*/
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, ChevronRight, ChevronLeft, Plus, Edit, Trash, X, Save, Check, Clock, Users, Database, Code, Brain } from 'lucide-react';
import '../styles/styles.css';
import useCardAnimation from '../components/AnimatioHandler';

const ServiceHubPage = () => {
  // Use the card animation hook
  useCardAnimation();
  
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true); // For testing purposes
  const [services, setServices] = useState([
    {
      id: 1,
      title: "Web Development",
      description: "Custom website and web application development using modern frameworks like React, TailwindCSS, and Node.js. Fully responsive, optimized for performance and search engines.",
      longDescription: "From concept to deployment, I offer end-to-end web development services tailored to your specific needs. Using React for interactive front-ends, TailwindCSS for beautiful, responsive designs, and Node.js for robust back-end functionality, I create web solutions that stand out.\n\nServices include:\n- Single Page Applications (SPAs)\n- Progressive Web Apps (PWAs)\n- E-commerce websites\n- Content Management Systems\n- Portfolio websites\n- Web-based dashboards and tools",
      icon: <Code size={32} className="text-emerald-300" />,
      price: "2000",
      currency: "USD",
      timeframe: "2-8 weeks",
      featured: true,
      technologies: ["React", "TailwindCSS", "Node.js", "Express", "MongoDB", "Firebase"],
      animatedShape: "animated-code-shape"
    },
    {
      id: 2,
      title: "Machine Learning Solutions",
      description: "Custom machine learning models for prediction, classification, and data analysis. Specializing in Python-based solutions with TensorFlow, PyTorch, and scikit-learn.",
      longDescription: "Leverage the power of artificial intelligence and machine learning to gain insights from your data and automate complex tasks. I specialize in developing custom machine learning models that solve real business problems.\n\nServices include:\n- Predictive analytics\n- Data classification and clustering\n- Natural Language Processing (NLP)\n- Computer Vision applications\n- Time series forecasting\n- Recommendation systems\n- Dataset preparation and cleaning",
      icon: <Brain size={32} className="text-emerald-300" />,
      price: "3500",
      currency: "USD",
      timeframe: "3-10 weeks",
      featured: true,
      technologies: ["Python", "TensorFlow", "PyTorch", "scikit-learn", "Pandas", "NumPy", "Jupyter"],
      animatedShape: "animated-brain-shape"
    },
    {
      id: 3,
      title: "Data Visualization",
      description: "Transform complex data into clear, interactive visualizations that tell a story. Using D3.js, Chart.js, and other modern visualization libraries to create impactful dashboards.",
      longDescription: "Data is only valuable when it can be understood. I create custom data visualizations that transform complex information into clear, actionable insights. Whether for internal dashboards or public-facing reports, my visualizations help you communicate data effectively.\n\nServices include:\n- Interactive dashboards\n- Real-time data visualization\n- Statistical charts and graphs\n- Geographic mapping\n- Infographics\n- Custom visualization libraries",
      icon: <Database size={32} className="text-emerald-300" />,
      price: "1800",
      currency: "USD",
      timeframe: "1-6 weeks",
      featured: false,
      technologies: ["D3.js", "Chart.js", "React", "SVG", "Canvas", "Python", "R"],
      animatedShape: "animated-data-shape"
    },
    {
      id: 4,
      title: "Technical Consulting",
      description: "Expert advice on technology selection, architecture design, and implementation strategies. Help with technical decisions, code reviews, and best practices.",
      longDescription: "Navigate the complex landscape of modern technology with expert guidance. Whether you're starting a new project, scaling an existing system, or addressing technical challenges, I provide clear, practical advice tailored to your specific situation.\n\nServices include:\n- Technology stack selection\n- System architecture design\n- Code reviews and quality assessment\n- Performance optimization\n- Technical strategy development\n- Team training and mentoring",
      icon: <Users size={32} className="text-emerald-300" />,
      price: "120",
      currency: "USD",
      timeframe: "Ongoing",
      featured: false,
      technologies: ["Architecture Design", "Code Review", "DevOps", "Security", "Performance", "Technical Documentation"],
      animatedShape: "animated-consulting-shape"
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddServiceForm, setShowAddServiceForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(4);
  
  // New service template
  const emptyService = {
    id: null,
    title: "",
    description: "",
    longDescription: "",
    icon: <Code size={32} className="text-emerald-300" />,
    price: "",
    currency: "USD",
    timeframe: "",
    featured: false,
    technologies: [],
    animatedShape: "animated-code-shape"
  };
  
  // Form state for adding/editing services
  const [formData, setFormData] = useState(emptyService);
  const [newTechnology, setNewTechnology] = useState('');
  
  // Icons mapping for services
  const iconOptions = [
    { value: "code", label: "Code", icon: <Code size={24} className="text-emerald-300" /> },
    { value: "brain", label: "AI/ML", icon: <Brain size={24} className="text-emerald-300" /> },
    { value: "database", label: "Database", icon: <Database size={24} className="text-emerald-300" /> },
    { value: "users", label: "Collaboration", icon: <Users size={24} className="text-emerald-300" /> },
    { value: "clock", label: "Time/Scheduling", icon: <Clock size={24} className="text-emerald-300" /> }
  ];
  
  // Animation shape options
  const animationOptions = [
    { value: "animated-code-shape", label: "Code Block", preview: "⬜" },
    { value: "animated-brain-shape", label: "Brain/AI", preview: "⭕" },
    { value: "animated-data-shape", label: "Data Bars", preview: "📊" },
    { value: "animated-consulting-shape", label: "Consulting", preview: "🔄" }
  ];
  
  // Currency options
  const currencyOptions = [
    { value: "USD", label: "USD ($)", symbol: "$" },
    { value: "EUR", label: "EUR (€)", symbol: "€" },
    { value: "GBP", label: "GBP (£)", symbol: "£" },
    { value: "JPY", label: "JPY (¥)", symbol: "¥" },
    { value: "CAD", label: "CAD (C$)", symbol: "C$" },
    { value: "AUD", label: "AUD (A$)", symbol: "A$" },
    { value: "CHF", label: "CHF (Fr)", symbol: "Fr" },
    { value: "CNY", label: "CNY (¥)", symbol: "¥" },
  ];
  
  // Apply theme and check system preferences on load
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);
    updateTheme(prefersDarkMode);
  }, []);
  
  // Apply theme to document
  const updateTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  };
  
  // Filter services based on search term
  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Get current services for pagination
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredServices.length / servicesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle icon selection
  const handleIconSelect = (iconValue) => {
    const selectedIcon = iconOptions.find(option => option.value === iconValue);
    if (selectedIcon) {
      setFormData({
        ...formData,
        iconType: iconValue,
        icon: selectedIcon.icon
      });
      
      // Suggest a matching animation shape based on icon
      if (iconValue === "code" && !formData.animatedShape) {
        setFormData(prev => ({
          ...prev,
          animatedShape: "animated-code-shape"
        }));
      } else if (iconValue === "brain" && !formData.animatedShape) {
        setFormData(prev => ({
          ...prev,
          animatedShape: "animated-brain-shape"
        }));
      } else if (iconValue === "database" && !formData.animatedShape) {
        setFormData(prev => ({
          ...prev,
          animatedShape: "animated-data-shape"
        }));
      } else if (iconValue === "users" && !formData.animatedShape) {
        setFormData(prev => ({
          ...prev,
          animatedShape: "animated-consulting-shape"
        }));
      }
    }
  };
  
  // Handle animation shape selection
  const handleAnimationSelect = (animationValue) => {
    setFormData({
      ...formData,
      animatedShape: animationValue
    });
  };
  
  // Add a technology to the service
  const handleAddTechnology = () => {
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newTechnology.trim()]
      });
      setNewTechnology('');
    }
  };
  
  // Remove a technology from the service
  const handleRemoveTechnology = (tech) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(t => t !== tech)
    });
  };
  
  // Set up form for editing a service
  const handleEditService = (service) => {
    // Find iconType based on service.icon
    const iconType = Object.keys(iconOptions).find(key => 
      iconOptions[key].icon.type === service.icon.type
    ) || 'code';
    
    setFormData({
      ...service,
      iconType
    });
    setEditingService(service.id);
    setShowAddServiceForm(true);
  };
  
  // Handle form submission
  const handleSubmitService = () => {
    if (formData.title.trim() && formData.description.trim()) {
      if (editingService) {
        // Update existing service
        setServices(services.map(service => 
          service.id === editingService ? { ...formData, id: service.id } : service
        ));
      } else {
        // Add new service
        const newService = {
          ...formData,
          id: Date.now()
        };
        setServices([...services, newService]);
      }
      handleCloseForm();
    }
  };
  
  // Handle service deletion
  const handleDeleteService = (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(service => service.id !== serviceId));
    }
  };
  
  // Reset and close form
  const handleCloseForm = () => {
    setFormData(emptyService);
    setEditingService(null);
    setShowAddServiceForm(false);
    setNewTechnology('');
  };
  
  // Function to get icon based on service type
  const getServiceIcon = (service) => {
    return service.icon || <Code size={32} className="text-emerald-300" />;
  };
  
  // Function to format price with currency
  const formatPrice = (price, currency, timeframe) => {
    const currencyInfo = currencyOptions.find(option => option.value === currency) || currencyOptions[0];
    const symbol = currencyInfo.symbol;
    
    // For Technical Consulting which is per hour
    if (price && timeframe === "Ongoing") {
      return `${symbol}${price}/hour`;
    }
    
    // For regular services
    return price ? `From ${symbol}${price}` : '';
  };
  
  // Function to render the data visualization bars
  const renderDataBars = () => {
    const bars = [];
    for (let i = 0; i < 8; i++) {
      const height = 30 + Math.random() * 70; // Random height between 30% and 100%
      bars.push(
        <div 
          key={i} 
          className="bar" 
          style={{ 
            height: `${height}%`, 
            '--delay': i 
          }}
        />
      );
    }
    return bars;
  };
  
  // CSS for custom animated shapes
  const serviceStyles = `
    /* Animated Shapes for Services */
    @keyframes gradient-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.8; filter: brightness(1); }
      50% { opacity: 1; filter: brightness(1.3); }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
    
    @keyframes data-wave {
      0% { transform: scaleY(0.5); }
      50% { transform: scaleY(1.2); }
      100% { transform: scaleY(0.5); }
    }
    
    .floating-element {
      animation: float 3s ease-in-out infinite;
    }
    
    .animated-code-shape {
      position: relative;
      width: 120px;
      height: 120px;
      background: linear-gradient(45deg, #00ff7f, #4F4A4A);
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: gradient-spin 8s linear infinite;
      overflow: hidden;
    }
    
    .animated-code-shape::before {
      content: '';
      position: absolute;
      width: 70%;
      height: 70%;
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 8px;
      z-index: 1;
    }
    
    .animated-code-shape::after {
      content: '<>';
      position: absolute;
      color: #00ff7f;
      font-size: 28px;
      font-weight: bold;
      z-index: 2;
      animation: pulse-glow 2s infinite;
    }
    
    .animated-brain-shape {
      position: relative;
      width: 120px;
      height: 120px;
      background: radial-gradient(circle, #00ff7f, #4F4A4A);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: pulse-glow 4s ease-in-out infinite;
      box-shadow: 0 0 20px rgba(0, 255, 127, 0.4);
    }
    
    .animated-brain-shape::before {
      content: '';
      position: absolute;
      width: 80%;
      height: 80%;
      border: 3px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      animation: gradient-spin 10s linear infinite;
    }
    
    .animated-data-shape {
      position: relative;
      width: 120px;
      height: 120px;
      background: transparent;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
    }
    
    .animated-data-shape::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: #00ff7f;
      bottom: 0;
    }
    
    .animated-data-shape::after {
      content: '';
      position: absolute;
      width: 2px;
      height: 100%;
      background-color: #00ff7f;
      left: 0;
    }
    
    .animated-data-shape .bar {
      width: 8px;
      height: 100%;
      background-color: #00ff7f;
      animation: data-wave 2s ease-in-out infinite;
      animation-delay: calc(var(--delay) * 0.2s);
      opacity: 0.7;
    }
    
    .animated-consulting-shape {
      position: relative;
      width: 120px;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .animated-consulting-shape::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border: 3px solid #00ff7f;
      border-radius: 10px;
      animation: gradient-spin 8s linear infinite;
    }
    
    .animated-consulting-shape::after {
      content: '';
      position: absolute;
      width: 70%;
      height: 70%;
      border: 3px dashed rgba(0, 255, 127, 0.7);
      border-radius: 10px;
      animation: gradient-spin 8s linear infinite reverse;
    }
  `;
  
  // Add the styles to the document
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = serviceStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'light bg-white text-gray-900'}`}>
      {/* Matrix effect background */}
      <div className="matrix"></div>
      
      {/* Header with navigation */}
      <header className="w-full navbar-gradient py-4 px-6 flex justify-between items-center">
        <a 
          href="/" 
          className="flex items-center text-emerald-300 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="mr-2" />
          <span>Back to Home</span>
        </a>
        <h1 className="text-2xl md:text-3xl font-bold text-emerald-300">ServiceHub</h1>
        <div className="w-24">
          {/* Admin toggle button (visible only for test purposes) */}
          {isAdmin && (
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className="text-emerald-300 hover:bg-emerald-900/30 p-2 rounded-lg"
              title="Toggle Admin Mode"
            >
              {isAdmin ? <Check size={20} /> : <Edit size={20} />}
            </button>
          )}
        </div>
      </header>
      
      {/* Main content container */}
      <main className="container mx-auto px-4 py-8">
        {/* Section title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-emerald-300 mb-4">Services Offered</h2>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
            Explore the professional services I offer, from web development to machine learning solutions.
          </p>
        </div>
        
        {/* Search and Admin Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          {/* Search bar */}
          <div className="relative mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg bg-neutral-800/50 text-white border border-neutral-700 focus:outline-none focus:border-emerald-500 w-full md:w-64"
            />
            <Search className="absolute left-3 top-2.5 text-emerald-300 w-5 h-5" />
          </div>
          
          {/* Admin controls */}
          {isAdmin && (
            <button
              onClick={() => {
                setFormData(emptyService);
                setEditingService(null);
                setShowAddServiceForm(true);
              }}
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              <Plus size={18} />
              <span>Add Service</span>
            </button>
          )}
        </div>
        
        {/* Services grid */}
        {currentServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentServices.map((service) => (
              <div 
                key={service.id} 
                className="service-card bg-neutral-800/30 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform flex flex-col md:flex-row card-trigger"
              >
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      {getServiceIcon(service)}
                      <h3 className="text-emerald-300 text-xl ml-3">{service.title}</h3>
                    </div>
                    
                    {/* Admin actions */}
                    {isAdmin && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditService(service)}
                          className="p-1.5 bg-blue-500/20 rounded-md hover:bg-blue-500/30 transition-colors"
                          title="Edit Service"
                        >
                          <Edit size={16} className="text-blue-400" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(service.id)}
                          className="p-1.5 bg-red-500/20 rounded-md hover:bg-red-500/30 transition-colors"
                          title="Delete Service"
                        >
                          <Trash size={16} className="text-red-400" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-white text-sm mb-4">
                    {service.description}
                  </p>
                  
                  <div className="flex justify-between text-sm text-emerald-100 mb-4">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      <span>{service.timeframe}</span>
                    </div>
                    <div>
                      <span className="font-semibold">{formatPrice(service.price, service.currency, service.timeframe)}</span>
                    </div>
                  </div>
                  
                  {/* Technologies used */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {service.technologies.slice(0, 5).map((tech, index) => (
                      <span 
                        key={index} 
                        className="bg-emerald-900/50 text-emerald-300 text-xs px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {service.technologies.length > 5 && (
                      <span className="bg-emerald-900/50 text-emerald-300 text-xs px-2 py-1 rounded">
                        +{service.technologies.length - 5} more
                      </span>
                    )}
                  </div>
                  
                  {/* View more details button */}
                  <button className="w-full mt-4 py-2 text-center border border-emerald-500 text-emerald-300 rounded-md hover:bg-emerald-900/30 transition-colors text-sm">
                    View Service Details
                  </button>
                </div>
                
                <div className="service-animation-container md:w-1/3 flex items-center justify-center p-4 md:p-6 floating-element">
                  {service.animatedShape === 'animated-data-shape' ? (
                    <div className={service.animatedShape}>
                      {renderDataBars()}
                    </div>
                  ) : (
                    <div className={service.animatedShape}></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-neutral-800/30 rounded-lg p-8 text-center">
            <p className="text-emerald-100">No services match your search criteria.</p>
          </div>
        )}
        
        {/* Pagination */}
        {filteredServices.length > servicesPerPage && (
          <div className="flex justify-center mt-8">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-l-md ${
                currentPage === 1 
                  ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed' 
                  : 'bg-emerald-900/50 text-emerald-300 hover:bg-emerald-900/70'
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            
            {Array.from({ length: Math.ceil(filteredServices.length / servicesPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 ${
                  currentPage === index + 1
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-900/50 text-emerald-300 hover:bg-emerald-900/70'
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={nextPage}
              disabled={currentPage === Math.ceil(filteredServices.length / servicesPerPage)}
              className={`p-2 rounded-r-md ${
                currentPage === Math.ceil(filteredServices.length / servicesPerPage)
                  ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
                  : 'bg-emerald-900/50 text-emerald-300 hover:bg-emerald-900/70'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </main>
      
      {/* Add/Edit Service Modal */}
      {showAddServiceForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-neutral-800 rounded-lg shadow-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl text-emerald-300">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button 
                onClick={handleCloseForm}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitService(); }}>
              {/* Title */}
              <div className="mb-4">
                <label className="block text-emerald-300 mb-2">Service Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-700 border border-neutral-600 rounded-lg p-3 text-white focus:border-emerald-300 focus:outline-none"
                  placeholder="Enter a detailed description"
                  rows="5"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Price */}
                <div>
                  <label className="block text-emerald-300 mb-2">Price</label>
                  <div className="flex">
                    <div className="w-2/3 mr-2">
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        min="0"
                        step="1"
                        className="w-full bg-neutral-700 border border-neutral-600 rounded-lg p-3 text-white focus:border-emerald-300 focus:outline-none"
                        placeholder="e.g. 2000"
                      />
                    </div>
                    <div className="w-1/3">
                      <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-700 border border-neutral-600 rounded-lg p-3 text-white focus:border-emerald-300 focus:outline-none"
                      >
                        {currencyOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Timeframe */}
                <div>
                  <label className="block text-emerald-300 mb-2">Timeframe</label>
                  <input
                    type="text"
                    name="timeframe"
                    value={formData.timeframe}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-700 border border-neutral-600 rounded-lg p-3 text-white focus:border-emerald-300 focus:outline-none"
                    placeholder="e.g. 2-8 weeks"
                  />
                </div>
              </div>
              
              {/* Featured Service */}
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-emerald-600 bg-neutral-700 border-neutral-600 rounded focus:ring-emerald-500"
                />
                <label htmlFor="featured" className="ml-2 text-emerald-300">
                  Featured Service (appears first)
                </label>
              </div>
              
              {/* Icon Selection */}
              <div className="mb-4">
                <label className="block text-emerald-300 mb-2">Service Icon</label>
                <div className="flex flex-wrap gap-3">
                  {iconOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleIconSelect(option.value)}
                      className={`p-3 rounded-lg flex flex-col items-center justify-center ${
                        formData.iconType === option.value
                          ? 'bg-emerald-900/50 border-2 border-emerald-500'
                          : 'bg-neutral-700 border border-neutral-600 hover:bg-neutral-600'
                      }`}
                    >
                      {option.icon}
                      <span className="text-xs mt-1 text-emerald-100">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Animation Shape Selection */}
              <div className="mb-4">
                <label className="block text-emerald-300 mb-2">Animation Style</label>
                <div className="flex flex-wrap gap-3">
                  {animationOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleAnimationSelect(option.value)}
                      className={`p-3 rounded-lg flex flex-col items-center justify-center ${
                        formData.animatedShape === option.value
                          ? 'bg-emerald-900/50 border-2 border-emerald-500'
                          : 'bg-neutral-700 border border-neutral-600 hover:bg-neutral-600'
                      }`}
                    >
                      <span className="text-2xl mb-1">{option.preview}</span>
                      <span className="text-xs text-emerald-100">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Technologies */}
              <div className="mb-6">
                <label className="block text-emerald-300 mb-2">Technologies Used</label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={newTechnology}
                    onChange={(e) => setNewTechnology(e.target.value)}
                    className="flex-grow bg-neutral-700 border border-neutral-600 rounded-lg p-3 text-white focus:border-emerald-300 focus:outline-none"
                    placeholder="Add a technology"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTechnology();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddTechnology}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-lg"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                
                {/* Display added technologies */}
                <div className="flex flex-wrap gap-2">
                  {formData.technologies.map((tech, index) => (
                    <div 
                      key={index} 
                      className="bg-emerald-900/50 text-emerald-300 text-sm px-2 py-1 rounded flex items-center gap-2"
                    >
                      {tech}
                      <button 
                        type="button"
                        onClick={() => handleRemoveTechnology(tech)}
                        className="text-emerald-300 hover:text-white"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="mr-2 px-4 py-2 border border-neutral-600 rounded-lg text-white hover:bg-neutral-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                >
                  {editingService ? 'Update Service' : 'Add Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="w-full mx-auto mt-12 footer-gradient">
        <div className="w-full h-full flex flex-col justify-center items-center text-white px-4 py-8 md:py-0 md:h-[150px]">
          <div className="text-center">
            <p className="text-base md:text-lg mb-2">Need a custom service? Let's discuss your project</p>
            <p className="text-xs md:text-sm">© 2025 Davide Taddia - All rights reserved</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4">
            <a href="/" className="hover:text-emerald-200 transition-colors">Home</a>
            <a href="/masteryhub" className="hover:text-emerald-200 transition-colors">MasteryHub</a>
            <a href="#top" className="hover:text-emerald-200 transition-colors">Back to Top</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServiceHubPage;