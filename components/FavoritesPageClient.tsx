"use client";

import Link from "next/link";
import { books } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { useCommerce } from "./CommerceProvider";

export function FavoritesPageClient() {
  const { favorites, ready } = useCommerce();
  const products = books.filter((book) => favorites.includes(book.slug));

  return (
    <section className="section section-ivory commerce-section">
      <div className="shell">
        {!ready ? <p className="empty-state">Загружаем избранное…</p> : null}
        {ready && products.length ? (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : null}
        {ready && !products.length ? (
          <div className="empty-state">
            <span aria-hidden="true">♡</span>
            <h2>Здесь пока нет книг</h2>
            <p>
              Нажмите на сердечко в каталоге — выбранные варианты сохранятся
              здесь даже после закрытия сайта.
            </p>
            <Link className="button button-gold" href="/books">
              Выбрать книгу
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
