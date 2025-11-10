import { useState } from "react";

const OptimizedImage = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Optimize image URL (for Unsplash or similar services)
  const getOptimizedUrl = (url) => {
    if (!url) return "";

    // For Unsplash images
    if (url.includes("unsplash.com")) {
      return `${url}?w=400&h=300&fit=crop&auto=format&q=75`;
    }

    // For other images, return as is
    return url;
  };

  const optimizedSrc = getOptimizedUrl(src);

  return (
    <>
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-linear-to-br from-rose-100 to-rose-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 border-3 border-rose-300 border-t-rose-600 rounded-full animate-spin"></div>
            <span className="text-xs text-rose-600 font-medium">
              Loading...
            </span>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-linear-to-br from-gray-100 to-gray-50 flex items-center justify-center">
          <div className="text-center p-4">
            <svg
              className="w-12 h-12 text-gray-400 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-xs text-gray-500">Image unavailable</p>
          </div>
        </div>
      )}

      {/* Actual Image */}
      <img
        src={optimizedSrc}
        alt={alt}
        className={`${className} ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        loading="lazy" // Native lazy loading
      />
    </>
  );
};
export default OptimizedImage;
