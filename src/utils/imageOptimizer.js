/**
 * Optimizes image source based on browser support and device capabilities
 * @param {string} src - Original image source
 * @param {Object} options - Optimization options
 * @returns {string} - Optimized image source
 */

export const optimizeImage = (src, options = {}) => {
  if (!src) return '';
  
  const {
    width,
    height,
    quality = 80,
    format = 'webp',
    fallback = 'original'
  } = options;

  // Skip external URLs or already optimized images
  if (src.startsWith('http') || src.startsWith('data:') || src.includes('?')) {
    return src;
  }

  // For local images, we'll use Next.js Image optimization if available
  // In a production environment, you might want to use a CDN or image service
  const params = [];
  
  if (width) params.push(`w=${width}`);
  if (height) params.push(`h=${height}`);
  if (quality) params.push(`q=${quality}`);
  if (format) params.push(`fm=${format}`);
  
  // If no optimizations needed, return original
  if (params.length === 0) return src;
  
  // For demonstration, we'll just append the params
  // In a real app, you'd use an image optimization service or Next.js Image component
  return `${src}?${params.join('&')}`;
};

/**
 * Generates srcSet for responsive images
 * @param {string} src - Original image source
 * @param {Array} sizes - Array of viewport widths
 * @returns {string} - srcSet string
 */
export const generateSrcSet = (src, sizes = [320, 640, 1024, 1280, 1920]) => {
  return sizes
    .map(size => `${optimizeImage(src, { width: size })} ${size}w`)
    .join(', ');
};

/**
 * Gets the appropriate image size based on device pixel ratio
 * @param {number} baseWidth - Base width in CSS pixels
 * @param {number} [pixelRatio=1] - Device pixel ratio
 * @returns {number} - Optimized width in physical pixels
 */
export const getOptimizedWidth = (baseWidth, pixelRatio = 1) => {
  // Cap at 2x for most cases to avoid serving very large images
  const effectiveRatio = Math.min(pixelRatio, 2);
  return Math.round(baseWidth * effectiveRatio);
};
