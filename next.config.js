/** @type {import('next').NextConfig} */
const nextConfig = {
    cacheHandler: require.resolve('./cache-handler.js'),
    cacheMaxMemorySize: 0,
};

module.exports = nextConfig;
