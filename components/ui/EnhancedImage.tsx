import { useEffect, useState, useRef } from 'react';

interface ImageSizes {
  small?: string;
  medium?: string;
  large?: string;
  default: string;
}

interface EnhancedImageProps {
  src: string | ImageSizes;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

export function EnhancedImage({
  src,
  alt,
  className = '',
  width = 800,
  height = 600,
  sizes = '(max-width: 768px) 100vw, 50vw',
  loading = 'lazy'
}: EnhancedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const isComplexSrc = typeof src !== 'string';
  const mainSrc = isComplexSrc ? src.default : src;

  // Calculate aspect ratio for placeholder
  const aspectRatio = height / width;

  // Check if image is already loaded (prevents flashing on mobile)
  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const generateSrcSet = () => {
    if (!isComplexSrc) return undefined;
    return Object.entries(src).filter(([key]) => key !== 'default').map(([key, url]) => {
      const width = key === 'small' ? '400w' : key === 'medium' ? '800w' : '1200w';
      return `${url} ${width}`;
    }).join(', ');
  };
  return <div className="relative overflow-hidden bg-gray-100" style={{
    paddingBottom: `${aspectRatio * 100}%`,
    width: '100%',
    height: 0 // Height will be determined by padding-bottom
  }}>
      {/* Simple placeholder - no animated transitions that cause flashing */}
      {!isLoaded && <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>}
      {/* Image with minimal transitions to prevent flashing */}
      <img
        ref={imgRef}
        src={mainSrc}
        srcSet={generateSrcSet()}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        className={`absolute top-0 left-0 w-full h-full object-cover ${className}`}
        loading={loading}
        onLoad={handleLoad}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: isLoaded ? 'none' : 'opacity 0.2s ease-in'
        }}
      />
    </div>;
}