const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})


// const webpack = require('webpack');
const webpack = require('webpack');

module.exports = {
  // ...autres options de configuration
  configureWebpack: {
    resolve: {
      fallback: {
        fs: false,
        crypto: require.resolve('crypto-browserify'),
        assert: require.resolve('assert'),
        url: require.resolve('url'),
        stream: require.resolve('stream-browserify'),
        vm: require.resolve('vm-browserify'),
        process: require.resolve('process/browser'),
        // Ajoutez un polyfill pour 'Buffer'
        buffer: require.resolve('buffer/'),
      },
    },
    plugins: [
      // ...autres plugins
      new webpack.ProvidePlugin({
        process: 'process/browser',
        // Assurez-vous de fournir également 'Buffer' comme un plugin
        Buffer: ['buffer', 'Buffer'],
      }),
    ],
  },
};

