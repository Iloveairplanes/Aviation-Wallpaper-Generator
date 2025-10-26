import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageCard } from './components/ImageCard';
import { PromptForm } from './components/PromptForm';
import { generateWallpaper, editWallpaper } from './services/geminiService';
import { downloadImage } from './utils/imageUtils';

interface ImageData {
  base64: string;
  mimeType: string;
  dataUrl: string;
  prompt: string;
}

const FormInput: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  disabled: boolean;
}> = ({ id, label, value, onChange, placeholder, disabled }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="mb-2 text-sm font-medium text-gray-400">
      {label}
    </label>
    <input
      id={id}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full p-3 bg-gray-700 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-300 disabled:bg-gray-800"
    />
  </div>
);

const aspectRatios = [
    { value: '16:9', label: '16:9 (Computer)' },
    { value: '9:16', label: '9:16 (Phone)' },
    { value: '2:3', label: '2:3' },
    { value: '3:2', label: '3:2' },
    { value: '3:4', label: '3:4' },
    { value: '4:3', label: '4:3' },
];

export default function App() {
  const [selectedAircraft, setSelectedAircraft] = useState('Boeing 747');
  const [selectedLivery, setSelectedLivery] = useState('British Airways livery');
  const [selectedLocation, setSelectedLocation] = useState('Soaring above the Swiss Alps');
  const [additionalPrompt, setAdditionalPrompt] = useState('flying through clouds during a vibrant sunset');
  const [aspectRatio, setAspectRatio] = useState('16:9');

  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [editPrompt, setEditPrompt] = useState<string>('Add a retro film grain effect');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    setError(null);
    setImageData(null);
    
    const aircraftPart = selectedAircraft || 'An aircraft';
    const liveryPart = selectedLivery ? ` in ${selectedLivery}` : '';
    const locationPart = selectedLocation ? ` ${selectedLocation}` : ' in the sky';
    const detailsPart = additionalPrompt ? `, ${additionalPrompt}` : '';
    const finalPrompt = `${aircraftPart}${liveryPart}${locationPart}${detailsPart}.`;

    try {
      const { base64, mimeType } = await generateWallpaper(finalPrompt, aspectRatio);
      setImageData({ base64, mimeType, dataUrl: `data:${mimeType};base64,${base64}`, prompt: finalPrompt });
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred during generation.');
    } finally {
      setIsGenerating(false);
    }
  }, [selectedAircraft, selectedLivery, selectedLocation, additionalPrompt, aspectRatio]);

  const handleEdit = useCallback(async (currentEditPrompt: string) => {
    if (!imageData) return;
    setIsEditing(true);
    setError(null);
    try {
      const { base64, mimeType } = await editWallpaper(imageData.base64, imageData.mimeType, currentEditPrompt);
      setImageData({ ...imageData, base64, mimeType, dataUrl: `data:${mimeType};base64,${base64}` });
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred during editing.');
    } finally {
      setIsEditing(false);
    }
  }, [imageData]);

  const handleDownload = (imgData: ImageData | null) => {
    if (imgData) {
      const filename = `${imgData.prompt.replace(/ /g, '_').slice(0, 30)}.jpg`;
      downloadImage(imgData.dataUrl, filename);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <Header />
      <main className="w-full max-w-4xl mx-auto flex flex-col gap-8">
        
        <section id="generator" className="p-6 bg-gray-800/50 rounded-2xl shadow-lg border border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-4">1. Create Your Wallpaper</h2>
          <div className="flex flex-col gap-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="aircraft-input"
                label="Aircraft"
                value={selectedAircraft}
                onChange={(e) => setSelectedAircraft(e.target.value)}
                placeholder="e.g., F-22 Raptor"
                disabled={isGenerating}
              />
              <FormInput
                id="livery-input"
                label="Livery"
                value={selectedLivery}
                onChange={(e) => setSelectedLivery(e.target.value)}
                placeholder="e.g., Standard USAF Grey"
                disabled={isGenerating}
              />
            </div>
             <FormInput
                id="location-input"
                label="Location / Scene"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                placeholder="e.g., Breaking the sound barrier"
                disabled={isGenerating}
              />
             <FormInput
                id="additional-details-input"
                label="Additional Details"
                value={additionalPrompt}
                onChange={(e) => setAdditionalPrompt(e.target.value)}
                placeholder="e.g., cinematic lighting, 8k"
                disabled={isGenerating}
              />
            <div className="flex flex-col">
                <label htmlFor="aspect-ratio-select" className="mb-2 text-sm font-medium text-gray-400">
                    Aspect Ratio
                </label>
                <select
                    id="aspect-ratio-select"
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value)}
                    disabled={isGenerating}
                    className="w-full p-3 bg-gray-700 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-300 disabled:bg-gray-800 disabled:cursor-not-allowed appearance-none bg-no-repeat bg-right-3"
                    style={{
                        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="%239ca3af"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>')`,
                        backgroundSize: '1.5em 1.5em',
                    }}
                >
                    {aspectRatios.map((ratio) => (
                        <option key={ratio.value} value={ratio.value}>
                            {ratio.label}
                        </option>
                    ))}
                </select>
            </div>
          </div>
          <button onClick={handleGenerate} disabled={isGenerating} className="w-full flex items-center justify-center font-bold py-3 px-6 rounded-lg bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-500/50 text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed">
            {isGenerating ? 'Generating...' : 'Generate Wallpaper'}
          </button>
        </section>

        <ImageCard
          imageData={imageData}
          isLoading={isGenerating || isEditing}
          error={error}
          onDownload={() => handleDownload(imageData)}
          aspectRatio={aspectRatio}
        />

        {imageData && !isGenerating && (
          <section id="editor" className="p-6 bg-gray-800/50 rounded-2xl shadow-lg border border-gray-700 transition-opacity duration-500 animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-bold text-purple-400 mb-4">2. Edit Your Image</h2>
            <PromptForm initialValue={editPrompt} onSubmit={handleEdit} placeholder="e.g., Make the sky look like a galaxy" buttonText="Apply Edit" isLoading={isEditing} />
          </section>
        )}
      </main>
      <footer className="w-full max-w-7xl mx-auto text-center py-8 text-gray-500 text-sm">
        <p>Powered by Google Gemini. Select an aspect ratio to begin.</p>
      </footer>
    </div>
  );
}