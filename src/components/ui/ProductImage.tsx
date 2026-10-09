"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { ImageOff } from "lucide-react";

/**
 * next/image with a pulse placeholder behind it while loading and a clean
 * fallback if the link is broken. Parent must be position: relative.
 */
export function ProductImage({ alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="absolute inset-0 flex items-center justify-center bg-brand-soft text-brand/40"
      >
        <ImageOff className="h-10 w-10" aria-hidden />
      </div>
    );
  }

  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 animate-pulse bg-brand/10"
      />
      <Image alt={alt} onError={() => setFailed(true)} {...props} />
    </>
  );
}
