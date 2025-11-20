import React from 'react';
import { Heart, Users, Lightbulb, CheckCircle, Video } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import EditableText from './EditableText';
import FadeIn from './FadeIn';

const Methodology: React.FC = () => {
  const { content, isEditing, updateContent } = useContent();

  const referents = [
    "Acolher a realidade (não ideais)",
    "Ajudar no autoconhecimento",
    "Despertar a autoria (critérios, não receitas)",
    "Acessar a interioridade (rastros de humanidade)",
    "Atuar desde o ser (não apenas o fazer)",
    "Impulsionar crescimento interpessoal",
    "Alcançar desenvolvimento sustentável"
  ];

  // Autoplay must often be muted to work in modern browsers
  const embedUrl = `https://www.youtube.com/embed/${content.methodology.videoId}?autoplay=1&mute=1&rel=0`;

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Try to extract ID if full URL is pasted
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = val.match(regExp);
    
    if (match && match[2].length === 11) {
        updateContent('methodology', 'videoId', match[2]);
    } else {
        updateContent('methodology', 'videoId', val);
    }
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <FadeIn>
            <div className="text-center mb-16">
            <EditableText 
                as="h2" 
                section="methodology" 
                field="title" 
                value={content.methodology.title} 
                className="text-3xl md:text-4xl font-bold text-brand-grey mb-4" 
            />
            <div className="text-xl text-gray-600 max-w-3xl mx-auto italic">
                <EditableText 
                    section="methodology" 
                    field="description" 
                    value={content.methodology.description} 
                />
            </div>
            </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Video Embed with Edit Field */}
          <FadeIn direction="left" delay={200}>
            <div className="relative group">
                <div className="w-full aspect-video bg-black rounded-2xl shadow-xl overflow-hidden relative">
                    <iframe 
                    width="100%" 
                    height="100%" 
                    src={embedUrl} 
                    title="O que é o UpToYou?" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                    ></iframe>
                </div>
                
                {isEditing && (
                    <div className="absolute -bottom-12 left-0 w-full bg-white p-2 shadow rounded flex items-center gap-2 z-20">
                        <Video size={16} className="text-red-600" />
                        <span className="text-xs font-bold whitespace-nowrap">Link YouTube:</span>
                        <input 
                            type="text" 
                            value={content.methodology.videoId}
                            onChange={handleVideoChange}
                            className="border rounded px-2 py-1 text-sm flex-grow"
                            placeholder="Cole o link ou ID aqui..."
                        />
                    </div>
                )}
            </div>
          </FadeIn>

          {/* Pillars */}
          <div className="space-y-6">
             <FadeIn direction="right" delay={300}>
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-brand-red flex gap-4">
                    <div className="bg-red-100 p-3 rounded-full h-fit text-brand-red"><Users size={24} /></div>
                    <div>
                        <h3 className="font-bold text-lg text-brand-grey">
                            <EditableText section="methodology" field="pillar1_title" value={content.methodology.pillar1_title} />
                        </h3>
                        <div className="text-gray-600 text-sm">
                            <EditableText section="methodology" field="pillar1_desc" value={content.methodology.pillar1_desc} />
                        </div>
                    </div>
                </div>
             </FadeIn>
             <FadeIn direction="right" delay={400}>
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-brand-green flex gap-4">
                    <div className="bg-green-100 p-3 rounded-full h-fit text-brand-green"><Heart size={24} /></div>
                    <div>
                        <h3 className="font-bold text-lg text-brand-grey">
                             <EditableText section="methodology" field="pillar2_title" value={content.methodology.pillar2_title} />
                        </h3>
                        <div className="text-gray-600 text-sm">
                            <EditableText section="methodology" field="pillar2_desc" value={content.methodology.pillar2_desc} />
                        </div>
                    </div>
                </div>
             </FadeIn>
             <FadeIn direction="right" delay={500}>
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-brand-yellow flex gap-4">
                    <div className="bg-yellow-100 p-3 rounded-full h-fit text-brand-yellow"><Lightbulb size={24} /></div>
                    <div>
                        <h3 className="font-bold text-lg text-brand-grey">
                            <EditableText section="methodology" field="pillar3_title" value={content.methodology.pillar3_title} />
                        </h3>
                        <div className="text-gray-600 text-sm">
                            <EditableText section="methodology" field="pillar3_desc" value={content.methodology.pillar3_desc} />
                        </div>
                    </div>
                </div>
             </FadeIn>
          </div>
        </div>

        {/* 7 Referents */}
        <FadeIn delay={600} direction="up">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                <h3 className="text-2xl font-bold text-center text-brand-grey mb-8">Os 7 Referentes Educativos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {referents.map((ref, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <CheckCircle className="text-brand-green w-5 h-5 flex-shrink-0 mt-1" />
                            <span className="text-gray-700 font-medium">{ref}</span>
                        </div>
                    ))}
                    <div className="md:col-span-2 lg:col-span-1 flex items-center justify-center">
                        <button 
                            onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-brand-red hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition-colors w-full shadow-lg"
                        >
                            Quero Participar
                        </button>
                    </div>
                </div>
            </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Methodology;