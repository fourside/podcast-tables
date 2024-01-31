const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const { withSentryConfig } = require("@sentry/nextjs");

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  silent: false,
  dryRun: process.env.SENTRY_AUTH_TOKEN === undefined,
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

/** @type {import('next').NextConfig} */
const nextCOnfig = {
  experimental: {
    largePageDataBytes: 32 * 1024 * 1024,
  },
  env: {
    RADIKO_RESOURCE_ENDPOINT: process.env.RADIKO_RESOURCE_ENDPOINT,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  sentry: {
    hideSourceMaps: true,
  },
};

module.exports = withSentryConfig(withBundleAnalyzer(nextCOnfig), sentryWebpackPluginOptions);
