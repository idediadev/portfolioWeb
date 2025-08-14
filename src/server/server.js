/**
 * @author       : Davide Taddia
 * @version      : 0.1
 * @copyrigth    : IdediaDEV (Davide Taddia) - 2025  
 * @license      : GLP-3.0 
 * @description  : Server di autenticazione e autorizzazione
 * @email        : davide.taddia2@studio.unibo.it
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const rateLimit = require('express-rate-limit');
const { authenticateToken, requireAdmin, optionalAuth } = require('./authMiddleware');
const config = require('./configServer');

// Inizializzazione del server Express
const app = express();
const PORT = config.PORT;

// Middleware
app.use(cors(config.CORS_OPTIONS));
app.use(bodyParser.json());

// Rate limiter per prevenire attacchi brute force sul login
const loginLimiter = rateLimit({
  windowMs: config.RATE_LIMIT.windowMs,
  max: config.RATE_LIMIT.max,
  message: {
    success: false,
    message: 'Troppe richieste da questo IP, riprova più tardi.'
  }
});

// Percorso al file JSON contenente gli utenti (in un progetto reale userei un database)
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const LOGS_FILE = path.join(DATA_DIR, 'logs.json');

// Assicurati che la directory data esista
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Crea il file users.json se non esiste
if (!fs.existsSync(USERS_FILE)) {
  // Utenti di default per testing
  const defaultUsers = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      password: bcrypt.hashSync('admin123', 10),
      role: 'admin',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Guest User',
      email: 'guest@example.com',
      password: bcrypt.hashSync('guest123', 10),
      role: 'guest',
      createdAt: new Date().toISOString()
    }
  ];
  
  fs.writeFileSync(USERS_FILE, JSON.stringify(defaultUsers, null, 2));
}

// Crea il file logs.json se non esiste
if (!fs.existsSync(LOGS_FILE)) {
  fs.writeFileSync(LOGS_FILE, JSON.stringify([], null, 2));
}

// Funzioni helper
const getUsers = () => {
  try {
    const usersData = fs.readFileSync(USERS_FILE);
    return JSON.parse(usersData);
  } catch (err) {
    console.error('Error reading users file:', err);
    return [];
  }
};

const saveUsers = (users) => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    return true;
  } catch (err) {
    console.error('Error saving users file:', err);
    return false;
  }
};

const findUserByEmail = (email) => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

const logActivity = (userId, action, details = {}) => {
  try {
    const logs = JSON.parse(fs.readFileSync(LOGS_FILE));
    const newLog = {
      id: Date.now().toString(),
      userId,
      action,
      details,
      timestamp: new Date().toISOString()
    };
    
    logs.push(newLog);
    fs.writeFileSync(LOGS_FILE, JSON.stringify(logs, null, 2));
  } catch (err) {
    console.error('Error logging activity:', err);
  }
};

// Routes

// Rotta di test
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running', 
    timestamp: new Date().toISOString() 
  });
});

// Routes per l'autenticazione
app.post('/api/auth/login', loginLimiter, (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email and password are required' 
    });
  }
  
  const user = findUserByEmail(email);
  
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials' 
    });
  }
  
  // Crea un token JWT (escludi la password)
  const { password: pwd, ...userWithoutPassword } = user;
  const token = jwt.sign(userWithoutPassword, config.JWT_SECRET, { 
    expiresIn: config.JWT_EXPIRES_IN 
  });
  
  // Log dell'accesso
  logActivity(user.id, 'login', { email: user.email });
  
  res.json({
    success: true,
    message: 'Login successful',
    token,
    user: userWithoutPassword
  });
});

app.get('/api/auth/verify', authenticateToken, (req, res) => {
  // Se il middleware è passato, il token è valido
  res.json({
    success: true,
    user: req.user
  });
});

// Routes per gli utenti (solo admin)
app.get('/api/users', authenticateToken, requireAdmin, (req, res) => {
  const users = getUsers().map(({ password, ...user }) => user);
  res.json({
    success: true,
    users
  });
});

app.post('/api/users', authenticateToken, requireAdmin, (req, res) => {
  const { name, email, password, role } = req.body;
  
  if (!name || !email || !password || !role) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }
  
  if (findUserByEmail(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'User with this email already exists' 
    });
  }
  
  const users = getUsers();
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    role,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  
  if (saveUsers(users)) {
    const { password, ...userWithoutPassword } = newUser;
    
    // Log della creazione
    logActivity(req.user.id, 'create_user', { createdUserId: newUser.id, email });
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: userWithoutPassword
    });
  } else {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create user' 
    });
  }
});

// Route per modificare un utente (admin o se stesso)
app.put('/api/users/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  
  // Solo gli admin possono modificare altri utenti o cambiare ruoli
  if (req.user.id !== id && req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: 'You can only update your own profile' 
    });
  }
  
  // Solo gli admin possono modificare il ruolo
  if (role && req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: 'You cannot change user roles' 
    });
  }
  
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ 
      success: false, 
      message: 'User not found' 
    });
  }
  
  // Verifica che l'email non sia già utilizzata da un altro utente
  if (email && email !== users[userIndex].email) {
    const emailExists = users.some(user => user.email === email && user.id !== id);
    if (emailExists) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is already in use' 
      });
    }
  }
  
  // Aggiorna i campi forniti
  const updatedUser = { ...users[userIndex] };
  if (name) updatedUser.name = name;
  if (email) updatedUser.email = email;
  if (password) updatedUser.password = bcrypt.hashSync(password, 10);
  if (role && req.user.role === 'admin') updatedUser.role = role;
  updatedUser.updatedAt = new Date().toISOString();
  
  users[userIndex] = updatedUser;
  
  if (saveUsers(users)) {
    const { password, ...userWithoutPassword } = updatedUser;
    
    // Log dell'aggiornamento
    logActivity(req.user.id, 'update_user', { 
      updatedUserId: id, 
      changedFields: Object.keys(req.body) 
    });
    
    res.json({
      success: true,
      message: 'User updated successfully',
      user: userWithoutPassword
    });
  } else {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update user' 
    });
  }
});

// Route per eliminare un utente (solo admin)
app.delete('/api/users/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  
  // Impedisci l'eliminazione dell'ultimo admin
  const users = getUsers();
  const userToDelete = users.find(user => user.id === id);
  
  if (!userToDelete) {
    return res.status(404).json({ 
      success: false, 
      message: 'User not found' 
    });
  }
  
  if (userToDelete.role === 'admin') {
    const adminCount = users.filter(user => user.role === 'admin').length;
    if (adminCount <= 1) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot delete the last admin' 
      });
    }
  }
  
  const updatedUsers = users.filter(user => user.id !== id);
  
  if (users.length === updatedUsers.length) {
    return res.status(404).json({ 
      success: false, 
      message: 'User not found' 
    });
  }
  
  if (saveUsers(updatedUsers)) {
    // Log dell'eliminazione
    logActivity(req.user.id, 'delete_user', { deletedUserId: id });
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } else {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete user' 
    });
  }
});

// Route per ottenere i log (solo admin)
app.get('/api/logs', authenticateToken, requireAdmin, (req, res) => {
  try {
    const logs = JSON.parse(fs.readFileSync(LOGS_FILE));
    
    // Opzioni di filtraggio
    const { userId, action, startDate, endDate, limit = 100 } = req.query;
    
    let filteredLogs = logs;
    
    if (userId) {
      filteredLogs = filteredLogs.filter(log => log.userId === userId);
    }
    
    if (action) {
      filteredLogs = filteredLogs.filter(log => log.action === action);
    }
    
    if (startDate) {
      const start = new Date(startDate).getTime();
      filteredLogs = filteredLogs.filter(log => new Date(log.timestamp).getTime() >= start);
    }
    
    if (endDate) {
      const end = new Date(endDate).getTime();
      filteredLogs = filteredLogs.filter(log => new Date(log.timestamp).getTime() <= end);
    }
    
    // Ordina per timestamp decrescente (più recenti prima)
    filteredLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // Limita il numero di risultati
    filteredLogs = filteredLogs.slice(0, parseInt(limit, 10));
    
    res.json({
      success: true,
      logs: filteredLogs
    });
  } catch (err) {
    console.error('Error reading logs:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to retrieve logs' 
    });
  }
});

// Route per ottenere lo stato di autenticazione corrente
app.get('/api/auth/status', optionalAuth, (req, res) => {
  res.json({
    success: true,
    isAuthenticated: !!req.user,
    user: req.user,
    permissions: req.user ? config.PAGE_PERMISSIONS : null
  });
});

// Route per il logout (lato client - il token viene rimosso dal client)
app.post('/api/auth/logout', authenticateToken, (req, res) => {
  // Log del logout
  logActivity(req.user.id, 'logout');
  
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

// Route per cambiare password
app.post('/api/auth/change-password', authenticateToken, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ 
      success: false, 
      message: 'Current password and new password are required' 
    });
  }
  
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === req.user.id);
  
  if (userIndex === -1) {
    return res.status(404).json({ 
      success: false, 
      message: 'User not found' 
    });
  }
  
  // Verifica la password corrente
  if (!bcrypt.compareSync(currentPassword, users[userIndex].password)) {
    return res.status(401).json({ 
      success: false, 
      message: 'Current password is incorrect' 
    });
  }
  
  // Aggiorna la password
  users[userIndex].password = bcrypt.hashSync(newPassword, 10);
  users[userIndex].updatedAt = new Date().toISOString();
  
  if (saveUsers(users)) {
    // Log del cambio password
    logActivity(req.user.id, 'change_password');
    
    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } else {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to change password' 
    });
  }
});

// Gestione errori
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`ENV: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Default users created:`);
  console.log(`- Admin: admin@example.com / admin123`);
  console.log(`- Guest: guest@example.com / guest123`);
});