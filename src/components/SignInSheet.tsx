"use client";

import { Drawer } from "vaul";
import { ChevronDown, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface SignInSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignInSheet({ open, onOpenChange }: SignInSheetProps) {
  const router = useRouter();
  const [step, setStep] = useState<"signIn" | "otp">("signIn");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleConfirm = () => {
    // any random OTP is fine
    Cookies.set("auth", JSON.stringify({ name, phone }), { expires: 7 }); // expires in 7 days
    router.push("/");
  };

  const drawerContent = {
    background:
      "linear-gradient(180deg, rgba(50, 26, 82, 0.8) 0%, rgba(13, 0, 26, 0.8) 100%)",
    backdropFilter: "blur(10px)",
  };

  const otpInputStyles =
    "w-12 h-14 bg-white/10 rounded-lg text-white text-2xl text-center focus:outline-none focus:ring-2 focus:ring-white/50";

  const buttonClasses =
    " bg-white text-black mt-8 rounded-lg py-4 font-[Halyard Text] font-medium text-[16px] leading-[20px] tracking-[0] absolute bottom-[34px] left-[16px] right-[16px]";

  return (
    <Drawer.Root shouldScaleBackground open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className="bg-[#150029] flex flex-col rounded-t-3xl h-[434px] mt-24 fixed bottom-0 left-0 right-0 "
          style={drawerContent}
        >
          <div className="p-4 rounded-t-2xl flex-1 h-full">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-[#150029] mb-8" />
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-medium mb-4 sr-only">
                {step === "signIn" ? "Sign In" : "Enter OTP"}
              </Drawer.Title>
              <AnimatePresence mode="wait" initial={false}>
                {step === "signIn" ? (
                  <motion.div
                    key="signIn"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col justify-between h-full"
                  >
                    <div>
                      <h2 className="font-[Halyard Text] font-semibold text-[24px] leading-[28px] tracking-[0] text-white mb-8">
                        Sign in
                      </h2>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Your name"
                          className="w-full px-3 py-[18px] bg-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none font-[Halyard Text] font-light text-[15px] leading-[20px] tracking-[0%]"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <input
                          type="tel"
                          placeholder="Your phone number"
                          className="w-full px-3 py-[18px] bg-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none font-[Halyard Text] font-light text-[15px] leading-[20px] tracking-[0%]"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="otp"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col justify-between h-full"
                  >
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-8">
                        Enter OTP
                      </h2>
                      <div className="flex justify-between gap-2 mb-6">
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          className={otpInputStyles}
                          maxLength={1}
                          onInput={(e) => {
                            const input = e.target as HTMLInputElement;
                            input.value = input.value.replace(/[^0-9]/g, '');
                            if (input.value.length === 1) {
                              (input.nextElementSibling as HTMLInputElement)?.focus();
                            }
                          }}
                          onKeyDown={(e) => {
                            const input = e.target as HTMLInputElement;
                            if (e.key === 'Backspace' && input.value === '') {
                              (input.previousElementSibling as HTMLInputElement)?.focus();
                            }
                          }}
                        />
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          className={otpInputStyles}
                          maxLength={1}
                          onInput={(e) => {
                            const input = e.target as HTMLInputElement;
                            input.value = input.value.replace(/[^0-9]/g, '');
                            if (input.value.length === 1) {
                              (input.nextElementSibling as HTMLInputElement)?.focus();
                            }
                          }}
                          onKeyDown={(e) => {
                            const input = e.target as HTMLInputElement;
                            if (e.key === 'Backspace' && input.value === '') {
                              (input.previousElementSibling as HTMLInputElement)?.focus();
                            }
                          }}
                        />
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          className={otpInputStyles}
                          maxLength={1}
                          onInput={(e) => {
                            const input = e.target as HTMLInputElement;
                            input.value = input.value.replace(/[^0-9]/g, '');
                            if (input.value.length === 1) {
                              (input.nextElementSibling as HTMLInputElement)?.focus();
                            }
                          }}
                          onKeyDown={(e) => {
                            const input = e.target as HTMLInputElement;
                            if (e.key === 'Backspace' && input.value === '') {
                              (input.previousElementSibling as HTMLInputElement)?.focus();
                            }
                          }}
                        />
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          className={otpInputStyles}
                          maxLength={1}
                          onInput={(e) => {
                            const input = e.target as HTMLInputElement;
                            input.value = input.value.replace(/[^0-9]/g, '');
                            if (input.value.length === 1) {
                              (input.nextElementSibling as HTMLInputElement)?.focus();
                            }
                          }}
                          onKeyDown={(e) => {
                            const input = e.target as HTMLInputElement;
                            if (e.key === 'Backspace' && input.value === '') {
                              (input.previousElementSibling as HTMLInputElement)?.focus();
                            }
                          }}
                        />
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          className={otpInputStyles}
                          maxLength={1}
                          onInput={(e) => {
                            const input = e.target as HTMLInputElement;
                            input.value = input.value.replace(/[^0-9]/g, '');
                            if (input.value.length === 1) {
                              (input.nextElementSibling as HTMLInputElement)?.focus();
                            }
                          }}
                          onKeyDown={(e) => {
                            const input = e.target as HTMLInputElement;
                            if (e.key === 'Backspace' && input.value === '') {
                              (input.previousElementSibling as HTMLInputElement)?.focus();
                            }
                          }}
                        />
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          className={otpInputStyles}
                          maxLength={1}
                          onInput={(e) => {
                            const input = e.target as HTMLInputElement;
                            input.value = input.value.replace(/[^0-9]/g, '');
                            if (input.value.length === 1) {
                              (input.nextElementSibling as HTMLInputElement)?.focus();
                            }
                          }}
                          onKeyDown={(e) => {
                            const input = e.target as HTMLInputElement;
                            if (e.key === 'Backspace' && input.value === '') {
                              (input.previousElementSibling as HTMLInputElement)?.focus();
                            }
                          }}
                        />
                      </div>
                      <div className="flex gap-4">
                        <button className="text-white/60 underline">
                          Resend OTP
                        </button>
                        <button
                          onClick={() => setStep("signIn")}
                          className="text-white/60 underline"
                        >
                          Edit number
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={
                  step === "signIn" ? () => setStep("otp") : handleConfirm
                }
                className={buttonClasses}
              >
                {step === "signIn" ? "Proceed" : "Confirm"}
              </button>
            </div>
            <Drawer.Close asChild className="absolute top-4 right-4">
              <button>
                <X className="text-white/60" />
              </button>
            </Drawer.Close>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
