const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextCOnfig = {
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    WRITABLE_USER_MAIL_ADDRESS: process.env.WRITABLE_USER_MAIL_ADDRESS,
  },
};

module.exports = withBundleAnalyzer(nextCOnfig);
