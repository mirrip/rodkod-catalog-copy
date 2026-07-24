"use client";

import Image from "next/image";
import Link from "next/link";
import { BookProduct, formatPrice } from "@/data/products";
import { useCommerce } from "./CommerceProvider";

export function ProductCard({
  product,
  priority = false,
}: {
  product: BookProduct;
  priority?: boolean;
}) {
  const { addToCart, isFavorite, toggleFavorite } = useCommerce();
  const favorite = isFavorite(product.slug);

  return (
    <article className="product-card">
      <div className="product-card-media">
        <Link
          className="product-card-image"
          href={`/books/${product.slug}`}
          aria-label={`Подробнее: ${product.name}`}
        >
          <Image
            src={product.gallery[0]}
            alt={product.name}
            fill
            unoptimized
            sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
            priority={priority}
          />
          {product.consultationOnly ? (
            <span className="product-badge">Поможем подобрать</span>
          ) : null}
        </Link>
        <button
          className={`favorite-button ${favorite ? "is-active" : ""}`}
          type="button"
          onClick={() => toggleFavorite(product.slug)}
          aria-label={
            favorite ? "Убрать из избранного" : "Добавить в избранное"
          }
        >
          <span aria-hidden="true">{favorite ? "♥" : "♡"}</span>
        </button>
      </div>
      <div className="product-card-body">
        <p className="product-card-type">Родословная книга</p>
        <h3>
          <Link href={`/books/${product.slug}`}>{product.shortName}</Link>
        </h3>
        <p>{product.description}</p>
        <div className="product-card-footer">
          <strong>{formatPrice(product.price)}</strong>
          <Link href={`/books/${product.slug}`}>Смотреть →</Link>
        </div>
        <button
          className="product-cart-button"
          type="button"
          onClick={() => addToCart(product.slug)}
        >
          Добавить в корзину
        </button>
      </div>
    </article>
  );
}
