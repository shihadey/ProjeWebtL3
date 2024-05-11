// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

// webpack.config.js
const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      fs: false, // Utilise le polyfill pour 'fs'
      crypto: require.resolve('crypto-browserify'), // Utilise le polyfill pour 'crypto'
      assert: require.resolve('assert'), // Utilise le polyfill pour 'assert'
      url: require.resolve('url'), // Utilise le polyfill pour 'url'
      "stream": require.resolve("stream-browserify"),
      "vm": require.resolve("vm-browserify"),
      process: require.resolve("process"),
      process: require.resolve('process/browser'),
    },
    alias: {
      process: "process/browser"
   } 
  },
  plugins: [
    // ...other plugins
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
