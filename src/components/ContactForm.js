/*
@author       : Davide Taddia
@version      : 0.1
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : Contact form component to send email to the owner
@email        : davide.taddia2@studio.unibo.it
*/
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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Prepara i dati per l'invio
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('budget', formData.budget);
      formDataToSend.append('services', formData.services.join(', '));
      
      // Effettua la richiesta a Formspree con l'ID corretto "xzzdngbj"
      const response = await fetch('https://formspree.io/f/xzzdngbj', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Gestione del successo
        console.log('Form inviato con successo!');
        setSubmitted(true);
        
        // Reset form after 3 seconds and close
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 3000);
      } else {
        // Gestione dell'errore
        const data = await response.json();
        throw new Error(data.error || 'Si è verificato un errore durante l\'invio del form');
      }
    } catch (error) {
      console.error('Errore durante l\'invio del form:', error);
      setError(error.message || 'Si è verificato un errore durante l\'invio del form');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
        <div className="card-bg p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="text-primary text-6xl mb-4">✓</div>
          <h2 className="text-primary text-2xl mb-4">Thank You!</h2>
          <p className="text-current mb-6">Your message has been sent successfully to davidetaddia95@gmail.com. I'll get back to you shortly.</p>
          <div className="w-full bg-gray-700 h-2 rounded-full">
            <div className="bg-dark-accent dark:bg-dark-accent light:bg-light-accent h-2 rounded-full animate-shrink"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="card-bg p-6 md:p-8 rounded-lg shadow-lg max-w-3xl w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 text-action hover:text-primary transition-colors focus:outline-none"
        >
          <ArrowLeft size={24} />
        </button>
        
        <div className="text-center mb-8 pt-6">
          <h2 className="text-primary text-3xl md:text-4xl mb-2">Contact Me</h2>
          <p className="text-current opacity-80">Let's collaborate on your next project</p>
        </div>
        
        <form 
          onSubmit={handleSubmit} 
          className="space-y-6"
        >
          <input type="hidden" name="_subject" value="New portfolio contact request" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-primary mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-neutral-700 border border-neutral-600 rounded-lg p-3 text-current focus:border-dark-highlight dark:focus:border-dark-highlight light:focus:border-light-highlight focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-primary mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-neutral-700 border border-neutral-600 rounded-lg p-3 text-current focus:border-dark-highlight dark:focus:border-dark-highlight light:focus:border-light-highlight focus:outline-none transition-colors"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-primary mb-2">Services Needed</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="flex items-center space-x-3 p-3 bg-neutral-700 rounded-lg cursor-pointer hover:bg-neutral-600 transition-colors">
                <input
                  type="checkbox"
                  name="services"
                  value="Backend Development"
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-dark-accent dark:text-dark-accent light:text-light-accent rounded focus:ring-dark-accent dark:focus:ring-dark-accent light:focus:ring-light-accent"
                />
                <span className="text-current">Backend Development</span>
              </label>
              
              <label className="flex items-center space-x-3 p-3 bg-neutral-700 rounded-lg cursor-pointer hover:bg-neutral-600 transition-colors">
                <input
                  type="checkbox"
                  name="services"
                  value="Web Development"
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-dark-accent dark:text-dark-accent light:text-light-accent rounded focus:ring-dark-accent dark:focus:ring-dark-accent light:focus:ring-light-accent"
                />
                <span className="text-current">Web Development</span>
              </label>
              
              <label className="flex items-center space-x-3 p-3 bg-neutral-700 rounded-lg cursor-pointer hover:bg-neutral-600 transition-colors">
                <input
                  type="checkbox"
                  name="services"
                  value="Machine Learning model training"
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-dark-accent dark:text-dark-accent light:text-light-accent rounded focus:ring-dark-accent dark:focus:ring-dark-accent light:focus:ring-light-accent"
                />
                <span className="text-current">Machine Learning model training</span>
              </label>
              
              <label className="flex items-center space-x-3 p-3 bg-neutral-700 rounded-lg cursor-pointer hover:bg-neutral-600 transition-colors">
                <input
                  type="checkbox"
                  name="services"
                  value="Consultation"
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-dark-accent dark:text-dark-accent light:text-light-accent rounded focus:ring-dark-accent dark:focus:ring-dark-accent light:focus:ring-light-accent"
                />
                <span className="text-current">Consultation</span>
              </label>
            </div>
          </div>
          
          <div>
            <label htmlFor="budget" className="block text-primary mb-2">Budget Range</label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full bg-neutral-700 border border-neutral-600 rounded-lg p-3 text-current focus:border-dark-highlight dark:focus:border-dark-highlight light:focus:border-light-highlight focus:outline-none transition-colors"
            >
              <option value="">Select a budget range</option>
              <option value="Less than $1,000">Less than $1,000</option>
              <option value="$1,000 - $5,000">$1,000 - $5,000</option>
              <option value="$5,000 - $10,000">$5,000 - $10,000</option>
              <option value="More than $10,000">More than $10,000</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-primary mb-2">Project Details</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full bg-neutral-700 border border-neutral-600 rounded-lg p-3 text-current focus:border-dark-highlight dark:focus:border-dark-highlight light:focus:border-light-highlight focus:outline-none transition-colors"
              placeholder="Tell me about your project..."
            ></textarea>
          </div>
          
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-current p-3 rounded-lg">
              {error}
            </div>
          )}
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full btn-primary font-bold py-3 px-6 rounded-lg transition-colors ${!isSubmitting && 'pulse-animation'}`}
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