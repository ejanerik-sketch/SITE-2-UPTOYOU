import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import FadeIn from './FadeIn';
import { useContent } from '../context/ContentContext';
import EditableText from './EditableText';
import { FAQ_DATA } from '../constants';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { content } = useContent();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white px-4">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
            <div className="text-center mb-12">
                <HelpCircle className="w-12 h-12 text-brand-green mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-brand-grey">
                    <EditableText section="faq" field="title" value={content.faq.title} />
                </h2>
            </div>
        </FadeIn>

        <div className="space-y-4">
          {FAQ_DATA.map((_, index) => {
            const qKey = `q${index + 1}`;
            const aKey = `a${index + 1}`;
            return (
                <FadeIn key={index} delay={index * 50} direction="up">
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                        className="w-full flex justify-between items-center p-5 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                        onClick={() => toggleFAQ(index)}
                    >
                        <span className="font-bold text-gray-800 w-full">
                             <EditableText section="faq" field={qKey} value={content.faq[qKey]} />
                        </span>
                        {openIndex === index ? (
                        <ChevronUp className="text-brand-green flex-shrink-0 ml-2" />
                        ) : (
                        <ChevronDown className="text-gray-400 flex-shrink-0 ml-2" />
                        )}
                    </button>
                    {openIndex === index && (
                        <div className="p-5 bg-white text-gray-600 border-t border-gray-100 animate-fade-in">
                            <EditableText section="faq" field={aKey} value={content.faq[aKey]} />
                        </div>
                    )}
                    </div>
                </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;