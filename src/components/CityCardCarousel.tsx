"use client";

import { useState, useEffect } from "react";
import { CityCard } from "./CityCard";
import {
  fetchCityImages,
  getCachedCityImages,
  setCachedCityImages,
  isUnsplashConfigured,
} from "@/lib/unsplash";
import { getCities, getPois } from "@/lib/api";

export const CityCardCarousel = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityImageMap, setCityImageMap] = useState<Record<string, string>>({});
  const [cityPOICounts, setCityPOICounts] = useState<Record<string, number>>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCitiesAndImages = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch cities from API
        const citiesData = await getCities();
        setCities(citiesData);

        if (citiesData.length === 0) {
          setIsLoading(false);
          return;
        }

        // Fetch POIs to get counts for each city
        try {
          const poisResponse = await getPois();
          const poiCounts: Record<string, number> = {};

          // Count POIs for each city
          citiesData.forEach((city) => {
            const cityPOIs = poisResponse.pois.filter(
              (poi) => poi.city.toLowerCase() === city.toLowerCase()
            );
            poiCounts[city] = cityPOIs.length;
          });

          setCityPOICounts(poiCounts);
        } catch (poiError) {
          console.error("Failed to fetch POIs for city counts:", poiError);
          // Set default counts of 0 if POI fetch fails
          const defaultCounts = citiesData.reduce(
            (acc, city) => {
              acc[city] = 0;
              return acc;
            },
            {} as Record<string, number>
          );
          setCityPOICounts(defaultCounts);
        }

        // Get city names for image fetching
        const cityNames = citiesData.map((city) => city);

        // First, try to get cached images
        const cachedImages = getCachedCityImages();

        // Check if we have all cities cached
        const allCached = cityNames.every((city) => cachedImages[city]);

        if (allCached) {
          setCityImageMap(cachedImages);
          setIsLoading(false);
          return;
        }

        // If Unsplash is not configured, use default images from API
        if (!isUnsplashConfigured()) {
          console.warn(
            "Unsplash API key not configured. Using default images from API."
          );
          const defaultImages = citiesData.reduce(
            (acc, city) => {
              acc[city] = city;
              return acc;
            },
            {} as Record<string, string>
          );

          setCityImageMap(defaultImages);
          setIsLoading(false);
          return;
        }

        // If not all cached, fetch missing ones from Unsplash
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
              : citiesData.reduce(
                  (acc, city) => {
                    acc[city] = city;
                    return acc;
                  },
                  {} as Record<string, string>
                );

          setCityImageMap(fallbackImages);
        }
      } catch (error) {
        console.error("Failed to load cities:", error);
        setError("Failed to load cities");
      } finally {
        setIsLoading(false);
      }
    };

    loadCitiesAndImages();
  }, []);

  if (error) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-white/60">
          Failed to load cities. Please try again later.
        </p>
      </div>
    );
  }

  if (cities.length === 0 && !isLoading) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-white/60">No cities found.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        className="flex gap-6 overflow-x-auto overflow-y-visible pb-6 -mx-4 px-24 -mt-10 pt-5"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {cities.map((city) => (
          <div key={city} className="flex-shrink-0">
            <CityCard
              key={city}
              id={city}
              name={city}
              imageUrl={cityImageMap[city]}
              placesSaved={cityPOICounts[city] || 0}
              isLoading={isLoading}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
