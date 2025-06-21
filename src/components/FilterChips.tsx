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
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => toggleCategory(category)}
          className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition-colors ${
            selected.includes(category)
              ? "bg-white text-black font-semibold"
              : "bg-white/10 text-white"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
