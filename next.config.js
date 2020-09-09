module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blogs/1',
        permanent: true,
      },
    ]
  },
}