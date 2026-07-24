import type { Metadata } from "next";
import { CartPageClient } from "@/components/CartPageClient";

export const metadata: Metadata = {
  title: "Корзина",
  description: "Оформление заявки на родословные книги РодКод.",
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <main>
      <section className="inner-hero compact-inner-hero">
        <div className="shell narrow">
          <p className="eyebrow">Без регистрации и предоплаты</p>
          <h1>Корзина</h1>
          <p>
            Проверьте книги и оставьте два контакта. Наличие и детали согласуем
            до оплаты.
          </p>
        </div>
      </section>
      <section className="section section-ivory commerce-section">
        <div className="shell">
          <CartPageClient />
        </div>
      </section>
    </main>
  );
}
