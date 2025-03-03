import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'hero', Component: Hero },
    { id: 'about', Component: About },
    { id: 'features', Component: Features },
    { id: 'skills', Component: Skills },
    { id: 'contact', Component: Contact },
  ];

  return (
    <div className="relative">
      <Header activeSection={activeSection} />
      
      {sections.map(({ id, Component }) => (
        <Section 
          key={id} 
          id={id} 
          setActiveSection={setActiveSection}
        >
          <Component />
        </Section>
      ))}
      
      <Footer />
    </div>
  );
}

function Section({ id, children, setActiveSection }) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      setActiveSection(id);
    }
  }, [inView, id, setActiveSection]);

  return (
    <section id={id} ref={ref} className="relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-20"
      >
        {children}
      </motion.div>
    </section>
  );
}

export default App;