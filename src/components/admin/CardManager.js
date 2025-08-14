import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle, Edit, Plus, Trash, ArrowUp, ArrowDown, Link, Hash } from 'lucide-react';

const CardManager = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [showCardForm, setShowCardForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  
  // Animation shapes options
  const animationShapes = [
    { value: "animated-circle", label: "Circle", preview: "⭕" },
    { value: "animated-triangle", label: "Triangle", preview: "△" },
    { value: "animated-square", label: "Square", preview: "□" }
  ];
  
  // Form for new/edited card
  const emptyCard = {
    id: '',
    title: '',
    description: '',
    animatedShape: 'animated-circle',
    delay: 0,
    url: ''
  };
  
  const [formData, setFormData] = useState(emptyCard);

  // Load cards data on mount
  useEffect(() => {
    loadCards();
  }, []);

  // Load cards from localStorage
  const loadCards = () => {
    setIsLoading(true);
    try {
      // Try to get cards from localStorage
      const savedCards = localStorage.getItem('homePageCards');
      if (savedCards) {
        const parsedCards = JSON.parse(savedCards);
        setCards(parsedCards);
      } else {
        // If no saved cards, use default cards from App.js
        setCards(getDefaultCards());
      }
    } catch (error) {
      console.error('Error loading cards data:', error);
      setMessage({
        type: 'error',
        text: 'Failed to load cards data. Using default data instead.'
      });
      setCards(getDefaultCards());
    } finally {
      setIsLoading(false);
    }
  };

  // Default cards if none are found in storage
  const getDefaultCards = () => {
    return [
      {
        id: 'masteryhub',
        title: '00 MasteryHub',
        description: 'My skills span both front-end and back-end development, making me a versatile candidate for your computer engineering team. On the back end, I excel at addressing concurrency challenges and ensuring mutual exclusion—skills that are essential when developing components of operating systems and establishing reliable server-client communications over the TCP/IP protocol.',
        animatedShape: 'animated-circle',
        delay: 0,
        url: '/masteryhub'
      },
      {
        id: 'wikidedia',
        title: '01 WikIDEDIA',
        description: 'A comprehensive interactive encyclopedia platform where knowledge meets visualization. Create, explore and collaborate on topics spanning from computer science to mathematics, featuring interactive Python and Manim diagrams.',
        animatedShape: 'animated-triangle',
        delay: 0.2,
        url: '/wikidedia'
      },
      {
        id: 'servicehub',
        title: '02 ServiceHub',
        description: 'The services currently offered are still being defined; for now, our hamsters are hard at work.',
        animatedShape: 'animated-square',
        delay: 0.4,
        url: '/servicehub'
      }
    ];
  };

  // Save cards data to localStorage
  const saveCards = async () => {
    setIsLoading(true);
    setMessage(null);
    
    try {
      // Save cards to localStorage
      localStorage.setItem('homePageCards', JSON.stringify(cards));
      
      setMessage({
        type: 'success',
        text: 'Homepage cards saved successfully!'
      });
      
      // Auto-clear success message after 3 seconds
      setTimeout(() => {
        setMessage(prev => prev?.type === 'success' ? null : prev);
      }, 3000);
    } catch (error) {
      console.error('Error saving cards data:', error);
      setMessage({
        type: 'error',
        text: 'Failed to save cards data. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : value
    });
  };

  // Handle animation shape selection
  const handleAnimationSelect = (animationValue) => {
    setFormData({
      ...formData,
      animatedShape: animationValue
    });
  };

  // Initialize form for editing a card
  const handleEditCard = (card) => {
    setFormData({
      ...card
    });
    setEditingCard(card.id);
    setShowCardForm(true);
  };

  // Create new card
  const handleCreateNewCard = () => {
    setFormData({
      ...emptyCard,
      id: generateUniqueId()
    });
    setEditingCard(null);
    setShowCardForm(true);
  };

  // Generate a unique ID for new cards
  const generateUniqueId = () => {
    // Generate a simple ID based on current timestamp and a random number
    return `card-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  // Handle form submission
  const handleSubmitCard = () => {
    if (!formData.title.trim() || !formData.description.trim() || !formData.id.trim()) {
      setMessage({
        type: 'error',
        text: 'Title, ID, and description are required fields.'
      });
      return;
    }
    
    if (editingCard) {
      // Update existing card
      setCards(cards.map(card => 
        card.id === editingCard ? { ...formData } : card
      ));
    } else {
      // Add new card
      setCards([...cards, formData]);
    }
    
    setShowCardForm(false);
    setFormData(emptyCard);
    setEditingCard(null);
  };

  // Handle card deletion
  const handleDeleteCard = (cardId) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      setCards(cards.filter(card => card.id !== cardId));
    }
  };

  // Move card up in the order
  const handleMoveCardUp = (index) => {
    if (index === 0) return;
    
    const updatedCards = [...cards];
    [updatedCards[index - 1], updatedCards[index]] = [updatedCards[index], updatedCards[index - 1]];
    setCards(updatedCards);
  };

  // Move card down in the order
  const handleMoveCardDown = (index) => {
    if (index === cards.length - 1) return;
    
    const updatedCards = [...cards];
    [updatedCards[index], updatedCards[index + 1]] = [updatedCards[index + 1], updatedCards[index]];
    setCards(updatedCards);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
          onClick={handleCreateNewCard}
          className="px-4 py-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add New Card
        </button>
        
        <button
          onClick={saveCards}
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
      
      {/* Cards list */}
      {!showCardForm && (
        <div className="grid grid-cols-1 gap-4">
          {cards.length === 0 ? (
            <div className="bg-gray-800 p-8 rounded-lg text-center">
              <p className="text-gray-400 mb-4">No homepage cards found</p>
              <button
                onClick={handleCreateNewCard}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded inline-flex items-center"
              >
                <Plus size={18} className="mr-1" />
                Add First Card
              </button>
            </div>
          ) : (
            cards.map((card, index) => (
              <div 
                key={card.id} 
                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-white text-lg font-medium">
                        {card.title}
                      </h3>
                      <div className="flex items-center mt-1 space-x-3 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Hash size={14} className="mr-1" />
                          <span>{card.id}</span>
                        </div>
                        {card.url && (
                          <div className="flex items-center">
                            <Link size={14} className="mr-1" />
                            <span>{card.url}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-1">
                      {index > 0 && (
                        <button
                          onClick={() => handleMoveCardUp(index)}
                          className="p-1 bg-gray-700 hover:bg-gray-600 rounded"
                          title="Move up"
                        >
                          <ArrowUp size={16} className="text-gray-300" />
                        </button>
                      )}
                      
                      {index < cards.length - 1 && (
                        <button
                          onClick={() => handleMoveCardDown(index)}
                          className="p-1 bg-gray-700 hover:bg-gray-600 rounded"
                          title="Move down"
                        >
                          <ArrowDown size={16} className="text-gray-300" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleEditCard(card)}
                        className="p-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded"
                        title="Edit card"
                      >
                        <Edit size={16} />
                      </button>
                      
                      <button
                        onClick={() => handleDeleteCard(card.id)}
                        className="p-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded"
                        title="Delete card"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-1">
                      <p className="text-gray-300 text-sm mb-3 line-clamp-3">
                        {card.description.length > 200 
                          ? `${card.description.substring(0, 200)}...` 
                          : card.description}
                      </p>
                    </div>
                    
                    <div className="ml-4">
                      <div className="flex flex-col items-center">
                        <div className="text-2xl mb-1">
                          {animationShapes.find(s => s.value === card.animatedShape)?.preview || '⚪'}
                        </div>
                        <div className="text-xs text-gray-400">
                          Animation Delay: {card.delay}s
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      
      {/* Card form */}
      {showCardForm && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg text-white font-medium">
              {editingCard ? 'Edit Homepage Card' : 'Add New Homepage Card'}
            </h3>
            <button
              onClick={() => {
                setShowCardForm(false);
                setFormData(emptyCard);
                setEditingCard(null);
              }}
              className="p-1 hover:bg-gray-700 rounded"
            >
              <Trash size={20} className="text-gray-400" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Title */}
            <div>
              <label className="block text-gray-300 mb-2">Card Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                placeholder="e.g. 00 MasteryHub"
              />
            </div>
            
            {/* ID */}
            <div>
              <label className="block text-gray-300 mb-2">Card ID</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                placeholder="e.g. masteryhub"
                disabled={editingCard !== null}
              />
              <p className="text-xs text-gray-400 mt-1">
                Unique identifier used for routing. Cannot be changed after creation.
              </p>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
              placeholder="Card description text"
              rows="6"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* URL */}
            <div>
              <label className="block text-gray-300 mb-2">Page URL</label>
              <input
                type="text"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                placeholder="e.g. /masteryhub"
              />
              <p className="text-xs text-gray-400 mt-1">
                Where this card links to (usually /{"{id}"})
              </p>
            </div>
            
            {/* Animation Delay */}
            <div>
              <label className="block text-gray-300 mb-2">Animation Delay (seconds)</label>
              <input
                type="number"
                name="delay"
                value={formData.delay}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                placeholder="e.g. 0.2"
                step="0.1"
                min="0"
                max="2"
              />
            </div>
          </div>
          
          {/* Animation Shape Selection */}
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Animation Shape</label>
            <div className="grid grid-cols-3 gap-3">
              {animationShapes.map((shape) => (
                <button
                  key={shape.value}
                  type="button"
                  onClick={() => handleAnimationSelect(shape.value)}
                  className={`p-3 rounded-lg flex flex-col items-center justify-center ${
                    formData.animatedShape === shape.value
                      ? 'bg-blue-900/50 border-2 border-blue-500'
                      : 'bg-gray-700 border border-gray-600 hover:bg-gray-600'
                  }`}
                >
                  <span className="text-2xl mb-1">{shape.preview}</span>
                  <span className="text-xs text-gray-300">{shape.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Form actions */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setShowCardForm(false);
                setFormData(emptyCard);
                setEditingCard(null);
              }}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmitCard}
              disabled={!formData.title.trim() || !formData.description.trim() || !formData.id.trim()}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:opacity-50 text-white rounded flex items-center"
            >
              <Save size={18} className="mr-2" />
              {editingCard ? 'Update Card' : 'Add Card'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardManager;