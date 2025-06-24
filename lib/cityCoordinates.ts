export const cityCoordinates: Record<string, [number, number]> = {
  // Japan cities
  tokyo: [35.6895, 139.6917],
  kyoto: [35.0116, 135.7681],
  osaka: [34.6937, 135.5023],
  sapporo: [43.0618, 141.3545],
  fuji: [35.3606, 138.7274],
  "mount fuji": [35.3606, 138.7274],
  yokohama: [35.4437, 139.638],
  nagoya: [35.1815, 136.9066],
  kobe: [34.6901, 135.1955],
  fukuoka: [33.5902, 130.4017],
  hiroshima: [34.3853, 132.4553],
  nara: [34.6851, 135.8048],
  kanazawa: [36.5613, 136.6562],
  sendai: [38.2688, 140.8721],
  nagasaki: [32.7503, 129.8777],

  // International cities (for future expansion)
  paris: [48.8566, 2.3522],
  london: [51.5074, -0.1278],
  newyork: [40.7128, -74.006],
  "new york": [40.7128, -74.006],
  rome: [41.9028, 12.4964],
  barcelona: [41.3851, 2.1734],
  amsterdam: [52.3676, 4.9041],
  berlin: [52.52, 13.405],
  prague: [50.0755, 14.4378],
  vienna: [48.2082, 16.3738],
  budapest: [47.4979, 19.0402],
  istanbul: [41.0082, 28.9784],
  dubai: [25.2048, 55.2708],
  singapore: [1.3521, 103.8198],
  bangkok: [13.7563, 100.5018],
  hanoi: [21.0285, 105.8542],
  "ho chi minh city": [10.8231, 106.6297],
  seoul: [37.5665, 126.978],
  beijing: [39.9042, 116.4074],
  shanghai: [31.2304, 121.4737],
  hongkong: [22.3193, 114.1694],
  "hong kong": [22.3193, 114.1694],
  taipei: [25.033, 121.5654],
  sydney: [-33.8688, 151.2093],
  melbourne: [-37.8136, 144.9631],
  auckland: [-36.8485, 174.7633],
  vancouver: [49.2827, -123.1207],
  toronto: [43.6532, -79.3832],
  montreal: [45.5017, -73.5673],
  sanfrancisco: [37.7749, -122.4194],
  "san francisco": [37.7749, -122.4194],
  losangeles: [34.0522, -118.2437],
  "los angeles": [34.0522, -118.2437],
  chicago: [41.8781, -87.6298],
  miami: [25.7617, -80.1918],
  orlando: [28.5383, -81.3792],
  lasvegas: [36.1699, -115.1398],
  "las vegas": [36.1699, -115.1398],
  seattle: [47.6062, -122.3321],
  portland: [45.5152, -122.6784],
  denver: [39.7392, -104.9903],
  austin: [30.2672, -97.7431],
  nashville: [36.1627, -86.7816],
  neworleans: [29.9511, -90.0715],
  "new orleans": [29.9511, -90.0715],
  atlanta: [33.749, -84.388],
  philadelphia: [39.9526, -75.1652],
  boston: [42.3601, -71.0589],
  washington: [38.9072, -77.0369],
  "washington dc": [38.9072, -77.0369],
  "washington d.c.": [38.9072, -77.0369],

  // Default fallback coordinates (Tokyo)
  default: [35.6895, 139.6917],
};

export const getCityCoordinates = (cityId: string): [number, number] => {
  const normalizedCityId = cityId.toLowerCase().trim();

  // Direct match
  if (cityCoordinates[normalizedCityId]) {
    return cityCoordinates[normalizedCityId];
  }

  // Try to match with common variations
  const variations = [
    normalizedCityId.replace(/\s+/g, ""), // Remove spaces
    normalizedCityId.replace(/[^a-z]/g, ""), // Remove non-letters
    normalizedCityId.replace(/\s+/g, "").replace(/[^a-z]/g, ""), // Both
  ];

  for (const variation of variations) {
    if (cityCoordinates[variation]) {
      return cityCoordinates[variation];
    }
  }

  // Return default if no match found
  return cityCoordinates.default;
};
