"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { books } from "@/data/products";

type CartLine = {
  slug: string;
  quantity: number;
};

type CommerceContextValue = {
  ready: boolean;
  cart: CartLine[];
  favorites: string[];
  cartCount: number;
  favoriteCount: number;
  cartTotal: number;
  addToCart: (slug: string, quantity?: number) => void;
  removeFromCart: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
};

const CART_KEY = "rodkod_cart_v2";
const FAVORITES_KEY = "rodkod_favorites_v2";

const CommerceContext = createContext<CommerceContextValue | null>(null);

function parseStored<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function CommerceProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setCart(parseStored<CartLine[]>(CART_KEY, []));
      setFavorites(parseStored<string[]>(FAVORITES_KEY, []));
      setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, ready]);

  useEffect(() => {
    if (ready) {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  }, [favorites, ready]);

  const value = useMemo<CommerceContextValue>(() => {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => {
      const product = books.find((book) => book.slug === item.slug);
      return total + (product?.price ?? 0) * item.quantity;
    }, 0);

    return {
      ready,
      cart,
      favorites,
      cartCount,
      favoriteCount: favorites.length,
      cartTotal,
      addToCart(slug, quantity = 1) {
        setCart((items) => {
          const current = items.find((item) => item.slug === slug);
          if (current) {
            return items.map((item) =>
              item.slug === slug
                ? { ...item, quantity: Math.min(99, item.quantity + quantity) }
                : item,
            );
          }
          return [...items, { slug, quantity: Math.max(1, quantity) }];
        });
      },
      removeFromCart(slug) {
        setCart((items) => items.filter((item) => item.slug !== slug));
      },
      setQuantity(slug, quantity) {
        if (quantity <= 0) {
          setCart((items) => items.filter((item) => item.slug !== slug));
          return;
        }
        setCart((items) =>
          items.map((item) =>
            item.slug === slug
              ? { ...item, quantity: Math.min(99, quantity) }
              : item,
          ),
        );
      },
      toggleFavorite(slug) {
        setFavorites((items) =>
          items.includes(slug)
            ? items.filter((item) => item !== slug)
            : [...items, slug],
        );
      },
      isFavorite(slug) {
        return favorites.includes(slug);
      },
    };
  }, [cart, favorites, ready]);

  return (
    <CommerceContext.Provider value={value}>
      {children}
    </CommerceContext.Provider>
  );
}

export function useCommerce() {
  const value = useContext(CommerceContext);
  if (!value) {
    throw new Error("useCommerce must be used inside CommerceProvider");
  }
  return value;
}
