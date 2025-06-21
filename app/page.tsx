<<<<<<< HEAD
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
=======
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
>>>>>>> parent of 8e8c2ed (feat: added template structure fo the login and why us page)
    </div>
  );
}
