/*
@author       : Davide Taddia
@version      : 0.2
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : Cookie consent banner with customizable policy options and total rejection capability
@email        : davide.taddia2@studio.unibo.it
*/
import React, { useState, useEffect } from 'react';
import { X, Info, Cookie, Shield, ChevronDown, ChevronUp, Check, AlertTriangle } from 'lucide-react';

// Define cookie policies version to track changes
const COOKIE_POLICY_VERSION = '2.0.0';

const CookieBanner = () => {
  // Main states
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  // States for cookie-free mode and warning modal
  const [isCookieFree, setIsCookieFree] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  
  // Cookie preferences state - all cookies are now optional
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: false,    // Now optional to allow complete cookie-free mode
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
    const cookieFreeMode = localStorage.getItem('cookieFreeMode');
    
    // If user is in cookie-free mode, don't show banner
    if (cookieFreeMode === 'true') {
      setIsCookieFree(true);
      setShowBanner(false);
      return;
    }
    
    if (!savedConsent || savedVersion !== COOKIE_POLICY_VERSION) {
      // Show banner if no consent or outdated version
      setShowBanner(true);
    } else {
      // Load saved preferences
      try {
        const savedPreferences = JSON.parse(savedConsent);
        setCookiePreferences(savedPreferences);
        setAcceptedVersion(savedVersion);
        applyConsentPreferences(savedPreferences);
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
    setIsCookieFree(false);
  };

  // Reject optional cookies only (keep essential ones)
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
    setIsCookieFree(false);
  };

  // Show warning modal for complete rejection
  const rejectAllCookies = () => {
    setShowWarning(true);
  };

  // Confirm complete rejection of all cookies
  const confirmRejectAll = () => {
    const allRejected = {
      necessary: false,
      analytics: false,
      marketing: false,
      preferences: false
    };
    
    // Enter cookie-free mode
    setIsCookieFree(true);
    setCookiePreferences(allRejected);
    
    // Save cookie-free mode preference
    localStorage.setItem('cookieFreeMode', 'true');
    localStorage.setItem('cookieConsent', JSON.stringify(allRejected));
    localStorage.setItem('cookiePolicyVersion', COOKIE_POLICY_VERSION);
    
    // Clear all existing cookies
    clearAllCookies();
    
    setAcceptedVersion(COOKIE_POLICY_VERSION);
    setShowBanner(false);
    setShowWarning(false);
    applyConsentPreferences(allRejected);
  };

  // Cancel complete rejection
  const cancelRejectAll = () => {
    setShowWarning(false);
  };

  // Save custom preferences
  const savePreferences = () => {
    saveConsent(cookiePreferences);
    setShowBanner(false);
    setIsCookieFree(false);
  };

  // Helper to save consent to localStorage
  const saveConsent = (preferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    localStorage.setItem('cookiePolicyVersion', COOKIE_POLICY_VERSION);
    localStorage.removeItem('cookieFreeMode'); // Remove cookie-free mode when saving normal preferences
    setAcceptedVersion(COOKIE_POLICY_VERSION);
    
    // Apply the consent preferences to tracking systems
    applyConsentPreferences(preferences);
  };

  // Function to clear all cookies from the browser
  const clearAllCookies = () => {
    const cookies = document.cookie.split(";");
    cookies.forEach(cookie => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      
      // Clear cookie for different paths and domains
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
    });
    console.log('All cookies have been cleared');
  };

  // Apply consent preferences (activate/deactivate tracking)
  const applyConsentPreferences = (preferences) => {
    // This function integrates with analytics and marketing systems
    if (preferences.necessary) {
      console.log('Essential cookies enabled');
    } else {
      console.log('ALL cookies disabled - Cookie-free mode active');
    }
    
    if (preferences.analytics) {
      console.log('Analytics tracking enabled');
      // window.gtag('consent', 'update', { analytics_storage: 'granted' });
    } else {
      console.log('Analytics tracking disabled');
      // window.gtag('consent', 'update', { analytics_storage: 'denied' });
    }
    
    if (preferences.marketing) {
      console.log('Marketing tracking enabled');
      // Enable marketing cookies and scripts
    } else {
      console.log('Marketing tracking disabled');
      // Disable marketing cookies and scripts
    }
    
    if (preferences.preferences) {
      console.log('Preference cookies enabled');
    } else {
      console.log('Preference cookies disabled');
    }
  };

  // Toggle individual cookie type (all types are now toggleable)
  const toggleCookieType = (type) => {
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Force show banner (for testing or manual triggering)
  const reopenConsentBanner = () => {
    setShowBanner(true);
    setIsCookieFree(false);
  };

  // Exit cookie-free mode and show banner again
  const exitCookieFreeMode = () => {
    localStorage.removeItem('cookieFreeMode');
    setIsCookieFree(false);
    setShowBanner(true);
  };

  // If banner is not visible, return a small floating button to reopen
  if (!showBanner) {
    return (
      <div className="fixed bottom-4 left-4 z-40 flex flex-col gap-2">
        <button
          onClick={reopenConsentBanner}
          className="p-2 bg-neutral-800/80 hover:bg-neutral-700/80 rounded-full shadow-lg border border-dark-accent dark:border-dark-accent light:border-light-accent transition-all duration-300 hover:scale-110"
          title="Cookie Settings"
        >
          <Cookie size={20} className="text-dark-highlight dark:text-dark-highlight light:text-light-highlight" />
        </button>
        
        {/* Cookie-free mode indicator */}
        {isCookieFree && (
          <div className="bg-red-500/90 text-white text-xs px-2 py-1 rounded-full text-center shadow-lg">
            <Shield size={12} className="inline mr-1" />
            Cookie-Free
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Banner principale */}
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
                  You can accept all cookies, customize your preferences, or browse completely cookie-free.
                <br />
                For more information, see our <a href="/cookie-policy" className="underline text-dark-accent">Cookie Policy</a>.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <button
                  onClick={acceptAllCookies}
                  className="px-4 py-2 bg-dark-accent dark:bg-dark-accent light:bg-light-accent text-black font-medium rounded-lg hover:opacity-90 transition-colors"
                >
                  Accept All
                </button>
                <button
                  onClick={rejectOptionalCookies}
                  className="px-4 py-2 border border-dark-accent dark:border-dark-accent light:border-light-accent text-dark-highlight dark:text-dark-highlight light:text-light-highlight rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  Essential Only
                </button>
                <button
                  onClick={rejectAllCookies}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Reject All
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
                  {/* Necessary cookies - now toggleable */}
                  <div className={`${cookiePreferences.necessary ? 'bg-dark-accent/10' : 'bg-neutral-800/50'} rounded-lg p-4 transition-colors`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Shield size={20} className={cookiePreferences.necessary ? 'text-dark-highlight' : 'text-gray-400'} />
                        <h4 className="font-medium text-white">Necessary Cookies</h4>
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                          Now Optional
                        </span>
                      </div>
                      <button
                        onClick={() => toggleCookieType('necessary')}
                        className={`w-12 h-6 rounded-full relative transition-colors ${
                          cookiePreferences.necessary ? 'bg-dark-accent' : 'bg-gray-600'
                        }`}
                      >
                        <span 
                          className={`absolute top-1 w-4 h-4 rounded-full transition-transform ${
                            cookiePreferences.necessary ? 'bg-black translate-x-7' : 'bg-white translate-x-1'
                          }`} 
                        />
                      </button>
                    </div>
                    <p className={`text-sm ${cookiePreferences.necessary ? 'text-gray-300' : 'text-gray-400'}`}>
                      These cookies enable basic functions like page navigation and access to secure areas.
                      You can now disable these for a completely cookie-free experience.
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

      {/* WARNING MODAL - CENTRATO NELLA PAGINA */}
      {showWarning && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-red-500/50 shadow-2xl relative">
            <button
              onClick={() => setShowWarning(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="text-center">
              <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Cookie-Free Mode</h3>
              <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                Disabling all cookies will provide maximum privacy but may affect website functionality. 
                Some features like theme preferences, form data, and personalization will not work properly.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowWarning(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRejectAll}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieBanner;