"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { mockCityData } from "@/lib/mockCityData";
import { mockCityPOIs } from "@/lib/mockCityPOIs";
import { POICard } from "@/src/components/POICard";
import { FilterChips } from "@/src/components/FilterChips";
import { AddPOISheet } from "@/src/components/AddPOISheet";
import { ArrowLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

// Define an interface for POI to be used across components
interface POI {
  id: string;
  name: string;
  category: string;
  coordinates: { lat: number; lng: number };
  imageUrl: string;
  price?: number;
  discountPercent?: number;
  tgid?: string;
}

export default function CityPage() {
  const router = useRouter();
  const params = useParams();
  const cityId = params.cityId as keyof typeof mockCityPOIs;

  const [cityData, setCityData] = useState<any>(null);
  const [pois, setPois] = useState<POI[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const currentCityData = mockCityData.find((c) => c.id === cityId);
    const cityPois = (mockCityPOIs[cityId] || []) as POI[];

    if (currentCityData) {
      setCityData(currentCityData);
    }
    if (cityPois) {
      setPois(cityPois);
    }
  }, [cityId]);

  const filteredPOIs = useMemo(() => {
    if (selectedCategories.length === 0) {
      return pois;
    }
    return pois.filter((poi) => selectedCategories.includes(poi.category));
  }, [pois, selectedCategories]);

  const handlePinClick = (poiId: string) => {
    const element = document.getElementById(`poi-${poiId}`);
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  if (!cityData) {
    return <div>City not found</div>;
  }

  return (
    <div className="bg-gradient-to-b from-[#1a0b2e] to-[#0d001a] min-h-screen text-white font-sans">
      <div className="relative h-[40vh]">
        <Image
          src="/map-placeholder.png"
          alt="Map"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-4 z-10 bg-black/50 p-2 rounded-full"
        >
          <ArrowLeft size={24} />
        </button>
        {/* Mock Pins */}
        {pois.map((poi) => (
          <div
            key={poi.id}
            className="absolute z-10 p-1 bg-purple-600 rounded-full cursor-pointer"
            style={{
              // These are just random positions for demonstration
              top: `${(poi.coordinates.lat % 1) * 80 + 10}%`,
              left: `${(poi.coordinates.lng % 1) * 80 + 10}%`,
            }}
            onClick={() => handlePinClick(poi.id)}
          >
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        ))}
      </div>

      <div className="p-4 -mt-8 relative z-10 bg-[#1a0b2e] rounded-t-2xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Your trip to {cityData.name}</h1>
          <button className="bg-white text-black font-semibold text-sm px-4 py-2 rounded-lg">
            Generate trip
          </button>
        </div>

        <FilterChips onFilterChange={setSelectedCategories} />

        <div className="my-6">
          <button
            onClick={() => setSheetOpen(true)}
            className="w-full bg-white/10 p-4 rounded-lg flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Add a place of interest
          </button>
        </div>

        <div className="space-y-4">
          {filteredPOIs.map((poi) => (
            <POICard key={poi.id} poi={poi} />
          ))}
        </div>
      </div>
      <AddPOISheet open={isSheetOpen} onOpenChange={setSheetOpen} />
    </div>
  );
}
