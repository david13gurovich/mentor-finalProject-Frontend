module.exports = {
    webpack: (config) => {
      config.resolve.fallback = { fs: false, path: false };
  
      return config;
    },
    i18n: {
        locales: ['en-US', 'he'],
        defaultLocale: 'en-US',
    }
  };