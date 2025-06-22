"use client";

import { useState } from "react";

const categories = [
  "Near You",
  "Restaurants",
  "Attractions",
  "Stay",
  "Shopping",
  "Nature & Parks",
  "Hidden Gems",
  "Nightlife",
];

interface FilterChipsProps {
  onFilterChange: (selectedCategories: string[]) => void;
}

export function FilterChips({ onFilterChange }: FilterChipsProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    const newSelected = selected.includes(category)
      ? selected.filter((c) => c !== category)
      : [...selected, category];
    setSelected(newSelected);
    onFilterChange(newSelected);
  };

  return (
    <div className="-mx-4 min-h-[32px] px-4 relative after:content-[''] after:absolute after:top-[32px] after:left-0 after:right-0 after:h-6 after:bg-gradient-to-b after:from-[#150029] after:to-transparent">
      <div
        className="flex gap-2 overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={`p-2 pt-1.5 rounded-full whitespace-nowrap transition-colors pressable font-[halyard-text] font-medium text-[14px] leading-[16px] tracking-[0] ${
              selected.includes(category)
                ? "bg-white text-black"
                : "bg-white/10 text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
