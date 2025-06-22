"use client";

import { useState, useEffect } from "react";
import { mockCityData } from "@/lib/mockCityData";
import { CityCard } from "./CityCard";
import {
  fetchCityImages,
  getCachedCityImages,
  setCachedCityImages,
  isUnsplashConfigured,
} from "@/lib/unsplash";

export const CityCardCarousel = () => {
  const [cityImageMap, setCityImageMap] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCityImages = async () => {
      // First, try to get cached images
      const cachedImages = getCachedCityImages();
      const cityNames = mockCityData.map((city) => city.name);

      // Check if we have all cities cached
      const allCached = cityNames.every((city) => cachedImages[city]);

      if (allCached) {
        setCityImageMap(cachedImages);
        setIsLoading(false);
        return;
      }

      // If Unsplash is not configured, use default images
      if (!isUnsplashConfigured()) {
        console.warn("Unsplash API key not configured. Using default images.");
        const defaultImages = mockCityData.reduce(
          (acc, city) => {
            acc[city.name] = city.imageUrl;
            return acc;
          },
          {} as Record<string, string>
        );

        setCityImageMap(defaultImages);
        setIsLoading(false);
        return;
      }

      // If not all cached, fetch missing ones
      try {
        const newImages = await fetchCityImages(cityNames);

        // Merge with cached images
        const mergedImages = { ...cachedImages, ...newImages };

        setCityImageMap(mergedImages);
        setCachedCityImages(mergedImages);
      } catch (error) {
        console.error("Failed to fetch city images:", error);
        // Use cached images as fallback, or default images if no cache
        const fallbackImages =
          Object.keys(cachedImages).length > 0
            ? cachedImages
            : mockCityData.reduce(
                (acc, city) => {
                  acc[city.name] = city.imageUrl;
                  return acc;
                },
                {} as Record<string, string>
              );

        setCityImageMap(fallbackImages);
      } finally {
        setIsLoading(false);
      }
    };

    loadCityImages();
  }, []);

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
              imageUrl={cityImageMap[city.name] || city.imageUrl}
              placesSaved={city.placesSaved}
              isLoading={isLoading}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
