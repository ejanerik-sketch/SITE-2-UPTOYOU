
import React from 'react';
import Countdown from './Countdown';
import { Calendar, ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import EditableText from './EditableText';

const Hero: React.FC = () => {
  const { content } = useContent();
  
  const scrollToForm = () => {
    const element = document.getElementById('registration');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-32 md:pt-40">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1529390079861-591de354f2f8?auto=format&fit=crop&q=80&w=1920")' }} 
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-brand-green/90 to-brand-green/80 mix-blend-multiply" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-white flex flex-col items-center mt-10">
        
        <div className="inline-flex items-center gap-2 bg-brand-yellow text-brand-grey font-bold px-4 py-1 rounded-full mb-6 text-sm md:text-base animate-fade-in-up">
          <Calendar className="w-4 h-4" />
          <span>15, 16 e 17 de Dezembro</span>
        </div>

        {/* Editable Titles */}
        <div className="w-full max-w-4xl">
            <EditableText 
                as="h1"
                section="hero"
                field="title"
                value={content.hero.title}
                className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow-lg mb-2"
            />
            
            <EditableText 
                as="div"
                section="hero"
                field="highlight"
                value={content.hero.highlight}
                className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-brand-yellow drop-shadow-lg mb-4 block"
            />
        </div>

        <div className="max-w-3xl mx-auto mb-8 opacity-90">
            <EditableText 
                as="h2"
                section="hero"
                field="subtitle"
                value={content.hero.subtitle}
                className="text-lg md:text-2xl font-light"
            />
             <h3 className="text-lg md:text-2xl font-bold mt-1">Doutor em Educação pela Universidad de Navarra</h3>
        </div>

        <div className="mb-10">
           <p className="text-sm font-semibold mb-2 uppercase tracking-widest opacity-80">Faltam apenas</p>
           <Countdown />
        </div>

        <button 
          onClick={scrollToForm}
          className="group bg-brand-red hover:bg-red-700 text-white text-lg md:text-xl font-bold py-4 px-10 rounded-full shadow-xl transition-all transform hover:scale-105 hover:shadow-2xl flex items-center gap-3 mx-auto"
        >
          INSCREVA-SE GRATUITAMENTE
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      
      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-[calc(100%+1.3px)] h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
