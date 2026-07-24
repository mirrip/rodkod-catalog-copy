import Image from "next/image";
import Link from "next/link";
import { BookProduct, formatPrice } from "@/data/products";

export function ProductCard({
  product,
  priority = false,
}: {
  product: BookProduct;
  priority?: boolean;
}) {
  return (
    <article className="product-card">
      <Link
        className="product-card-image"
        href={`/books/${product.slug}`}
        aria-label={`Подробнее: ${product.name}`}
      >
        <Image
          src={product.gallery[0]}
          alt={product.name}
          fill
          unoptimized
          sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
          priority={priority}
        />
        {product.consultationOnly ? (
          <span className="product-badge">Подбор с консультантом</span>
        ) : null}
      </Link>
      <div className="product-card-body">
        <p className="product-card-type">Родословная книга</p>
        <h3>
          <Link href={`/books/${product.slug}`}>{product.shortName}</Link>
        </h3>
        <p>{product.description}</p>
        <div className="product-card-footer">
          <strong>{formatPrice(product.price)}</strong>
          <Link href={`/books/${product.slug}`}>Смотреть →</Link>
        </div>
      </div>
    </article>
  );
}
