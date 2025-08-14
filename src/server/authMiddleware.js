/**
 * @author       : Davide Taddia
 * @version      : 0.1
 * @copyrigth    : IdediaDEV (Davide Taddia) - 2025  
 * @license      : GLP-3.0 
 * @description  : Middleware di autenticazione per il backend
 * @email        : davide.taddia2@studio.unibo.it
 */

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./configServer');

/**
 * Middleware per verificare il token JWT
 */
const authenticateToken = (req, res, next) => {
  // Estrai il token dall'header della richiesta
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied. No token provided.' 
    });
  }
  
  try {
    // Verifica il token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Salva le informazioni dell'utente decodificate nella request
    next(); // Passa al prossimo middleware
  } catch (error) {
    return res.status(403).json({ 
      success: false, 
      message: 'Invalid or expired token.', 
      error: error.message 
    });
  }
};

/**
 * Middleware per verificare i permessi admin
 */
const requireAdmin = (req, res, next) => {
  // Questo middleware deve essere usato dopo authenticateToken
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication required.' 
    });
  }
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: 'Admin privileges required.' 
    });
  }
  
  next();
};

/**
 * Middleware opzionale per la verifica del token
 * Non blocca la richiesta se il token manca o è invalido
 */
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    req.user = null;
    return next();
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    req.user = null;
  }
  
  next();
};

module.exports = {
  authenticateToken,
  requireAdmin,
  optionalAuth
};