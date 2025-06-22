"use client";

import { Drawer } from "vaul";
import { ChevronDown, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api";

interface SignInSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignInSheet({ open, onOpenChange }: SignInSheetProps) {
  const router = useRouter();
  const [step, setStep] = useState<"signIn" | "otp">("signIn");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProceed = async () => {
    if (!name.trim() || !phone.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setError(null);
    setStep("otp");
  };

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await loginUser({
        name: name.trim(),
        phoneNo: phone.trim(),
      });

      if (response.success) {
        router.push("/");
      } else {
        setError(response.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to authenticate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const drawerContent = {
    background:
      "linear-gradient(180deg, rgba(50, 26, 82, 0.8) 0%, rgba(13, 0, 26, 0.8) 100%)",
    backdropFilter: "blur(10px)",
  };

  const otpInputStyles =
    "w-12 h-14 bg-white/10 rounded-lg text-white text-2xl text-center focus:outline-none focus:ring-2 focus:ring-white/50";

  const buttonClasses =
    " bg-white text-black mt-8 rounded-lg py-4 font-[halyard-text] font-medium text-[16px] leading-[20px] tracking-[0] absolute bottom-[34px] left-[16px] right-[16px] disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <Drawer.Root shouldScaleBackground open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className="bg-[#150029] flex flex-col rounded-t-3xl h-[434px] mt-24 fixed bottom-0 left-0 right-0 overflow-hidden"
          style={drawerContent}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="375"
            height="442"
            viewBox="0 0 375 442"
            fill="none"
            className="absolute top-[-90.5px] right-[-159px] -z-1"
          >
            <g filter="url(#filter0_f_79_14021)">
              <circle
                cx="173.5"
                cy="220.5"
                r="107.5"
                fill="#5A007599"
                fillOpacity="0.60"
              ></circle>
            </g>
            <defs>
              <filter
                id="filter0_f_79_14021"
                x="-48"
                y="-1"
                width="443"
                height="443"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  stdDeviation="57"
                  result="effect1_foregroundBlur_79_14021"
                ></feGaussianBlur>
              </filter>
            </defs>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="375"
            height="442"
            viewBox="0 0 375 442"
            fill="none"
            className="absolute bottom-[-113.5px] left-[-13px] -z-1"
          >
            <g filter="url(#filter0_f_79_14021)">
              <circle
                cx="173.5"
                cy="220.5"
                r="107.5"
                fill="#5A007599"
                fillOpacity="0.60"
              ></circle>
            </g>
            <defs>
              <filter
                id="filter0_f_79_14021"
                x="-48"
                y="-1"
                width="443"
                height="443"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  stdDeviation="57"
                  result="effect1_foregroundBlur_79_14021"
                ></feGaussianBlur>
              </filter>
            </defs>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="375"
            height="442"
            viewBox="0 0 375 442"
            fill="none"
            className="absolute left-[-151px] top-[32.5px] -z-1"
          >
            <g filter="url(#filter0_f_79_14021)">
              <circle
                cx="173.5"
                cy="220.5"
                r="107.5"
                fill="#4788C1"
                fillOpacity="0.21"
              ></circle>
            </g>
            <defs>
              <filter
                id="filter0_f_79_14021"
                x="-48"
                y="-1"
                width="443"
                height="443"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  stdDeviation="57"
                  result="effect1_foregroundBlur_79_14021"
                ></feGaussianBlur>
              </filter>
            </defs>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="375"
            height="442"
            viewBox="0 0 375 442"
            fill="none"
            className="absolute top-[-167.5px] left-[-10px] -z-1"
          >
            <g filter="url(#filter0_f_79_14021)">
              <circle
                cx="173.5"
                cy="220.5"
                r="107.5"
                fill="#4788C1"
                fillOpacity="0.21"
              ></circle>
            </g>
            <defs>
              <filter
                id="filter0_f_79_14021"
                x="-48"
                y="-1"
                width="443"
                height="443"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  stdDeviation="57"
                  result="effect1_foregroundBlur_79_14021"
                ></feGaussianBlur>
              </filter>
            </defs>
          </svg>
          <div className="p-4 rounded-t-2xl flex-1 h-full">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-[#150029] mb-8" />
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-medium mb-4 sr-only">
                {step === "signIn" ? "Sign In" : "Enter OTP"}
              </Drawer.Title>

              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
                  {error}
                </div>
              )}

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
                      <h2 className="font-[halyard-text] font-semibold text-[24px] leading-[28px] tracking-[0] text-white mb-8">
                        Sign in
                      </h2>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Your name"
                          className="w-full px-3 py-[18px] bg-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none font-[halyard-text] font-light text-[15px] leading-[20px] tracking-[0%]"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <input
                          type="tel"
                          placeholder="Your phone number"
                          className="w-full px-3 py-[18px] bg-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none font-[halyard-text] font-light text-[15px] leading-[20px] tracking-[0%]"
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
                            input.value = input.value.replace(/[^0-9]/g, "");
                            if (input.value.length === 1) {
                              (
                                input.nextElementSibling as HTMLInputElement
                              )?.focus();
                            }
                          }}
                          onKeyDown={(e) => {
                            const input = e.target as HTMLInputElement;
                            if (e.key === "Backspace" && input.value === "") {
                              (
                                input.previousElementSibling as HTMLInputElement
                              )?.focus();
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
                            input.value = input.value.replace(/[^0-9]/g, "");
                            if (input.value.length === 1) {
                              (
                                input.nextElementSibling as HTMLInputElement
                              )?.focus();
                            }
                          }}
                          onKeyDown={(e) => {
                            const input = e.target as HTMLInputElement;
                            if (e.key === "Backspace" && input.value === "") {
                              (
                                input.previousElementSibling as HTMLInputElement
                              )?.focus();
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
                            input.value = input.value.replace(/[^0-9]/g, "");
                            if (input.value.length === 1) {
                              (
                                input.nextElementSibling as HTMLInputElement
                              )?.focus();
                            }
                          }}
                          onKeyDown={(e) => {
                            const input = e.target as HTMLInputElement;
                            if (e.key === "Backspace" && input.value === "") {
                              (
                                input.previousElementSibling as HTMLInputElement
                              )?.focus();
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
                            input.value = input.value.replace(/[^0-9]/g, "");
                            if (input.value.length === 1) {
                              (
                                input.nextElementSibling as HTMLInputElement
                              )?.focus();
                            }
                          }}
                          onKeyDown={(e) => {
                            const input = e.target as HTMLInputElement;
                            if (e.key === "Backspace" && input.value === "") {
                              (
                                input.previousElementSibling as HTMLInputElement
                              )?.focus();
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
                            input.value = input.value.replace(/[^0-9]/g, "");
                            if (input.value.length === 1) {
                              (
                                input.nextElementSibling as HTMLInputElement
                              )?.focus();
                            }
                          }}
                          onKeyDown={(e) => {
                            const input = e.target as HTMLInputElement;
                            if (e.key === "Backspace" && input.value === "") {
                              (
                                input.previousElementSibling as HTMLInputElement
                              )?.focus();
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
                            input.value = input.value.replace(/[^0-9]/g, "");
                            if (input.value.length === 1) {
                              handleConfirm();
                            }
                          }}
                          onKeyDown={(e) => {
                            const input = e.target as HTMLInputElement;
                            if (e.key === "Backspace" && input.value === "") {
                              (
                                input.previousElementSibling as HTMLInputElement
                              )?.focus();
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
                onClick={step === "signIn" ? handleProceed : handleConfirm}
                disabled={isLoading}
                className={buttonClasses}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2"></div>
                    {step === "signIn" ? "Processing..." : "Authenticating..."}
                  </div>
                ) : step === "signIn" ? (
                  "Proceed"
                ) : (
                  "Confirm"
                )}
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
