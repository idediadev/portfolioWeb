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

    // Canvas full screen
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();
    // CHAR base set for the matrix like effect
    const characterSets = [
      // Latin Alphabet
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      // Cyrillic characters
      'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя',
      // Greek characters
      'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω',
      // Arabian Numbers
      '٠١٢٣٤٥٦٧٨٩',
      // Metacharacters
      '!@#$%^&*()_+-=[]{}|;:,./<>?'
    ];

    // Join at all 
    const allCharacters = characterSets.join('');
    
    // Random class for pooping up the characters
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
        
        // Dark Light mode management for the matrix like effect
        const htmlElement = document.documentElement;
        const isDarkMode = htmlElement.classList.contains('dark');
        this.color = isDarkMode ? 
          'rgba(0, 255, 127, ' + this.maxOpacity + ')' : // Dark mode - verde brillante 
          'rgba(0, 143, 79, ' + this.maxOpacity + ')';   // Light mode - verde scuro
      }

      getRandomCharacter() {
        return allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
      }

      update() {
        this.frameCount++;
        this.age++;

        // Change character randomly
        if (this.frameCount >= this.changeInterval) {
          this.frameCount = 0;
          if (Math.random() > 0.7) {
            this.value = this.getRandomCharacter();
          }
        }

        // fade in/out
        if (this.fadeIn) {
          this.opacity += this.fadeSpeed;
          if (this.opacity >= this.maxOpacity) {
            this.opacity = this.maxOpacity;
            this.fadeIn = false;
          }
        } else {
          // fade out timer 
          if (this.age > this.lifeTime) {
            this.opacity -= this.fadeSpeed;
          }
        }

        return this.opacity > 0 && this.opacity <= 1;
      }

      draw(ctx) {
        if (this.opacity <= 0) return false;
        
        ctx.font = `${this.size}px monospace`;
        
        // Color section
        const htmlElement = document.documentElement;
        const isDarkMode = htmlElement.classList.contains('dark');
        const colorBase = isDarkMode ? '0, 255, 127' : '0, 143, 79';
        
        ctx.fillStyle = `rgba(${colorBase}, ${this.opacity})`;
        ctx.fillText(this.value, this.x, this.y);
        return true;
      }
    }

    // Array saving the active characters 
    let characters = [];
    
    // density of characters in an Area (POV)
    const targetCharacterCount = Math.floor((canvas.width * canvas.height) / 15000);

    // animation
    const animate = () => {
      // clean the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // add new characters if needed
      while (characters.length < targetCharacterCount) {
        characters.push(new MatrixCharacter());
      }
      
      // update and draw characters
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

    // Cleaning up when the component is unmounted
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default EnhancedMatrixEffect;