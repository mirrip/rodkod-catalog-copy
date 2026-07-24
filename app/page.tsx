import Image from "next/image";
import Link from "next/link";
import { HeroGallery } from "@/components/HeroGallery";
import { LeadForm } from "@/components/LeadForm";
import { ProductCard } from "@/components/ProductCard";
import { featuredBooks } from "@/data/products";
import { services } from "@/data/services";

const scenarios = [
  {
    title: "Подарок родителям",
    situation:
      "Нужен семейный подарок к юбилею, но нет времени начинать большое исследование.",
    result:
      "Подбираем готовую книгу и даём понятный список вопросов, с которых семья сможет начать.",
  },
  {
    title: "Известно только имя предка",
    situation:
      "Сохранились имя, примерный год и одна фотография, а направление поиска непонятно.",
    result:
      "Оцениваем исходные сведения и предлагаем реалистичный первый этап без обещания выдуманных находок.",
  },
  {
    title: "Семейный архив без порядка",
    situation:
      "Фотографии, заметки и рассказы родственников лежат в разных местах.",
    result:
      "Собираем структуру истории одного человека, чтобы появился первый законченный результат.",
  },
];

const faqs = [
  {
    question: "Нужно ли сразу передавать семейные документы?",
    answer:
      "Нет. Для первой консультации нужны только имя и номер для связи. Фотографии, документы и сведения о родственниках обсуждаются позже, если вы согласуете задачу и условия.",
  },
  {
    question: "Можно ли заказать только книгу без исследования?",
    answer:
      "Да. Книга — самостоятельный продукт. Её можно выбрать в каталоге, добавить в корзину и обсудить комплектацию отдельно от других услуг.",
  },
  {
    question: "Что происходит после заявки?",
    answer:
      "Специалист уточняет задачу, дату и желаемый результат, после чего подтверждает наличие, стоимость и следующий шаг. До согласования оплачивать ничего не нужно.",
  },
  {
    question: "Можно ли гарантировать результат архивного поиска?",
    answer:
      "Нет, и мы не обещаем невозможного. Результат зависит от периода, географии и сохранности источников. Сначала оцениваем исходные данные, затем предлагаем проверяемый этап работы.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="shell hero-shell">
          <div className="hero-visual">
            <HeroGallery />
          </div>
          <div className="hero-copy">
            <p className="eyebrow">Семейное наследие с личной историей</p>
            <h1>
              История семьи,
              <em>к которой возвращаются</em>
            </h1>
            <p className="hero-lead">
              Родословные книги, поиск предков, семейные древа и помощь в
              создании истории семьи — бережно, понятно и без лишней сложности.
            </p>
            <div className="hero-actions">
              <Link className="button button-gold" href="/catalog">
                Посмотреть направления
              </Link>
              <Link className="soft-link" href="/consultation">
                Бесплатная консультация <span>→</span>
              </Link>
            </div>
            <div className="hero-trust">
              <span>Только имя и номер для начала</span>
              <span>Без оплаты до согласования</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-ivory" aria-labelledby="directions">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Направления РодКод</p>
              <h2 id="directions">Выберите результат, который нужен семье</h2>
            </div>
            <p>
              Можно начать с готовой книги, одного предка, семейного древа или
              истории одного человека. Необязательно решать всё сразу.
            </p>
          </div>

          <div className="direction-grid">
            <Link className="direction-card direction-card-featured" href="/books">
              <div className="direction-card-image">
                <Image
                  src="/products/elitnaya-01.jpg"
                  alt="Элитная родословная книга"
                  fill
                  unoptimized
                  sizes="(max-width: 800px) 100vw, 48vw"
                />
              </div>
              <div className="direction-card-copy">
                <span>Готовые книги</span>
                <h3>Родословные книги</h3>
                <p>
                  От светлого семейного альбома до статусной кожаной реликвии.
                </p>
                <strong>От 5 000 ₽ · Открыть каталог →</strong>
              </div>
            </Link>
            {services.map((service) => (
              <Link
                className="direction-card direction-card-service"
                href={`/services/${service.slug}`}
                key={service.slug}
              >
                <span>{service.eyebrow}</span>
                <h3>{service.name}</h3>
                <p>{service.shortDescription}</p>
                <strong>Узнать подробнее →</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section collection-section" aria-labelledby="selected-books">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Коллекция РодКод</p>
              <h2 id="selected-books">Книги, которые хочется передать дальше</h2>
            </div>
            <p>
              У каждой модели есть собственная страница, фотографии, цена,
              избранное и добавление в корзину без регистрации.
            </p>
          </div>
          <div className="product-grid">
            {featuredBooks.map((book, index) => (
              <ProductCard product={book} key={book.slug} priority={index < 2} />
            ))}
          </div>
          <div className="section-action">
            <Link className="button button-quiet" href="/books">
              Смотреть все книги
            </Link>
          </div>
        </div>
      </section>

      <section className="section trust-section" id="trust">
        <div className="shell trust-grid">
          <div className="founder-placeholder" aria-label="Место для фотографии основателя">
            <div className="founder-photo-slot">
              <span>Место для фотографии основателя</span>
              <small>деловой портрет добавим после съёмки</small>
            </div>
            <div className="founder-caption">
              <p>Личная ответственность</p>
              <strong>За проектом стоит конкретный человек и семейная команда</strong>
            </div>
          </div>
          <div className="trust-copy">
            <p className="eyebrow">Доверие начинается с ясности</p>
            <h2>В семейной теме важны деликатность и честные ожидания</h2>
            <p className="trust-lead">
              Мы заранее объясняем, что произойдёт после заявки, какие сведения
              понадобятся и где заканчиваются наши возможности.
            </p>
            <div className="trust-list">
              <div>
                <i aria-hidden="true">✓</i>
                <p><strong>Минимум данных</strong>На первом шаге — только обращение и номер.</p>
              </div>
              <div>
                <i aria-hidden="true">✓</i>
                <p><strong>Согласование до оплаты</strong>Сначала результат, срок и стоимость.</p>
              </div>
              <div>
                <i aria-hidden="true">✓</i>
                <p><strong>Честные ограничения</strong>Не обещаем архивные находки заранее.</p>
              </div>
              <div>
                <i aria-hidden="true">✓</i>
                <p><strong>Понятные документы</strong>Условия доступны до отправки заявки.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-ivory" aria-labelledby="cases-title">
        <div className="shell">
          <div className="section-heading centered-heading">
            <p className="eyebrow">Примеры задач</p>
            <h2 id="cases-title">С чего семьи обычно начинают</h2>
            <p>
              Ниже — демонстрационные сценарии, не выданные за отзывы. Реальные
              истории будут опубликованы только с разрешения клиентов.
            </p>
          </div>
          <div className="scenario-grid">
            {scenarios.map((scenario) => (
              <article className="scenario-card" key={scenario.title}>
                <span>Пример обращения</span>
                <h3>{scenario.title}</h3>
                <p>{scenario.situation}</p>
                <div>
                  <strong>Что предлагаем</strong>
                  <p>{scenario.result}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="shell faq-grid">
          <div>
            <p className="eyebrow">Коротко о важном</p>
            <h2>Вопросы перед первым обращением</h2>
            <p>
              Если вашего вопроса нет в списке, откройте чат в правом нижнем
              углу или попросите специалиста связаться.
            </p>
          </div>
          <div className="faq-list">
            {faqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section consultation-band">
        <div className="shell consultation-grid">
          <div className="consultation-copy">
            <p className="eyebrow">Бесплатная консультация</p>
            <h2>Поймите, с чего начать именно вашей семье</h2>
            <ul>
              <li>Определим подходящее направление</li>
              <li>Объясним, какие сведения действительно нужны</li>
              <li>Предложим первый шаг без лишних расходов</li>
            </ul>
            <p className="consultation-footnote">
              Консультация не обязывает покупать и не требует семейных
              документов заранее.
            </p>
          </div>
          <LeadForm source="homepage_consultation" compact />
        </div>
      </section>
    </main>
  );
}
