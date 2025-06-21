"use client";

import { motion, Variants } from "framer-motion";
import { Logo } from "@/src/svgs/Logo";
import { Arrow } from "@/src/svgs/Arrow";
import { MapPin, Backpack, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { BackgroundDetailing } from "@/src/svgs/BackgroundDetailing";
import { SignInSheet } from "@/src/components/SignInSheet";

export default function LoginPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="bg-gradient-to-b from-[#1a0b2e] to-[#0d001a] min-h-screen text-white font-sans flex flex-col items-center p-4 overflow-hidden relative">
        <BackgroundDetailing className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-sm" />
        <motion.div
          className="flex flex-col items-center text-center w-full max-w-sm h-[90dvh]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="my-auto flex flex-col items-center gap-10">
            <motion.div variants={itemVariants}>
              <Logo width={200} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                className="border border-white/20 rounded-full px-8 py-3 text-lg font-light bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                onClick={() => setIsSheetOpen(true)}
              >
                Log in to get started
              </button>
            </motion.div>
          </div>

          <motion.div
            className="flex flex-col items-center gap-6 w-full"
            variants={itemVariants}
          >
            <div className="text-center">
              <p className="text-lg text-white/80">So...</p>
              <p className="text-2xl font-medium">Why Us?</p>
            </div>
            <Arrow />
          </motion.div>
        </motion.div>

        <motion.div
          className="space-y-6 w-full max-w-sm text-center mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            variants={itemVariants}
            className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm"
          >
            <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
              <MapPin size={20} /> One tool. Every trip
            </h3>
            <p className="text-white/60 text-sm">
              From saving must-see spots to building flexible daily routes, our
              bookmarking + itinerary builder helps you travel with clarity, not
              clutter.
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm"
          >
            <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
              <Backpack size={20} /> For the travel savvy
            </h3>
            <p className="text-white/60 text-sm">
              Save more than just locations — save time, context, and flow. Turn
              scattered ideas into smart, shareable travel plans.
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm"
          >
            <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
              <FileText size={20} /> Build Effortless Itineraries
            </h3>
            <p className="text-white/60 text-sm">
              Drag, drop, and customize daily plans that actually match your
              pace — no spreadsheets, no chaos.
            </p>
          </motion.div>
        </motion.div>
      </div>
      <SignInSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </>
  );
}
