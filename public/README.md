# Public Assets Directory

This folder contains static assets that can be accessed directly from your Next.js application.

## Directory Structure

```
public/
├── images/
│   ├── logos/          # Company and brand logos
│   ├── portfolio/      # Project and portfolio images
│   ├── team/          # Team member photos
│   └── blog/          # Blog post images
└── README.md
```

## How to Use Images in Next.js

### Method 1: Using Next.js Image Component (Recommended)

```tsx
import Image from 'next/image'

// For images in public/images/
<Image
  src="/images/logo.png"
  alt="Company Logo"
  width={200}
  height={100}
  priority // Use for above-the-fold images
/>
```

### Method 2: Using Regular img tag

```tsx
<img 
  src="/images/portfolio/project1.jpg" 
  alt="Project 1" 
  className="w-full h-auto"
/>
```

### Method 3: CSS Background Images

```css
.hero-bg {
  background-image: url('/images/hero-background.jpg');
}
```

## Benefits of Next.js Image Component

- ✅ Automatic image optimization
- ✅ Responsive images
- ✅ Lazy loading by default
- ✅ Prevents layout shift
- ✅ WebP format when supported

## File Path Examples

- Logo: `/images/logos/company-logo.png`
- Portfolio: `/images/portfolio/project-1.jpg`
- Team: `/images/team/john-doe.jpg`
- Blog: `/images/blog/article-thumbnail.jpg`

## Notes

- Files in the `public` directory can be accessed from the root URL
- Always use absolute paths starting with `/`
- Optimize images before uploading for better performance