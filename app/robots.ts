import { MetadataRoute } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || "https://www.fiootv.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/checkout",
          "/checkout-success",
          "/contact-success",
          "/api/",
          "/auth/",
          "/protected/",
          "/sync/",
        ],
      },
    ],
    sitemap: `${defaultUrl}/sitemap.xml`,
  };
}
