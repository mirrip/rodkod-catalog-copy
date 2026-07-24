"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type LeadFormProps = {
  leadType?: string;
  source: string;
  product?: string;
  title?: string;
  compact?: boolean;
  submitLabel?: string;
};

const initialState = {
  name: "",
  phone: "",
  consent: false,
  marketingConsent: false,
};

function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  let local = digits;
  if (local.startsWith("8") || local.startsWith("7")) local = local.slice(1);
  if (!local) return "";

  let formatted = "+7";
  if (local.length) formatted += ` (${local.slice(0, 3)}`;
  if (local.length >= 4) formatted += `) ${local.slice(3, 6)}`;
  if (local.length >= 7) formatted += `-${local.slice(6, 8)}`;
  if (local.length >= 9) formatted += `-${local.slice(8, 10)}`;
  return formatted;
}

export function LeadForm({
  leadType = "consultation",
  source,
  product,
  title = "Получить бесплатную консультацию",
  compact = false,
  submitLabel = "Обсудить задачу",
}: LeadFormProps) {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const phoneDigits = form.phone.replace(/\D/g, "");

    if (form.name.trim().length < 2) {
      setStatus("error");
      setMessage("Напишите, как к вам обращаться.");
      return;
    }
    if (phoneDigits.length !== 11) {
      setStatus("error");
      setMessage("Проверьте номер телефона: должно быть 10 цифр после +7.");
      return;
    }
    if (!form.consent) {
      setStatus("error");
      setMessage("Для отправки заявки нужно согласие на обработку данных.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const params = new URLSearchParams(window.location.search);
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType,
          source,
          product: product ?? "",
          name: form.name.trim(),
          phone: form.phone,
          consent: form.consent,
          marketingConsent: form.marketingConsent,
          pageUrl: window.location.href,
          utm: {
            source: params.get("utm_source") ?? "",
            medium: params.get("utm_medium") ?? "",
            campaign: params.get("utm_campaign") ?? "",
            content: params.get("utm_content") ?? "",
            term: params.get("utm_term") ?? "",
          },
        }),
      });

      if (!response.ok) throw new Error("request failed");
      setStatus("success");
      setMessage(
        "Спасибо. Мы получили заявку и свяжемся с вами в рабочее время.",
      );
      setForm(initialState);
    } catch {
      setStatus("error");
      setMessage(
        "Не удалось отправить заявку. Позвоните нам по номеру +7 901 316-87-26.",
      );
    }
  }

  return (
    <form
      className={`lead-form ${compact ? "lead-form-compact" : ""}`}
      onSubmit={submit}
      noValidate
    >
      <div className="lead-form-heading">
        <p className="eyebrow">Первый шаг — без обязательств</p>
        <h2>{title}</h2>
        <p>
          Оставьте только имя и номер. Сначала разберём задачу, потом предложим
          подходящий путь.
        </p>
      </div>

      <div className="lead-form-fields">
        <label>
          <span>Как к вам обращаться</span>
          <input
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(event) =>
              setForm((value) => ({ ...value, name: event.target.value }))
            }
            placeholder="Например, Юрий"
            maxLength={80}
            required
          />
        </label>
        <label>
          <span>Номер для связи</span>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) =>
              setForm((value) => ({
                ...value,
                phone: normalizePhone(event.target.value),
              }))
            }
            placeholder="+7 (___) ___-__-__"
            required
          />
        </label>
      </div>

      <label className="check-row">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(event) =>
            setForm((value) => ({ ...value, consent: event.target.checked }))
          }
          required
        />
        <span>
          Я даю отдельное{" "}
          <Link href="/legal/consent">согласие на обработку данных</Link> и
          ознакомлен(а) с <Link href="/legal/privacy">политикой</Link>.
        </span>
      </label>

      <label className="check-row check-row-optional">
        <input
          type="checkbox"
          checked={form.marketingConsent}
          onChange={(event) =>
            setForm((value) => ({
              ...value,
              marketingConsent: event.target.checked,
            }))
          }
        />
        <span>
          Хочу иногда получать полезные материалы о семейной истории. Не
          обязательно для консультации.
        </span>
      </label>

      <button
        className="button button-gold button-full"
        type="submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Отправляем…" : submitLabel}
      </button>
      <p className={`form-status form-status-${status}`} aria-live="polite">
        {message}
      </p>
      <p className="form-safety">
        Не просим паспорт, адрес, документы или сведения о родственниках на
        первом шаге.
      </p>
    </form>
  );
}
