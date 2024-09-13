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
    "sdk.api": "/api",
  },
};
