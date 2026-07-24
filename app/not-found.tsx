import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <div>
        <p className="eyebrow">Ошибка 404</p>
        <h1>Такой страницы нет</h1>
        <p>Вернитесь к направлениям РодКод или откройте каталог книг.</p>
        <Link className="button button-gold" href="/catalog">К направлениям</Link>
      </div>
    </main>
  );
}
