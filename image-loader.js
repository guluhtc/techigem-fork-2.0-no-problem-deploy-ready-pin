export default function imageLoader({ src, width, quality }) {
  if (!src) return '';
  
  const params = [];
  
  // Add width parameter
  if (width) {
    params.push(`w=${width}`);
  }
  
  // Add quality parameter (default to 75 if not specified)
  params.push(`q=${quality || 75}`);
  
  // Special handling for Unsplash images
  if (src.startsWith('https://images.unsplash.com')) {
    params.push('auto=format');
    params.push('fit=crop');
    // Add WebP format for better compression
    params.push('fm=webp');
  }
  
  // Remove any existing query parameters from the src
  const baseUrl = src.split('?')[0];
  
  return `${baseUrl}?${params.join('&')}`;
}