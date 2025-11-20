import React, { useState, useEffect } from 'react';

const FloatingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToForm = () => {
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 animate-fade-in">
      <button
        onClick={scrollToForm}
        className="bg-brand-red hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-2xl flex items-center gap-2 transition-all hover:scale-105 border-2 border-white"
      >
        INSCREVA-SE AGORA
      </button>
    </div>
  );
};

export default FloatingCTA;