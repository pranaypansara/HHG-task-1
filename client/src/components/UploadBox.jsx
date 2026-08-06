import React, { useState, useRef } from 'react';
import { Upload, X, Check } from 'lucide-react';

export default function UploadBox({ onImageChange, selectedImage }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      return;
    }

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
    if (!validTypes.includes(file.type) && !file.name.endsWith('.heic')) {
      alert("Invalid file type. Please upload a JPG, PNG, or WEBP image.");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    onImageChange(objectUrl);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = (e) => {
    e.stopPropagation();
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div 
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={handleButtonClick}
      className={`relative w-full h-32 md:h-36 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300 p-4 select-none
        ${isDragActive 
          ? 'border-brand-yellow bg-brand-green-medium/40 scale-[1.02]' 
          : selectedImage 
            ? 'border-emerald-500/50 bg-brand-green-darkest/30 hover:border-emerald-500'
            : 'border-emerald-500/20 bg-brand-green-darkest/20 hover:border-emerald-500/50 hover:bg-brand-green-darkest/30'
        }`}
    >
      <input 
        ref={fileInputRef}
        type="file" 
        className="hidden" 
        accept="image/jpeg,image/png,image/webp,.heic"
        onChange={handleInputChange}
      />

      {selectedImage ? (
        <div className="flex flex-col items-center space-y-2">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-emerald-500">
            <img src={selectedImage} alt="Thumbnail" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
              <Check className="w-5 h-5 text-emerald-400 stroke-[3px]" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-wider">IMAGE READY</span>
            <button 
              onClick={removeImage}
              className="p-1 rounded-full bg-brand-green-medium hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors duration-200"
              title="Remove image"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-2 pointer-events-none">
          <div className="p-2.5 rounded-full bg-brand-green-medium/40 text-emerald-500">
            <Upload className="w-5 h-5" />
          </div>
          <div className="text-center">
            <p className="font-sans text-xs font-bold text-gray-200">
              Drag & Drop or Click to Upload
            </p>
            <p className="font-mono text-[9px] text-emerald-500/50 tracking-wider mt-1 uppercase">
              JPG, PNG, HEIC (Max 5MB)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
