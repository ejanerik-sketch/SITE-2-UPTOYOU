import React, { useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { Upload, Move } from 'lucide-react';

interface EditableImageProps {
  section: string;
  imageField: string;
  widthField?: string; // key for width/scale
  imageUrl: string;
  widthValue?: number;
  className?: string;
  style?: React.CSSProperties;
  alt: string;
  allowResize?: boolean;
}

const EditableImage: React.FC<EditableImageProps> = ({ 
    section, 
    imageField, 
    widthField, 
    imageUrl, 
    widthValue = 100, 
    className = '',
    style = {} as React.CSSProperties,
    alt,
    allowResize = true
}) => {
  const { isEditing, updateContent } = useContent();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateContent(section as any, imageField, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isEditing) {
    return (
        <img 
            src={imageUrl} 
            alt={alt} 
            className={className}
            style={{ 
                ...style,
                width: widthField ? `${widthValue}px` : style.width,
                maxWidth: '100%'
            }} 
        />
    );
  }

  return (
    <div className={`relative group border-2 border-dashed border-brand-yellow/50 hover:border-brand-yellow p-1 rounded transition-colors ${className}`} style={{ width: 'fit-content', display: 'inline-block' }}>
      
      {/* Image Preview */}
      <img 
        src={imageUrl} 
        alt={alt} 
        className="block"
        style={{ 
            ...style, 
            width: widthField ? `${widthValue}px` : style.width,
            maxWidth: '100%',
            minWidth: '50px'
        }} 
      />

      {/* Overlay Controls */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity gap-2 backdrop-blur-sm">
        <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-white text-gray-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 hover:bg-brand-yellow"
        >
            <Upload size={12} /> Alterar Foto
        </button>
        
        {allowResize && widthField && (
            <div className="bg-white p-2 rounded-lg shadow-lg flex flex-col items-center w-3/4">
                <span className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-1">
                    <Move size={10} /> Tamanho
                </span>
                <input 
                    type="range" 
                    min="50" 
                    max="800" 
                    value={widthValue} 
                    onChange={(e) => updateContent(section as any, widthField, Number(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-1"
                />
            </div>
        )}
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange} 
      />
    </div>
  );
};

export default EditableImage;