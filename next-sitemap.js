const domainName = process.env.DOMAIN || 'example.com';
const siteUrl = `https://${domainName}`;

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: './out',
};
