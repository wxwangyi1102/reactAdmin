const path = require('path');
module.exports = function override(config) {
  const exclude = config.module.rules[0].exclude;
  config.module.rules[0].exclude = [exclude, /node_modules/];
  Object.assign(config.resolve.alias, {
    '@': path.resolve(__dirname, 'src'),
  });

  return config;
};
