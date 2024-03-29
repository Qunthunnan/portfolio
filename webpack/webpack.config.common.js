const path = require('path'),
      babel = require('./buildBabel.js'),
      loaders = require('./buildLoaders.js'),
      plugins = require('./buildPlugins.js'),
      resolve = require('./buildResolve.js');

module.exports = {
      entry: {
        index: './src/index.pug',
        'uk/index': './src/pug/uk.pug',
        'uk/none/index': './src/pug/ukNone.pug',
        'uk/policy/index': './src/pug/ukPolicy.pug',
        'en/index': './src/pug/en.pug',
        'en/none/index': './src/pug/enNone.pug',
        'en/policy/index': './src/pug/enPolicy.pug',
        'prengi/index': './src/prengi/index.pug',
        'prengi/uk/index': './src/prengi/pug/uk.pug',
        'prengi/uk/empty/index': './src/prengi/pug/ukEmpty.pug',
        'prengi/en/index': './src/prengi/pug/en.pug',
        'prengi/en/empty/index': './src/prengi/pug/enEmpty.pug',
        'pulse/index': './src/pulse/index.pug',
        'pulse/uk/index': './src/pulse/pug/uk.pug',
        'pulse/en/index': './src/pulse/pug/en.pug',
        'uber/index': './src/uber/index.pug',
        'uber/uk/index': './src/uber/pug/uk.pug',
        'uber/en/index': './src/uber/pug/en.pug',
        'wordpress/index': './src/wordpress/index.pug',
        'wordpress/uk/index': './src/wordpress/pug/uk.pug',
        'wordpress/en/index': './src/wordpress/pug/en.pug',
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

