const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@assets": path.resolve(__dirname, "public/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@environment": path.resolve(__dirname, "src/environments"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@interceptors": path.resolve(__dirname, "src/interceptors"),
      "@models": path.resolve(__dirname, "src/models"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@services": path.resolve(__dirname, "src/services"),
      "@shared": path.resolve(__dirname, "src/shared"),
      "@views": path.resolve(__dirname, "src/views"),
    },
  },
};
