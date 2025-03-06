/*
@author       : Davide Taddia
@version      : 0.1
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : Cookie consent banner with customizable policy options
@email        : davide.taddia2@studio.unibo.it
*/
import React, { useState, useEffect } from 'react';
import { X, Info, Cookie, Shield, ChevronDown, ChevronUp, Check } from 'lucide-react';

// Define cookie policies version to track changes
const COOKIE_POLICY_VERSION = '1.0.0';

const CookieBanner = () => {
  // Main states
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    preferences: false
  });

  // Policy versions state - used to detect when policy is updated
  const [acceptedVersion, setAcceptedVersion] = useState(null);
  
  // Check cookie consent status on mount
  useEffect(() => {
    // Check if consent exists and is current version
    const savedConsent = localStorage.getItem('cookieConsent');
    const savedVersion = localStorage.getItem('cookiePolicyVersion');
    
    if (!savedConsent || savedVersion !== COOKIE_POLICY_VERSION) {
      // Show banner if no consent or outdated version
      setShowBanner(true);
    } else {
      // Load saved preferences
      try {
        const savedPreferences = JSON.parse(savedConsent);
        setCookiePreferences(savedPreferences);
        setAcceptedVersion(savedVersion);
      } catch (error) {
        console.error('Error parsing saved cookie preferences:', error);
        setShowBanner(true);
      }
    }
  }, []);

  // Accept all cookies
  const acceptAllCookies = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    
    setCookiePreferences(allAccepted);
    saveConsent(allAccepted);
    setShowBanner(false);
  };

  // Reject optional cookies
  const rejectOptionalCookies = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    
    setCookiePreferences(onlyNecessary);
    saveConsent(onlyNecessary);
    setShowBanner(false);
  };

  // Save custom preferences
  const savePreferences = () => {
    saveConsent(cookiePreferences);
    setShowBanner(false);
  };

  // Helper to save consent to localStorage
  const saveConsent = (preferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    localStorage.setItem('cookiePolicyVersion', COOKIE_POLICY_VERSION);
    setAcceptedVersion(COOKIE_POLICY_VERSION);
    
    // Here you would typically trigger your analytics/marketing scripts
    // based on the saved preferences
    applyConsentPreferences(preferences);
  };

  // Apply consent preferences (activate/deactivate tracking)
  const applyConsentPreferences = (preferences) => {
    // This function would integrate with your analytics/marketing systems
    // For example, if using Google Analytics:
    if (preferences.analytics) {
      console.log('Analytics tracking enabled');
      // window.gtag('consent', 'update', { analytics_storage: 'granted' });
    } else {
      console.log('Analytics tracking disabled');
      // window.gtag('consent', 'update', { analytics_storage: 'denied' });
    }
    
    // Same for marketing cookies
    if (preferences.marketing) {
      console.log('Marketing tracking enabled');
      // Enable marketing cookies/scripts
    } else {
      console.log('Marketing tracking disabled');
      // Disable marketing cookies/scripts
    }
  };

  // Toggle individual cookie type (except necessary)
  const toggleCookieType = (type) => {
    if (type === 'necessary') return; // Can't toggle necessary cookies
    
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Force show banner (for testing or manual triggering)
  const reopenConsentBanner = () => {
    setShowBanner(true);
  };

  // If banner is not visible, return a small floating button to reopen
  if (!showBanner) {
    return (
      <button
        onClick={reopenConsentBanner}
        className="fixed bottom-4 left-4 z-40 p-2 bg-neutral-800/80 hover:bg-neutral-700/80 rounded-full shadow-lg border border-dark-accent dark:border-dark-accent light:border-light-accent transition-all duration-300 hover:scale-110"
        title="Cookie Settings"
      >
        <Cookie size={20} className="text-dark-highlight dark:text-dark-highlight light:text-light-highlight" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slideUp">
      <div className="bg-gray-900/95 backdrop-blur-md border-t border-dark-accent dark:border-dark-accent light:border-light-accent shadow-lg">
        {/* Main banner */}
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Cookie size={24} className="text-dark-highlight dark:text-dark-highlight light:text-light-highlight" />
                <h3 className="text-xl text-white font-semibold">Cookie Preferences</h3>
              </div>
              <p className="text-gray-300 text-sm md:text-base">
                This website uses cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                By clicking "Accept All", you consent to our use of cookies as described in our Cookie Policy.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <button
                onClick={rejectOptionalCookies}
                className="px-4 py-2 border border-dark-accent dark:border-dark-accent light:border-light-accent text-dark-highlight dark:text-dark-highlight light:text-light-highlight rounded-lg hover:bg-neutral-800 transition-colors"
              >
                Essential Only
              </button>
              <button
                onClick={acceptAllCookies}
                className="px-4 py-2 bg-dark-accent dark:bg-dark-accent light:bg-light-accent text-black font-medium rounded-lg hover:opacity-90 transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors flex items-center justify-center"
              >
                {showDetails ? (
                  <>
                    <ChevronUp size={18} className="mr-1" />
                    <span>Hide Details</span>
                  </>
                ) : (
                  <>
                    <ChevronDown size={18} className="mr-1" />
                    <span>Customize</span>
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Detailed preferences panel */}
          {showDetails && (
            <div className="mt-4 pt-4 border-t border-gray-700 animate-fadeIn">
              <div className="grid gap-4 mb-4">
                {/* Necessary cookies */}
                <div className="bg-neutral-800/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Shield size={20} className="text-dark-highlight dark:text-dark-highlight light:text-light-highlight" />
                      <h4 className="font-medium text-white">Necessary Cookies</h4>
                    </div>
                    <div className="bg-dark-accent/30 dark:bg-dark-accent/30 light:bg-light-accent/30 rounded px-2 py-1 text-xs text-dark-highlight dark:text-dark-highlight light:text-light-highlight">
                      Required
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">
                    These cookies are essential for the website to function properly and cannot be disabled.
                    They enable basic functions like page navigation and access to secure areas of the website.
                  </p>
                </div>
                
                {/* Analytics cookies */}
                <div className={`${cookiePreferences.analytics ? 'bg-dark-accent/10' : 'bg-neutral-800/50'} rounded-lg p-4 transition-colors`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Info size={20} className={cookiePreferences.analytics ? 'text-dark-highlight' : 'text-gray-400'} />
                      <h4 className="font-medium text-white">Analytics Cookies</h4>
                    </div>
                    <button
                      onClick={() => toggleCookieType('analytics')}
                      className={`w-12 h-6 rounded-full relative transition-colors ${
                        cookiePreferences.analytics ? 'bg-dark-accent' : 'bg-gray-600'
                      }`}
                    >
                      <span 
                        className={`absolute top-1 w-4 h-4 rounded-full transition-transform ${
                          cookiePreferences.analytics ? 'bg-black translate-x-7' : 'bg-white translate-x-1'
                        }`} 
                      />
                    </button>
                  </div>
                  <p className={`text-sm ${cookiePreferences.analytics ? 'text-gray-300' : 'text-gray-400'}`}>
                    These cookies collect information about how you use our website, which pages you visit and any errors that occur.
                    The data is anonymized and helps us improve the website and your experience.
                  </p>
                </div>
                
                {/* Marketing cookies */}
                <div className={`${cookiePreferences.marketing ? 'bg-dark-accent/10' : 'bg-neutral-800/50'} rounded-lg p-4 transition-colors`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Info size={20} className={cookiePreferences.marketing ? 'text-dark-highlight' : 'text-gray-400'} />
                      <h4 className="font-medium text-white">Marketing Cookies</h4>
                    </div>
                    <button
                      onClick={() => toggleCookieType('marketing')}
                      className={`w-12 h-6 rounded-full relative transition-colors ${
                        cookiePreferences.marketing ? 'bg-dark-accent' : 'bg-gray-600'
                      }`}
                    >
                      <span 
                        className={`absolute top-1 w-4 h-4 rounded-full transition-transform ${
                          cookiePreferences.marketing ? 'bg-black translate-x-7' : 'bg-white translate-x-1'
                        }`} 
                      />
                    </button>
                  </div>
                  <p className={`text-sm ${cookiePreferences.marketing ? 'text-gray-300' : 'text-gray-400'}`}>
                    These cookies are used to track visitors across websites to display relevant advertisements.
                    They help make advertising more engaging to users and more valuable to publishers and advertisers.
                  </p>
                </div>
                
                {/* Preferences cookies */}
                <div className={`${cookiePreferences.preferences ? 'bg-dark-accent/10' : 'bg-neutral-800/50'} rounded-lg p-4 transition-colors`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Info size={20} className={cookiePreferences.preferences ? 'text-dark-highlight' : 'text-gray-400'} />
                      <h4 className="font-medium text-white">Preferences Cookies</h4>
                    </div>
                    <button
                      onClick={() => toggleCookieType('preferences')}
                      className={`w-12 h-6 rounded-full relative transition-colors ${
                        cookiePreferences.preferences ? 'bg-dark-accent' : 'bg-gray-600'
                      }`}
                    >
                      <span 
                        className={`absolute top-1 w-4 h-4 rounded-full transition-transform ${
                          cookiePreferences.preferences ? 'bg-black translate-x-7' : 'bg-white translate-x-1'
                        }`} 
                      />
                    </button>
                  </div>
                  <p className={`text-sm ${cookiePreferences.preferences ? 'text-gray-300' : 'text-gray-400'}`}>
                    These cookies enable the website to remember choices you make and provide enhanced, personalized features.
                    They may be set by us or by third-party providers whose services we have added to our pages.
                  </p>
                </div>
              </div>
              
              {/* Version info and save buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center pt-2 border-t border-gray-700">
                <div className="text-sm text-gray-400 mb-3 sm:mb-0">
                  <span>Cookie Policy Version: {COOKIE_POLICY_VERSION}</span>
                  {acceptedVersion && acceptedVersion !== COOKIE_POLICY_VERSION && (
                    <span className="ml-2 text-dark-highlight dark:text-dark-highlight light:text-light-highlight">
                      (Updated since your last consent)
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={rejectOptionalCookies}
                    className="px-4 py-2 border border-dark-accent dark:border-dark-accent light:border-light-accent text-dark-highlight dark:text-dark-highlight light:text-light-highlight rounded-lg hover:bg-neutral-800 transition-colors"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={savePreferences}
                    className="px-4 py-2 bg-dark-accent dark:bg-dark-accent light:bg-light-accent text-black font-medium rounded-lg hover:opacity-90 transition-colors flex items-center"
                  >
                    <Check size={18} className="mr-1" />
                    <span>Save Preferences</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Additional styles */}
      <style jsx="true">{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CookieBanner;