"use client";

import { useMemo, useState } from "react";
import {
  books,
  BookProduct,
  categoryLabels,
  formatPrice,
} from "@/data/products";
import { ProductCard } from "./ProductCard";

type Category = "all" | BookProduct["category"];

export function BookCatalog() {
  const [category, setCategory] = useState<Category>("all");
  const [budget, setBudget] = useState("");

  const visibleBooks = useMemo(() => {
    let result =
      category === "all"
        ? books
        : books.filter((book) => book.category === category);
    const amount = Number(budget.replace(/\D/g, ""));
    if (amount > 0) {
      result = result
        .filter((book) => book.price !== null)
        .sort(
          (first, second) =>
            Math.abs((first.price ?? 0) - amount) -
            Math.abs((second.price ?? 0) - amount),
        )
        .slice(0, 6);
    }
    return result;
  }, [budget, category]);

  return (
    <>
      <div className="catalog-toolbar">
        <div className="catalog-tabs" aria-label="Категории книг">
          <button
            type="button"
            className={category === "all" ? "is-active" : ""}
            onClick={() => setCategory("all")}
          >
            Все
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              type="button"
              key={key}
              className={category === key ? "is-active" : ""}
              onClick={() => setCategory(key as Category)}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="budget-field">
          <span>Бюджет</span>
          <input
            inputMode="numeric"
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
            placeholder="Например, 10 000"
          />
          <small>Покажем ближайшие варианты</small>
        </label>
      </div>
      {budget ? (
        <p className="catalog-result-note">
          Ближайшие варианты к бюджету {formatPrice(Number(budget.replace(/\D/g, "")))}
        </p>
      ) : null}
      <div className="product-grid">
        {visibleBooks.map((book, index) => (
          <ProductCard product={book} key={book.slug} priority={index < 3} />
        ))}
      </div>
    </>
  );
}
