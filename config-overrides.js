const path = require('path');
module.exports = function override(config) {
  // const exclude = config.module.rules[0].exclude;
  // config.module.rules[0].exclude = [exclude, /node_modules/];
  config.module.rules[0] = {
    test: /\.(t|j)sx?$/,
    use: { loader: 'ts-loader' },
    exclude: /node_modules/,
  };
  config.module.rules.push({
    test: /\.html$/i,
    loader: 'html-loader',
  });

  config.module.rules.push({
    enforce: 'pre',
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'source-map-loader',
  });

  Object.assign(config.resolve.alias, {
    '@': path.resolve(__dirname, 'src'),
  });
  config.resolve.fallback = { buffer: false };
  config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx'];

  return config;
};
