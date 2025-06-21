"use client";

import { Logo } from "@/src/svgs/Logo";
import { BackgroundDetailing } from "@/src/svgs/BackgroundDetailing";
import { CityCard } from "@/src/components/CityCard";
import { mockCityData } from "@/lib/mockCityData";
import { ShareLinkInput } from "@/src/components/ShareLinkInput";
import { ArrowRight } from "lucide-react";

export default function HeadstartPage() {
  return (
    <div className="bg-gradient-to-b from-[#1a0b2e] to-[#0d001a] min-h-screen text-white font-sans overflow-hidden relative p-4">
      <BackgroundDetailing className="absolute top-0 left-0 w-full" />

      <div className="relative z-10">
        <div className="text-center my-8">
          <Logo width={120} className="mx-auto" />
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
          {mockCityData.map((city) => (
            <CityCard key={city.id} {...city} />
          ))}
        </div>

        <div className="my-8">
          <h2 className="text-2xl font-semibold mb-4">
            Have another inspiration?
          </h2>
          <ShareLinkInput />
        </div>

        <button className="w-full bg-white/5 border border-white/10 rounded-full p-4 text-left flex justify-between items-center">
          <span>View all your uploaded links</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
