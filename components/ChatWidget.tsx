"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type Message = {
  id: number;
  role: "bot" | "user";
  text: string;
};

const knowledge: Record<string, string[]> = {
  books: [
    "Родословная книга — это готовая основа для семейной памяти: разделы помогают собирать имена, фотографии, даты и рассказы постепенно.",
    "В каталоге есть спокойные варианты от 5 000 ₽ и статусные кожаные издания до 29 000 ₽. Подбирать лучше не только по цене, но и по тому, кому предназначен подарок.",
    "Если книга нужна к определённой дате, специалист сначала уточнит срок и подскажет варианты, которые реально согласовать.",
  ],
  research: [
    "Поиск предков начинается не с большой анкеты, а с короткого разговора: что вы хотите узнать и какие сведения уже есть.",
    "Архивный результат нельзя обещать заранее. Сначала оцениваются география, период и сохранность источников, затем предлагается понятный этап работы.",
    "На первой консультации не нужно отправлять паспорта, документы или полную историю семьи.",
  ],
  tree: [
    "Родословное древо может быть рабочей схемой для семьи или подарочной композицией для печати.",
    "Для оценки достаточно примерно понимать число поколений и количество родственников. Подробные данные собираются позже и только по необходимости.",
    "Если сведения пока разрознены, можно сначала привести их в порядок, а уже затем выбирать дизайн древа.",
  ],
  story: [
    "История семьи помогает превратить фотографии и рассказы родственников в цельный текст или будущую книгу.",
    "Начать можно с одного человека или одного события — так семье легче включиться и не перегрузиться.",
    "Специалист помогает составить вопросы для интервью и определить, какие материалы действительно нужны.",
  ],
};

const quickActions = [
  { id: "books", label: "Выбрать книгу" },
  { id: "research", label: "Найти предков" },
  { id: "tree", label: "Сделать древо" },
  { id: "story", label: "Собрать историю" },
];

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  let local = digits;
  if (local.startsWith("7") || local.startsWith("8")) local = local.slice(1);
  let formatted = local ? "+7" : "";
  if (local.length) formatted += ` (${local.slice(0, 3)}`;
  if (local.length >= 4) formatted += `) ${local.slice(3, 6)}`;
  if (local.length >= 7) formatted += `-${local.slice(6, 8)}`;
  if (local.length >= 9) formatted += `-${local.slice(8, 10)}`;
  return formatted;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [storyIndex, setStoryIndex] = useState(0);
  const [showLead, setShowLead] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "bot",
      text: "Здравствуйте. Я помощник РодКод. Расскажу о направлениях и помогу позвать специалиста.",
    },
  ]);

  const currentStories = useMemo(
    () => (topic ? knowledge[topic] ?? [] : []),
    [topic],
  );

  function chooseTopic(id: string, label: string) {
    const stories = knowledge[id];
    setTopic(id);
    setStoryIndex(0);
    setShowLead(false);
    setMessages((items) => [
      ...items,
      { id: Date.now(), role: "user", text: label },
      { id: Date.now() + 1, role: "bot", text: stories[0] },
    ]);
  }

  function nextStory() {
    const next = storyIndex + 1;
    if (next < currentStories.length) {
      setStoryIndex(next);
      setMessages((items) => [
        ...items,
        { id: Date.now(), role: "user", text: "Расскажите ещё" },
        { id: Date.now() + 1, role: "bot", text: currentStories[next] },
      ]);
      return;
    }
    setMessages((items) => [
      ...items,
      { id: Date.now(), role: "user", text: "У меня другой вопрос" },
      {
        id: Date.now() + 1,
        role: "bot",
        text: "На этот вопрос лучше ответит специалист. Позвать менеджера?",
      },
    ]);
    setShowLead(true);
  }

  async function sendLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (name.trim().length < 2 || digits.length !== 11 || !consent) {
      setError("Нужны имя, корректный номер и согласие на обработку данных.");
      return;
    }
    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType: "chat_manager",
          source: "support_chat",
          product: topic,
          name: name.trim(),
          phone,
          consent,
          marketingConsent: false,
          chatSummary: messages
            .slice(-6)
            .map((message) => `${message.role}: ${message.text}`)
            .join("\n"),
          pageUrl: window.location.href,
        }),
      });
      if (!response.ok) throw new Error("request failed");
      setSent(true);
      setMessages((items) => [
        ...items,
        {
          id: Date.now(),
          role: "bot",
          text: "Готово. Передал специалисту тему разговора и контакты. Пустые заявки мы не отправляем.",
        },
      ]);
    } catch {
      setError("Не удалось отправить. Позвоните: +7 901 316-87-26.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className={`chat-widget ${open ? "is-open" : ""}`}>
      {open ? (
        <section className="chat-panel" aria-label="Чат поддержки">
          <header className="chat-header">
            <div>
              <span className="chat-status" />
              <strong>Помощник РодКод</strong>
              <small>Отвечает по материалам проекта</small>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Закрыть чат"
            >
              ×
            </button>
          </header>

          <div className="chat-messages" aria-live="polite">
            {messages.map((message) => (
              <p key={message.id} className={`chat-message ${message.role}`}>
                {message.text}
              </p>
            ))}
          </div>

          {!topic ? (
            <div className="chat-actions">
              {quickActions.map((action) => (
                <button
                  type="button"
                  key={action.id}
                  onClick={() => chooseTopic(action.id, action.label)}
                >
                  {action.label}
                </button>
              ))}
            </div>
          ) : null}

          {topic && !showLead && !sent ? (
            <div className="chat-actions">
              <button type="button" onClick={nextStory}>
                Расскажите ещё
              </button>
              <button type="button" onClick={() => setShowLead(true)}>
                Позвать специалиста
              </button>
              <button
                type="button"
                onClick={() => {
                  setTopic("");
                  setShowLead(false);
                }}
              >
                Другая тема
              </button>
            </div>
          ) : null}

          {showLead && !sent ? (
            <form className="chat-lead" onSubmit={sendLead}>
              <p>
                Специалист получит тему разговора. Заполните два поля, чтобы он
                мог связаться.
              </p>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Как к вам обращаться"
                aria-label="Как к вам обращаться"
                maxLength={80}
              />
              <input
                value={phone}
                onChange={(event) => setPhone(formatPhone(event.target.value))}
                placeholder="+7 (___) ___-__-__"
                aria-label="Номер телефона"
                inputMode="tel"
              />
              <label className="chat-check">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                />
                <span>
                  Даю <Link href="/legal/consent">согласие на обработку</Link>
                </span>
              </label>
              <button type="submit" disabled={sending}>
                {sending ? "Отправляем…" : "Позвать менеджера"}
              </button>
              {error ? <p className="chat-error">{error}</p> : null}
            </form>
          ) : null}
        </section>
      ) : null}

      <button
        className="chat-launcher"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Закрыть поддержку" : "Открыть поддержку"}
      >
        <span aria-hidden="true">РК</span>
        <strong>Задать вопрос</strong>
      </button>
    </div>
  );
}
