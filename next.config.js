/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure static assets are properly handled
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

