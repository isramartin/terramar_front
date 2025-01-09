// @ts-nocheck
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/v1",
    createProxyMiddleware({
      target: "https://cloud.appwrite.io",
      changeOrigin: true,
      secure: false,
    })
  );
};

// Export vacío para convertir el archivo en un módulo
export {};
