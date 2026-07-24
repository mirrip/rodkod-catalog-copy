"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const frames = [
  {
    src: "/products/elitnaya-01.jpg",
    alt: "Элитная родословная книга в домашней библиотеке",
    label: "Элитная коллекция",
  },
  {
    src: "/products/opletka-drevo-01.jpg",
    alt: "Родословная книга с золотым древом",
    label: "Семейная реликвия",
  },
  {
    src: "/products/wedding-01.jpg",
    alt: "Белая свадебная родословная книга",
    label: "История новой семьи",
  },
  {
    src: "/products/bordo-drevo-01.jpg",
    alt: "Бордовая родословная книга с древом",
    label: "Память поколений",
  },
];

export function HeroGallery() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(
      () => setActive((value) => (value + 1) % frames.length),
      4200,
    );
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="hero-gallery"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Коллекция РодКод"
    >
      {frames.map((frame, index) => (
        <figure
          className={`hero-frame ${index === active ? "is-active" : ""}`}
          key={frame.src}
          aria-hidden={index !== active}
        >
          <Image
            src={frame.src}
            alt={frame.alt}
            fill
            unoptimized
            sizes="(max-width: 760px) 100vw, 58vw"
            priority={index === 0}
          />
          <figcaption>{frame.label}</figcaption>
        </figure>
      ))}
      <div className="hero-gallery-dots" aria-label="Выбор изображения">
        {frames.map((frame, index) => (
          <button
            type="button"
            key={frame.src}
            className={index === active ? "is-active" : ""}
            aria-label={`Показать: ${frame.label}`}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
      <span className="hero-gallery-number" aria-hidden="true">
        0{active + 1}
      </span>
    </div>
  );
}
