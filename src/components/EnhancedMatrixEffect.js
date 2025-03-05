/*
@author       : Davide Taddia
@version      : 0.1
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : Enhanced Matrix Effect component
@email        : davide.taddia2@studio.unibo.it
*/
import React, { useEffect, useRef } from 'react';

const EnhancedMatrixEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Adatta il canvas alle dimensioni della finestra
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    // Raccolta di caratteri da utilizzare (alfabeti e numeri di diverse lingue)
    // Escludiamo icone ed emoji come richiesto
    const characterSets = [
      // Alfabeto latino (inglese, italiano, ecc.)
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      // Alfabeto cirillico
      'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя',
      // Caratteri greci
      'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω',
      // Numeri arabi
      '٠١٢٣٤٥٦٧٨٩',
      // Caratteri speciali comuni
      '!@#$%^&*()_+-=[]{}|;:,./<>?'
    ];

    // Unisci tutti i set di caratteri
    const allCharacters = characterSets.join('');
    
    // Classe per gestire i singoli caratteri
    class MatrixCharacter {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.value = this.getRandomCharacter();
        this.size = Math.floor(Math.random() * 16) + 10; // Dimensione variabile
        this.opacity = 0;
        this.maxOpacity = Math.random() * 0.5 + 0.1; // Opacità massima variabile
        this.fadeSpeed = Math.random() * 0.02 + 0.005;
        this.fadeIn = true;
        this.lifeTime = Math.floor(Math.random() * 100) + 50; // Durata vita
        this.age = 0;
        this.changeInterval = Math.floor(Math.random() * 20) + 10;
        this.frameCount = 0;
      }

      getRandomCharacter() {
        return allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
      }

      update() {
        this.frameCount++;
        this.age++;

        // Cambia il carattere occasionalmente
        if (this.frameCount >= this.changeInterval) {
          this.frameCount = 0;
          if (Math.random() > 0.7) {
            this.value = this.getRandomCharacter();
          }
        }

        // Gestione fade in/out
        if (this.fadeIn) {
          this.opacity += this.fadeSpeed;
          if (this.opacity >= this.maxOpacity) {
            this.opacity = this.maxOpacity;
            this.fadeIn = false;
          }
        } else {
          // Inizia a svanire dopo un certo periodo
          if (this.age > this.lifeTime) {
            this.opacity -= this.fadeSpeed;
          }
        }

        return this.opacity > 0 && this.opacity <= 1;
      }

      draw(ctx) {
        if (this.opacity <= 0) return false;
        
        ctx.font = `${this.size}px monospace`;
        ctx.fillStyle = `rgba(0, 255, 127, ${this.opacity})`;
        ctx.fillText(this.value, this.x, this.y);
        return true;
      }
    }

    // Array per memorizzare i caratteri attivi
    let characters = [];
    
    // Numero target di caratteri basato sull'area del canvas (regola la densità)
    const targetCharacterCount = Math.floor((canvas.width * canvas.height) / 15000);

    // Funzione di animazione
    const animate = () => {
      // Pulisci il canvas con uno sfondo trasparente
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Aggiungi nuovi caratteri se necessario
      while (characters.length < targetCharacterCount) {
        characters.push(new MatrixCharacter());
      }
      
      // Aggiorna e disegna tutti i caratteri
      characters = characters.filter(char => {
        const isAlive = char.update();
        if (isAlive) {
          char.draw(ctx);
        }
        return isAlive;
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Pulizia quando il componente viene smontato
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
};

export default EnhancedMatrixEffect;