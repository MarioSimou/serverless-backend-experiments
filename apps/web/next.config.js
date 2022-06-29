const withTM = require('next-transpile-modules')(['lib'])

module.exports = withTM({
  reactStrictMode: true,
  redirects: async () => [
    { source: '/', destination: '/todos', permanent: true },
  ],
})
