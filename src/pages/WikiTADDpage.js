/*
@author       : Davide Taddia
@version      : 0.1
@copyright    : IdediaDEV (Davide Taddia) - 2025  
@license      : GPL-3.0 
@description  : wikiTADD - Wiki informatica con terminale integrato e sistema admin
@email        : davide.taddia2@studio.unibo.it
*/

import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Settings, Plus, Edit, Save, X, FileText, 
  Book, ChevronDown, ChevronRight, Play, Terminal,
  Code, AlertTriangle, Trash2,
  Eye, EyeOff, Users, Lock, Unlock
} from 'lucide-react';

const WikiTADD = () => {
  // Stati per il tema
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Stati principali
  const [isAdmin, setIsAdmin] = useState(true);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [categories, setCategories] = useState([
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: '🎨',
      expanded: true,
      pages: [
        {
          id: 'html-basics',
          title: 'HTML Basics',
          content: `# HTML Basics

HTML (HyperText Markup Language) è il linguaggio di markup standard per creare pagine web.

## Struttura Base

\`\`\`html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Titolo della Pagina</title>
</head>
<body>
    <h1>Benvenuto in HTML!</h1>
    <p>Questo è un paragrafo.</p>
</body>
</html>
\`\`\`

## Tag Principali

- **&lt;h1&gt; - &lt;h6&gt;**: Intestazioni di diversi livelli
- **&lt;p&gt;**: Paragrafi
- **&lt;div&gt;**: Contenitore generico
- **&lt;span&gt;**: Contenitore inline
- **&lt;a&gt;**: Link
- **&lt;img&gt;**: Immagini

## Prova il Codice

Usa il terminale qui sotto per testare il tuo codice HTML:`,
          codeExample: `<!DOCTYPE html>
<html>
<head>
    <title>Il Mio Primo HTML</title>
</head>
<body>
    <h1>Ciao Mondo!</h1>
    <p>Questa è la mia prima pagina HTML.</p>
    <a href="https://www.example.com">Clicca qui</a>
</body>
</html>`,
          lastModified: new Date().toISOString(),
          author: 'Admin'
        },
        {
          id: 'css-styling',
          title: 'CSS Styling',
          content: `# CSS Styling

CSS (Cascading Style Sheets) permette di stilizzare le pagine HTML.

## Selettori Base

\`\`\`css
/* Selettore per elemento */
h1 {
    color: blue;
    font-size: 2rem;
}

/* Selettore per classe */
.highlight {
    background-color: yellow;
    padding: 10px;
}

/* Selettore per ID */
#header {
    width: 100%;
    height: 80px;
}
\`\`\`

## Box Model

Il modello a scatola CSS include:
- **Content**: Il contenuto dell'elemento
- **Padding**: Spazio interno
- **Border**: Bordo dell'elemento  
- **Margin**: Spazio esterno`,
          codeExample: `.container {
    width: 300px;
    height: 200px;
    background-color: lightblue;
    padding: 20px;
    border: 2px solid navy;
    margin: 10px;
}

h2 {
    color: darkblue;
    text-align: center;
}`,
          lastModified: new Date().toISOString(),
          author: 'Admin'
        }
      ]
    },
    {
      id: 'backend',
      title: 'Backend Development',
      icon: '⚙️',
      expanded: false,
      pages: [
        {
          id: 'nodejs-intro',
          title: 'Node.js Introduction',
          content: `# Node.js Introduction

Node.js è un runtime JavaScript costruito sul motore V8 di Chrome.

## Caratteristiche Principali

- **Asincrono e Event-Driven**: Non-blocking I/O
- **Single-threaded**: Con event loop
- **Cross-platform**: Funziona su Windows, macOS, Linux
- **NPM**: Package manager integrato

## Primo Server

\`\`\`javascript
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>Ciao dal server Node.js!</h1>');
});

server.listen(3000, () => {
    console.log('Server in ascolto sulla porta 3000');
});
\`\`\`

## Moduli Comuni

- **fs**: File system operations
- **path**: Manipolazione percorsi
- **http**: Server HTTP
- **url**: Parsing URL`,
          codeExample: `// Server Express.js semplice
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/users', (req, res) => {
    res.json([
        { id: 1, name: 'Mario' },
        { id: 2, name: 'Luigi' }
    ]);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});`,
          lastModified: new Date().toISOString(),
          author: 'Admin'
        }
      ]
    },
    {
      id: 'database',
      title: 'Database',
      icon: '🗄️',
      expanded: false,
      pages: [
        {
          id: 'sql-basics',
          title: 'SQL Basics',
          content: `# SQL Basics

SQL (Structured Query Language) è il linguaggio standard per database relazionali.

## Comandi Principali

### SELECT - Leggere Dati
\`\`\`sql
SELECT nome, email FROM utenti WHERE eta > 18;
\`\`\`

### INSERT - Inserire Dati
\`\`\`sql
INSERT INTO utenti (nome, email, eta) 
VALUES ('Mario Rossi', 'mario@email.com', 25);
\`\`\`

### UPDATE - Aggiornare Dati
\`\`\`sql
UPDATE utenti SET email = 'nuovo@email.com' WHERE id = 1;
\`\`\`

### DELETE - Cancellare Dati
\`\`\`sql
DELETE FROM utenti WHERE eta < 18;
\`\`\`

## JOIN Operations

Le JOIN permettono di combinare dati da più tabelle:

- **INNER JOIN**: Solo righe con corrispondenze
- **LEFT JOIN**: Tutte le righe della tabella sinistra
- **RIGHT JOIN**: Tutte le righe della tabella destra
- **FULL JOIN**: Tutte le righe da entrambe le tabelle`,
          codeExample: `-- Creazione tabella
CREATE TABLE utenti (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    eta INT CHECK (eta >= 0)
);

-- Inserimento dati
INSERT INTO utenti (nome, email, eta) VALUES
('Mario Rossi', 'mario@email.com', 30),
('Luigi Verdi', 'luigi@email.com', 25),
('Anna Bianchi', 'anna@email.com', 28);

-- Query di selezione
SELECT nome, email FROM utenti WHERE eta >= 25 ORDER BY nome;`,
          lastModified: new Date().toISOString(),
          author: 'Admin'
        }
      ]
    }
  ]);

  const [activeCategory, setActiveCategory] = useState('frontend');
  const [activePage, setActivePage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [codeToExecute, setCodeToExecute] = useState('');
  const [terminalOutput, setTerminalOutput] = useState('');
  const [showTerminal, setShowTerminal] = useState(false);
  
  // Stati per la creazione di nuove pagine/categorie
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [showNewPageForm, setShowNewPageForm] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('📁');
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageContent, setNewPageContent] = useState('');
  
  const terminalRef = useRef(null);

  // Gestione del tema
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);
    updateTheme(prefersDarkMode);
  }, []);

  const updateTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    updateTheme(newMode);
  };

  // Carica la prima pagina all'avvio
  useEffect(() => {
    if (categories.length > 0 && categories[0].pages.length > 0) {
      setActivePage(categories[0].pages[0]);
      setEditContent(categories[0].pages[0].content);
      setEditTitle(categories[0].pages[0].title);
      setCodeToExecute(categories[0].pages[0].codeExample || '');
    }
  }, [categories]);

  // Funzione per espandere/comprimere categoria
  const toggleCategory = (categoryId) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId 
        ? { ...cat, expanded: !cat.expanded }
        : cat
    ));
  };

  // Funzione per selezionare una pagina
  const selectPage = (categoryId, page) => {
    setActiveCategory(categoryId);
    setActivePage(page);
    setEditContent(page.content);
    setEditTitle(page.title);
    setCodeToExecute(page.codeExample || '');
    setIsEditing(false);
    setShowTerminal(false);
    setTerminalOutput('');
  };

  // Funzione per salvare le modifiche
  const handleSave = () => {
    if (!activePage) return;
    
    const updatedCategories = categories.map(category => ({
      ...category,
      pages: category.pages.map(page => 
        page.id === activePage.id
          ? {
              ...page,
              title: editTitle,
              content: editContent,
              codeExample: codeToExecute,
              lastModified: new Date().toISOString()
            }
          : page
      )
    }));
    
    setCategories(updatedCategories);
    setActivePage({
      ...activePage,
      title: editTitle,
      content: editContent,
      codeExample: codeToExecute,
      lastModified: new Date().toISOString()
    });
    setIsEditing(false);
  };

  // Funzione per annullare le modifiche
  const handleCancel = () => {
    if (activePage) {
      setEditContent(activePage.content);
      setEditTitle(activePage.title);
      setCodeToExecute(activePage.codeExample || '');
    }
    setIsEditing(false);
  };

  // Funzione per eseguire il codice nel terminale
  const executeCode = () => {
    setShowTerminal(true);
    setTerminalOutput('Executing code...\n');
    
    setTimeout(() => {
      try {
        let output = 'Code executed successfully!\n\n';
        
        if (codeToExecute.includes('html')) {
          output += 'HTML code would be rendered in a browser.\n';
          output += 'Tip: Save this code in a .html file and open it in your browser.';
        } else if (codeToExecute.includes('console.log')) {
          const logs = codeToExecute.match(/console\.log\(['"`]([^'"`]+)['"`]\)/g);
          if (logs) {
            logs.forEach(log => {
              const message = log.match(/['"`]([^'"`]+)['"`]/)[1];
              output += `> ${message}\n`;
            });
          }
        } else if (codeToExecute.includes('SELECT') || codeToExecute.includes('INSERT')) {
          output += 'SQL query executed successfully!\n';
          output += 'Results would be displayed in a real database environment.';
        } else {
          output += 'Code execution completed.\n';
          output += 'Output would depend on the specific environment and language.';
        }
        
        setTerminalOutput(output);
      } catch (error) {
        setTerminalOutput(`Error: ${error.message}`);
      }
    }, 1000);
  };

  // Funzione per creare una nuova categoria
  const handleCreateCategory = () => {
    if (!newCategoryTitle.trim()) return;
    
    const newCategory = {
      id: Date.now().toString(),
      title: newCategoryTitle,
      icon: newCategoryIcon,
      expanded: true,
      pages: []
    };
    
    setCategories([...categories, newCategory]);
    setNewCategoryTitle('');
    setNewCategoryIcon('📁');
    setShowNewCategoryForm(false);
  };

  // Funzione per creare una nuova pagina
  const handleCreatePage = () => {
    if (!newPageTitle.trim() || !activeCategory) return;
    
    const newPage = {
      id: Date.now().toString(),
      title: newPageTitle,
      content: newPageContent || `# ${newPageTitle}\n\nInserisci qui il contenuto della pagina...`,
      codeExample: '',
      lastModified: new Date().toISOString(),
      author: 'Admin'
    };
    
    const updatedCategories = categories.map(category => 
      category.id === activeCategory
        ? { ...category, pages: [...category.pages, newPage] }
        : category
    );
    
    setCategories(updatedCategories);
    setNewPageTitle('');
    setNewPageContent('');
    setShowNewPageForm(false);
    
    selectPage(activeCategory, newPage);
    setIsEditing(true);
  };

  // Funzione per eliminare una pagina
  const handleDeletePage = (categoryId, pageId) => {
    if (!confirm('Sei sicuro di voler eliminare questa pagina?')) return;
    
    const updatedCategories = categories.map(category => 
      category.id === categoryId
        ? { ...category, pages: category.pages.filter(page => page.id !== pageId) }
        : category
    );
    
    setCategories(updatedCategories);
    
    if (activePage && activePage.id === pageId) {
      setActivePage(null);
      setEditContent('');
      setEditTitle('');
      setCodeToExecute('');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'light bg-gray-50'} font-mono`}>
      {/* Header con colori del sito */}
      <header className={`${isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
      } border-b backdrop-blur-xl sticky top-0 z-40`}>
        <div className="max-w-none px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <a href="/" className={`flex items-center space-x-3 ${isDarkMode 
                ? 'text-green-400 hover:text-green-300' 
                : 'text-green-600 hover:text-green-700'
              } transition-colors duration-200`}>
                <ArrowLeft size={20} strokeWidth={1.5} />
                <span className="text-sm font-medium">Torna alla Home</span>
              </a>
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isDarkMode 
                  ? 'bg-gradient-to-br from-green-400 to-blue-500' 
                  : 'bg-gradient-to-br from-green-600 to-blue-600'
                }`}>
                  <span className="text-white text-sm font-semibold">T</span>
                </div>
                <div>
                  <h1 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    wikiTADD
                  </h1>
                  <p className={`text-xs font-normal ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Informatica & Sviluppo
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Toggle tema */}
              <button
                onClick={toggleDarkMode}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ${
                  isDarkMode ? 'bg-green-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
              
              {isAdmin && (
                <button
                  onClick={() => setShowAdminPanel(!showAdminPanel)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                    showAdminPanel 
                      ? isDarkMode 
                        ? 'bg-green-600 text-white shadow-lg shadow-green-200' 
                        : 'bg-green-600 text-white shadow-lg shadow-green-200'
                      : isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Settings size={16} strokeWidth={1.5} />
                  <span className="text-sm font-medium">Admin</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar con colori del sito */}
        <aside className={`w-80 ${isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
        } border-r backdrop-blur-xl overflow-y-auto`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Categorie
              </h2>
              {isAdmin && (
                <button
                  onClick={() => setShowNewCategoryForm(true)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  title="Aggiungi Categoria"
                >
                  <Plus size={16} strokeWidth={1.5} />
                </button>
              )}
            </div>

            {/* Form nuova categoria */}
            {showNewCategoryForm && (
              <div className={`mb-6 p-4 rounded-2xl border shadow-sm ${isDarkMode 
                ? 'bg-gray-700 border-gray-600' 
                : 'bg-white border-gray-200'
              }`}>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Titolo Categoria
                    </label>
                    <input
                      type="text"
                      value={newCategoryTitle}
                      onChange={(e) => setNewCategoryTitle(e.target.value)}
                      placeholder="Es: Machine Learning"
                      className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent ${isDarkMode 
                        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-green-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-green-500'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Icona (emoji)
                    </label>
                    <input
                      type="text"
                      value={newCategoryIcon}
                      onChange={(e) => setNewCategoryIcon(e.target.value)}
                      placeholder="🤖"
                      className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent ${isDarkMode 
                        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-green-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-green-500'
                      }`}
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleCreateCategory}
                      className={`flex-1 px-4 py-3 rounded-xl font-medium transition-colors duration-200 ${isDarkMode 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      Crea
                    </button>
                    <button
                      onClick={() => setShowNewCategoryForm(false)}
                      className={`flex-1 px-4 py-3 rounded-xl font-medium transition-colors duration-200 ${isDarkMode 
                        ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      Annulla
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Lista categorie */}
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className={`rounded-2xl border overflow-hidden shadow-sm ${isDarkMode 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-white border-gray-200'
                }`}>
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className={`w-full flex items-center justify-between p-4 text-left transition-colors duration-200 ${isDarkMode 
                      ? 'hover:bg-gray-600' 
                      : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{category.icon}</span>
                      <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {category.title}
                      </span>
                    </div>
                    <div className={`transform transition-transform duration-200 ${category.expanded ? 'rotate-180' : ''}`}>
                      <ChevronDown size={20} strokeWidth={1.5} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                    </div>
                  </button>
                  
                  {category.expanded && (
                    <div className={`border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-100'}`}>
                      {category.pages.map((page) => (
                        <div key={page.id} className="flex items-center group">
                          <button
                            onClick={() => selectPage(category.id, page)}
                            className={`flex-1 flex items-center space-x-3 px-6 py-3 text-left transition-colors duration-200 ${
                              activePage?.id === page.id 
                                ? isDarkMode 
                                  ? 'bg-green-900/50 text-green-400' 
                                  : 'bg-green-50 text-green-700'
                                : isDarkMode
                                  ? 'text-gray-300 hover:bg-gray-600'
                                  : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <FileText size={16} strokeWidth={1.5} />
                            <span className="font-medium">{page.title}</span>
                          </button>
                          {isAdmin && (
                            <button
                              onClick={() => handleDeletePage(category.id, page.id)}
                              className={`p-3 opacity-0 group-hover:opacity-100 transition-all duration-200 ${isDarkMode 
                                ? 'text-gray-500 hover:text-red-400' 
                                : 'text-gray-400 hover:text-red-500'
                              }`}
                              title="Elimina Pagina"
                            >
                              <Trash2 size={14} strokeWidth={1.5} />
                            </button>
                          )}
                        </div>
                      ))}
                      
                      {isAdmin && (
                        <button
                          onClick={() => {
                            setActiveCategory(category.id);
                            setShowNewPageForm(true);
                          }}
                          className={`w-full flex items-center space-x-3 px-6 py-3 transition-colors duration-200 ${isDarkMode 
                            ? 'text-gray-400 hover:text-white hover:bg-gray-600' 
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <Plus size={16} strokeWidth={1.5} />
                          <span className="font-medium">Aggiungi Pagina</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Contenuto principale */}
        <main className={`flex-1 flex flex-col overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          {activePage ? (
            <>
              {/* Header della pagina */}
              <div className={`backdrop-blur-xl border-b p-6 ${isDarkMode 
                ? 'bg-gray-800/70 border-gray-700' 
                : 'bg-white/70 border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className={`text-2xl font-bold bg-transparent border-b-2 pb-1 focus:outline-none w-full ${isDarkMode 
                          ? 'border-green-500 text-white' 
                          : 'border-green-600 text-gray-900'
                        }`}
                      />
                    ) : (
                      <h1 className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {activePage.title}
                      </h1>
                    )}
                    <p className={`text-sm font-normal ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Ultima modifica: {new Date(activePage.lastModified).toLocaleString('it-IT')} • {activePage.author}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {isAdmin && (
                      <>
                        {!isEditing ? (
                          <button
                            onClick={() => setIsEditing(true)}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-colors duration-200 shadow-lg ${isDarkMode 
                              ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-200' 
                              : 'bg-green-600 hover:bg-green-700 text-white shadow-green-200'
                            }`}
                          >
                            <Edit size={16} strokeWidth={1.5} />
                            <span>Modifica</span>
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={handleSave}
                              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-colors duration-200 shadow-lg ${isDarkMode 
                                ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-200' 
                                : 'bg-green-600 hover:bg-green-700 text-white shadow-green-200'
                              }`}
                            >
                              <Save size={16} strokeWidth={1.5} />
                              <span>Salva</span>
                            </button>
                            <button
                              onClick={handleCancel}
                              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-colors duration-200 ${isDarkMode 
                                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                              }`}
                            >
                              <X size={16} strokeWidth={1.5} />
                              <span>Annulla</span>
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Contenuto scrollabile */}
              <div className="flex-1 overflow-hidden flex">
                {/* Area contenuto */}
                <div className="flex-1 overflow-y-auto p-8">
                  {isEditing ? (
                    <div className="space-y-6">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className={`w-full h-96 border rounded-2xl p-6 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${isDarkMode 
                          ? 'bg-gray-800 border-gray-600 text-white focus:ring-green-500' 
                          : 'bg-gray-50 border-gray-200 text-gray-900 focus:ring-green-500'
                        }`}
                        placeholder="Scrivi il contenuto della pagina in Markdown..."
                      />
                      
                      <div>
                        <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Esempio di Codice (opzionale)
                        </label>
                        <textarea
                          value={codeToExecute}
                          onChange={(e) => setCodeToExecute(e.target.value)}
                          className={`w-full h-48 border rounded-2xl p-6 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${isDarkMode 
                            ? 'bg-gray-800 border-gray-600 text-white focus:ring-green-500' 
                            : 'bg-gray-50 border-gray-200 text-gray-900 focus:ring-green-500'
                          }`}
                          placeholder="Inserisci un esempio di codice che gli utenti possono testare..."
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="prose prose-lg max-w-none">
                      <div dangerouslySetInnerHTML={{ 
                        __html: activePage.content
                          .replace(/```(\w+)\n([\s\S]*?)```/g, `<div class="${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-200'} border rounded-2xl p-6 my-6 overflow-x-auto"><pre class="text-sm font-mono ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}"><code class="language-$1">$2</code></pre></div>`)
                          .replace(/`([^`]+)`/g, `<code class="${isDarkMode ? 'bg-gray-700 text-green-400' : 'bg-gray-100 text-green-700'} px-2 py-1 rounded-lg text-sm font-mono">$1</code>`)
                          .replace(/\*\*(.*?)\*\*/g, `<strong class="font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-700'}">$1</strong>`)
                          .replace(/\*(.*?)\*/g, `<em class="italic ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}">$1</em>`)
                          .replace(/^# (.*$)/gim, `<h1 class="text-3xl font-bold mt-8 mb-6 ${isDarkMode ? 'text-green-400' : 'text-green-700'}">$1</h1>`)
                          .replace(/^## (.*$)/gim, `<h2 class="text-2xl font-semibold mt-8 mb-4 ${isDarkMode ? 'text-green-400' : 'text-green-700'}">$1</h2>`)
                          .replace(/^### (.*$)/gim, `<h3 class="text-xl font-semibold mt-6 mb-3 ${isDarkMode ? 'text-green-400' : 'text-green-700'}">$1</h3>`)
                          .replace(/^- (.*$)/gim, `<li class="ml-6 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}">$1</li>`)
                          .replace(/\n\n/g, `</p><p class="mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}">`)
                          .replace(/^(?!<[h|l|p|d])(.*$)/gim, `<p class="mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}">$1</p>`)
                      }} />
                    </div>
                  )}
                </div>

                {/* Terminale integrato - LA FUNZIONALITÀ PRINCIPALE! */}
                {(codeToExecute || isEditing) && (
                  <div className={`w-96 border-l flex flex-col ${isDarkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                  }`}>
                    <div className={`p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className={`font-semibold flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          <Terminal size={18} strokeWidth={1.5} />
                          <span>Code Terminal</span>
                        </h3>
                        <button
                          onClick={() => setShowTerminal(!showTerminal)}
                          className={`transition-colors duration-200 ${isDarkMode 
                            ? 'text-gray-400 hover:text-gray-300' 
                            : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          {showTerminal ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <textarea
                          value={codeToExecute}
                          onChange={(e) => setCodeToExecute(e.target.value)}
                          className={`w-full h-32 border rounded-xl p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${isDarkMode 
                            ? 'bg-gray-900 border-gray-600 text-white focus:ring-green-500' 
                            : 'bg-gray-50 border-gray-200 text-gray-900 focus:ring-green-500'
                          }`}
                          placeholder="Scrivi qui il codice da testare..."
                          readOnly={!isEditing}
                        />
                        
                        <button
                          onClick={executeCode}
                          className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-colors duration-200 shadow-lg ${isDarkMode 
                            ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-200' 
                            : 'bg-green-600 hover:bg-green-700 text-white shadow-green-200'
                          }`}
                        >
                          <Play size={16} strokeWidth={1.5} />
                          <span>Esegui Codice</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* Output del terminale con stile macOS */}
                    {showTerminal && (
                      <div className="flex-1 p-6">
                        <div className="bg-gray-900 rounded-2xl p-6 h-full overflow-y-auto">
                          <div className="flex items-center space-x-2 mb-4">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-gray-500 text-xs font-medium ml-2">Terminal</span>
                          </div>
                          <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap leading-relaxed">
                            {terminalOutput || 'Premi "Esegui Codice" per vedere l\'output...'}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Stato iniziale quando nessuna pagina è selezionata */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-8 max-w-lg">
                <div className="relative">
                  <div className={`w-24 h-24 rounded-3xl mx-auto flex items-center justify-center shadow-2xl ${isDarkMode 
                    ? 'bg-gradient-to-br from-green-400 to-blue-500 shadow-green-200' 
                    : 'bg-gradient-to-br from-green-600 to-blue-600 shadow-green-200'
                  }`}>
                    <span className="text-4xl">📚</span>
                  </div>
                  <div className={`absolute inset-0 rounded-3xl mx-auto blur-xl opacity-20 scale-110 ${isDarkMode 
                    ? 'bg-gradient-to-br from-green-400 to-blue-500' 
                    : 'bg-gradient-to-br from-green-600 to-blue-600'
                  }`}></div>
                </div>
                <div>
                  <h2 className={`text-3xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Benvenuto in wikiTADD
                  </h2>
                  <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Seleziona una categoria e una pagina dalla sidebar per iniziare a esplorare.
                  </p>
                  <p className={`mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    Una wiki dedicata all'informatica e allo sviluppo software.
                  </p>
                </div>
                {isAdmin && categories.length === 0 && (
                  <button
                    onClick={() => setShowNewCategoryForm(true)}
                    className={`px-8 py-4 rounded-2xl font-medium transition-colors duration-200 shadow-xl ${isDarkMode 
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-200' 
                      : 'bg-green-600 hover:bg-green-700 text-white shadow-green-200'
                    }`}
                  >
                    Crea la Prima Categoria
                  </button>
                )}
              </div>
            </div>
          )}
        </main>

        {/* Pannello Admin */}
        {showAdminPanel && isAdmin && (
          <aside className={`w-80 border-l backdrop-blur-xl overflow-y-auto ${isDarkMode 
            ? 'bg-gray-800/50 border-gray-700' 
            : 'bg-white/50 border-gray-200'
          }`}>
            <div className="p-6">
              <h2 className={`text-lg font-semibold mb-6 flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <Settings size={20} strokeWidth={1.5} />
                <span>Pannello Admin</span>
              </h2>
              
              <div className="space-y-6">
                <div className={`rounded-2xl p-6 border shadow-sm ${isDarkMode 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-white border-gray-200'
                }`}>
                  <h3 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Statistiche
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Categorie:</span>
                      <span className={`font-semibold px-3 py-1 rounded-full text-sm ${isDarkMode 
                        ? 'text-white bg-gray-600' 
                        : 'text-gray-900 bg-gray-100'
                      }`}>
                        {categories.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Pagine Totali:</span>
                      <span className={`font-semibold px-3 py-1 rounded-full text-sm ${isDarkMode 
                        ? 'text-white bg-gray-600' 
                        : 'text-gray-900 bg-gray-100'
                      }`}>
                        {categories.reduce((total, cat) => total + cat.pages.length, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Ultima Modifica:</span>
                      <span className={`font-semibold text-xs ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {activePage ? new Date(activePage.lastModified).toLocaleDateString('it-IT') : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className={`rounded-2xl p-6 border shadow-sm ${isDarkMode 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-white border-gray-200'
                }`}>
                  <h3 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Azioni Rapide
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowNewCategoryForm(true)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors duration-200 ${isDarkMode 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      <Plus size={16} strokeWidth={1.5} />
                      <span>Nuova Categoria</span>
                    </button>
                    {activeCategory && (
                      <button
                        onClick={() => setShowNewPageForm(true)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors duration-200 ${isDarkMode 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                      >
                        <Plus size={16} strokeWidth={1.5} />
                        <span>Nuova Pagina</span>
                      </button>
                    )}
                  </div>
                </div>
                
                {activePage && (
                  <div className={`rounded-2xl p-6 border shadow-sm ${isDarkMode 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-white border-gray-200'
                  }`}>
                    <h3 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Pagina Corrente
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Titolo:</span>
                        <p className={`font-medium break-words ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {activePage.title}
                        </p>
                      </div>
                      <div>
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Autore:</span>
                        <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {activePage.author}
                        </p>
                      </div>
                      <div>
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Caratteri:</span>
                        <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {activePage.content.length}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Modal per nuova pagina */}
      {showNewPageForm && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`rounded-3xl p-8 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto shadow-2xl ${isDarkMode 
            ? 'bg-gray-800' 
            : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Crea Nuova Pagina
              </h2>
              <button
                onClick={() => {
                  setShowNewPageForm(false);
                  setNewPageTitle('');
                  setNewPageContent('');
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Titolo Pagina
                </label>
                <input
                  type="text"
                  value={newPageTitle}
                  onChange={(e) => setNewPageTitle(e.target.value)}
                  placeholder="Es: JavaScript Async/Await"
                  className={`w-full px-4 py-4 border rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent ${isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-green-500' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-green-500'
                  }`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Contenuto Iniziale (Markdown)
                </label>
                <textarea
                  value={newPageContent}
                  onChange={(e) => setNewPageContent(e.target.value)}
                  placeholder="# Titolo&#10;&#10;Inserisci qui il contenuto della pagina...&#10;&#10;## Sottotitolo&#10;&#10;Testo del paragrafo."
                  rows={12}
                  className={`w-full px-4 py-4 border rounded-2xl font-mono text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent ${isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-green-500' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-green-500'
                  }`}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => {
                  setShowNewPageForm(false);
                  setNewPageTitle('');
                  setNewPageContent('');
                }}
                className={`px-6 py-3 rounded-2xl font-medium transition-colors duration-200 ${isDarkMode 
                  ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                Annulla
              </button>
              <button
                onClick={handleCreatePage}
                disabled={!newPageTitle.trim()}
                className={`px-6 py-3 rounded-2xl font-medium transition-colors duration-200 shadow-lg ${
                  !newPageTitle.trim()
                    ? isDarkMode 
                      ? 'bg-gray-600 cursor-not-allowed text-gray-400' 
                      : 'bg-gray-300 cursor-not-allowed text-gray-500'
                    : isDarkMode 
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-200' 
                      : 'bg-green-600 hover:bg-green-700 text-white shadow-green-200'
                }`}
              >
                Crea Pagina
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WikiTADD;