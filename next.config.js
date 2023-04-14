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
  reactStrictMode: true,
  eslint: {
    dirs: ["src"],
  },
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    WRITABLE_USER_MAIL_ADDRESS: process.env.WRITABLE_USER_MAIL_ADDRESS,
  },
  sentry: {
    hideSourceMaps: true,
  },
};

module.exports = withSentryConfig(withBundleAnalyzer(nextCOnfig), sentryWebpackPluginOptions);
