const nextConfig = {
    webpack: (config, {dev}) => {
        if (config.cache && !dev) {
            config.cache = Object.freeze({
                type: 'memory',
            });
            config.cache.maxMemoryGenerations = 0;
        }
        // Important: return the modified config
        return config;
    },
};

module.exports = nextConfig;
