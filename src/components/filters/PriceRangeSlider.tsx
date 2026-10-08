"use client";

import { useEffect, useRef, useState } from "react";
import { PRICE_MAX, PRICE_MIN } from "@/lib/constants";
import type { PriceRange } from "@/lib/filterParams";
import { useDebounce } from "@/hooks/useDebounce";
import { useUrlFilters } from "@/hooks/useUrlFilters";

const STEP = 10;
const key = (r: PriceRange) => `${r[0]}-${r[1]}`;

export function PriceRangeSlider() {
  const { priceRange, setPriceRange } = useUrlFilters();

  // local draft keeps dragging smooth, the URL is updated after a short pause
  const [draft, setDraft] = useState<PriceRange>(priceRange);
  const committed = useRef(key(priceRange));
  const debounced = useDebounce(draft, 250);

  useEffect(() => {
    if (key(priceRange) !== committed.current) {
      committed.current = key(priceRange);
      setDraft(priceRange);
    }
  }, [priceRange]);

  useEffect(() => {
    if (key(debounced) !== committed.current && key(debounced) === key(draft)) {
      committed.current = key(debounced);
      setPriceRange(debounced);
    }
  }, [debounced, draft, setPriceRange]);

  const [min, max] = draft;
  const span = PRICE_MAX - PRICE_MIN;
  const left = ((min - PRICE_MIN) / span) * 100;
  const right = ((max - PRICE_MIN) / span) * 100;

  return (
    <div>
      <h3 className="text-xl font-medium text-white">Price</h3>

      <div className="dual-range relative mt-4 h-5">
        <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/35" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-white"
          style={{ left: `${left}%`, right: `${100 - right}%` }}
        />
        <input
          type="range"
          aria-label="Minimum price"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={STEP}
          value={min}
          onChange={(e) =>
            setDraft([Math.min(Number(e.target.value), max - STEP), max])
          }
          style={{ zIndex: min > PRICE_MAX - 100 ? 5 : 3 }}
        />
        <input
          type="range"
          aria-label="Maximum price"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={STEP}
          value={max}
          onChange={(e) =>
            setDraft([min, Math.max(Number(e.target.value), min + STEP)])
          }
          style={{ zIndex: 4 }}
        />
      </div>

      <div className="mt-2 flex justify-between text-[15px] text-white">
        <span>${min}</span>
        <span>${max}</span>
      </div>
    </div>
  );
}
