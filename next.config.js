const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export", // Enables static export mode
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')], // Keeps your Sass setup
    },
    images: {
        domains: ['res.cloudinary.com', 'media.dev.to'],
        unoptimized: true, // Required for static export with <Image /> support
    },
};

module.exports = nextConfig;
