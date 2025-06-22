import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
});

export async function fetchCityImages(cityNames: string[]) {
  const cityImageMap: Record<string, string> = {};

  // Add delay between requests to respect rate limits
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  for (const city of cityNames) {
    try {
      // Add a small delay between requests to avoid rate limiting
      if (Object.keys(cityImageMap).length > 0) {
        await delay(100);
      }

      console.log("Fetching image for", city);

      const res = await unsplash.search.getPhotos({
        query: `${city} city landscape`,
        perPage: 1,
        orientation: "landscape",
      });

      const image = res?.response?.results?.[0]?.urls?.regular;
      cityImageMap[city] = image ?? "/tokyo-skytree.jpg";
    } catch (err) {
      console.error(`Failed to fetch Unsplash image for ${city}`, err);
      cityImageMap[city] = "/tokyo-skytree.jpg";
    }
  }

  return cityImageMap;
}

// Debounced version to stay within rate limits
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Cache results in localStorage
export function getCachedCityImages(): Record<string, string> {
  if (typeof window === "undefined") return {};

  try {
    const cached = localStorage.getItem("cityImages");
    return cached ? JSON.parse(cached) : {};
  } catch (err) {
    console.error("Failed to get cached city images:", err);
    return {};
  }
}

export function setCachedCityImages(cityImageMap: Record<string, string>) {
  if (typeof window === "undefined") return;
  console.log("Setting cached city images", cityImageMap);

  try {
    localStorage.setItem("cityImages", JSON.stringify(cityImageMap));
  } catch (err) {
    console.error("Failed to cache city images:", err);
  }
}

export function clearCachedCityImages() {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem("cityImages");
  } catch (err) {
    console.error("Failed to clear cached city images:", err);
  }
}

// Check if Unsplash API key is configured
export function isUnsplashConfigured(): boolean {
  return !!process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
}
