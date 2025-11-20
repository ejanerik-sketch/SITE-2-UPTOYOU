import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, COLORS } from '../constants';
import { useContent } from '../context/ContentContext';
import EditableImage from './EditableImage';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { content } = useContent();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.querySelector(id);
    if (element) {
      const offset = 80; // Height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo Area */}
        <div className="w-32 md:w-40 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
             <EditableImage 
                section="hero"
                imageField="logoUrl"
                widthField="logoWidth"
                imageUrl={content.hero.logoUrl}
                widthValue={isScrolled ? 120 : 150} // Smaller logo on scroll
                alt="Projeto UpToYou"
                style={{ objectFit: 'contain' }}
                allowResize={false} // Disable resize in navbar to prevent layout breaks
            />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                isScrolled ? 'text-gray-600 hover:text-brand-red' : 'text-white hover:text-brand-yellow shadow-black/20'
              }`}
              style={{ textShadow: isScrolled ? 'none' : '0 2px 4px rgba(0,0,0,0.3)' }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('#registration')}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-transform hover:scale-105 ${
                isScrolled 
                ? 'bg-brand-red text-white hover:bg-red-700' 
                : 'bg-white text-brand-red hover:bg-gray-100'
            }`}
          >
            INSCREVA-SE
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
             <X className={isScrolled ? 'text-gray-800' : 'text-white'} size={28} />
          ) : (
             <Menu className={isScrolled ? 'text-gray-800' : 'text-white'} size={28} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="flex flex-col p-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="py-3 text-gray-800 font-semibold border-b border-gray-100 text-left hover:text-brand-green"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('#registration')}
            className="mt-4 w-full py-3 bg-brand-red text-white font-bold rounded-lg"
          >
            INSCREVA-SE
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;