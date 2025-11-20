import React from 'react';
import { MapPin } from 'lucide-react';
import FadeIn from './FadeIn';
import { useContent } from '../context/ContentContext';
import EditableText from './EditableText';

const Location: React.FC = () => {
  const { content } = useContent();

  return (
    <section id="location" className="py-0 flex flex-col md:flex-row h-[500px]">
      <FadeIn className="w-full md:w-1/3 h-full" direction="left">
        <div className="w-full bg-brand-grey text-white p-10 flex flex-col justify-center h-full">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <MapPin className="text-brand-yellow" />
                <EditableText section="location" field="title" value={content.location.title} />
            </h2>
            <div className="space-y-4 text-lg">
                <p className="font-bold">
                    <EditableText section="location" field="placeName" value={content.location.placeName} />
                </p>
                <p>
                    <EditableText section="location" field="addressLine1" value={content.location.addressLine1} />
                </p>
                <p className="text-white/80">
                    <EditableText section="location" field="addressLine2" value={content.location.addressLine2} />
                </p>
                <div className="mt-8 pt-8 border-t border-white/20">
                    <p className="text-sm text-brand-yellow font-bold uppercase mb-2">
                         <EditableText section="location" field="howToGetTitle" value={content.location.howToGetTitle} />
                    </p>
                    <p className="text-sm opacity-80">
                         <EditableText section="location" field="howToGetDesc" value={content.location.howToGetDesc} />
                    </p>
                </div>
            </div>
        </div>
      </FadeIn>
      
      <FadeIn className="w-full md:w-2/3 h-full" direction="right">
        <div className="w-full h-full bg-gray-200">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3836.239925374564!2d-39.2768204851429!3d-14.785163989685515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x739aa680197330b%3A0x931778077030914f!2sPar%C3%B3quia%20S%C3%A3o%20Judas%20Tadeu!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Mapa do evento"
            ></iframe>
        </div>
      </FadeIn>
    </section>
  );
};

export default Location;