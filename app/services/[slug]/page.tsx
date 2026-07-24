import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/LeadForm";
import { getService, services } from "@/data/services";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <main>
      <div className="shell breadcrumb service-breadcrumb">
        <Link href="/">Главная</Link><span>/</span>
        <Link href="/catalog">Направления</Link><span>/</span>
        <span>{service.name}</span>
      </div>
      <section className="service-hero">
        <div className="shell service-hero-grid">
          <div>
            <p className="eyebrow">{service.eyebrow}</p>
            <h1>{service.name}</h1>
            <p className="service-lead">{service.description}</p>
            <div className="service-facts">
              <div><span>Стоимость</span><strong>{service.priceLabel}</strong></div>
              <div><span>Срок</span><strong>{service.duration}</strong></div>
            </div>
            <a className="button button-gold" href="#service-request">
              Обсудить задачу
            </a>
          </div>
          <aside className="result-card">
            <span>Что останется у семьи</span>
            <ul>{service.result.map((item) => <li key={item}>{item}</li>)}</ul>
          </aside>
        </div>
      </section>

      <section className="section section-ivory">
        <div className="shell">
          <div className="section-heading narrow-heading">
            <p className="eyebrow">Как проходит работа</p>
            <h2>Движемся этапами, чтобы не перегружать семью</h2>
          </div>
          <ol className="stage-list">
            {service.stages.map((stage, index) => (
              <li key={stage}><span>0{index + 1}</span><strong>{stage}</strong></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="shell faq-grid">
          <div>
            <p className="eyebrow">Без мелкого шрифта</p>
            <h2>Важные вопросы до начала</h2>
          </div>
          <div>
            {service.questions.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" id="service-request">
        <div className="shell conversion-grid">
          <div>
            <p className="eyebrow">Первый шаг бесплатный</p>
            <h2>Расскажите только, какой результат нужен</h2>
            <p>
              Подробные сведения, фотографии и документы потребуются позже —
              если задача и условия вам подойдут.
            </p>
          </div>
          <LeadForm
            leadType="service_consultation"
            source="service_page"
            product={service.slug}
          />
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </main>
  );
}
