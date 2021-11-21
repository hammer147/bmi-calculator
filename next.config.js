/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    runtimeCaching,
    buildExcludes: [/middleware-manifest\.json$/]
  }
})

// https://github.com/shadowwalker/next-pwa/issues/288#issuecomment-955777098
