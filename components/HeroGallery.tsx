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
    src: "/products/izyskannaya-01.jpg",
    alt: "Изысканная родословная книга с золотым тиснением",
    label: "Изысканная коллекция",
  },
  {
    src: "/products/wedding-01.jpg",
    alt: "Белая свадебная родословная книга",
    label: "История новой семьи",
  },
];

export function HeroGallery() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(
      () => setActive((value) => (value + 1) % frames.length),
      9000,
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
    </div>
  );
}
