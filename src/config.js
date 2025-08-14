/*
@author       : Davide Taddia
@version      : 0.2
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : Configuration file for the application with navbar settings
@email        : davide.taddia2@studio.unibo.it
*/

// API base URL
export const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.davidetaddia.dev' 
  : 'http://localhost:5000/api';

// User roles definition
export const USER_ROLES = {
  ADMIN: 'admin',
  GUEST: 'guest'
};

// Navbar configuration
export const NAVBAR_CONFIG = {
  BRAND: {
    name: 'Davide Taddia',
    subtitle: 'Computer Science & Developer',
    logo: '/src/logoDavideTaddia.jpeg'
  },
  LINKS: [
    { 
      id: 'masteryhub', 
      title: '00 MasteryHub', 
      href: '/masteryhub',
      external: false 
    },
    { 
      id: 'wikitadd', 
      title: '01 wikiTADD', 
      href: '/wikitadd',
      external: false 
    },
    { 
      id: 'servicehub', 
      title: '02 ServiceHub', 
      href: '/servicehub',
      external: false 
    }
  ],
  THEME: {
    defaultDark: true,
    persistPreference: true
  },
  ADMIN: {
    enabled: true,
    showStatusIndicator: true
  },
  CTA: {
    text: "Let's Talk",
    action: 'contact'
  }
};

// Page permissions configuration
export const PAGE_PERMISSIONS = {
  home: { 
    view: [USER_ROLES.GUEST, USER_ROLES.ADMIN] 
  },
  masteryhub: {
    view: [USER_ROLES.GUEST, USER_ROLES.ADMIN],
    edit: [USER_ROLES.ADMIN]
  },
  wikitadd: { // Aggiornato da wikidedia
    view: [USER_ROLES.GUEST, USER_ROLES.ADMIN],
    comment: [USER_ROLES.GUEST, USER_ROLES.ADMIN],
    edit: [USER_ROLES.ADMIN]
  },
  servicehub: {
    view: [USER_ROLES.GUEST, USER_ROLES.ADMIN],
    edit: [USER_ROLES.ADMIN]
  },
  admin: {
    view: [USER_ROLES.ADMIN],
    edit: [USER_ROLES.ADMIN]
  }
};

// Theme configuration
export const THEME_CONFIG = {
  DARK: {
    primary: '#00FF7F',
    secondary: '#6DE6B6',
    accent: '#02B55E',
    background: '#080C13',
    text: '#FFFFFF'
  },
  LIGHT: {
    primary: '#008F4F',
    secondary: '#007D5B', 
    accent: '#A1E8D9',
    background: '#F8F8F8',
    text: '#222222'
  }
};

// Animation configuration
export const ANIMATION_CONFIG = {
  navbar: {
    scrollThreshold: 50,
    transitionDuration: 300
  },
  components: {
    fadeInDuration: 500,
    slideInDuration: 600,
    hoverDuration: 200
  }
};

export default {
  API_URL,
  USER_ROLES,
  NAVBAR_CONFIG,
  PAGE_PERMISSIONS,
  THEME_CONFIG,
  ANIMATION_CONFIG
};