const path = require('path'),
      babel = require('./buildBabel.js'),
      loaders = require('./buildLoaders.js'),
      plugins = require('./buildPlugins.js'),
      resolve = require('./buildResolve'),
      devServer = require('./buildDevServer.js');

module.exports = function webpackBuild() {
  let config = {
      entry: {
        index: './src/index.pug',
        'none/index': './src/pug/none.pug',
        'policy/index': './src/pug/policy.pug',
        'prengi/index': './src/prengi/index.pug',
        'prengi/empty/index': './src/prengi/pug/empty.pug',
        'pulse/index': './src/pulse/index.pug',
        'uber/index': './src/uber/index.pug',
        'wordpress/index': './src/wordpress/index.pug',
      },
      mode: 'development',
      output: {
        path: path.resolve(__dirname, './../dist'),
        clean: true,
      },
      module: {
        rules: [
          babel(),
          ...loaders()
        ]
      },
      devtool: 'inline-source-map',
      optimization: {
        runtimeChunk: 'single',
      },
      plugins: plugins(),
      devServer: devServer(),
      resolve: resolve()
    }

    return config;
}

