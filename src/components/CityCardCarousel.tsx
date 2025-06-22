"use client";

import { CityCard } from "./CityCard";

// Mock data for the carousel
const cityData = [
  {
    id: "1",
    name: "Tokyo",
    imageUrl: "/tokyo.jpg",
    placesSaved: 12,
  },
  {
    id: "2",
    name: "Paris",
    imageUrl: "/paris.jpg",
    placesSaved: 8,
  },
  {
    id: "3",
    name: "New York",
    imageUrl: "/nyc.jpg",
    placesSaved: 15,
  },
  {
    id: "4",
    name: "London",
    imageUrl: "/london.jpg",
    placesSaved: 10,
  },
  {
    id: "5",
    name: "Dubai",
    imageUrl: "/dubai.jpg",
    placesSaved: 6,
  },
  {
    id: "6",
    name: "Singapore",
    imageUrl: "/singapore.jpg",
    placesSaved: 9,
  },
];

export const CityCardCarousel = () => {
  return (
    <div className="w-full">
      <div
        className="flex gap-6 overflow-x-auto overflow-y-visible pb-6 -mx-4 px-24 -mt-10 pt-5"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {cityData.map((city) => (
          <div key={city.id} className="flex-shrink-0">
            <CityCard
              key={city.name + city.id}
              id={city.name}
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
