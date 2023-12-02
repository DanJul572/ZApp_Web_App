/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    env: {
        apiUrl: 'http://127.0.0.1:8080/api',
    },
};

module.exports = nextConfig;
