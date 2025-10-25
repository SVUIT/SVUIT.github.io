/**
 * Performance-related configuration
 */

export const performanceConfig = {
  // Feature flags and monitoring configuration
  features: {
    serviceWorker: process.env.NODE_ENV === 'production',
    imageOptimization: true,
    codeSplitting: true,
    webp: true,
    avif: false, // Enable when browser support is better
    preload: true,
    prefetch: true
  },
  
  monitoring: {
    webVitals: true,
    analytics: false,
    errorTracking: true,
    metrics: true
  },
  
  // Image optimization settings
  images: {
    // Default quality for optimized images (0-100)
    defaultQuality: 80,
    // Supported formats in order of preference
    formats: ['webp', 'jpg', 'png'],
    // Breakpoints for responsive images (in pixels)
    breakpoints: [320, 640, 1024, 1280, 1920],
    // Device pixel ratio to consider (for high-DPI displays)
    devicePixelRatio: 2,
  },
  
  // Resource hints
  resourceHints: [
    { rel: 'preconnect', href: 'https://svuit.org' },
    { rel: 'dns-prefetch', href: 'https://svuit.org' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { 
      rel: 'preconnect', 
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous'
    },
  ],
  
  // Cache settings
  cache: {
    // Default cache time for static assets (in seconds)
    maxAge: 60 * 60 * 24 * 365, // 1 year
    // Cache control header for HTML
    htmlCacheControl: 'public, max-age=0, must-revalidate',
    // Cache control header for static assets
    staticCacheControl: 'public, max-age=31536000, immutable',
  },
  
};

/**
 * Gets the optimal image format based on browser support
 * @param {Object} options - Format options
 * @returns {string} - Optimal image format
 */
export const getOptimalImageFormat = (options = {}) => {
  const { formats = performanceConfig.images.formats } = options;
  
  // In a real app, you'd check browser support here
  // For now, we'll just return the first supported format
  return formats[0];
};

/**
 * Gets the optimal image source based on device capabilities
 * @param {string} src - Original image source
 * @param {Object} options - Optimization options
 * @returns {string} - Optimized image source
 */
export const getOptimizedImageSrc = (src, options = {}) => {
  if (!src) return '';
  
  const {
    width,
    height,
    quality = performanceConfig.images.defaultQuality,
    format = getOptimalImageFormat(),
  } = options;
  
  // Skip external URLs or already optimized images
  if (src.startsWith('http') || src.startsWith('data:') || src.includes('?')) {
    return src;
  }
  
  const params = [];
  
  if (width) params.push(`w=${width}`);
  if (height) params.push(`h=${height}`);
  if (quality) params.push(`q=${quality}`);
  if (format) params.push(`fm=${format}`);
  
  // If no optimizations needed, return original
  if (params.length === 0) return src;
  
  return `${src}?${params.join('&')}`;
};
