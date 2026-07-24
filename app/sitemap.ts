import type { MetadataRoute } from "next";
import { books } from "@/data/products";
import { services } from "@/data/services";
import { legalDocuments } from "@/data/legal";

const base = "https://rodkod.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/catalog`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/books`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/consultation`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...books.map((book) => ({
      url: `${base}/books/${book.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...services.map((service) => ({
      url: `${base}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...legalDocuments
      .filter((document) => document.slug !== "consent")
      .map((document) => ({
        url: `${base}/legal/${document.slug}`,
        lastModified: now,
        changeFrequency: "yearly" as const,
        priority: 0.2,
      })),
  ];
}
