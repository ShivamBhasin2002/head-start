"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Loader } from "lucide-react";

interface ButtonProps {
  state: "default" | "loading" | "success";
  onClick: () => void;
}

export function Button({ state, onClick }: ButtonProps) {
  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  return (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 w-9 h-9 rounded-full flex items-center justify-center text-white"
      disabled={state === "loading"}
    >
      <motion.div
        variants={iconVariants}
        animate={state === "loading" ? "visible" : "hidden"}
      >
        <Loader className="animate-spin" size={20} />
      </motion.div>
      <motion.div
        variants={iconVariants}
        animate={state === "success" ? "visible" : "hidden"}
      >
        <Check size={20} />
      </motion.div>
      <motion.div
        variants={iconVariants}
        animate={state === "default" ? "visible" : "hidden"}
      >
        <ArrowRight size={20} />
      </motion.div>
    </button>
  );
}
