
import React, { useState, useContext, useCallback } from 'react';
import { AppContext } from '../App';
import { generateCaption } from '../services/geminiService';
import { PhotoIcon, SparklesIcon, XIcon } from './icons/Icons';

const CreatePost: React.FC = () => {
  const { currentUser, addPost } = useContext(AppContext);
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeImage = () => {
      setImageFile(null);
      setImagePreview(null);
  }

  const handleGenerateCaption = useCallback(async () => {
    if (!imagePreview) {
      setError('Please select an image first to generate a caption.');
      return;
    }
    setIsGenerating(true);
    setError(null);
    try {
      const base64Data = imagePreview.split(',')[1];
      const mimeType = imageFile?.type || 'image/jpeg';
      const caption = await generateCaption(base64Data, mimeType);
      setContent(caption);
    } catch (e) {
      setError('Failed to generate caption. Please try again.');
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  }, [imagePreview, imageFile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !imagePreview) return;
    
    addPost({
        content: content,
        imageUrl: imagePreview || undefined,
    });

    setContent('');
    setImageFile(null);
    setImagePreview(null);
    setError(null);
  };

  return (
    <div className="bg-surface p-4 rounded-xl shadow-lg mb-8">
      <div className="flex items-start space-x-4">
        <img src={currentUser.profilePicture} alt={currentUser.name} className="w-12 h-12 rounded-full" />
        <form onSubmit={handleSubmit} className="w-full">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border-none rounded-md focus:ring-2 focus:ring-primary bg-background resize-none text-text-primary"
            rows={3}
            placeholder={`What's on your mind, ${currentUser.name}?`}
          ></textarea>
        </form>
      </div>
      
      {imagePreview && (
          <div className="mt-4 relative">
              <img src={imagePreview} alt="Preview" className="rounded-lg max-h-60 w-auto mx-auto"/>
              <button onClick={removeImage} className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-75">
                  <XIcon className="w-5 h-5"/>
              </button>
          </div>
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
        <div className="flex space-x-2">
            <label htmlFor="file-upload" className="cursor-pointer flex items-center space-x-2 text-text-secondary hover:text-accent transition-colors p-2 rounded-md">
                <PhotoIcon className="w-6 h-6"/>
                <span className="font-medium">Photo</span>
            </label>
            <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            
            <button
                onClick={handleGenerateCaption}
                disabled={isGenerating || !imagePreview}
                className="flex items-center space-x-2 text-text-secondary hover:text-secondary disabled:text-gray-400 disabled:cursor-not-allowed transition-colors p-2 rounded-md"
            >
                <SparklesIcon className="w-6 h-6"/>
                <span className="font-medium">{isGenerating ? 'Generating...' : 'AI Caption'}</span>
            </button>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-primary text-white font-bold py-2 px-6 rounded-full hover:bg-primary-focus transition-transform transform hover:scale-105"
          disabled={!content.trim() && !imagePreview}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
