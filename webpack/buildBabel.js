module.exports = function babel() {
    return {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: "3.34",
                  debug: false
                }
              ]
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
              "dynamic-import-webpack"
            ]
          }
        }
      }
}