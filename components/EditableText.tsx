import React from 'react';
import { useContent } from '../context/ContentContext';
import { Pencil } from 'lucide-react';

interface EditableTextProps {
  section: string;
  field: string;
  value: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  multiline?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({ section, field, value, className = '', as: Tag = 'p', multiline = false }) => {
  const { isEditing, updateContent } = useContent();

  if (!isEditing) {
    return <Tag className={className} dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, '<br/>') }} />;
  }

  return (
    <div className="relative group">
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => updateContent(section as any, field, e.target.value)}
          className={`w-full bg-yellow-50 border border-yellow-300 p-1 rounded outline-none focus:ring-2 focus:ring-brand-yellow ${className}`}
          rows={4}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => updateContent(section as any, field, e.target.value)}
          className={`w-full bg-yellow-50 border border-yellow-300 p-1 rounded outline-none focus:ring-2 focus:ring-brand-yellow ${className}`}
        />
      )}
      <div className="absolute -top-3 -right-3 bg-brand-yellow text-black p-1 rounded-full opacity-0 group-hover:opacity-100 pointer-events-none shadow-sm z-10">
        <Pencil size={12} />
      </div>
    </div>
  );
};

export default EditableText;
