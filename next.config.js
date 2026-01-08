/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Type checking is done separately in CI/build process
    ignoreBuildErrors: false,
  },
  eslint: {
    // ESLint is run separately in CI/build process
    ignoreDuringBuilds: false,
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'frendlymarqeter.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/**',
      },
    ],
  },
  // Disabled experimental features that require additional dependencies
  // experimental: {
  //   optimizeCss: true,
  // },
}

module.exports = nextConfig