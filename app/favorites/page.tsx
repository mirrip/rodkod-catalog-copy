import type { Metadata } from "next";
import { FavoritesPageClient } from "@/components/FavoritesPageClient";

export const metadata: Metadata = {
  title: "Избранные книги",
  description: "Сохранённые родословные книги РодКод.",
  robots: { index: false, follow: true },
};

export default function FavoritesPage() {
  return (
    <main>
      <section className="inner-hero compact-inner-hero">
        <div className="shell narrow">
          <p className="eyebrow">Ваш выбор</p>
          <h1>Избранные книги</h1>
          <p>Сравните сохранённые варианты и вернитесь к ним в удобное время.</p>
        </div>
      </section>
      <FavoritesPageClient />
    </main>
  );
}
