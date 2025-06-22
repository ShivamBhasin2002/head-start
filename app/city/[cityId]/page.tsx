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
import { Drawer } from "vaul";

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

  const [snap, setSnap] = useState<number | string | null>("60dvh");

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
    setSnap("40vh"); // Snap to half-open when a pin is clicked
    const element = document.getElementById(`poi-${poiId}`);
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  if (!cityData) {
    return <div>City not found</div>;
  }

  return (
    <div className="bg-gradient-to-b from-[#1a0b2e] to-[#0d001a] min-h-screen text-white font-sans">
      <Drawer.Root
        snapPoints={["150px", "60dvh", "85vh"]}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
        open
        modal={false}
      >
        <Drawer.Content className="!bg-transparent outline-none">
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-400 mb-2" />
          <div className="p-4 bg-gradient-to-b from-[#1a0b2e] to-[#0d001a] rounded-t-2xl flex-grow flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">
                Your trip to {cityData.name}
              </h1>
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
            <div className="space-y-4 overflow-y-auto">
              {filteredPOIs.map((poi) => (
                <POICard key={poi.id} poi={poi} />
              ))}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Root>
      <AddPOISheet open={isSheetOpen} onOpenChange={setSheetOpen} />
    </div>
  );
}
