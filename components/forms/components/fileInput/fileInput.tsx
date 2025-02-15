import type { ChangeEvent } from 'react';
import { useRef } from 'react'; 

interface FileInputProps {
  label: string;
  name: string;
  accept?: string;
  onChange: (file: File | null) => void;
  error?: string;
}

export const FileInput = ({ label, name, accept, onChange, error }: FileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <div 
        onClick={handleClick}
        onKeyUp={handleClick}
        onKeyDown={handleClick}
        className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors"
      >
        <input
          ref={fileInputRef}
          type="file"
          id={name}
          name={name}
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        <p className="text-gray-500">Click para subir archivo</p>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}; 