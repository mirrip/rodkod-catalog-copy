import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDownload } from "@/components/LegalDownload";
import { getLegalDocument, legalDocuments } from "@/data/legal";

type PageProps = { params: Promise<{ doc: string }> };

export function generateStaticParams() {
  return legalDocuments.map((document) => ({ doc: document.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { doc } = await params;
  const legal = getLegalDocument(doc);
  if (!legal) return {};
  return {
    title: legal.title,
    description: legal.intro,
    alternates: { canonical: `/legal/${legal.slug}` },
    robots: legal.slug === "consent" ? { index: false, follow: true } : undefined,
  };
}

export default async function LegalPage({ params }: PageProps) {
  const { doc } = await params;
  const legal = getLegalDocument(doc);
  if (!legal) notFound();

  return (
    <main className="legal-page">
      <section className="legal-hero">
        <div className="shell legal-shell">
          <p className="eyebrow">Документы РодКод</p>
          <h1>{legal.title}</h1>
          <p>{legal.intro}</p>
          <span>{legal.version}</span>
          <LegalDownload document={legal} />
        </div>
      </section>
      <section className="section section-ivory">
        <div className="shell legal-layout">
          <aside className="legal-benefits">
            <strong>Главное для клиента</strong>
            <ul>{legal.benefits.map((item) => <li key={item}>{item}</li>)}</ul>
          </aside>
          <article className="legal-document">
            {legal.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.items ? (
                  <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>
                ) : null}
              </section>
            ))}
            <div className="legal-warning">
              <strong>Перед публикацией</strong>
              <p>
                Документ должен проверить юрист после заполнения реквизитов,
                схемы хранения, подрядчиков, оплаты и доставки. Шаблон не
                заменяет индивидуальную юридическую консультацию.
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
