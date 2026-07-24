"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCommerce } from "./CommerceProvider";

const links = [
  { href: "/", label: "Главная", symbol: "⌂" },
  { href: "/catalog", label: "Все направления", symbol: "◇" },
  { href: "/books", label: "Каталог книг", symbol: "▤" },
  { href: "/favorites", label: "Избранное", symbol: "♡", count: "favorites" },
  { href: "/cart", label: "Корзина", symbol: "⌑", count: "cart" },
  { href: "/#faq", label: "Вопросы и ответы", symbol: "?" },
  { href: "/consultation", label: "Поддержка", symbol: "◌" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount, favoriteCount } = useCommerce();

  return (
    <>
      <header className="site-header">
        <div className="shell header-inner">
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="side-navigation"
            onClick={() => setOpen(true)}
          >
            <span />
            <span />
            <span />
            <span className="sr-only">Открыть меню</span>
          </button>

          <Link className="brand" href="/" aria-label="РодКод — на главную">
            <span className="brand-mark" aria-hidden="true">РК</span>
            <span>
              <strong>РодКод</strong>
              <small>семейное наследие</small>
            </span>
          </Link>

          <div className="header-actions">
            <Link className="header-icon" href="/favorites" aria-label="Избранное">
              <span aria-hidden="true">♡</span>
              {favoriteCount ? <small>{favoriteCount}</small> : null}
            </Link>
            <Link className="header-icon cart-icon" href="/cart" aria-label="Корзина">
              <span aria-hidden="true">⌑</span>
              {cartCount ? <small>{cartCount}</small> : null}
            </Link>
          </div>
        </div>
      </header>

      <button
        className={`menu-overlay ${open ? "is-open" : ""}`}
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Закрыть меню"
        tabIndex={open ? 0 : -1}
      />
      <aside
        className={`side-menu ${open ? "is-open" : ""}`}
        id="side-navigation"
        aria-hidden={!open}
      >
        <div className="side-menu-head">
          <Link className="brand brand-light" href="/" onClick={() => setOpen(false)}>
            <span className="brand-mark" aria-hidden="true">РК</span>
            <span>
              <strong>РодКод</strong>
              <small>семейное наследие</small>
            </span>
          </Link>
          <button
            type="button"
            className="side-close"
            onClick={() => setOpen(false)}
            aria-label="Закрыть меню"
          >
            ×
          </button>
        </div>
        <p className="side-menu-intro">
          Сохраняем историю семьи бережно, понятно и надолго.
        </p>
        <nav aria-label="Основная навигация">
          {links.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : !item.href.includes("#") && pathname.startsWith(item.href);
            const count =
              item.count === "cart"
                ? cartCount
                : item.count === "favorites"
                  ? favoriteCount
                  : 0;
            return (
              <Link
                key={item.href}
                className={active ? "is-active" : ""}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                <span className="side-symbol" aria-hidden="true">{item.symbol}</span>
                <strong>{item.label}</strong>
                {count ? <small>{count}</small> : null}
              </Link>
            );
          })}
        </nav>
        <div className="side-menu-contact">
          <span>Нужна помощь?</span>
          <a href="tel:+79013168726">+7 901 316-87-26</a>
          <Link href="/consultation" onClick={() => setOpen(false)}>
            Бесплатная консультация
          </Link>
        </div>
      </aside>
    </>
  );
}
