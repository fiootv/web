import { MetadataRoute } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || "https://www.fiootv.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/channels",
    "/pricing",
    "/download",
    "/faqs",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
    "/refund-policy",
  ];

  return routes.map((route) => ({
    url: `${defaultUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/pricing" ? 0.9 : 0.8,
  }));
}
