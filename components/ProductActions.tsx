"use client";

import Link from "next/link";
import { useState } from "react";
import { useCommerce } from "./CommerceProvider";

export function ProductActions({ slug }: { slug: string }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart, isFavorite, toggleFavorite } = useCommerce();
  const favorite = isFavorite(slug);

  function add() {
    addToCart(slug, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div className="product-actions">
      <div className="quantity-control" aria-label="Количество">
        <button
          type="button"
          onClick={() => setQuantity((value) => Math.max(1, value - 1))}
          aria-label="Уменьшить количество"
        >
          −
        </button>
        <span>{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity((value) => Math.min(99, value + 1))}
          aria-label="Увеличить количество"
        >
          +
        </button>
      </div>
      <button className="button button-gold product-add-button" type="button" onClick={add}>
        {added ? "Добавлено" : "В корзину"}
      </button>
      <button
        className={`product-favorite-action ${favorite ? "is-active" : ""}`}
        type="button"
        onClick={() => toggleFavorite(slug)}
        aria-label={favorite ? "Убрать из избранного" : "Добавить в избранное"}
      >
        <span aria-hidden="true">{favorite ? "♥" : "♡"}</span>
      </button>
      {added ? (
        <p className="product-added-note">
          Книга в корзине. <Link href="/cart">Перейти к оформлению</Link>
        </p>
      ) : null}
    </div>
  );
}
