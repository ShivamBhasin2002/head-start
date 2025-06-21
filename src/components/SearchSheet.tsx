"use client";

import { Drawer } from "vaul";
import { ChevronLeft } from "lucide-react";

interface SearchSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchSheet({ open, onOpenChange }: SearchSheetProps) {
  const drawerContent = {
    background:
      "linear-gradient(180deg, rgba(50, 26, 82, 0.8) 0%, rgba(13, 0, 26, 0.8) 100%)",
    backdropFilter: "blur(10px)",
  };

  return (
    <Drawer.Root shouldScaleBackground open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className="bg-zinc-800 flex flex-col rounded-t-2xl h-[94%] mt-24 fixed bottom-0 left-0 right-0"
          style={drawerContent}
        >
          <div className="p-4 rounded-t-2xl flex-1 h-full">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-600 mb-8" />
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
