"use client";

import { Drawer } from "vaul";
import { Search } from "lucide-react";

interface AddPOISheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockSearchResults = [
  "Eiffel Tower",
  "Louvre Museum",
  "Cathédrale Notre-Dame de Paris",
  "Arc de Triomphe",
  "Musée d'Orsay",
];

export function AddPOISheet({ open, onOpenChange }: AddPOISheetProps) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-[#1a0b2e] flex flex-col rounded-t-[10px] h-[90%] mt-24 fixed bottom-0 left-0 right-0 p-4">
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
              size={20}
            />
            <input
              type="text"
              placeholder="Search for a city"
              className="w-full bg-white/10 rounded-full p-4 pl-12 text-white placeholder:text-white/50 focus:outline-none"
            />
          </div>

          <div className="mt-4">
            {/* These are placeholders and not based on the search input */}
            <h3 className="text-white/50 text-sm font-semibold my-2">
              Suggestions
            </h3>
            <ul className="space-y-2">
              {mockSearchResults.map((result, i) => (
                <li key={i} className="p-3 bg-white/5 rounded-lg text-white">
                  {result}
                </li>
              ))}
            </ul>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
