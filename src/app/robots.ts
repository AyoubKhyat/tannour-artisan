import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/checkout', '/orders', '/admin'],
      },
    ],
    sitemap: 'https://tannour.ma/sitemap.xml',
  };
}
