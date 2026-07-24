import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Направления",
  description:
    "Родословные книги, поиск предков, семейное древо и история семьи — выберите подходящий формат сохранения семейной памяти.",
  alternates: { canonical: "/catalog" },
};

export default function CatalogPage() {
  return (
    <main>
      <section className="inner-hero">
        <div className="shell narrow">
          <p className="eyebrow">Направления РодКод</p>
          <h1>Сохранить историю семьи можно по-разному</h1>
          <p>
            Не нужно заранее знать точный формат. Сравните результат и начните
            с того шага, который сейчас понятен и посилен вашей семье.
          </p>
        </div>
      </section>

      <section className="section section-ivory">
        <div className="shell offering-list">
          <article className="offering-row offering-row-featured">
            <div className="offering-image">
              <Image
                src="/products/elitnaya-01.jpg"
                alt="Родословная книга в кожаном переплёте"
                fill
                unoptimized
                priority
                sizes="(max-width: 800px) 100vw, 45vw"
              />
            </div>
            <div className="offering-copy">
              <span>Готовый семейный подарок</span>
              <h2>Родословные книги</h2>
              <p>
                20 моделей: от светлого фотоальбома до статусной кожаной
                реликвии. У каждой — отдельные фотографии, цена и страница.
              </p>
              <dl className="offer-facts">
                <div><dt>Цена</dt><dd>от 5 000 ₽</dd></div>
                <div><dt>Старт</dt><dd>можно выбрать сразу</dd></div>
              </dl>
              <Link className="button button-dark" href="/books">
                Перейти в каталог книг
              </Link>
            </div>
          </article>

          {services.map((service, index) => (
            <article className="offering-row" key={service.slug}>
              <div className="offering-number">0{index + 2}</div>
              <div className="offering-copy">
                <span>{service.eyebrow}</span>
                <h2>{service.name}</h2>
                <p>{service.description}</p>
                <dl className="offer-facts">
                  <div><dt>Стоимость</dt><dd>{service.priceLabel}</dd></div>
                  <div><dt>Срок</dt><dd>{service.duration}</dd></div>
                </dl>
                <Link className="button button-dark" href={`/services/${service.slug}`}>
                  Что входит и как начать
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
