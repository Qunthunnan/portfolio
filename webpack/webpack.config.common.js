const path = require('path'),
      babel = require('./buildBabel.js'),
      loaders = require('./buildLoaders.js'),
      plugins = require('./buildPlugins.js'),
      resolve = require('./buildResolve.js');

module.exports = {
      entry: {
        index: './src/index.pug',
        'ua/index': './src/pug/ua.pug',
        'en/index': './src/pug/en.pug',
        // 'none/index': './src/pug/none.pug',
        // 'policy/index': './src/pug/policy.pug',
        // 'prengi/index': './src/prengi/index.pug',
        // 'prengi/empty/index': './src/prengi/pug/empty.pug',
        // 'pulse/index': './src/pulse/index.pug',
        // 'uber/index': './src/uber/index.pug',
        // 'wordpress/index': './src/wordpress/index.pug',
      },
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
      optimization: {
        runtimeChunk: 'single',
      },
      plugins: plugins(),
      resolve: resolve()
    }

