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
      className="w-[231px] h-[319px] rounded-3xl bg-cover bg-center flex pressable shadow-[0px_4px_33px_0px_#C852FF40] border-[5px] border-[#FFFFFF10] bg-gradient-to-br from-transparent to-black/70 relative"
      style={{ backgroundImage: `url(${imageUrl})` }}
      onClick={() => router.push(`/city/${id}`)}
    >
      <div className="relative z-10">
        <h3 className="absolute left-[18px] top-[21px] font-[halyard-text] font-semibold text-[18px] leading-[24px] tracking-[0] whitespace-nowrap">
          Your trip to
        </h3>
        <h2 className="absolute left-[18px] top-[44px] font-[halyard-display] font-medium text-[24px] leading-[44px] tracking-[4px] whitespace-nowrap">
          {name}
        </h2>
        <div className="bg-black/25 p-[10px] rounded-xl absolute bottom-[18px] left-[18px] whitespace-nowrap font-[halyard-text] font-medium text-[15px] leading-[20px] tracking-[0]">
          {placesSaved} places saved
        </div>
      </div>
    </div>
  );
}
