"use client";

import { Drawer } from "vaul";
import { ChevronLeft } from "lucide-react";

interface SearchSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchSheet({ open, onOpenChange }: SearchSheetProps) {
  return (
    <Drawer.Root shouldScaleBackground open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-[#150029] flex flex-col rounded-t-2xl h-[70%] mt-24 fixed bottom-0 left-0 right-0 border-t-[5px] border-white/10 overflow-hidden">
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
            className="absolute bottom-[-113.5px] left-[-13px]"
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
            className="absolute left-[-151px] top-[32.5px]"
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
            className="absolute top-[-167.5px] left-[-10px]"
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

          <div className="p-4 rounded-t-2xl flex-1 h-full z-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-[#150029] mb-8" />
            <div className="max-w-md mx-auto">
              <div className="flex items-center gap-2 text-white/80">
                <button onClick={() => onOpenChange(false)}>
                  <ChevronLeft />
                </button>
                <input
                  type="text"
                  placeholder="Search for city"
                  className="w-full bg-transparent text-lg focus:outline-none"
                  autoFocus
                />
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
