/*
@author       : Davide Taddia
@version      : 0.1
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : WikiRenderer component for rendering advanced wiki content with React Markdown and custom components
@email        : davide.taddia2@studio.unibo.it
*/
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

// Componente per il rendering avanzato del contenuto wiki
const WikiRenderer = ({ content, sources = [] }) => {
  const [showPythonOutput, setShowPythonOutput] = useState({});
  
  // Funzione per simulare l'output di animazioni Manim
  // In un'applicazione reale, questo potrebbe integrarsi con un servizio backend che esegue lo script Python
  const simulateManimOutput = (code) => {
    return "Animation rendering is simulated. In a production environment, this would generate and display the actual animation.";
  };
  
  // Componente personalizzato per il rendering dei blocchi di codice
  const CodeBlock = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match && match[1] ? match[1] : '';
    const codeString = String(children).replace(/\n$/, '');
    
    // Gestione specifica per il codice Python con Manim
    if (language === 'python' && codeString.includes('manim')) {
      const blockId = `manim-block-${Math.random().toString(36).substr(2, 9)}`;
      
      return (
        <div className="wiki-code-block manim-block">
          <div className="wiki-code-header">
            <span>Python with Manim</span>
            <button 
              className="wiki-run-button"
              onClick={() => {
                setShowPythonOutput(prev => ({
                  ...prev,
                  [blockId]: !prev[blockId]
                }));
              }}
            >
              {showPythonOutput[blockId] ? 'Hide Output' : 'Run Visualization'}
            </button>
          </div>
          
          <SyntaxHighlighter
            style={vscDarkPlus}
            language="python"
            {...props}
          >
            {codeString}
          </SyntaxHighlighter>
          
          {showPythonOutput[blockId] && (
            <div className="wiki-code-output">
              <h4>Visualization Output:</h4>
              <div className="wiki-manim-output">
                <div className="wiki-manim-placeholder">
                  <div className="wiki-manim-animation-placeholder">
                    {/* Placeholder per l'animazione - in produzione verrebbe sostituito con l'output reale */}
                    <svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" className="wiki-manim-svg">
                      <rect width="400" height="225" fill="#111" />
                      <text x="200" y="112.5" fill="#00ff7f" fontSize="16" textAnchor="middle">
                        Manim Animation would render here
                      </text>
                      {/* Semplice animazione di placeholder */}
                      <circle cx="200" cy="112.5" r="50" stroke="#00ff7f" strokeWidth="2" fill="none">
                        <animate attributeName="r" values="50;60;50" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="stroke-opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite" />
                      </circle>
                      <rect x="160" y="90" width="80" height="45" fill="#111" />
                      <text x="200" y="112.5" fill="#00ff7f" fontSize="12" textAnchor="middle">
                        Animation
                      </text>
                      <text x="200" y="130" fill="#00ff7f" fontSize="12" textAnchor="middle">
                        Preview
                      </text>
                    </svg>
                  </div>
                  <p className="wiki-manim-description">
                    {simulateManimOutput(codeString)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
    
    // Rendering standard per altri blocchi di codice
    return !inline && match ? (
      <div className="wiki-code-block">
        <div className="wiki-code-header">
          <span>{language.charAt(0).toUpperCase() + language.slice(1)}</span>
        </div>
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={language}
          PreTag="div"
          {...props}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  };
  
  // Componente per gestire le citazioni di fonti
  const Citation = ({ children, sourceId }) => {
    const source = sources.find(s => s.id === parseInt(sourceId));
    
    if (!source) return null;
    
    return (
      <sup className="wiki-source-citation" title={source.reference}>
        [{sourceId}]
      </sup>
    );
  };
  
  // Componente per il rendering dei link
  const LinkRenderer = ({ node, href, children, ...props }) => {
    // Controllo se il link è una citazione speciale (formato: [citation:ID])
    if (href && href.startsWith('citation:')) {
      const sourceId = href.replace('citation:', '');
      return <Citation sourceId={sourceId}>{children}</Citation>;
    }
    
    // Altrimenti renderizza un link normale
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  };
  
  // Rendering del markdown con i componenti personalizzati
  return (
    <div className="wiki-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code: CodeBlock,
          a: LinkRenderer
        }}
      >
        {content}
      </ReactMarkdown>
      
      {/* Sezione fonti, se presenti */}
      {sources && sources.length > 0 && (
        <div className="wiki-sources-list">
          <h3>Sources</h3>
          <ol>
            {sources.map(source => (
              <li key={source.id}>
                {source.reference}
                {source.url && (
                  <span> [<a href={source.url} target="_blank" rel="noopener noreferrer">Link</a>]</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default WikiRenderer;