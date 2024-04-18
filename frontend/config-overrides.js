const { override, addWebpackResolve } = require('customize-cra');
const webpack = require('webpack');

module.exports = override(
  addWebpackResolve({
    fallback: {
      "crypto": require.resolve('crypto-browserify'),
      "stream": require.resolve('stream-browserify'),
      "buffer": require.resolve('buffer'),
      "util": require.resolve('util'),
      "process": require.resolve('process/browser'),
      "vm": require.resolve('vm-browserify') // Adding vm-browserify
    }
  }),
  (config) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
    );
    return config;
  }
);
