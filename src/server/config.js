/**
 * @author       : Davide Taddia
 * @version      : 0.1
 * @copyrigth    : IdediaDEV (Davide Taddia) - 2025  
 * @license      : GLP-3.0 
 * @description  : Configurazione del server
 * @email        : davide.taddia2@studio.unibo.it
 */

// Configurazione del server
module.exports = {
    // Porta su cui verrà avviato il server
    PORT: process.env.PORT || 5000,
    
    // Segreto per la generazione dei token JWT
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    
    // Durata del token JWT (in secondi)
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
    
    // Configurazione del database (usata solo se viene implementato un database reale)
    DB_CONFIG: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'user',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'auth_db'
    },
    
    // Configurazione CORS
    CORS_OPTIONS: {
      origin: process.env.NODE_ENV === 'production' 
        ? 'https://davidetaddia.dev' 
        : ['http://localhost:3000', 'http://127.0.0.1:3000'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    },
    
    // Configurazione rate limiter per prevenire attacchi di forza bruta
    RATE_LIMIT: {
      windowMs: 15 * 60 * 1000, // 15 minuti
      max: 100 // limite di 100 richieste per windowMs
    },
    
    // Permessi per pagine e azioni (sincronizzare con il frontend)
    PAGE_PERMISSIONS: {
      home: { view: ['guest', 'admin'] },
      masteryhub: {
        view: ['guest', 'admin'],
        edit: ['admin']
      },
      wikidedia: {
        view: ['guest', 'admin'],
        comment: ['guest', 'admin'],
        edit: ['admin']
      },
      servicehub: {
        view: ['guest', 'admin'],
        edit: ['admin']
      },
      admin: {
        view: ['admin'],
        edit: ['admin']
      }
    }
  };