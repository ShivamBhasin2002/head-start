"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { mockCityData } from "@/lib/mockCityData";
import { mockCityPOIs } from "@/lib/mockCityPOIs";
import { POICard } from "@/src/components/POICard";
import { FilterChips } from "@/src/components/FilterChips";
import { AddPOISheet } from "@/src/components/AddPOISheet";
import { Plus } from "lucide-react";

interface POI {
  id: string;
  name: string;
  category: string;
  coordinates: { lat: number; lng: number };
  imageUrl: string;
  price?: number;
  discountPercent?: number;
  tgid?: string;
}

export default function CityPage() {
  const params = useParams();
  const cityId = params.cityId as keyof typeof mockCityPOIs;

  const [cityData, setCityData] = useState<any>(null);
  const [pois, setPois] = useState<POI[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSheetOpen, setSheetOpen] = useState(false);

  const [windowHeight, setWindowHeight] = useState(0);
  const [y, setYState] = useState(0);
  const yRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [activeSnapIndex, setActiveSnapIndex] = useState(1);
  const dragStartRef = useRef({ y: 0, sheetY: 0 });

  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);

  const deselectPOI = (resize?: boolean) => {
    setSelectedPOI(null);
    if (resize) setYState(snapPoints[1]);
  };

  const setY = (y: number) => {
    setYState(y);
    if (y !== snapPoints[2]) deselectPOI(false);
  };

  const snapPoints = useMemo(() => {
    if (!windowHeight) return [];
    const vh = windowHeight / 100;
    return [
      0, // Full screen (100dvh height)
      windowHeight - 60 * vh, // Medium (60dvh height)
      windowHeight - 136, // Collapsed (136px height)
    ];
  }, [windowHeight]);

  useEffect(() => {
    yRef.current = y;
  }, [y]);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (snapPoints.length > 0) {
      setY(snapPoints[1]);
      setActiveSnapIndex(1);
    }
  }, [snapPoints]);

  const handleDragStart = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (
        e.target instanceof HTMLButtonElement ||
        e.target instanceof HTMLAnchorElement ||
        (e.target as HTMLElement).closest("button")
      ) {
        return;
      }
      e.preventDefault();

      const eventY = "touches" in e ? e.touches[0].clientY : e.clientY;
      setIsDragging(true);
      dragStartRef.current = { y: eventY, sheetY: yRef.current };

      const handleDragMove = (moveEvent: TouchEvent | MouseEvent) => {
        const moveEventY =
          "touches" in moveEvent
            ? moveEvent.touches[0].clientY
            : moveEvent.clientY;
        const deltaY = moveEventY - dragStartRef.current.y;
        let newY = dragStartRef.current.sheetY + deltaY;
        if (newY < snapPoints[0]) {
          newY = snapPoints[0];
        }
        setY(newY);
      };

      const handleDragEnd = () => {
        setIsDragging(false);
        const currentY = yRef.current;
        const closestSnap = snapPoints.reduce((prev, curr) =>
          Math.abs(curr - currentY) < Math.abs(prev - currentY) ? curr : prev
        );
        const snapIndex = snapPoints.indexOf(closestSnap);
        setActiveSnapIndex(snapIndex);
        setY(closestSnap);

        document.removeEventListener("mousemove", handleDragMove as any);
        document.removeEventListener("mouseup", handleDragEnd);
        document.removeEventListener("touchmove", handleDragMove as any);
        document.removeEventListener("touchend", handleDragEnd);
      };

      document.addEventListener("mousemove", handleDragMove as any);
      document.addEventListener("mouseup", handleDragEnd);
      document.addEventListener("touchmove", handleDragMove as any);
      document.addEventListener("touchend", handleDragEnd);
    },
    [snapPoints]
  );

  useEffect(() => {
    const currentCityData = mockCityData.find((c) => c.id === cityId);
    const cityPois = (mockCityPOIs[cityId] || []) as POI[];
    if (currentCityData) setCityData(currentCityData);
    if (cityPois) setPois(cityPois);
  }, [cityId]);

  const filteredPOIs = useMemo(() => {
    if (selectedCategories.length === 0) return pois;
    return pois.filter((poi) => selectedCategories.includes(poi.category));
  }, [pois, selectedCategories]);

  if (!cityData) {
    return <div>City not found</div>;
  }

  const sheetStyle: React.CSSProperties = {
    transform: `translateY(${y}px)`,
    transition: isDragging
      ? "none"
      : "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
    borderTopLeftRadius: activeSnapIndex === 0 ? "0" : "16px",
    borderTopRightRadius: activeSnapIndex === 0 ? "0" : "16px",
  };

  return (
    <div className=" text-white font-sans h-screen overflow-hidden">
      <div
        className="fixed inset-x-0 top-0 bottom-0 bg-[#150029] rounded-t-3xl flex flex-col"
        style={sheetStyle}
      >
        <div
          className="w-full touch-none cursor-grab flex-shrink-0"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          <div className="mx-auto w-12 h-1.5 rounded-full bg-white/30 mt-2.5 mb-4" />
        </div>

        <div className="p-4 pt-0 flex-grow flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-[halyard-display] font-medium text-[20px] leading-[28px] tracking-[2px]">
              Your trip to {cityData.name}
            </h1>
            <svg
              width="127"
              height="36"
              viewBox="0 0 127 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="pressable"
            >
              <g filter="url(#filter0_d_5_878)">
                <rect
                  x="0"
                  y="0"
                  width="127"
                  height="36"
                  rx="18"
                  fill="url(#paint0_linear_5_878)"
                  fill-opacity="0.3"
                  shape-rendering="crispEdges"
                />
                <rect
                  x="0.5"
                  y="0.5"
                  width="126"
                  height="35"
                  rx="17.5"
                  stroke="white"
                  stroke-opacity="0.1"
                  shape-rendering="crispEdges"
                />
                <path
                  d="M20 11.3333L20.3592 12.9277C20.6638 14.2801 21.7199 15.3362 23.0723 15.6408L24.6667 16L23.0723 16.3591C21.7199 16.6638 20.6638 17.7199 20.3592 19.0723L20 20.6666L19.6409 19.0723C19.3362 17.7199 18.2801 16.6638 16.9278 16.3591L15.3334 16L16.9278 15.6408C18.2801 15.3362 19.3362 14.2801 19.6409 12.9277L20 11.3333Z"
                  fill="#D9D9D9"
                />
                <path
                  d="M14.6667 18L14.9232 19.1388C15.1408 20.1048 15.8952 20.8592 16.8612 21.0768L18 21.3333L16.8612 21.5899C15.8952 21.8075 15.1408 22.5618 14.9232 23.5278L14.6667 24.6667L14.4102 23.5278C14.1926 22.5618 13.4382 21.8075 12.4722 21.5899L11.3334 21.3333L12.4722 21.0768C13.4382 20.8592 14.1926 20.1048 14.4102 19.1388L14.6667 18Z"
                  fill="#D9D9D9"
                />
                <path
                  d="M36.732 23.168C34.226 23.168 32.616 21.208 32.616 18.394C32.616 15.454 34.38 13.564 37.194 13.564C39.182 13.564 40.47 14.46 41.044 15.944L39.266 16.49C38.986 15.496 38.3 14.964 37.194 14.964C35.486 14.964 34.38 16.168 34.38 18.296V18.366C34.38 20.494 35.36 21.782 37.026 21.782C38.37 21.782 39.406 21.054 39.49 19.486H37.222V17.988H41.156V23H39.84L39.7 20.62C39.392 22.286 38.314 23.168 36.732 23.168ZM48.9391 19.346C48.9391 19.5 48.9251 19.78 48.9111 19.864H44.2211C44.3191 21.306 45.0191 21.88 46.0131 21.88C46.7411 21.88 47.3431 21.502 47.6091 20.984L48.7151 21.754C48.1831 22.552 47.2871 23.168 45.9011 23.168C43.7311 23.168 42.5271 21.796 42.5271 19.5C42.5271 17.232 43.7591 15.818 45.8591 15.818C48.0851 15.818 48.9391 17.316 48.9391 19.346ZM45.8031 17.05C44.9491 17.05 44.3331 17.512 44.2491 18.8H47.2171V18.772C47.2171 17.75 46.8531 17.05 45.8031 17.05ZM50.4953 23V16H52.1193V16.952C52.1193 17.148 52.0773 17.806 52.0773 17.806H52.1613C52.5533 16.574 53.4213 15.832 54.5693 15.832C55.8853 15.832 56.6973 16.616 56.6973 18.324V23H54.9893V18.758C54.9893 17.61 54.5133 17.288 53.8273 17.288C52.9733 17.288 52.1893 18.058 52.1753 19.402V23H50.4953ZM64.6481 19.346C64.6481 19.5 64.6341 19.78 64.6201 19.864H59.9301C60.0281 21.306 60.7281 21.88 61.7221 21.88C62.4501 21.88 63.0521 21.502 63.3181 20.984L64.4241 21.754C63.8921 22.552 62.9961 23.168 61.6101 23.168C59.4401 23.168 58.2361 21.796 58.2361 19.5C58.2361 17.232 59.4681 15.818 61.5681 15.818C63.7941 15.818 64.6481 17.316 64.6481 19.346ZM61.5121 17.05C60.6581 17.05 60.0421 17.512 59.9581 18.8H62.9261V18.772C62.9261 17.75 62.5621 17.05 61.5121 17.05ZM66.2043 23V16H67.7863V16.924L67.6323 19.066H67.7443C67.8563 17.68 68.4443 15.888 70.11 15.888H70.292V17.918H69.7463C68.3883 17.918 67.8843 18.786 67.8703 20.298V23H66.2043ZM73.269 23.14C71.925 23.14 71.169 22.356 71.169 21.166C71.169 19.85 72.163 19.304 73.577 19.024C74.921 18.744 75.425 18.59 75.467 18.408V18.282C75.467 17.54 75.061 17.134 74.179 17.134C73.325 17.134 72.765 17.624 72.527 18.17L71.239 17.484C71.729 16.448 72.919 15.846 74.361 15.846C76.195 15.846 77.119 16.728 77.119 18.422V20.704C77.119 22.174 77.287 22.776 77.525 23H75.817C75.635 22.832 75.523 22.3 75.481 21.544C75.187 22.51 74.319 23.14 73.269 23.14ZM73.787 21.922C74.599 21.922 75.285 21.39 75.467 20.592V19.122C75.313 19.346 75.033 19.514 74.473 19.668C73.367 19.962 72.863 20.326 72.863 20.998C72.863 21.6 73.283 21.922 73.787 21.922ZM81.378 23.126C80.034 23.126 79.502 22.608 79.502 21.04V17.372H78.424V16H79.586V14.404L81.084 13.718V15.524L81.014 16H82.68V17.372H81.014L81.084 17.834V20.816C81.084 21.614 81.252 21.712 81.966 21.712C82.302 21.712 82.596 21.656 82.918 21.572V22.818C82.484 22.986 81.91 23.126 81.378 23.126ZM90.242 19.346C90.242 19.5 90.228 19.78 90.214 19.864H85.524C85.622 21.306 86.322 21.88 87.316 21.88C88.044 21.88 88.646 21.502 88.912 20.984L90.018 21.754C89.486 22.552 88.59 23.168 87.204 23.168C85.034 23.168 83.83 21.796 83.83 19.5C83.83 17.232 85.062 15.818 87.162 15.818C89.388 15.818 90.242 17.316 90.242 19.346ZM87.106 17.05C86.252 17.05 85.636 17.512 85.552 18.8H88.52V18.772C88.52 17.75 88.156 17.05 87.106 17.05ZM97.155 23.126C95.811 23.126 95.279 22.608 95.279 21.04V17.372H94.201V16H95.363V14.404L96.861 13.718V15.524L96.791 16H98.457V17.372H96.791L96.861 17.834V20.816C96.861 21.614 97.029 21.712 97.743 21.712C98.079 21.712 98.373 21.656 98.695 21.572V22.818C98.261 22.986 97.687 23.126 97.155 23.126ZM100.07 23V16H101.652V16.924L101.498 19.066H101.61C101.722 17.68 102.31 15.888 103.976 15.888H104.158V17.918H103.612C102.254 17.918 101.75 18.786 101.736 20.298V23H100.07ZM105.511 14.908C105.441 14.908 105.413 14.866 105.413 14.796V13.34C105.413 13.256 105.455 13.214 105.539 13.214H107.163C107.233 13.214 107.275 13.256 107.275 13.34V14.796C107.275 14.866 107.233 14.908 107.163 14.908H105.511ZM105.511 23V16H107.177V23H105.511ZM109.271 25.954V16H110.881V16.532L110.839 17.456H110.909C111.245 16.546 112.085 15.804 113.205 15.804C114.927 15.804 115.879 17.078 115.879 19.29C115.879 21.782 114.675 23.098 113.079 23.098C111.959 23.098 111.161 22.328 110.811 21.362H110.713L110.895 23.042V25.954H109.271ZM112.561 21.838C113.527 21.838 114.115 20.802 114.115 19.43C114.115 17.946 113.625 17.064 112.589 17.064C111.441 17.064 110.839 18.366 110.839 19.318V19.696C110.839 20.83 111.343 21.838 112.561 21.838Z"
                  fill="white"
                  fill-opacity="0.8"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_5_878"
                  x="0"
                  y="0"
                  width="127"
                  height="36"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dx="4" dy="4" />
                  <feGaussianBlur stdDeviation="17" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.762058 0 0 0 0 0.379282 0 0 0 0 1 0 0 0 0.14 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_5_878"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_5_878"
                    result="shape"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_5_878"
                  x1="0"
                  y1="18"
                  x2="127"
                  y2="18"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F38BFF" />
                  <stop
                    offset="0.346565"
                    stop-color="#7019AA"
                    stop-opacity="0.2"
                  />
                  <stop offset="0.616593" stop-color="#3E5288" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <FilterChips onFilterChange={setSelectedCategories} />
          <div
            className="overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="my-6">
              <button
                onClick={() => setSheetOpen(true)}
                className="w-full bg-white/10 p-4 rounded-lg flex items-center justify-center gap-2 border border-[#FFFFFF10] border-dashed flex-col font-[halyard-text] font-light text-[14px] leading-[16px] tracking-[0] backdrop-filter backdrop-blur-[11px] "
              >
                <Plus size={20} />
                Add a place of interest
              </button>
            </div>
            <div className="space-y-4 -mt-6 pt-6 pb-[400px]">
              {filteredPOIs.map((poi) => (
                <POICard
                  key={poi.id}
                  poi={poi}
                  onSelect={() => {
                    setSelectedPOI(poi);
                    setY(snapPoints[2]);
                  }}
                  onRemove={() => {}}
                  onViewSources={() => {
                    setSelectedPOI(poi);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {selectedPOI && (
        <div className="fixed inset-x-0 bottom-[156px] px-4 rounded-t-3xl">
          <POICard
            poi={selectedPOI}
            onRemove={() => {}}
            onViewSources={() => {}}
            isLight
          />
        </div>
      )}
      <AddPOISheet open={isSheetOpen} onOpenChange={setSheetOpen} />
    </div>
  );
}
