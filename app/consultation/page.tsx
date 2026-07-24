import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Бесплатная консультация",
  description:
    "Обсудите семейную книгу, поиск предков, родословное древо или историю семьи. Для первого шага нужны только имя и телефон.",
  alternates: { canonical: "/consultation" },
};

export default function ConsultationPage() {
  return (
    <main>
      <section className="consultation-page">
        <div className="shell consultation-grid">
          <div className="consultation-copy">
            <p className="eyebrow">Бесплатная консультация</p>
            <h1>Не заполняйте большую анкету. Сначала просто поговорим</h1>
            <p>
              За короткий разговор поймём, какое направление подходит, что уже
              есть у семьи и какой следующий шаг действительно нужен.
            </p>
            <ol>
              <li><span>01</span><p><strong>Оставьте два поля</strong>Имя и номер для связи.</p></li>
              <li><span>02</span><p><strong>Получите звонок</strong>Без продажи «с порога» и запроса документов.</p></li>
              <li><span>03</span><p><strong>Решите спокойно</strong>После понятного предложения по результату, сроку и цене.</p></li>
            </ol>
          </div>
          <div className="consultation-form-card">
            <h2>Как к вам обратиться?</h2>
            <p>Специалист свяжется по указанному номеру.</p>
            <LeadForm
              leadType="free_consultation"
              source="consultation_page"
              submitLabel="Попросить связаться"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
