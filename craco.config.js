// craco.config.js: extends Create React App without ejecting.
// Adds the "@/..." import alias (mirrors jsconfig.json).
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
