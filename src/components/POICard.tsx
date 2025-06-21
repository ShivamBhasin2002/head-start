"use client";

import Image from "next/image";
import { Pin } from "lucide-react";

interface POICardProps {
  poi: {
    id: string;
    name: string;
    category: string;
    imageUrl: string;
    price?: number;
    discountPercent?: number;
    tgid?: string;
  };
}

export function POICard({ poi }: POICardProps) {
  return (
    <div
      id={`poi-${poi.id}`}
      className="bg-[#2c1e4a] rounded-2xl p-3 flex gap-3"
    >
      <Image
        src={poi.imageUrl}
        alt={poi.name}
        width={100}
        height={100}
        className="rounded-lg object-cover w-[100px] h-[100px]"
      />
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg">{poi.name}</h3>
          <div className="text-xs text-white/60 flex gap-2">
            <span>View source</span>
            <span>·</span>
            <span>Remove place</span>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div>
            {poi.price && (
              <p className="text-sm">
                from <span className="font-bold text-base">${poi.price}</span>
                {poi.discountPercent && (
                  <span className="ml-2 bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded-md">
                    {poi.discountPercent}% off
                  </span>
                )}
              </p>
            )}
          </div>
          {poi.tgid && (
            <button className="bg-white text-black text-sm font-bold px-4 py-2 rounded-lg">
              Book on Headout
            </button>
          )}
          {!poi.tgid && (
            <button className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-full">
              <Pin size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
