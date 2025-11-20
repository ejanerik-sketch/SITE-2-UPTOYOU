import React from 'react';
import { MapPin, Clock, Users, Calendar, Mic, MessageCircle, Palette } from 'lucide-react';
import FadeIn from './FadeIn';
import { useContent } from '../context/ContentContext';
import EditableText from './EditableText';

const Schedule: React.FC = () => {
  const { content } = useContent();

  const scrollToForm = () => {
     document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderCard = (prefix: 'event1' | 'event2' | 'event3', icon: React.ReactNode) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-brand-green hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
            <div className="bg-gray-50 p-6 flex items-center gap-4 border-b border-gray-100">
                <div className="bg-brand-green/10 p-3 rounded-full text-brand-green">
                {icon}
                </div>
                <div className="flex-1">
                <h3 className="text-xl font-bold text-brand-grey">
                    <EditableText section="schedule" field={`${prefix}_title`} value={content.schedule[`${prefix}_title`]} />
                </h3>
                <div className="flex items-center text-sm text-gray-500 mt-1 gap-1">
                    <Calendar className="w-4 h-4" />
                    <EditableText section="schedule" field={`${prefix}_date`} value={content.schedule[`${prefix}_date`]} />
                    •
                    <EditableText section="schedule" field={`${prefix}_time`} value={content.schedule[`${prefix}_time`]} />
                </div>
                </div>
            </div>
            
            <div className="p-6 flex-grow space-y-4">
                <div>
                <h4 className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-1">Tema / Formato</h4>
                <div className="text-gray-800 font-medium">
                     <EditableText section="schedule" field={`${prefix}_theme`} value={content.schedule[`${prefix}_theme`]} />
                </div>
                </div>
                
                <div>
                <h4 className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-1">Local</h4>
                <div className="flex items-start gap-2 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-brand-red" />
                    <span className="flex-1">
                        <EditableText section="schedule" field={`${prefix}_location`} value={content.schedule[`${prefix}_location`]} />
                    </span>
                </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h4 className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-1">Público</h4>
                        <div className="flex items-start gap-1 text-gray-600 text-xs">
                            <Users className="w-3 h-3 mt-0.5" />
                            <span className="flex-1">
                                <EditableText section="schedule" field={`${prefix}_audience`} value={content.schedule[`${prefix}_audience`]} />
                            </span>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-1">Duração</h4>
                        <div className="flex items-start gap-1 text-gray-600 text-xs">
                            <Clock className="w-3 h-3 mt-0.5" />
                            <span className="flex-1">
                                <EditableText section="schedule" field={`${prefix}_duration`} value={content.schedule[`${prefix}_duration`]} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 pt-0 mt-auto">
                <button 
                onClick={scrollToForm}
                className="w-full py-3 bg-brand-grey text-white font-bold rounded-lg hover:bg-brand-green transition-colors"
                >
                <EditableText section="schedule" field={`${prefix}_cta`} value={content.schedule[`${prefix}_cta`]} />
                </button>
            </div>
        </div>
    );
  };

  return (
    <section id="schedule" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-grey mb-4">
                <EditableText section="schedule" field="title" value={content.schedule.title} />
            </h2>
            <div className="w-24 h-1 bg-brand-red mx-auto rounded-full"></div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FadeIn delay={0} className="h-full">
             {renderCard('event1', <Mic className="w-6 h-6" />)}
          </FadeIn>
          <FadeIn delay={200} className="h-full">
             {renderCard('event2', <MessageCircle className="w-6 h-6" />)}
          </FadeIn>
          <FadeIn delay={400} className="h-full">
             {renderCard('event3', <Palette className="w-6 h-6" />)}
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Schedule;