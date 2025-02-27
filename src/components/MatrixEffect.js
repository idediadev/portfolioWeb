import React, { useEffect } from 'react';

const MatrixEffect = () => {
  useEffect(() => {
    const matrix = document.querySelector('.matrix');
    const columns = Math.floor(window.innerWidth / 20);
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const drops = Array(columns).fill(1);

    const draw = () => {
      matrix.innerHTML = '';
      drops.forEach((y, index) => {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const span = document.createElement('span');
        span.style.left = `${index * 20}px`;
        span.style.top = `${y * 20}px`;
        span.textContent = text;
        matrix.appendChild(span);

        drops[index] = y > window.innerHeight / 20 ? 0 : y + 1;
      });
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, []);

  return <div className="matrix"></div>;
};

export default MatrixEffect;