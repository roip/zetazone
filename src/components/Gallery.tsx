"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export interface GalleryItem {
  src: string;
  alt: string;
  caption?: string;
}

interface GalleryProps {
  items: GalleryItem[];
  columns?: 2 | 3 | 4;
}

const colsClass = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
} as const;

const SWIPE_THRESHOLD = 50;

export default function Gallery({ items, columns = 3 }: GalleryProps) {
  const [open, setOpen] = useState<number | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((i) => (i !== null && i > 0 ? i - 1 : items.length - 1)),
    [items.length],
  );
  const next = useCallback(
    () => setOpen((i) => (i !== null && i < items.length - 1 ? i + 1 : 0)),
    [items.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, prev, next]);

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    touchStart.current = null;

    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dy) > Math.abs(dx)) return;
    if (dx < 0) next();
    else prev();
  };

  if (items.length === 0) {
    return <p className="text-sand/50 italic">No images yet.</p>;
  }

  return (
    <>
      {/* ── Grid ── */}
      <div className={`grid gap-3 ${colsClass[columns]}`}>
        {items.map((item, i) => (
          <button
            key={item.src}
            onClick={() => setOpen(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span
              className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 text-left text-sm text-playa transition-opacity ${
                item.caption
                  ? "sm:opacity-0 sm:group-hover:opacity-100"
                  : "opacity-0"
              }`}
            >
              {item.caption}
            </span>
          </button>
        ))}
      </div>

      {/* ── Lightbox ── */}
      {open !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-night/60 text-2xl text-sand/80 transition-colors hover:text-ember sm:right-4 sm:top-4 sm:h-auto sm:w-auto sm:bg-transparent sm:text-3xl"
            aria-label="Close"
          >
            &times;
          </button>

          {/* Prev — hidden on mobile (swipe instead) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-night/60 p-3 text-2xl text-sand/70 transition-colors hover:text-ember sm:flex"
            aria-label="Previous image"
          >
            &#8249;
          </button>

          {/* Image + caption */}
          <div
            className="relative flex max-h-[90vh] w-full max-w-[95vw] flex-col items-center px-2 sm:max-h-[85vh] sm:max-w-[90vw] sm:px-0"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={items[open].src}
              alt={items[open].alt}
              width={1200}
              height={800}
              className="max-h-[75vh] w-auto rounded-lg object-contain sm:max-h-[80vh]"
              priority
            />
            {items[open].caption && (
              <p className="mt-3 text-center text-sm text-sand/70">
                {items[open].caption}
              </p>
            )}
            <p className="mt-1 text-center text-xs text-sand/30">
              {open + 1} / {items.length}
              <span className="ml-2 sm:hidden">swipe to navigate</span>
            </p>
          </div>

          {/* Next — hidden on mobile (swipe instead) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-night/60 p-3 text-2xl text-sand/70 transition-colors hover:text-ember sm:flex"
            aria-label="Next image"
          >
            &#8250;
          </button>
        </div>
      )}
    </>
  );
}
