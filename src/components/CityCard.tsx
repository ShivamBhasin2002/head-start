"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface CityCardProps {
  id: string;
  name: string;
  imageUrl: string;
  placesSaved: number;
}

export function CityCard({ id, name, imageUrl, placesSaved }: CityCardProps) {
  const router = useRouter();

  return (
    <div
      className="min-w-[200px] h-[280px] rounded-2xl bg-cover bg-center p-4 flex flex-col justify-end text-white relative cursor-pointer group"
      style={{ backgroundImage: `url(${imageUrl})` }}
      onClick={() => router.push(`/city/${id}`)}
    >
      <div className="absolute inset-0 bg-black/30 rounded-2xl group-hover:bg-black/50 transition-colors"></div>
      <div className="relative z-10">
        <h3 className="text-xl font-bold">Your trip to</h3>
        <h2 className="text-4xl font-bold">{name}</h2>
        <div className="mt-4 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 text-sm self-start">
          {placesSaved} places saved
        </div>
      </div>
    </div>
  );
}
