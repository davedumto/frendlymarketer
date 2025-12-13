'use client';
import React from 'react';

// Example component showing different ways to use images in Next.js
const ImageExample = () => {
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold text-charcoal">Image Usage Examples</h2>
      
      {/* Method 1: Next.js Image Component (Recommended) */}
      <div>
        <h3 className="text-lg font-semibold mb-4">1. Next.js Image Component</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          {/* Replace with your actual image path */}
          <div className="w-64 h-32 bg-gray-300 rounded flex items-center justify-center">
            <span className="text-gray-600">Your image here</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Code: {`<Image src="/images/your-image.jpg" alt="Description" width={256} height={128} />`}
          </p>
        </div>
      </div>

      {/* Method 2: Regular img tag */}
      <div>
        <h3 className="text-lg font-semibold mb-4">2. Regular img Tag</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="w-64 h-32 bg-gray-300 rounded flex items-center justify-center">
            <span className="text-gray-600">Your image here</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Code: {`<img src="/images/your-image.jpg" alt="Description" className="w-64 h-32" />`}
          </p>
        </div>
      </div>

      {/* Method 3: Background Images */}
      <div>
        <h3 className="text-lg font-semibold mb-4">3. CSS Background Image</h3>
        <div 
          className="w-64 h-32 bg-gray-300 rounded flex items-center justify-center"
          style={{ 
            backgroundImage: 'url(/images/your-background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <span className="text-white bg-black bg-opacity-50 px-2 py-1 rounded">
            Background Image
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImageExample;