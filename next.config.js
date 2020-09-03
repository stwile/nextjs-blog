module.exports = {
  async redirects() {
    return [
      {
        source: '/blogs/archives/1',
        destination: '/',
        permanent: true,
      },
    ]
  },
}