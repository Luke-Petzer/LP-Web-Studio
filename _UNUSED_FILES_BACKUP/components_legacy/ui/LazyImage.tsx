import { EnhancedImage } from './EnhancedImage';
interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}
// This is now a wrapper around our new EnhancedImage component for backward compatibility
export function LazyImage({
  src,
  alt,
  className = '',
  width,
  height
}: LazyImageProps) {
  return <EnhancedImage src={src} alt={alt} className={className} width={width} height={height} loading="lazy" />;
}