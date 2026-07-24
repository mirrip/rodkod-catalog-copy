import type { Metadata } from "next";
import { BookCatalog } from "@/components/BookCatalog";

export const metadata: Metadata = {
  title: "Родословные книги — каталог и цены",
  description:
    "Каталог родословных книг РодКод: 20 моделей с отдельными фотографиями, характеристиками и ценами от 5 000 ₽.",
  alternates: { canonical: "/books" },
};

export default function BooksPage() {
  return (
    <main>
      <section className="inner-hero books-hero">
        <div className="shell narrow">
          <p className="eyebrow">Коллекция РодКод</p>
          <h1>Родословные книги, которые становятся семейными</h1>
          <p>
            Выберите характер и бюджет. Чтобы начать, не нужно заполнять
            родословную или передавать документы — сначала поможем с моделью.
          </p>
        </div>
      </section>
      <section className="section section-ivory">
        <div className="shell">
          <BookCatalog />
        </div>
      </section>
    </main>
  );
}
