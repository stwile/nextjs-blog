const domainName = process.env.DOMAIN || 'example.com';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: `https://${domainName}`,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: './out',
};
