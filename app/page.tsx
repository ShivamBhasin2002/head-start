"use client";

import {
  ChevronDown,
  ChevronLeft,
  Send,
  MessageSquare,
  User,
} from "lucide-react";
import { Logo } from "@/src/svgs/Logo";
import { BackgroundDetailing } from "@/src/svgs/BackgroundDetailing";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { SearchSheet } from "@/src/components/SearchSheet";

const tripInspirations = {
  Worldwide: [
    {
      city: "Tokyo",
      image: "/tokyo.jpg",
      user: "martiitram",
      plan: "Plan you trip to Dubai for 5 days",
    },
    {
      city: "Mount Fuji",
      image: "/fuji.jpg",
      user: "martiitram",
      plan: "Plan you trip to Dubai for 5 days",
    },
    {
      city: "Kyoto",
      image: "/kyoto.jpg",
      user: "martiitram",
      plan: "Plan you trip to Dubai for 5 days",
    },
  ],
  Japan: [
    {
      city: "Tokyo",
      image: "/tokyo.jpg",
      user: "martiitram",
      plan: "Plan you trip to Dubai for 5 days",
    },
    {
      city: "Mount Fuji",
      image: "/fuji.jpg",
      user: "martiitram",
      plan: "Plan you trip to Dubai for 5 days",
    },
    {
      city: "Kyoto",
      image: "/kyoto.jpg",
      user: "martiitram",
      plan: "Plan you trip to Dubai for 5 days",
    },
  ],
};

export default function HomePage() {
  const [selectedTrip, setSelectedTrip] = useState<"Worldwide" | "Japan">(
    "Worldwide"
  );
  const [isSearchSheetOpen, setIsSearchSheetOpen] = useState(false);

  return (
    <div className="bg-gradient-to-b from-[#1a0b2e] to-[#0d001a] min-h-screen text-white font-sans overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4"
      >
        <div className="text-center">
          <Logo width={120} className="mx-auto" />
          <h2 className="text-2xl font-semibold mt-6">Have an inspiration?</h2>
        </div>

        <div className="mt-6 relative">
          <input
            type="text"
            placeholder="Share your link with us"
            className="w-full bg-white/5 border border-white/10 rounded-full p-4 pl-6 pr-12 text-sm focus:outline-none"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 w-9 h-9 rounded-full flex items-center justify-center">
            <Send size={16} />
          </button>
        </div>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-grow h-px bg-white/10"></div>
          <span className="text-xs text-white/50">OR</span>
          <div className="flex-grow h-px bg-white/10"></div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="bg-green-500/20 p-2 rounded-full">
              <MessageSquare size={20} className="text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold">Simply use our WhatsApp bot</h3>
              <p className="text-sm text-white/60 mt-1">
                Found an amazing instagram reel or a brag worthy blog? Simply
                share the link with our bot and we'll do all the work for you!
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            Get inspiration for{" "}
            <button
              className="flex items-center gap-1 text-purple-400 underline"
              onClick={() => setIsSearchSheetOpen(true)}
            >
              {selectedTrip} trips <ChevronDown size={18} />
            </button>
          </h2>
        </div>

        <div className="flex gap-4 overflow-x-auto mt-4 pb-4">
          {tripInspirations[selectedTrip].map((trip, i) => (
            <div key={i} className="min-w-[180px]">
              <Image
                src={trip.image}
                alt={trip.city}
                width={180}
                height={220}
                className="rounded-lg object-cover"
              />
              <div className="mt-2">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-5 h-5 rounded-full bg-white/20"></div>
                  <span>{trip.user}</span>
                </div>
                <p className="text-sm mt-1">{trip.plan}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      <SearchSheet
        open={isSearchSheetOpen}
        onOpenChange={setIsSearchSheetOpen}
      />
    </div>
  );
}
