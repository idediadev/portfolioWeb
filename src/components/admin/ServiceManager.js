import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle, Edit, Plus, Trash, Eye, EyeOff, ArrowUp, ArrowDown, DollarSign, X } from 'lucide-react';

const ServiceManager = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [showServiceForm, setShowServiceForm] = useState(false);
  
  // Currency options - from ServiceHubPage
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
  
  // Animation shapes options - from ServiceHubPage
  const animationOptions = [
    { value: "animated-code-shape", label: "Code Block", preview: "⬜" },
    { value: "animated-brain-shape", label: "Brain/AI", preview: "⭕" },
    { value: "animated-data-shape", label: "Data Bars", preview: "📊" },
    { value: "animated-consulting-shape", label: "Consulting", preview: "🔄" }
  ];
  
  // Service icons - simplified version from ServiceHubPage
  const iconOptions = [
    { value: "code", label: "Code" },
    { value: "brain", label: "AI/ML" },
    { value: "database", label: "Database" },
    { value: "users", label: "Collaboration" },
    { value: "clock", label: "Time/Scheduling" }
  ];
  
  // Form for new/edited service
  const emptyService = {
    id: null,
    title: "",
    description: "",
    longDescription: "",
    iconType: "code",
    price: "",
    currency: "USD",
    timeframe: "",
    featured: false,
    technologies: [],
    animatedShape: "animated-code-shape"
  };
  
  const [formData, setFormData] = useState(emptyService);
  const [newTechnology, setNewTechnology] = useState('');

  // Load services data on mount
  useEffect(() => {
    loadServices();
  }, []);

  // Load services from storage
  const loadServices = () => {
    setIsLoading(true);
    try {
      // Try to get services from localStorage
      const savedServices = localStorage.getItem('serviceHubServices');
      if (savedServices) {
        const parsedServices = JSON.parse(savedServices);
        setServices(parsedServices);
      } else {
        // If no saved services found, use default services from ServiceHubPage
        setServices(getDefaultServices());
      }
    } catch (error) {
      console.error('Error loading services data:', error);
      setMessage({
        type: 'error',
        text: 'Failed to load services data. Using default data instead.'
      });
      setServices(getDefaultServices());
    } finally {
      setIsLoading(false);
    }
  };

  // Default services if none are found in storage
  const getDefaultServices = () => {
    return [
      {
        id: 1,
        title: "Web Development",
        description: "Custom website and web application development using modern frameworks like React, TailwindCSS, and Node.js. Fully responsive, optimized for performance and search engines.",
        longDescription: "From concept to deployment, I offer end-to-end web development services tailored to your specific needs. Using React for interactive front-ends, TailwindCSS for beautiful, responsive designs, and Node.js for robust back-end functionality, I create web solutions that stand out.",
        iconType: "code",
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
        longDescription: "Leverage the power of artificial intelligence and machine learning to gain insights from your data and automate complex tasks. I specialize in developing custom machine learning models that solve real business problems.",
        iconType: "brain",
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
        longDescription: "Data is only valuable when it can be understood. I create custom data visualizations that transform complex information into clear, actionable insights.",
        iconType: "database",
        price: "1800",
        currency: "USD",
        timeframe: "1-6 weeks",
        featured: false,
        technologies: ["D3.js", "Chart.js", "React", "SVG", "Canvas", "Python", "R"],
        animatedShape: "animated-data-shape"
      }
    ];
  };

  // Save services data to localStorage
  const saveServices = async () => {
    setIsLoading(true);
    setMessage(null);
    
    try {
      // Save services to localStorage
      localStorage.setItem('serviceHubServices', JSON.stringify(services));
      
      setMessage({
        type: 'success',
        text: 'Services saved successfully!'
      });
      
      // Auto-clear success message after 3 seconds
      setTimeout(() => {
        setMessage(prev => prev?.type === 'success' ? null : prev);
      }, 3000);
    } catch (error) {
      console.error('Error saving services data:', error);
      setMessage({
        type: 'error',
        text: 'Failed to save services data. Please try again.'
      });
    } finally {
      setIsLoading(false);
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
    setFormData({
      ...formData,
      iconType: iconValue
    });
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

  // Initialize form for editing a service
  const handleEditService = (service) => {
    setFormData({
      ...service
    });
    setEditingService(service.id);
    setShowServiceForm(true);
  };

  // Create new service
  const handleCreateNewService = () => {
    setFormData(emptyService);
    setEditingService(null);
    setShowServiceForm(true);
  };

  // Handle form submission
  const handleSubmitService = () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      setMessage({
        type: 'error',
        text: 'Title and description are required fields.'
      });
      return;
    }
    
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
    
    setShowServiceForm(false);
    setFormData(emptyService);
    setEditingService(null);
  };

  // Handle service deletion
  const handleDeleteService = (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(service => service.id !== serviceId));
    }
  };

  // Move service up in the order
  const handleMoveServiceUp = (index) => {
    if (index === 0) return;
    
    const updatedServices = [...services];
    [updatedServices[index - 1], updatedServices[index]] = [updatedServices[index], updatedServices[index - 1]];
    setServices(updatedServices);
  };

  // Move service down in the order
  const handleMoveServiceDown = (index) => {
    if (index === services.length - 1) return;
    
    const updatedServices = [...services];
    [updatedServices[index], updatedServices[index + 1]] = [updatedServices[index + 1], updatedServices[index]];
    setServices(updatedServices);
  };

  // Format price with currency
  const formatPrice = (price, currency) => {
    if (!price) return '';
    
    const currencyInfo = currencyOptions.find(option => option.value === currency) || currencyOptions[0];
    return `${currencyInfo.symbol}${price}`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Status messages */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-center ${
          message.type === 'success' 
            ? 'bg-green-900/30 border border-green-500/30 text-green-400' 
            : 'bg-red-900/30 border border-red-500/30 text-red-400'
        }`}>
          {message.type === 'success' ? 
            <CheckCircle size={20} className="mr-3 flex-shrink-0" /> : 
            <AlertCircle size={20} className="mr-3 flex-shrink-0" />
          }
          <span>{message.text}</span>
        </div>
      )}
      
      {/* Top actions */}
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={handleCreateNewService}
          className="px-4 py-2 bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 rounded flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add New Service
        </button>
        
        <button
          onClick={saveServices}
          disabled={isLoading}
          className="px-6 py-2 bg-green-600 hover:bg-green-500 disabled:opacity-70 text-white rounded-lg flex items-center"
        >
          {isLoading ? (
            <span className="flex items-center">
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Saving...
            </span>
          ) : (
            <>
              <Save size={18} className="mr-2" />
              Save Changes
            </>
          )}
        </button>
      </div>
      
      {/* Services list */}
      {!showServiceForm && (
        <div className="grid grid-cols-1 gap-4">
          {services.length === 0 ? (
            <div className="bg-gray-800 p-8 rounded-lg text-center">
              <p className="text-gray-400 mb-4">No services found</p>
              <button
                onClick={handleCreateNewService}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded inline-flex items-center"
              >
                <Plus size={18} className="mr-1" />
                Add First Service
              </button>
            </div>
          ) : (
            services.map((service, index) => (
              <div 
                key={service.id} 
                className={`bg-gray-800 rounded-lg overflow-hidden border ${
                  service.featured ? 'border-purple-500' : 'border-gray-700'
                }`}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Service details */}
                  <div className="p-4 flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-white text-lg font-medium">
                        {service.title}
                        {service.featured && (
                          <span className="ml-2 px-2 py-0.5 bg-purple-900/50 text-purple-400 text-xs rounded">
                            Featured
                          </span>
                        )}
                      </h3>
                      
                      <div className="flex space-x-1">
                        {index > 0 && (
                          <button
                            onClick={() => handleMoveServiceUp(index)}
                            className="p-1 bg-gray-700 hover:bg-gray-600 rounded"
                            title="Move up"
                          >
                            <ArrowUp size={16} className="text-gray-300" />
                          </button>
                        )}
                        
                        {index < services.length - 1 && (
                          <button
                            onClick={() => handleMoveServiceDown(index)}
                            className="p-1 bg-gray-700 hover:bg-gray-600 rounded"
                            title="Move down"
                          >
                            <ArrowDown size={16} className="text-gray-300" />
                          </button>
                        )}
                        
                        <button
                          onClick={() => handleEditService(service)}
                          className="p-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded"
                          title="Edit service"
                        >
                          <Edit size={16} />
                        </button>
                        
                        <button
                          onClick={() => handleDeleteService(service.id)}
                          className="p-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded"
                          title="Delete service"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-3">
                      {service.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <div className="text-sm text-gray-400 flex items-center">
                        <DollarSign size={14} className="mr-1" />
                        {formatPrice(service.price, service.currency)}
                      </div>
                      
                      <div className="text-sm text-gray-400">
                        {service.timeframe}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {service.technologies.slice(0, 5).map((tech, i) => (
                        <span key={i} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                      {service.technologies.length > 5 && (
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                          +{service.technologies.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Animation shape indicator */}
                  <div className="bg-gray-700 p-4 md:w-1/6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl mb-1">
                        {animationOptions.find(o => o.value === service.animatedShape)?.preview || '🔶'}
                      </div>
                      <div className="text-xs text-gray-400">
                        {service.iconType}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      
      {/* Service form */}
      {showServiceForm && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg text-white font-medium">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h3>
            <button
              onClick={() => {
                setShowServiceForm(false);
                setFormData(emptyService);
                setEditingService(null);
              }}
              className="p-1 hover:bg-gray-700 rounded"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Title */}
            <div>
              <label className="block text-gray-300 mb-2">Service Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                placeholder="e.g. Web Development"
              />
            </div>
            
            {/* Featured toggle */}
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className={`w-12 h-6 rounded-full relative ${
                  formData.featured ? 'bg-purple-600' : 'bg-gray-600'
                }`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full transition-transform ${
                    formData.featured ? 'bg-white translate-x-7' : 'bg-gray-400 translate-x-1'
                  }`} />
                </div>
                <span className="ml-3 text-gray-300">Featured Service</span>
              </label>
            </div>
          </div>
          
          {/* Short Description */}
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Short Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
              placeholder="Brief description of the service (displayed in cards)"
              rows="3"
            />
          </div>
          
          {/* Long Description */}
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Long Description</label>
            <textarea
              name="longDescription"
              value={formData.longDescription}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
              placeholder="Detailed description of the service (for details view)"
              rows="5"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Price */}
            <div>
              <label className="block text-gray-300 mb-2">Price</label>
              <div className="flex">
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-2/3 bg-gray-700 border border-gray-600 rounded-l p-2 text-white"
                  placeholder="e.g. 2000"
                  min="0"
                />
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="w-1/3 bg-gray-700 border border-gray-600 border-l-0 rounded-r p-2 text-white"
                >
                  {currencyOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Timeframe */}
            <div>
              <label className="block text-gray-300 mb-2">Timeframe</label>
              <input
                type="text"
                name="timeframe"
                value={formData.timeframe}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                placeholder="e.g. 2-4 weeks"
              />
            </div>
            
            {/* Icon Selection */}
            <div>
              <label className="block text-gray-300 mb-2">Service Icon</label>
              <select
                name="iconType"
                value={formData.iconType}
                onChange={(e) => handleIconSelect(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
              >
                {iconOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Animation Shape Selection */}
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Animation Style</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {animationOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleAnimationSelect(option.value)}
                  className={`p-3 rounded-lg flex flex-col items-center justify-center ${
                    formData.animatedShape === option.value
                      ? 'bg-purple-900/50 border-2 border-purple-500'
                      : 'bg-gray-700 border border-gray-600 hover:bg-gray-600'
                  }`}
                >
                  <span className="text-2xl mb-1">{option.preview}</span>
                  <span className="text-xs text-gray-300">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Technologies */}
          <div className="mb-8">
            <label className="block text-gray-300 mb-2">Technologies Used</label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                className="flex-grow bg-gray-700 border border-gray-600 rounded p-2 text-white"
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
                className="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded"
              >
                <Plus size={20} />
              </button>
            </div>
            
            {/* Display added technologies */}
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech, index) => (
                <div 
                  key={index} 
                  className="bg-gray-700 text-gray-300 text-sm px-2 py-1 rounded flex items-center gap-2"
                >
                  {tech}
                  <button 
                    type="button"
                    onClick={() => handleRemoveTechnology(tech)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Form actions */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setShowServiceForm(false);
                setFormData(emptyService);
                setEditingService(null);
              }}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmitService}
              disabled={!formData.title.trim() || !formData.description.trim()}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 disabled:opacity-50 text-white rounded flex items-center"
            >
              <Save size={18} className="mr-2" />
              {editingService ? 'Update Service' : 'Add Service'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManager;