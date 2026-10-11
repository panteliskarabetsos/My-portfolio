import { site } from '@/data/site';

export default function sitemap() {
  const routes = ['', '/research', '/projects', '/about', '/contact', '/legal', '/privacy-policy', '/terms'];
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : route.startsWith('/legal') || route.startsWith('/privacy') || route.startsWith('/terms') ? 0.3 : 0.8,
  }));
}
