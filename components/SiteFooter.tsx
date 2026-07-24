import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link className="brand brand-light" href="/">
            <span className="brand-mark" aria-hidden="true">
              РК
            </span>
            <span>
              <strong>РодКод</strong>
              <small>семейное наследие</small>
            </span>
          </Link>
          <p className="footer-note">
            Книги, исследования и семейные истории, которые помогают сохранить
            главное и передать его дальше.
          </p>
        </div>
        <div>
          <p className="footer-title">Направления</p>
          <Link href="/books">Родословные книги</Link>
          <Link href="/services/poisk-predkov">Поиск предков</Link>
          <Link href="/services/rodoslovnoe-drevo">Родословное древо</Link>
          <Link href="/services/istoriya-semi">История семьи</Link>
        </div>
        <div>
          <p className="footer-title">Документы</p>
          <Link href="/legal/privacy">Политика данных</Link>
          <Link href="/legal/consent">Согласие на обработку</Link>
          <Link href="/legal/terms">Условия использования</Link>
          <Link href="/legal/offer">Условия заказа</Link>
        </div>
        <div>
          <p className="footer-title">Связь</p>
          <a href="tel:+79013168726">+7 901 316-87-26</a>
          <a href="https://vk.me/rodkod" target="_blank" rel="noreferrer">
            Написать во ВКонтакте
          </a>
          <Link href="/consultation">Бесплатная консультация</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 РодКод</span>
        <span>Информация на сайте не является публичной офертой</span>
      </div>
    </footer>
  );
}
