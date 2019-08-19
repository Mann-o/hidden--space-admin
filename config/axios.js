export default {
  debug: process.env.NODE_ENV !== 'production',
  progress: true,
  proxy: true,
  proxyHeadersIgnore: ['host', 'accept'],
}
