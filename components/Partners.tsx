import React from 'react';
import { UNIVERSITY_PARTNERS } from '../constants';
import FadeIn from './FadeIn';
import { useContent } from '../context/ContentContext';
import EditableText from './EditableText';

const Partners: React.FC = () => {
  const { content } = useContent();
  
  return (
    <section className="py-12 bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <FadeIn>
            <h3 className="text-center text-gray-500 uppercase tracking-widest font-bold mb-8 text-sm">
                <EditableText section="partners" field="title" value={content.partners.title} />
            </h3>
            
            {/* Universities Grid */}
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                {UNIVERSITY_PARTNERS.map((partner, i) => (
                    <div key={i} className="text-center font-bold text-brand-grey text-sm md:text-base bg-white px-4 py-2 rounded shadow-sm">
                        {partner}
                    </div>
                ))}
            </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Partners;