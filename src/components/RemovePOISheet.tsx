"use client";

import { Drawer } from "vaul";
import Image from "next/image";
import { X } from "lucide-react";
import { useRef } from "react";

interface POI {
  id: string;
  name: string;
  imageUrl: {
    url: string;
    width: number;
    height: number;
    photo_reference: string;
  };
}

interface RemovePOISheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  poi: POI | null;
  onConfirmRemove: () => void;
}

export function RemovePOISheet({
  open,
  onOpenChange,
  poi,
  onConfirmRemove,
}: RemovePOISheetProps) {
  const isRemove = useRef(false);
  if (!poi) return null;

  const handleRemove = () => {
    onConfirmRemove();
    onOpenChange(false);
  };

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className="bg-[#150029] flex flex-col rounded-t-[24px] h-[228epx] fixed bottom-0 left-0 right-0 text-white p-4 outline-none pt-[48px]"
          onAnimationEnd={() => {
            if (isRemove.current) {
              handleRemove();
            }
          }}
        >
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 pressable"
          >
            <X size={24} />
          </button>
          <div className="flex gap-3 items-center mb-9">
            <img
              src={poi.imageUrl.url}
              alt={poi.name}
              width={82}
              height={72}
              className="rounded-lg object-cover w-16 h-16"
            />
            <div>
              <h2 className="font-[halyard-text] font-semibold text-[21px] leading-[28px] tracking-[0]">
                {poi.name}
              </h2>
              <p className="font-[halyard-text] font-light text-[14px] leading-[20px] tracking-[0] text-white/70 mt-1">
                Not feeling it? You can add it later, no FOMO.
              </p>
            </div>
          </div>
          <div className=" grid grid-cols-2 gap-4">
            <button
              onClick={() => onOpenChange(false)}
              className="border border-white/50 rounded-xl py-3 pressable"
            >
              Keep
            </button>
            <button
              onClick={() => {
                isRemove.current = true;
                onOpenChange(false);
              }}
              className="bg-white text-black rounded-xl py-3 pressable font-semibold"
            >
              Remove
            </button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
