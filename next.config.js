const { merge } = require("webpack-merge");

module.exports = {
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
  },
  webpack: (config) => {
    return (merge(config, {
      resolve: {
        alias: {
          firebaseui: "firebaseui-ja",
        }
      }
    }))
  }
}
