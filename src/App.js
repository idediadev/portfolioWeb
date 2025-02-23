import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Card from './components/Card';
import Footer from './components/Footer';
import useCardAnimation from './components/AnimatioHandler';
import './styles/styles.css';

const App = () => {

  useCardAnimation();

  const cards = [
    {
      id: 'masteryhub',
      title: '00 MasteryHub',
      description: 'Welcome to MasteryHub, where expertise meets innovation. Explore our collection of skills, projects, and technological achievements that showcase the journey of continuous learning and mastery.',
      animatedShape: 'animated-circle',
      delay: 0
    },
    {
      id: 'madebyme',
      title: '01 MadebyMe',
      description: 'Discover a showcase of personal projects and creations. Each piece represents a unique blend of creativity, technical skill, and innovative thinking, bringing ideas to life through code and design.',
      animatedShape: 'animated-triangle',
      delay: 0.2
    },
    {
      id: 'servicehub',
      title: '02 ServiceHub',
      description: 'Explore our comprehensive range of services designed to meet your digital needs. From web development to technical consulting, we provide solutions that drive success and innovation.',
      animatedShape: 'animated-square',
      delay: 0.4
    }
  ];

  return (
    <>
      <Navbar />
      <HeroSection />
      {cards.map((card, index) => (
        <Card 
          key={card.id}
          {...card}
          className={index === 0 ? "mt-[700px]" : ""}
        />
      ))}
      <Footer />
    </>
  );
};

export default App;
