"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CityCardProps {
  id: string;
  name: string;
  imageUrl: string;
  placesSaved: number;
  isLoading?: boolean;
}

export function CityCard({
  id,
  name,
  imageUrl,
  placesSaved,
  isLoading = false,
}: CityCardProps) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const finalImageUrl = imageError ? "/tokyo-skytree.jpg" : imageUrl;

  return (
    <div
      className="w-[231px] h-[319px] rounded-3xl bg-cover bg-center flex pressable shadow-[0px_4px_33px_0px_rgba(200,82,255,0.25)] border-5 border-white/10 bg-no-repeat relative overflow-hidden"
      onClick={() => router.push(`/city/${id}`)}
    >
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      ) : (
        <img
          src={imageUrl}
          alt=""
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: "absolute",
            minHeight: "100%",
          }}
          onError={handleImageError}
        />
      )}
      <div
        className="absolute left-0 top-0 right-0 bottom-0 z-10"
        style={{
          background:
            "linear-gradient(333deg, rgba(0, 0, 0, 0.00) 44.12%, rgba(0, 0, 0, 0.70) 94.56%)",
        }}
      >
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
      {/* Hidden image element to detect loading errors */}
      <img
        src={imageUrl}
        alt=""
        style={{ display: "none" }}
        onError={handleImageError}
      />
    </div>
  );
}
