"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductImage } from "@/components/ui/ProductImage";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [[index, direction], setPage] = useState<[number, number]>([0, 0]);
  const hasMany = images.length > 1;

  const paginate = (dir: number) =>
    setPage(([current]) => [(current + dir + images.length) % images.length, dir]);

  const goTo = (next: number) =>
    setPage(([current]) => [next, next > current ? 1 : -1]);

  return (
    <div
      className="flex flex-col gap-3"
      tabIndex={0}
      onKeyDown={(e) => {
        if (!hasMany) return;
        if (e.key === "ArrowLeft") paginate(-1);
        if (e.key === "ArrowRight") paginate(1);
      }}
      aria-label={`${title} image gallery`}
    >
      <div className="group relative aspect-square overflow-hidden rounded-xl bg-brand-soft">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeOut" }}
            drag={hasMany ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) paginate(1);
              else if (info.offset.x > 60) paginate(-1);
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <ProductImage
              src={images[index]}
              alt={`${title}, image ${index + 1} of ${images.length}`}
              fill
              priority={index === 0}
              sizes="(min-width: 1024px) 520px, 100vw"
              draggable={false}
              className="select-none object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {hasMany && (
          <>
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-ink opacity-100 shadow-card transition-all hover:bg-white sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-ink opacity-100 shadow-card transition-all hover:bg-white sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full bg-white shadow transition-all duration-300",
                    i === index ? "w-5" : "w-1.5 opacity-70"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {hasMany && (
        <div className="flex gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "relative h-16 w-16 overflow-hidden rounded-lg bg-brand-soft ring-2 ring-offset-2 transition-all duration-200 sm:h-20 sm:w-20",
                i === index
                  ? "ring-brand"
                  : "opacity-70 ring-transparent hover:opacity-100"
              )}
            >
              <ProductImage
                src={src}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
