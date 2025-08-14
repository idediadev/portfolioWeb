import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle, Edit, Plus, Trash, ChevronDown, ChevronUp } from 'lucide-react';

const SkillManager = () => {
  const [slides, setSlides] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [expandedSlide, setExpandedSlide] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const [newSkillModalOpen, setNewSkillModalOpen] = useState(false);
  const [newSlideModalOpen, setNewSlideModalOpen] = useState(false);
  
  // Skill levels definition - replicated from MasteryHub
  const skillLevels = {
    JUNIOR: { label: "Junior", value: 25, color: "bg-blue-400" },
    INTERMEDIATE: { label: "Intermediate", value: 50, color: "bg-green-400" },
    ADVANCED: { label: "Advanced", value: 75, color: "bg-yellow-400" },
    EXPERT: { label: "Expert", value: 90, color: "bg-red-400" }
  };
  
  // New skill form data
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: skillLevels.JUNIOR,
    icon: null
  });
  
  // New slide form data
  const [newSlide, setNewSlide] = useState({
    title: '',
    description: '',
    icon: null
  });

  // Load skills data from localStorage on mount
  useEffect(() => {
    // In a real app, this would be an API call
    try {
      // Try to get slides from localStorage
      const savedSlides = localStorage.getItem('masteryHubSlides');
      if (savedSlides) {
        const parsedSlides = JSON.parse(savedSlides);
        setSlides(parsedSlides);
      } else {
        // If no saved slides, use default slides from MasteryHubPage
        setSlides(getDefaultSlides());
      }
    } catch (error) {
      console.error('Error loading skills data:', error);
      setMessage({
        type: 'error',
        text: 'Failed to load skills data. Using default data instead.'
      });
      setSlides(getDefaultSlides());
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get default slides if none are found in storage
  const getDefaultSlides = () => {
    // This is the same default data from MasteryHubPage
    return [
      {
        title: "AI & Machine Learning",
        description: "Development of machine learning solutions for regression and classification problems. Implementation of neural networks and data analysis with Pandas and NumPy. Experience with dataset manipulation and statistical modeling.",
        skills: [
          { name: "Python", level: skillLevels.EXPERT },
          { name: "TensorFlow", level: skillLevels.ADVANCED },
          { name: "Pandas/NumPy", level: skillLevels.ADVANCED },
          { name: "Scikit-Learn", level: skillLevels.INTERMEDIATE },
          { name: "Machine Learning Models", level: skillLevels.ADVANCED }
        ]
      },
      {
        title: "Front-End Development",
        description: "Specialized in developing modern and reactive interfaces with React.js and TailwindCSS. Creation of reusable and performance-optimized components, with particular attention to user experience and accessibility.",
        skills: [
          { name: "React", level: skillLevels.EXPERT },
          { name: "JavaScript", level: skillLevels.ADVANCED },
          { name: "HTML5/CSS3", level: skillLevels.EXPERT },
          { name: "TailwindCSS", level: skillLevels.ADVANCED }
        ]
      },
      {
        title: "Back-End Development",
        description: "Implementation of robust and scalable servers with Java and Node.js. Development of efficient and secure systems. Management of concurrency and mutual exclusion for reliable and high-performance systems.",
        skills: [
          { name: "Java", level: skillLevels.ADVANCED },
          { name: "C", level: skillLevels.ADVANCED },
          { name: "Node.js", level: skillLevels.INTERMEDIATE },
          { name: "Spring Boot", level: skillLevels.INTERMEDIATE }
        ]
      }
    ];
  };

  // Save slides data to localStorage
  const saveSlides = async () => {
    setIsLoading(true);
    setMessage(null);
    
    try {
      // Save slides to localStorage
      localStorage.setItem('masteryHubSlides', JSON.stringify(slides));
      
      setMessage({
        type: 'success',
        text: 'Skills data saved successfully!'
      });
      
      // Auto-clear success message after 3 seconds
      setTimeout(() => {
        setMessage(prev => prev?.type === 'success' ? null : prev);
      }, 3000);
    } catch (error) {
      console.error('Error saving skills data:', error);
      setMessage({
        type: 'error',
        text: 'Failed to save skills data. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle slide expansion
  const toggleSlideExpansion = (index) => {
    setExpandedSlide(expandedSlide === index ? null : index);
  };

  // Change skill level
  const handleChangeSkillLevel = (slideIndex, skillIndex, newLevel) => {
    const updatedSlides = [...slides];
    updatedSlides[slideIndex].skills[skillIndex].level = newLevel;
    setSlides(updatedSlides);
  };

  // Add new skill to slide
  const handleAddSkill = (slideIndex) => {
    if (!newSkill.name.trim()) return;
    
    const updatedSlides = [...slides];
    updatedSlides[slideIndex].skills.push({
      name: newSkill.name,
      level: newSkill.level
    });
    
    setSlides(updatedSlides);
    setNewSkill({ name: '', level: skillLevels.JUNIOR, icon: null });
    setNewSkillModalOpen(false);
  };

  // Delete skill from slide
  const handleDeleteSkill = (slideIndex, skillIndex) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    
    const updatedSlides = [...slides];
    updatedSlides[slideIndex].skills.splice(skillIndex, 1);
    setSlides(updatedSlides);
  };

  // Add new slide
  const handleAddSlide = () => {
    if (!newSlide.title.trim() || !newSlide.description.trim()) return;
    
    const slide = {
      title: newSlide.title,
      description: newSlide.description,
      skills: []
    };
    
    setSlides([...slides, slide]);
    setNewSlide({ title: '', description: '', icon: null });
    setNewSlideModalOpen(false);
    setExpandedSlide(slides.length); // Expand the new slide
  };

  // Delete slide
  const handleDeleteSlide = (slideIndex) => {
    if (!window.confirm('Are you sure you want to delete this skill category?')) return;
    
    const updatedSlides = [...slides];
    updatedSlides.splice(slideIndex, 1);
    setSlides(updatedSlides);
    
    // Adjust active slide if necessary
    if (activeSlide >= updatedSlides.length) {
      setActiveSlide(Math.max(0, updatedSlides.length - 1));
    }
  };

  // Update slide details
  const handleUpdateSlide = (slideIndex, field, value) => {
    const updatedSlides = [...slides];
    updatedSlides[slideIndex][field] = value;
    setSlides(updatedSlides);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Render the New Skill Modal
  const renderNewSkillModal = (slideIndex) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 className="text-white text-xl mb-4">Add New Skill</h3>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Skill Name</label>
          <input
            type="text"
            value={newSkill.name}
            onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
            className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
            placeholder="e.g. JavaScript"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Skill Level</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(skillLevels).map((level) => (
              <button
                key={level.label}
                onClick={() => setNewSkill({...newSkill, level})}
                className={`p-2 rounded flex items-center justify-between ${
                  newSkill.level.label === level.label 
                    ? `${level.color} text-white` 
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                <span>{level.label}</span>
                <span className="text-xs">{level.value}%</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => setNewSkillModalOpen(false)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => handleAddSkill(slideIndex)}
            disabled={!newSkill.name.trim()}
            className="px-4 py-2 bg-green-600 hover:bg-green-500 disabled:bg-green-800 disabled:opacity-50 text-white rounded flex items-center"
          >
            <Plus size={18} className="mr-1" />
            Add Skill
          </button>
        </div>
      </div>
    </div>
  );

  // Render the New Slide Modal
  const renderNewSlideModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 className="text-white text-xl mb-4">Add New Skill Category</h3>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Category Title</label>
          <input
            type="text"
            value={newSlide.title}
            onChange={(e) => setNewSlide({...newSlide, title: e.target.value})}
            className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
            placeholder="e.g. Mobile Development"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Description</label>
          <textarea
            value={newSlide.description}
            onChange={(e) => setNewSlide({...newSlide, description: e.target.value})}
            className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white h-24"
            placeholder="Describe this skill category"
          />
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => setNewSlideModalOpen(false)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleAddSlide}
            disabled={!newSlide.title.trim() || !newSlide.description.trim()}
            className="px-4 py-2 bg-green-600 hover:bg-green-500 disabled:bg-green-800 disabled:opacity-50 text-white rounded flex items-center"
          >
            <Plus size={18} className="mr-1" />
            Add Category
          </button>
        </div>
      </div>
    </div>
  );

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
      
      {/* Save button */}
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={() => setNewSlideModalOpen(true)}
          className="px-4 py-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add New Category
        </button>
        
        <button
          onClick={saveSlides}
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
      
      {/* Slides/Categories */}
      <div className="space-y-6">
        {slides.length === 0 ? (
          <div className="bg-gray-800 p-8 rounded-lg text-center">
            <p className="text-gray-400 mb-4">No skill categories found</p>
            <button
              onClick={() => setNewSlideModalOpen(true)}
              className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded inline-flex items-center"
            >
              <Plus size={18} className="mr-1" />
              Add First Category
            </button>
          </div>
        ) : (
          slides.map((slide, slideIndex) => (
            <div 
              key={slideIndex} 
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700"
            >
              {/* Slide header */}
              <div 
                className="bg-gray-700 p-4 cursor-pointer flex justify-between items-center"
                onClick={() => toggleSlideExpansion(slideIndex)}
              >
                <div className="flex items-center">
                  {expandedSlide === slideIndex ? 
                    <ChevronUp size={20} className="text-green-400 mr-2" /> : 
                    <ChevronDown size={20} className="text-gray-400 mr-2" />
                  }
                  <h3 className="text-white text-lg font-medium">
                    {slide.title}
                  </h3>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSlide(slideIndex);
                  }}
                  className="p-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded"
                >
                  <Trash size={16} />
                </button>
              </div>
              
              {/* Expanded content */}
              {expandedSlide === slideIndex && (
                <div className="p-4">
                  {/* Edit title & description */}
                  <div className="mb-4 space-y-3">
                    <div>
                      <label className="block text-gray-300 text-sm mb-1">Category Title</label>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => handleUpdateSlide(slideIndex, 'title', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-1">Description</label>
                      <textarea
                        value={slide.description}
                        onChange={(e) => handleUpdateSlide(slideIndex, 'description', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white h-24"
                      />
                    </div>
                  </div>
                  
                  {/* Skills list */}
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-white">Skills</h4>
                      <button
                        onClick={() => {
                          setNewSkill({ name: '', level: skillLevels.JUNIOR, icon: null });
                          setNewSkillModalOpen(slideIndex);
                        }}
                        className="px-3 py-1 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded text-sm flex items-center"
                      >
                        <Plus size={14} className="mr-1" />
                        Add Skill
                      </button>
                    </div>
                    
                    {slide.skills.length === 0 ? (
                      <p className="text-gray-400 text-sm py-2">No skills added yet</p>
                    ) : (
                      <div className="space-y-4">
                        {slide.skills.map((skill, skillIndex) => (
                          <div key={skillIndex} className="bg-gray-700 p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center">
                                <span className="text-white">{skill.name}</span>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <span className={`text-xs px-2 py-1 rounded ${skill.level.color} text-white`}>
                                  {skill.level.label}
                                </span>
                                <button
                                  onClick={() => handleDeleteSkill(slideIndex, skillIndex)}
                                  className="p-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded"
                                >
                                  <Trash size={14} />
                                </button>
                              </div>
                            </div>
                            
                            {/* Skill level selection */}
                            <div className="flex flex-wrap gap-1 mt-2">
                              {Object.values(skillLevels).map((level) => (
                                <button
                                  key={level.label}
                                  onClick={() => handleChangeSkillLevel(slideIndex, skillIndex, level)}
                                  className={`px-2 py-1 rounded text-xs ${
                                    skill.level.label === level.label 
                                    ? `${level.color} text-white` 
                                    : 'bg-gray-600 text-gray-300'
                                  }`}
                                >
                                  {level.label}
                                </button>
                              ))}
                            </div>
                            
                            {/* Skill level bar */}
                            <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                              <div 
                                className={`${skill.level.color} h-2 rounded-full`}
                                style={{ width: `${skill.level.value}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      {/* New skill modal */}
      {newSkillModalOpen !== false && renderNewSkillModal(newSkillModalOpen)}
      
      {/* New slide modal */}
      {newSlideModalOpen && renderNewSlideModal()}
    </div>
  );
};

export default SkillManager;