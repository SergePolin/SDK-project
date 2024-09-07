const pkg = require("./package");

module.exports = {
  apiPath: "stubs/api",
  webpackConfig: {
    output: {
      publicPath: `/static/${pkg.name}/${process.env.VERSION || pkg.version}/`,
    },
  },
  /* use https://kc.admin.inno-js.ru/ to create config, navigations and features */
  navigations: {
    "sdk-project.main": "/sdk-project",
  },
  features: {
    "sdk-project": {
      // add your features here in the format [featureName]: { value: string }
    },
  },
  config: {
    "sdk-project.api": "/api",
  },
};
