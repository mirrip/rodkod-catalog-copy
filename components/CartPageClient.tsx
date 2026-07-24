"use client";

import Image from "next/image";
import Link from "next/link";
import { books, formatPrice } from "@/data/products";
import { LeadForm } from "./LeadForm";
import { useCommerce } from "./CommerceProvider";

export function CartPageClient() {
  const {
    cart,
    cartTotal,
    ready,
    removeFromCart,
    setQuantity,
  } = useCommerce();
  const lines = cart
    .map((item) => ({
      ...item,
      product: books.find((book) => book.slug === item.slug),
    }))
    .filter((item) => item.product);
  const details = lines
    .map(
      (item) =>
        `${item.product?.name} — ${item.quantity} шт. × ${formatPrice(item.product?.price ?? null)}`,
    )
    .join("\n");

  if (!ready) {
    return <p className="empty-state">Загружаем корзину…</p>;
  }

  if (!lines.length) {
    return (
      <div className="empty-state">
        <span aria-hidden="true">⌑</span>
        <h2>Корзина пока пуста</h2>
        <p>
          Добавьте одну или несколько книг. Регистрация для этого не нужна.
        </p>
        <Link className="button button-gold" href="/books">
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <div className="cart-list">
        {lines.map(({ product, quantity, slug }) =>
          product ? (
            <article className="cart-line" key={slug}>
              <Link className="cart-line-image" href={`/books/${slug}`}>
                <Image
                  src={product.gallery[0]}
                  alt={product.name}
                  fill
                  unoptimized
                  sizes="120px"
                />
              </Link>
              <div className="cart-line-copy">
                <Link href={`/books/${slug}`}>
                  <h2>{product.shortName}</h2>
                </Link>
                <strong>{formatPrice(product.price)}</strong>
                <div className="cart-line-controls">
                  <div className="quantity-control">
                    <button
                      type="button"
                      onClick={() => setQuantity(slug, quantity - 1)}
                      aria-label="Уменьшить количество"
                    >
                      −
                    </button>
                    <span>{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(slug, quantity + 1)}
                      aria-label="Увеличить количество"
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove-line"
                    type="button"
                    onClick={() => removeFromCart(slug)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
              <strong className="cart-line-total">
                {formatPrice((product.price ?? 0) * quantity)}
              </strong>
            </article>
          ) : null,
        )}
        <div className="cart-summary">
          <span>Итого</span>
          <strong>{formatPrice(cartTotal)}</strong>
          <p>Финальную комплектацию, наличие и доставку подтвердим до оплаты.</p>
        </div>
      </div>
      <div className="cart-checkout" id="checkout">
        <LeadForm
          leadType="cart_order"
          source="cart"
          product={`cart_${lines.length}_items`}
          details={details}
          title="Оформить заявку"
          submitLabel="Подтвердить заявку"
          hideMarketing
        />
      </div>
    </div>
  );
}
