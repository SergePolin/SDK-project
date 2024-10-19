const pkg = require("./package");

module.exports = {
  apiPath: "stubs/api",
  webpackConfig: {
    output: {
      publicPath: `/static/${pkg.name}/${process.env.VERSION || pkg.version}/`,
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.scss$/, // Matches .scss files
          use: [
            'style-loader', // Injects styles into DOM
            'css-loader',   // Translates CSS into CommonJS
            'sass-loader'   // Compiles Sass to CSS
          ],
        },
      ],
    },
  },
  /* use https://kc.admin.inno-js.ru/ to create config, navigations and features */
  navigations: {
    "sdk.main": "/sdk",
  },
  features: {
    "sdk": {
      // add your features here in the format [featureName]: { value: string }
    },
  },
  config: {
    // "sdk.api": "/api",
    "sdk.api": "http://mocksdk.eastus.azurecontainer.io/api",
  },
};
