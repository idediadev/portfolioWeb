import React, { useEffect, useRef } from 'react';

const HeroSection = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Impostazione delle dimensioni del canvas per adattarsi al contenitore
    function resizeCanvas() {
      const container = canvas.parentElement;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Caratteri per il codice
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]()=><!?/\\|;:.,~-_+*&^%$#@";
    
    // Simboli e parole chiave che appaiono più frequentemente
    const codeWords = [
      "function", "const", "let", "var", "if", "else", "for", "while", 
      "return", "class", "import", "export", "=>", "async", "await", 
      "try", "catch", "null", "undefined", "true", "false", "{}", "[]", "()",
      "React", "useState", "useEffect", "props", "component", "render"
    ];
    
    // Colonna di codice (droplet)
    class CodeColumn {
      constructor(x) {
        this.x = x;
        this.y = Math.random() * -height;
        this.length = Math.floor(Math.random() * 15) + 5; // Lunghezza variabile
        this.speed = Math.random() * 2 + 1;
        this.characters = [];
        this.updateInterval = Math.floor(Math.random() * 15) + 5;
        this.frameCount = 0;
        this.fadeAlpha = Math.random() * 0.3 + 0.1; // Opacità ridotta per migliorare la leggibilità
        
        // Probabilità di usare parole chiave invece di caratteri casuali
        this.useCodeWords = Math.random() > 0.7;
        
        // Inizializza la colonna con caratteri o parole
        this.initCharacters();
      }
      
      initCharacters() {
        if (this.useCodeWords) {
          // Usa parole chiave con alcuni caratteri casuali tra loro
          let currentY = this.y;
          while (currentY < this.y + this.length * 20) {
            if (Math.random() > 0.4) {
              // Inserisci una parola chiave
              const word = codeWords[Math.floor(Math.random() * codeWords.length)];
              this.characters.push({
                text: word,
                x: this.x,
                y: currentY,
                alpha: this.fadeAlpha,
                isKeyword: true
              });
              currentY += 20;
            } else {
              // Inserisci un carattere casuale
              this.characters.push({
                text: chars.charAt(Math.floor(Math.random() * chars.length)),
                x: this.x,
                y: currentY,
                alpha: this.fadeAlpha * 0.8,
                isKeyword: false
              });
              currentY += 20;
            }
          }
        } else {
          // Usa solo caratteri casuali
          for (let i = 0; i < this.length; i++) {
            this.characters.push({
              text: chars.charAt(Math.floor(Math.random() * chars.length)),
              x: this.x,
              y: this.y + i * 20,
              alpha: this.fadeAlpha - (i / this.length) * 0.2, // Sfuma lungo la colonna
              isKeyword: false
            });
          }
        }
      }
      
      update() {
        // Muovi ogni carattere verso il basso
        for (let i = 0; i < this.characters.length; i++) {
          this.characters[i].y += this.speed;
        }
        
        // Aggiungi nuovi caratteri se necessario
        if (this.characters.length > 0 && this.characters[0].y > 20) {
          let newChar;
          if (this.useCodeWords && Math.random() > 0.4) {
            const word = codeWords[Math.floor(Math.random() * codeWords.length)];
            newChar = {
              text: word,
              x: this.x,
              y: this.characters[0].y - 20,
              alpha: this.fadeAlpha,
              isKeyword: true
            };
          } else {
            newChar = {
              text: chars.charAt(Math.floor(Math.random() * chars.length)),
              x: this.x,
              y: this.characters[0].y - 20,
              alpha: this.fadeAlpha,
              isKeyword: false
            };
          }
          this.characters.unshift(newChar);
        }
        
        // Rimuovi i caratteri che escono dallo schermo
        while (this.characters.length > 0 && this.characters[this.characters.length - 1].y > height) {
          this.characters.pop();
        }
        
        // Occasionalmente cambia qualche carattere per dare dinamicità
        this.frameCount++;
        if (this.frameCount >= this.updateInterval) {
          this.frameCount = 0;
          for (let i = 0; i < this.characters.length; i++) {
            if (!this.characters[i].isKeyword && Math.random() > 0.7) {
              this.characters[i].text = chars.charAt(Math.floor(Math.random() * chars.length));
            }
          }
        }
      }
      
      draw(ctx) {
        for (let i = 0; i < this.characters.length; i++) {
          const char = this.characters[i];
          ctx.globalAlpha = char.alpha;
          
          // Il primo carattere è più luminoso per un effetto "testa" della colonna
          if (i === 0) {
            if (char.isKeyword) {
              ctx.fillStyle = '#00ff7f'; // Verde brillante per le parole chiave
              ctx.font = 'bold 14px monospace';
            } else {
              ctx.fillStyle = '#ffffff'; // Bianco per i caratteri normali
              ctx.font = 'bold 16px monospace';
            }
          } else {
            if (char.isKeyword) {
              ctx.fillStyle = '#00bb5c'; // Verde più scuro per le parole chiave
              ctx.font = '13px monospace';
            } else {
              ctx.fillStyle = '#00ff7f'; // Verde per i caratteri normali
              ctx.font = '14px monospace';
            }
          }
          
          ctx.fillText(char.text, char.x, char.y);
        }
      }
    }
    
    // Creazione delle colonne
    const columns = [];
    const spacing = 20; // Spazio tra le colonne
    const numColumns = Math.ceil(width / spacing);
    
    for (let i = 0; i < numColumns; i++) {
      columns.push(new CodeColumn(i * spacing));
    }
    
    // Funzione di animazione
    function animate() {
      // Sfondo semitrasparente per l'effetto "scia"
      ctx.fillStyle = 'rgba(13, 13, 13, 0.15)'; // Aumentata trasparenza
      ctx.fillRect(0, 0, width, height);
      
      for (let i = 0; i < columns.length; i++) {
        columns[i].update();
        columns[i].draw(ctx);
      }
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section className="w-full mx-auto mt-5 px-4">
      <div className="w-full mx-auto relative"> {/* Rimosso max-w-6xl per consentire al contenitore di espandersi alla larghezza completa */}
        {/* Canvas per l'animazione di sfondo */}
        <canvas 
          ref={canvasRef} 
          className="absolute top-0 left-0 w-full h-full z-0"
          style={{ opacity: '0.8' }} // Ridotta l'opacità per migliorare la leggibilità
        />
        
        {/* Overlay scuro per migliorare la leggibilità */}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10"></div>
        
        {/* Contenuto della hero section */}
        <div className="relative z-20 flex flex-col md:flex-row max-w-6xl mx-auto"> {/* Aggiunto max-w-6xl e mx-auto qui per centrare il contenuto ma permettere al background di essere full-width */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0 flex items-center justify-center p-8">
            <div className="text-center">
              <h2 className="text-emerald-300 text-3xl md:text-4xl font-bold mb-4">Davide Taddia</h2>
              <p className="text-white text-lg md:text-xl">Computer Science Student & Developer</p>
              <div className="mt-6 border-t border-emerald-700 pt-4 w-3/4 mx-auto">
                <p className="text-emerald-100 text-sm md:text-base italic">
                  "Turning passion into code, one project at a time."
                </p>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex flex-col justify-center p-4 md:p-12 slide-in-section">
            <h1 className="text-emerald-300 text-3xl md:text-4xl mb-6">
              About Me
            </h1>
            <p className="text-emerald-300 text-base md:text-lg">
              I'm really passionate about computer science and everything related to it. Right now, I'm just a university student, but I'm working hard every day to get closer to my goals. I set up this page as a style exercise, and hopefully, one day, I'll fill it with bigger and more interesting projects.
              <br /><br />
              My journey into computer science started out of pure curiosity and quickly turned into a passion...
              <br /><br />
              Even though I'm still a student, I firmly believe that every small step counts. Every project I take on or every challenge I face pushes me closer to becoming the professional I aspire to be. That's why I see this page as more than just a showcase—it's a timeline of my growth, learning experiences, and the knowledge I gather along the way.
              <br /><br />
              For now, it might just be a collection of experiments and simple projects, but I hope it will gradually turn into a portfolio of more ambitious and impactful work. Stay tuned for more updates and projects as I continue learning and evolving!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;