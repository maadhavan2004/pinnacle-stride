import { MetadataRoute } from 'next';
import { servicesData, projectsData, productsData } from '@ps/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pinnaclestride.com';
  const lastModified = new Date();

  // Static marketing routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/products`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/projects`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/how-we-work`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cookies`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Dynamic Service routes
  const serviceRoutes: MetadataRoute.Sitemap = servicesData.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Dynamic Project routes
  const projectRoutes: MetadataRoute.Sitemap = projectsData.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
