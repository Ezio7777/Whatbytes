"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { ImageOff } from "lucide-react";

/** next/image with a clean fallback so a broken link never shows an empty box */
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

  return <Image alt={alt} onError={() => setFailed(true)} {...props} />;
}
