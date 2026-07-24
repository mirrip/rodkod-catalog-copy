import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: "https://rodkod.ru/sitemap.xml",
    host: "https://rodkod.ru",
  };
}
