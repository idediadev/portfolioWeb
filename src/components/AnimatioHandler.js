/*
@author       : Davide Taddia
@version      : 0.1
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : This is a custom hook that uses the IntersectionObserver API to animate the cards when they are in the viewport
@email        : davide.taddia2@studio.unibo.it
*/
import { useEffect } from 'react';

const useCardAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('card-animate');
          }, 300);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.card-trigger').forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);
};

export default useCardAnimation;