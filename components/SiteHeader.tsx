"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/catalog", label: "Направления" },
  { href: "/books", label: "Книги" },
  { href: "/#trust", label: "О нас" },
  { href: "/consultation", label: "Консультация" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="РодКод — на главную">
          <span className="brand-mark" aria-hidden="true">
            РК
          </span>
          <span>
            <strong>РодКод</strong>
            <small>семейное наследие</small>
          </span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
          <span className="sr-only">Открыть меню</span>
        </button>

        <nav
          className={`main-nav ${open ? "is-open" : ""}`}
          id="main-navigation"
          aria-label="Основная навигация"
        >
          {links.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link
            className="nav-cta"
            href="/consultation"
            onClick={() => setOpen(false)}
          >
            Обсудить задачу
          </Link>
        </nav>
      </div>
    </header>
  );
}
