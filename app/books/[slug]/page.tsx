import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/LeadForm";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductActions } from "@/components/ProductActions";
import { books, formatPrice, getBook } from "@/data/products";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return {};

  return {
    title: `${book.name} — ${formatPrice(book.price)}`,
    description: `${book.description} Цена: ${formatPrice(book.price)}. Фотографии и консультация по выбору.`,
    alternates: { canonical: `/books/${book.slug}` },
    openGraph: {
      type: "website",
      url: `/books/${book.slug}`,
      title: book.name,
      description: book.promise,
      images: [{ url: book.gallery[0], alt: book.name }],
    },
  };
}

export default async function BookPage({ params }: PageProps) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: book.name,
    image: book.gallery.map((image) => `https://rodkod.ru${image}`),
    description: book.description,
    brand: { "@type": "Brand", name: "РодКод" },
    sku: book.slug,
    ...(book.price
      ? {
          offers: {
            "@type": "Offer",
            url: `https://rodkod.ru/books/${book.slug}`,
            priceCurrency: "RUB",
            price: book.price,
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
          },
        }
      : {}),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://rodkod.ru/" },
      { "@type": "ListItem", position: 2, name: "Книги", item: "https://rodkod.ru/books" },
      {
        "@type": "ListItem",
        position: 3,
        name: book.name,
        item: `https://rodkod.ru/books/${book.slug}`,
      },
    ],
  };

  return (
    <main className="product-page">
      <div className="shell breadcrumb">
        <Link href="/">Главная</Link><span>/</span>
        <Link href="/books">Книги</Link><span>/</span>
        <span>{book.shortName}</span>
      </div>

      <section className="shell product-hero">
        <ProductGallery images={book.gallery} name={book.name} />
        <div className="product-offer">
          <p className="eyebrow">Родословная книга</p>
          <h1>{book.name}</h1>
          <p className="product-promise">{book.promise}</p>
          <p className="product-price">{formatPrice(book.price)}</p>
          <p className="price-note">
            Итоговая комплектация и срок подтверждаются до оплаты.
          </p>
          <ul className="feature-list">
            {book.features.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
          <ProductActions slug={book.slug} />
          <p className="microcopy">
            Можно положить книгу в корзину без регистрации. Для подтверждения
            понадобятся только имя и номер.
          </p>
        </div>
      </section>

      <section className="section product-detail-section">
        <div className="shell product-detail-grid">
          <div>
            <p className="eyebrow">Кому подойдёт</p>
            <h2>Подарок с понятным продолжением</h2>
            <p>{book.description}</p>
          </div>
          <div className="audience-grid">
            {book.audience.map((item, index) => (
              <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" id="book-request">
        <div className="shell conversion-grid">
          <div>
            <p className="eyebrow">Бесплатная консультация</p>
            <h2>Проверим наличие и поможем сравнить варианты</h2>
            <p>
              Специалист уточнит дату, получателя и желаемый характер подарка.
              Решение о покупке можно принять после разговора.
            </p>
          </div>
          <LeadForm
            leadType="book_interest"
            source="book_page"
            product={book.slug}
            submitLabel="Узнать о книге"
          />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </main>
  );
}
