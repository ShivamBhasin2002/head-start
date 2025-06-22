"use client";

import { mockCityData } from "@/lib/mockCityData";
import { CityCard } from "./CityCard";

export const CityCardCarousel = () => {
  return (
    <div className="w-full">
      <div
        className="flex gap-6 overflow-x-auto overflow-y-visible pb-6 -mx-4 px-24 -mt-10 pt-5"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {mockCityData.map((city) => (
          <div key={city.id} className="flex-shrink-0">
            <CityCard
              key={city.name + city.id}
              id={city.id}
              name={city.name}
              imageUrl={city.imageUrl}
              placesSaved={city.placesSaved}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
