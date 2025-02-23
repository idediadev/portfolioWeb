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