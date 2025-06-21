"use client";

import { useState, useEffect } from "react";
import { Button } from "./Button";
import { motion, AnimatePresence } from "framer-motion";

export function ShareLinkInput() {
  const [state, setState] = useState<"default" | "loading" | "success">(
    "default"
  );
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (inputValue.trim() === "") return;
    setState("loading");
    setTimeout(() => {
      setState("success");
    }, 1500);
  };

  useEffect(() => {
    if (state === "success") {
      const timer = setTimeout(() => {
        setState("default");
        setInputValue("");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const textVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: "0%", opacity: 1 },
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {state === "success" ? (
          <motion.div
            key="successText"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="w-full bg-white/5 border border-white/10 rounded-full p-4 pl-6 pr-12 text-sm text-green-400"
          >
            Link saved
          </motion.div>
        ) : (
          <input
            type="text"
            placeholder="Share your link with us"
            className="w-full bg-white/5 border border-white/10 rounded-full p-4 pl-6 pr-12 text-sm focus:outline-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        )}
      </AnimatePresence>

      <Button state={state} onClick={handleSubmit} />
    </div>
  );
}
