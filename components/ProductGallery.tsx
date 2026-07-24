"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="product-gallery">
      <div className="product-gallery-main">
        <Image
          src={images[active]}
          alt={`${name}, фотография ${active + 1}`}
          fill
          unoptimized
          sizes="(max-width: 800px) 100vw, 54vw"
          priority
        />
      </div>
      {images.length > 1 ? (
        <div className="product-thumbs" aria-label="Фотографии товара">
          {images.map((image, index) => (
            <button
              type="button"
              key={image}
              className={active === index ? "is-active" : ""}
              onClick={() => setActive(index)}
              aria-label={`Показать фотографию ${index + 1}`}
            >
              <Image src={image} alt="" fill sizes="96px" unoptimized />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
