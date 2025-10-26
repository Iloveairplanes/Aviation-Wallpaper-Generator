import React from 'react';

interface ImageData {
  dataUrl: string;
  prompt: string;
}

interface ImageCardProps {
  imageData: ImageData | null;
  isLoading: boolean;
  error: string | null;
  onDownload: () => void;
  aspectRatio: string;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center gap-4 text-cyan-400">
    <svg className="animate-spin h-12 w-12 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <p className="text-lg font-medium">Generating your masterpiece...</p>
    <p className="text-sm text-gray-400">This can take up to a minute. Please be patient.</p>
  </div>
);

const Placeholder: React.FC<{ aspectRatio: string }> = ({ aspectRatio }) => (
  <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <p className="text-lg font-medium">Your {aspectRatio} wallpaper will appear here</p>
    <p className="text-sm">Enter a prompt and click "Generate" to start.</p>
  </div>
);

const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);


export const ImageCard: React.FC<ImageCardProps> = ({ imageData, isLoading, error, onDownload, aspectRatio }) => {
  
  const getAspectClass = (ratio: string) => {
    switch (ratio) {
        case '16:9':
            return 'aspect-video';
        case '9:16':
            return 'aspect-[9/16]';
        case '2:3':
            return 'aspect-[2/3]';
        case '3:2':
            return 'aspect-[3/2]';
        case '3:4':
            return 'aspect-[3/4]';
        case '4:3':
            return 'aspect-[4/3]';
        default:
            return 'aspect-video';
    }
  }

  const aspectClass = getAspectClass(aspectRatio);

  return (
    <div className={`w-full bg-gray-900/50 rounded-xl shadow-inner border border-gray-700 flex items-center justify-center p-2 relative overflow-hidden ${aspectClass}`}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && error && (
        <div className="text-center text-red-400 p-4">
          <p className="font-bold">Generation Failed</p>
          <p className="text-sm">{error}</p>
        </div>
      )}
      {!isLoading && !error && !imageData && <Placeholder aspectRatio={aspectRatio} />}
      {!isLoading && !error && imageData && (
        <>
          <img 
            src={imageData.dataUrl} 
            alt={imageData.prompt} 
            className="w-full h-full object-contain rounded-lg animate-fade-in" 
          />
          <button
            onClick={onDownload}
            className="absolute bottom-4 right-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center"
            aria-label="Download image"
          >
            <DownloadIcon />
            Download
          </button>
        </>
      )}
    </div>
  );
};