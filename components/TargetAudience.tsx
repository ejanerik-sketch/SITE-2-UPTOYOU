import React from 'react';
import { School, Briefcase, GraduationCap, Users, HeartHandshake, Baby } from 'lucide-react';
import FadeIn from './FadeIn';
import { useContent } from '../context/ContentContext';
import EditableText from './EditableText';

const TargetAudience: React.FC = () => {
  const { content } = useContent();

  const audiences = [
    { icon: <School size={32} />, id: 1 },
    { icon: <Briefcase size={32} />, id: 2 },
    { icon: <GraduationCap size={32} />, id: 3 },
    { icon: <Users size={32} />, id: 4 },
    { icon: <HeartHandshake size={32} />, id: 5 },
    { icon: <Baby size={32} />, id: 6 },
  ];

  return (
    <section className="py-16 bg-brand-green text-white">
      <div className="container mx-auto px-4">
        <FadeIn>
            <h2 className="text-3xl font-bold text-center mb-12">
                <EditableText section="targetAudience" field="title" value={content.targetAudience.title} />
            </h2>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {audiences.map((item, idx) => (
            <FadeIn key={item.id} delay={idx * 100} className="h-full">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-colors text-center flex flex-col items-center h-full">
                <div className="bg-white text-brand-green p-3 rounded-full mb-4">
                    {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">
                    <EditableText section="targetAudience" field={`item${item.id}_title`} value={content.targetAudience[`item${item.id}_title` as keyof typeof content.targetAudience]} />
                </h3>
                <div className="text-white/80 text-sm leading-relaxed">
                     <EditableText section="targetAudience" field={`item${item.id}_desc`} value={content.targetAudience[`item${item.id}_desc` as keyof typeof content.targetAudience]} />
                </div>
                </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;