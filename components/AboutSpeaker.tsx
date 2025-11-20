import React from 'react';
import { BookOpen, Award, GraduationCap, Globe } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import EditableText from './EditableText';
import EditableImage from './EditableImage';
import FadeIn from './FadeIn';

const AboutSpeaker: React.FC = () => {
  const { content } = useContent();

  return (
    <section id="speaker" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Image - Editable */}
        <div className="w-full md:w-auto flex justify-center md:justify-start relative">
            <FadeIn direction="left">
                 {/* Yellow Decorative Element */}
                <div className="absolute top-4 -left-4 w-full h-full bg-brand-yellow rounded-xl z-0 hidden md:block"></div>
                
                <div className="relative z-10">
                    <EditableImage 
                        section="speaker"
                        imageField="photoUrl"
                        widthField="photoWidth" 
                        imageUrl={content.speaker.photoUrl}
                        widthValue={content.speaker.photoWidth} 
                        allowResize={true} 
                        alt={content.speaker.name}
                        className="rounded-xl shadow-lg object-cover"
                        style={{ aspectRatio: '3/4' }}
                    />
                </div>
            </FadeIn>
        </div>

        {/* Content */}
        <div className="w-full md:flex-1">
            <FadeIn direction="right" delay={200}>
                <EditableText 
                    section="speaker"
                    field="role"
                    value={content.speaker.role}
                    className="text-brand-red font-bold uppercase tracking-widest mb-2"
                />
                
                <EditableText 
                    as="h2"
                    section="speaker"
                    field="name"
                    value={content.speaker.name}
                    className="text-3xl md:text-4xl font-bold text-brand-grey mb-6"
                />
                
                <div className="prose text-gray-600 mb-8 text-lg">
                    <EditableText 
                        section="speaker"
                        field="bio"
                        value={content.speaker.bio}
                        multiline={true}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                        <BookOpen className="w-6 h-6 text-brand-green flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-gray-800">
                                <EditableText section="speaker" field="highlight1_title" value={content.speaker.highlight1_title} />
                            </h4>
                            <div className="text-sm text-gray-500">
                                <EditableText section="speaker" field="highlight1_desc" value={content.speaker.highlight1_desc} />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <GraduationCap className="w-6 h-6 text-brand-green flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-gray-800">
                                <EditableText section="speaker" field="highlight2_title" value={content.speaker.highlight2_title} />
                            </h4>
                            <div className="text-sm text-gray-500">
                                <EditableText section="speaker" field="highlight2_desc" value={content.speaker.highlight2_desc} />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Award className="w-6 h-6 text-brand-green flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-gray-800">
                                <EditableText section="speaker" field="highlight3_title" value={content.speaker.highlight3_title} />
                            </h4>
                            <div className="text-sm text-gray-500">
                                <EditableText section="speaker" field="highlight3_desc" value={content.speaker.highlight3_desc} />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Globe className="w-6 h-6 text-brand-green flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-gray-800">
                                <EditableText section="speaker" field="highlight4_title" value={content.speaker.highlight4_title} />
                            </h4>
                            <div className="text-sm text-gray-500">
                                <EditableText section="speaker" field="highlight4_desc" value={content.speaker.highlight4_desc} />
                            </div>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default AboutSpeaker;