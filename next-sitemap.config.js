const domainName = process.env.DOMAIN || 'example.com';

/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: `https://${domainName}`,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: './out',
};
