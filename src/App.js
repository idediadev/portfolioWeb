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
      description: 'My skills span both front-end and back-end development, making me a versatile candidate for your computer engineering team. On the back end, I excel at addressing concurrency challenges and ensuring mutual exclusion—skills that are essential when developing components of operating systems and establishing reliable server-client communications over the TCP/IP protocol. I have a proven track record with server technologies such as Tomcat and Node.js, which enable me to build robust, scalable, and responsive web applications. On the front end, I leverage modern frameworks like React and TailwindCSS to develop complex, user-friendly, and seamless applications. My experience extends to developing solutions that run in both local and remote runtime environments. I am proficient in a variety of programming languages and tools. My core languages include C, C++, C#, Java, and Python for object-oriented programming—enhanced by extensive use of Python libraries such as Manim, PyTorch, Pandas, NumPy, and TensorFlow. In addition, I work effectively with JavaScript and TypeScript, and I utilize Microsoft SQL for managing IBM databases. I also have strong scripting skills with Bash for Linux/Mac systems and Microsoft PowerShell, and I regularly employ advanced programming constructs such as lambda expressions and regular expressions (RegEx).Furthermore, I possess a solid foundation in artificial intelligence, with a particular focus on machine learning. I have developed AI solutions that harness dataset-driven approaches to tackle specialized tasks, demonstrating my capability to integrate AI into practical applications.',
      animatedShape: 'animated-circle',
      delay: 0
    },
    {
      id: 'madebyme',
      title: '01 MadebyMe',
      description: '-> This website ;-) ->Analysis of datasets from Fugaku, the Japanese supercomputer, with the aim of developing machine learning tasks, including predicting the exit state, duration, and computational power consumption of a job through regression problems.',
      animatedShape: 'animated-triangle',
      delay: 0.2
    },
    {
      id: 'servicehub',
      title: '02 ServiceHub',
      description: 'The services currently offered are still being defined; for now, our hamsters are hard at work.',
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
