import Image from "next/image";
import Link from "next/link";
import { HeroGallery } from "@/components/HeroGallery";
import { LeadForm } from "@/components/LeadForm";
import { ProductCard } from "@/components/ProductCard";
import { featuredBooks } from "@/data/products";
import { services } from "@/data/services";

const journey = [
  {
    number: "01",
    title: "Увидеть",
    text: "За несколько секунд понять: РодКод помогает семье сохранить память — в книге, исследовании, древе или цельной истории.",
  },
  {
    number: "02",
    title: "Выбрать",
    text: "Сравнить самостоятельные продукты с понятными фотографиями, результатом, стоимостью и отдельной страницей.",
  },
  {
    number: "03",
    title: "Начать легко",
    text: "Оставить только имя и номер. Без большой анкеты, документов и оплаты на первом шаге.",
  },
  {
    number: "04",
    title: "Убедиться",
    text: "Увидеть процесс, ограничения, примеры задач и человека, который отвечает за результат.",
  },
  {
    number: "05",
    title: "Получить поддержку",
    text: "Задать вопрос помощнику и позвать специалиста, если нужен человеческий ответ.",
  },
];

const scenarios = [
  {
    title: "Подарок родителям",
    situation:
      "Нужен семейный подарок к юбилею, но нет времени собирать сложный архив.",
    solution:
      "Начать с готовой родословной книги и получить список первых вопросов для семьи.",
    result: "Понятный подарок сейчас и основа для продолжения истории позже.",
  },
  {
    title: "Имя предка и одна фотография",
    situation:
      "В семье сохранились имя, примерный год и старая фотография, но неизвестно, где искать дальше.",
    solution:
      "На консультации оценить исходные сведения и определить реальные источники.",
    result: "Пошаговый маршрут без обещаний, которые невозможно проверить.",
  },
  {
    title: "Сведения есть, порядка нет",
    situation:
      "Фотографии, заметки и рассказы родственников хранятся в разных местах.",
    solution:
      "Начать с истории одного человека, структуры интервью и списка материалов.",
    result: "Первый законченный семейный рассказ вместо бесконечного сбора.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-visual">
          <HeroGallery />
        </div>
        <div className="shell hero-content-wrap">
          <div className="hero-copy">
            <p className="eyebrow">Семейное наследие — не папка в телефоне</p>
            <h1>
              История семьи,
              <br />
              <em>к которой возвращаются</em>
            </h1>
            <p className="hero-lead">
              Родословные книги, поиск предков, семейные древа и помощь в
              создании истории семьи — спокойно, поэтапно и с уважением к
              личному.
            </p>
            <div className="hero-actions">
              <Link className="button button-gold" href="/catalog">
                Посмотреть направления
              </Link>
              <Link className="text-link" href="/consultation">
                Начать с разговора <span>→</span>
              </Link>
            </div>
            <div className="hero-trust">
              <span>Только 2 поля для первого шага</span>
              <span>Без оплаты до согласования</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-ivory" aria-labelledby="directions">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Один проект — несколько способов сохранить</p>
              <h2 id="directions">Выберите не товар, а нужный семье результат</h2>
            </div>
            <p>
              Книга — только одно из направлений. Можно начать с готового
              подарка, отдельного предка, семейного древа или истории одного
              человека.
            </p>
          </div>

          <div className="direction-grid">
            <Link className="direction-card direction-card-featured" href="/books">
              <div className="direction-card-image">
                <Image
                  src="/products/izyskannaya-01.jpg"
                  alt="Родословная книга"
                  fill
                  unoptimized
                  sizes="(max-width: 800px) 100vw, 48vw"
                />
              </div>
              <div>
                <span>01 · Готовые книги</span>
                <h3>Родословные книги</h3>
                <p>
                  Красивый первый шаг: от семейного альбома до статусной
                  кожаной реликвии.
                </p>
                <strong>От 5 000 ₽ · Смотреть каталог →</strong>
              </div>
            </Link>
            {services.map((service, index) => (
              <Link
                className="direction-card direction-card-service"
                href={`/services/${service.slug}`}
                key={service.slug}
              >
                <span>0{index + 2} · {service.eyebrow}</span>
                <h3>{service.name}</h3>
                <p>{service.shortDescription}</p>
                <strong>Подробнее →</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section journey-section" aria-labelledby="journey-title">
        <div className="shell">
          <div className="section-heading centered-heading">
            <p className="eyebrow">Путь клиента без давления</p>
            <h2 id="journey-title">Пять шагов от интереса до спокойного решения</h2>
            <p>
              Каждый следующий шаг должен требовать меньше усилий, чем кажется,
              и давать больше ясности.
            </p>
          </div>
          <div className="journey-grid">
            {journey.map((item) => (
              <article key={item.number} className="journey-item">
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" aria-labelledby="selected-books">
        <div className="shell">
          <div className="section-heading split-heading section-heading-light">
            <div>
              <p className="eyebrow">Коллекция РодКод</p>
              <h2 id="selected-books">Книги, которые уже можно рассмотреть</h2>
            </div>
            <p>
              У каждой модели — собственная страница, фотографии, цена и
              понятный следующий шаг.
            </p>
          </div>
          <div className="product-grid product-grid-dark">
            {featuredBooks.map((book, index) => (
              <ProductCard product={book} key={book.slug} priority={index < 2} />
            ))}
          </div>
          <div className="section-action">
            <Link className="button button-outline-light" href="/books">
              Открыть все книги
            </Link>
          </div>
        </div>
      </section>

      <section className="section trust-section" id="trust">
        <div className="shell trust-grid">
          <div className="founder-placeholder" aria-label="Место для фотографии основателя">
            <div className="founder-photo-slot">
              <span>Фотография основателя</span>
              <small>будет добавлена после съёмки</small>
            </div>
            <div className="founder-caption">
              <p>Личная ответственность</p>
              <strong>Человек, который отвечает за проект</strong>
            </div>
          </div>
          <div className="trust-copy">
            <p className="eyebrow">Доверие начинается с ясности</p>
            <h2>Семейная тема требует деликатности, а не громких обещаний</h2>
            <p className="trust-lead">
              Мы заранее объясняем, что произойдёт после заявки, какие сведения
              понадобятся и где заканчиваются наши возможности.
            </p>
            <div className="trust-list">
              <div>
                <span>01</span>
                <p>
                  <strong>Минимум данных</strong>
                  На первом шаге — только обращение и номер телефона.
                </p>
              </div>
              <div>
                <span>02</span>
                <p>
                  <strong>Согласование до оплаты</strong>
                  Сначала задача, результат, срок и стоимость — потом решение.
                </p>
              </div>
              <div>
                <span>03</span>
                <p>
                  <strong>Честные ограничения</strong>
                  Архивный поиск не терпит гарантированных выдуманных находок.
                </p>
              </div>
              <div>
                <span>04</span>
                <p>
                  <strong>Документы человеческим языком</strong>
                  Короткое резюме и полная версия каждого условия.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-ivory" aria-labelledby="cases-title">
        <div className="shell">
          <div className="section-heading centered-heading">
            <p className="eyebrow">Примеры задач</p>
            <h2 id="cases-title">Как может выглядеть первый результат</h2>
            <p>
              Это демонстрационные сценарии, а не отзывы реальных клиентов.
              Подтверждённые истории появятся здесь только с разрешения семей.
            </p>
          </div>
          <div className="scenario-grid">
            {scenarios.map((scenario) => (
              <article className="scenario-card" key={scenario.title}>
                <span>Демонстрационный сценарий</span>
                <h3>{scenario.title}</h3>
                <dl>
                  <div>
                    <dt>Ситуация</dt>
                    <dd>{scenario.situation}</dd>
                  </div>
                  <div>
                    <dt>Первый шаг</dt>
                    <dd>{scenario.solution}</dd>
                  </div>
                  <div>
                    <dt>Результат</dt>
                    <dd>{scenario.result}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section consultation-band">
        <div className="shell consultation-grid">
          <div className="consultation-copy">
            <p className="eyebrow">Лид-магнит без скидки</p>
            <h2>Бесплатная консультация: понять, с чего начать именно вашей семье</h2>
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
          <LeadForm source="homepage_lead_magnet" compact />
        </div>
      </section>
    </main>
  );
}
