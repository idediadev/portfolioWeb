import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const ContactForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    budget: '',
    services: []
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return {
          ...prev,
          services: [...prev.services, value]
        };
      } else {
        return {
          ...prev,
          services: prev.services.filter(service => service !== value)
        };
      }
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // For demo/testing purposes - simulate sending email
    setTimeout(() => {
      console.log('Form data to be sent:', formData);
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset form after 3 seconds and close
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);
    }, 1500);

    // For a real implementation without EmailJS, you could use:
    // 1. Formspree (add this form action):
    // <form action="https://formspree.io/f/yourformid" method="POST">
    
    // 2. Or a simple mailto link for simple cases (not recommended for production)
    // window.location.href = `mailto:davidetaddia95@gmail.com?subject=Hire Request from ${formData.name}&body=${encodeURIComponent(
    //   `Name: ${formData.name}\nEmail: ${formData.email}\nServices: ${formData.services.join(', ')}\nBudget: ${formData.budget}\n\nMessage: ${formData.message}`
    // )}`;
  };
  
  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
        <div className="bg-neutral-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="text-emerald-300 text-6xl mb-4">✓</div>
          <h2 className="text-emerald-300 text-2xl mb-4">Thank You!</h2>
          <p className="text-white mb-6">Your message has been sent successfully to davidetaddia95@gmail.com. I'll get back to you shortly.</p>
          <div className="w-full bg-gray-700 h-2 rounded-full">
            <div className="bg-emerald-300 h-2 rounded-full animate-shrink"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-neutral-800 p-6 md:p-8 rounded-lg shadow-lg max-w-3xl w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 text-emerald-300 hover:text-emerald-400 transition-colors focus:outline-none"
        >
          <ArrowLeft size={24} />
        </button>
        
        <div className="text-center mb-8 pt-6">
          <h2 className="text-emerald-300 text-3xl md:text-4xl mb-2">Hire Me</h2>
          <p className="text-white opacity-80">Let's collaborate on your next project</p>
        </div>
        
        {/* Using Formspree as an alternative to EmailJS */}
        <form 
          action="https://formspree.io/f/xqkvnjyj" // Replace with your Formspree form ID
          method="POST"
          onSubmit={handleSubmit} 
          className="space-y-6"
        >
          <input type="hidden" name="_subject" value="New portfolio contact request" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-emerald-300 mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-neutral-700 border border-neutral-600 rounded-lg p-3 text-white focus:border-emerald-300 focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-emerald-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-neutral-700 border border-neutral-600 rounded-lg p-3 text-white focus:border-emerald-300 focus:outline-none transition-colors"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-emerald-300 mb-2">Services Needed</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="flex items-center space-x-3 p-3 bg-neutral-700 rounded-lg cursor-pointer hover:bg-neutral-600 transition-colors">
                <input
                  type="checkbox"
                  name="services"
                  value="Web Development"
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-emerald-300 rounded focus:ring-emerald-300"
                />
                <span className="text-white">Web Development</span>
              </label>
              
              <label className="flex items-center space-x-3 p-3 bg-neutral-700 rounded-lg cursor-pointer hover:bg-neutral-600 transition-colors">
                <input
                  type="checkbox"
                  name="services"
                  value="Mobile App"
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-emerald-300 rounded focus:ring-emerald-300"
                />
                <span className="text-white">Mobile App</span>
              </label>
              
              <label className="flex items-center space-x-3 p-3 bg-neutral-700 rounded-lg cursor-pointer hover:bg-neutral-600 transition-colors">
                <input
                  type="checkbox"
                  name="services"
                  value="UI/UX Design"
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-emerald-300 rounded focus:ring-emerald-300"
                />
                <span className="text-white">UI/UX Design</span>
              </label>
              
              <label className="flex items-center space-x-3 p-3 bg-neutral-700 rounded-lg cursor-pointer hover:bg-neutral-600 transition-colors">
                <input
                  type="checkbox"
                  name="services"
                  value="Consultation"
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-emerald-300 rounded focus:ring-emerald-300"
                />
                <span className="text-white">Consultation</span>
              </label>
            </div>
          </div>
          
          <div>
            <label htmlFor="budget" className="block text-emerald-300 mb-2">Budget Range</label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full bg-neutral-700 border border-neutral-600 rounded-lg p-3 text-white focus:border-emerald-300 focus:outline-none transition-colors"
            >
              <option value="">Select a budget range</option>
              <option value="Less than $1,000">Less than $1,000</option>
              <option value="$1,000 - $5,000">$1,000 - $5,000</option>
              <option value="$5,000 - $10,000">$5,000 - $10,000</option>
              <option value="More than $10,000">More than $10,000</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-emerald-300 mb-2">Project Details</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full bg-neutral-700 border border-neutral-600 rounded-lg p-3 text-white focus:border-emerald-300 focus:outline-none transition-colors"
              placeholder="Tell me about your project..."
            ></textarea>
          </div>
          
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-white p-3 rounded-lg">
              {error}
            </div>
          )}
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${isSubmitting ? 'bg-emerald-800' : 'bg-emerald-600 hover:bg-emerald-700'} text-white font-bold py-3 px-6 rounded-lg transition-colors ${!isSubmitting && 'pulse-animation'}`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;