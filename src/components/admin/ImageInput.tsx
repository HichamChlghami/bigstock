import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/Button';

interface ImageInputProps {
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  onRemove?: () => void;
  className?: string;
}

export const ImageInput: React.FC<ImageInputProps> = ({ 
  label, 
  value, 
  onChange, 
  onRemove,
  className 
}) => {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB limit
        setError('Max file size is 1MB');
        return;
      }
      setError('');
      
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput) {
      onChange(urlInput);
      setUrlInput('');
    }
  };

  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      
      {value ? (
        <div className="relative group aspect-square w-full bg-gray-50 rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center p-2">
          {/* STRICTLY FIT CONTENT */}
          <img src={value} alt="Preview" className="w-full h-full object-contain" />
          {onRemove && (
            <button 
              type="button"
              onClick={onRemove}
              className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-md hover:bg-red-600 transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>
      ) : (
        <div className="w-full aspect-square bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-4 flex flex-col items-center justify-center text-center">
          
          {/* Mode Switcher */}
          <div className="flex gap-2 mb-4 bg-gray-200 p-1 rounded-md">
            <button
              type="button"
              onClick={() => setMode('upload')}
              className={`p-1.5 rounded-sm transition-all ${mode === 'upload' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
              title="Upload File"
            >
              <Upload size={16} />
            </button>
            <button
              type="button"
              onClick={() => setMode('url')}
              className={`p-1.5 rounded-sm transition-all ${mode === 'url' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
              title="Paste URL"
            >
              <LinkIcon size={16} />
            </button>
          </div>

          {mode === 'upload' ? (
            <div onClick={() => fileInputRef.current?.click()} className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
              <ImageIcon className="text-gray-400 mb-2" size={24} />
              <span className="text-xs text-gray-500 font-medium">Click to Upload</span>
              <span className="text-[10px] text-gray-400 mt-1">Max 1MB</span>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
            </div>
          ) : (
            <div className="w-full">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://..."
                className="w-full text-xs p-2 border border-gray-300 rounded mb-2 focus:border-accent outline-none"
              />
              <Button type="button" size="sm" onClick={handleUrlSubmit} className="w-full py-1 text-xs">
                Add URL
              </Button>
            </div>
          )}
          
          {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
        </div>
      )}
    </div>
  );
};
