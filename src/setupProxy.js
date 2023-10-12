const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    createProxyMiddleware('^/api', {
      // 如果是/api开头的请求全部跳至target对应的地址
      target: 'https://teams.osisbim.com',
      // changeOrigin: true, // 非必须
      pathRewrite: {
        // '^/api': '',
      },
    }),
  );
};
