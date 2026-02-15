import React, { useState } from 'react';
import { useRecipeImage } from '../hooks/useRecipeImage';
import { ImageIcon, AlertCircle, Download } from 'lucide-react';

interface RecipeImageProps {
  recipeId: string;
  imageQuery: string;
  cuisine?: string;
  recipeName: string;
  className?: string;
  showStorageStatus?: boolean; // Show whether image is permanently stored
  autoGenerate?: boolean; // Auto-generate and store on mount
}

export function RecipeImage({
  recipeId,
  imageQuery,
  cuisine = 'base',
  recipeName,
  className = '',
  showStorageStatus = false,
  autoGenerate = false
}: RecipeImageProps) {
  const { imageUrl, isLoading, error, isStored, generateAndStore } = useRecipeImage({
    recipeId,
    imageQuery,
    cuisine,
    autoGenerate
  });

  const [imageLoadError, setImageLoadError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleImageLoad = () => {
    setIsImageLoading(false);
    setImageLoadError(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
    setImageLoadError(true);
    console.error(`Failed to load image for ${recipeName}`);
  };

  const handleGenerateClick = async () => {
    setImageLoadError(false);
    setIsImageLoading(true);
    await generateAndStore();
  };

  return (
    <div className={`relative ${className}`}>
      {/* Image */}
      {!imageLoadError ? (
        <>
          <img
            src={imageUrl}
            alt={recipeName}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isImageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
          
          {/* Loading skeleton */}
          {(isLoading || isImageLoading) && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
              <ImageIcon className="size-12 text-gray-400" />
            </div>
          )}
        </>
      ) : (
        /* Error state with retry */
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center gap-3 p-4">
          <AlertCircle className="size-10 text-gray-400" />
          <p className="text-sm text-gray-500 text-center">Image failed to load</p>
          {!isStored && (
            <button
              onClick={handleGenerateClick}
              className="px-3 py-1.5 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 transition-colors flex items-center gap-1.5"
              disabled={isLoading}
            >
              <Download className="size-4" />
              {isLoading ? 'Generating...' : 'Generate Image'}
            </button>
          )}
        </div>
      )}

      {/* Storage status indicator */}
      {showStorageStatus && !isImageLoading && !imageLoadError && (
        <div className="absolute top-2 right-2 z-10">
          {isStored ? (
            <div className="bg-green-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Stored
            </div>
          ) : (
            <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1 cursor-pointer hover:bg-orange-600 transition-colors"
                 onClick={handleGenerateClick}
                 title="Click to save permanently">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Temporary
            </div>
          )}
        </div>
      )}
    </div>
  );
}
