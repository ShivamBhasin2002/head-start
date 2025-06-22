"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { getCities, getPois, POI as APIPOI } from "@/lib/api";
import { POICard } from "@/src/components/POICard";
import { FilterChips } from "@/src/components/FilterChips";
import { AddPOISheet } from "@/src/components/AddPOISheet";
import { Plus } from "lucide-react";
import { Map } from "@/src/components/Map";

interface POI {
  id: string;
  name: string;
  category: string;
  coordinates: { lat: number; lng: number };
  imageUrl: {
    url: string;
    width: number;
    height: number;
    photo_reference: string;
  };
  price?: number;
  discountPercent?: number;
  tgid?: string;
}

export default function CityPage() {
  const params = useParams();
  const cityId = decodeURIComponent(params.cityId as string);

  const [cityData, setCityData] = useState<any>(null);
  const [pois, setPois] = useState<POI[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [windowHeight, setWindowHeight] = useState(0);
  const [y, setYState] = useState(0);
  const yRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [activeSnapIndex, setActiveSnapIndex] = useState(1);
  const dragStartRef = useRef({ y: 0, sheetY: 0 });

  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);

  // Transform API POI to component POI format
  const transformAPIPOIToPOI = (apiPOI: APIPOI): POI => {
    return {
      id: apiPOI.tgid || apiPOI.poi_name,
      name: apiPOI.poi_name,
      category: apiPOI.category,
      coordinates: { lat: apiPOI.geo_location[0], lng: apiPOI.geo_location[1] },
      imageUrl: {
        url: apiPOI.photos_links[0],
        width: 0,
        height: 0,
        photo_reference: "",
      },
      tgid: apiPOI.tgid,
    };
  };

  const handleRemovePOI = (poiId: string) => {
    setPois((currentPois) => currentPois.filter((p) => p.id !== poiId));
    if (selectedPOI?.id === poiId) {
      deselectPOI();
    }
  };

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
    const loadCityData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get cities to find the current city
        const cities = await getCities();
        const currentCity = cities.find(
          (city) => city.toLowerCase() === cityId.toLowerCase()
        );

        if (!currentCity) {
          setError("City not found");
          setIsLoading(false);
          return;
        }

        // Set city data
        setCityData({ id: cityId, name: currentCity });

        // Get POIs for the user
        const poisResponse = await getPois();

        // Filter POIs for the current city and transform to component format
        const cityPois = poisResponse.pois
          .filter((poi) => poi.city.toLowerCase() === cityId.toLowerCase())
          .map(transformAPIPOIToPOI);

        setPois(cityPois);
      } catch (error) {
        console.error("Failed to load city data:", error);
        setError("Failed to load city data");
      } finally {
        setIsLoading(false);
      }
    };

    loadCityData();
  }, [cityId]);

  const filteredPOIs = useMemo(() => {
    if (selectedCategories.length === 0) return pois;
    return pois.filter((poi) => selectedCategories.includes(poi.category));
  }, [pois, selectedCategories]);

  if (error) {
    return <div className="text-white text-center py-12">{error}</div>;
  }

  if (isLoading) {
    return (
      <div className="text-white text-center h-screen relative">
        <svg
          width="108"
          height="65"
          viewBox="0 0 108 65"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mt-[274px] z-20 absolute ml-[160px]"
        >
          <path
            d="M0.89492 21V1.08H14.6649V4.35H4.70492V9.72H12.2049V12.99H4.70492V21H0.89492ZM21.6002 21.24C17.1902 21.24 14.4302 18.42 14.4302 14.01C14.4302 9.63 17.3702 6.57 21.5102 6.57C25.8002 6.57 28.3502 9.42 28.3502 13.89V15.15H18.0902C18.3302 17.19 19.6502 18.33 21.6602 18.33C23.7602 18.33 24.6602 17.34 25.1102 16.14L28.3502 17.28C27.3602 19.56 25.2902 21.24 21.6002 21.24ZM18.0302 12.57H24.6002C24.4502 10.5 23.3402 9.45 21.4202 9.45C19.6202 9.45 18.3002 10.59 18.0302 12.57ZM34.9602 21C32.2302 20.85 31.6302 19.59 31.5702 17.25V9.84H29.5602V6.84H31.5702V4.17L35.2002 2.13V6.84H37.9902V9.84H35.1702V16.89C35.1702 17.58 35.5002 17.88 36.1902 17.91H37.8402V21H34.9602ZM46.3037 21.27C41.9237 21.27 39.2537 18.27 39.2537 13.89C39.2537 9.63 42.1637 6.57 46.3937 6.57C49.8137 6.57 51.8537 8.37 52.8137 11.1L49.3037 12.18C48.8837 10.62 48.1037 9.6 46.3637 9.6C44.2937 9.6 42.9737 11.37 42.9737 13.86V13.98C42.9737 16.47 44.1737 18.24 46.2437 18.24C48.2537 18.24 49.0337 17.22 49.4537 15.51L52.9637 16.53C51.9737 19.44 49.8737 21.27 46.3037 21.27ZM55.08 21V0.809999H58.71V9.36C59.43 7.59 60.78 6.57 62.85 6.57C65.94 6.57 67.77 8.61 67.77 12.51V21H64.05V12.72C64.05 10.74 63.3 9.72 61.56 9.72C59.82 9.72 58.71 11.16 58.71 13.8V21H55.08ZM70.6844 4.77V1.14H74.5544V4.77H70.6844ZM70.7444 21V6.84H74.4944V21H70.7444ZM77.6769 21V6.84H81.3969V9.15C82.1469 7.5 83.5269 6.54 85.5369 6.54C88.6269 6.54 90.4569 8.61 90.4569 12.51V21H86.7369V12.72C86.7369 10.74 85.9869 9.72 84.2469 9.72C82.4769 9.72 81.3969 11.16 81.3969 13.8V21H77.6769ZM99.7284 28.26C94.9584 28.26 92.3484 26.76 92.3484 24.12C92.3484 22.77 93.2784 21.66 94.8384 21C93.4884 20.67 92.5884 19.74 92.5884 18.63C92.5884 17.4 93.5184 16.5 95.1084 16.05C93.8484 15.09 93.0684 13.65 93.0684 12.03C93.0684 8.91 95.7084 6.57 99.2784 6.57C101.498 6.57 103.328 7.5 104.378 8.97C104.918 7.65 105.878 6.84 107.348 6.84V10.47C106.688 10.2 105.818 10.23 105.158 10.77C105.248 11.16 105.308 11.55 105.308 11.97C105.308 15.24 102.878 17.37 99.1284 17.37C98.4084 17.37 97.7184 17.28 97.0884 17.07H96.9684C96.2484 17.07 95.6784 17.4 95.6784 17.85C95.6784 18.39 96.4284 18.75 97.4184 18.75H100.718C105.158 18.75 107.558 20.37 107.558 23.34C107.558 26.4 104.648 28.26 99.7284 28.26ZM99.2184 14.64C100.928 14.64 102.038 13.59 102.038 12.06V11.88C102.038 10.38 100.838 9.27 99.2184 9.27C97.6284 9.27 96.4584 10.41 96.4584 11.91V12.06C96.4584 13.56 97.5684 14.64 99.2184 14.64ZM99.8484 25.62C102.578 25.62 104.348 24.87 104.348 23.67C104.348 22.44 103.148 21.9 100.538 21.9H97.7184C96.4284 22.08 95.4684 22.71 95.4684 23.79C95.4684 24.93 97.0284 25.62 99.8484 25.62ZM1.49836 64.73V61.52H2.96836C4.67836 61.52 5.12836 61.22 6.02836 58.88L0.688361 44.84H4.58836L7.88836 54.71L10.9784 44.84H14.6984L9.29836 60.32C8.09836 63.44 6.65836 64.73 3.23836 64.73H1.49836ZM22.192 59.27C17.932 59.27 14.992 56.27 14.992 51.95C14.992 47.63 17.992 44.57 22.282 44.57C26.542 44.57 29.542 47.63 29.542 51.95C29.542 56.21 26.482 59.27 22.192 59.27ZM22.222 56.24C24.412 56.24 25.762 54.68 25.762 52.04V51.92C25.762 49.22 24.442 47.6 22.282 47.6C20.092 47.6 18.772 49.22 18.772 51.92V52.04C18.772 54.68 20.062 56.24 22.222 56.24ZM36.9402 59.27C33.7302 59.27 31.7502 56.99 31.7502 53.33V44.84H35.4702V53.12C35.4702 55.01 36.3702 56.12 38.0502 56.12C40.0002 56.12 40.8102 54.47 40.8102 52.04V44.84H44.5302V59H40.8102V56.99C40.0602 58.46 38.7702 59.27 36.9402 59.27ZM47.6831 59V44.84H51.4031V47.45C51.7931 45.83 52.8431 44.69 55.4531 44.69H55.7531V48.26H54.2831C52.0331 48.26 51.4031 49.28 51.4031 51.74V59H47.6831ZM68.3626 59C65.6326 58.85 65.0326 57.59 64.9726 55.25V47.84H62.9626V44.84H64.9726V42.17L68.6026 40.13V44.84H71.3926V47.84H68.5726V54.89C68.5726 55.58 68.9026 55.88 69.5926 55.91H71.2426V59H68.3626ZM73.932 59V44.84H77.652V47.45C78.042 45.83 79.092 44.69 81.702 44.69H82.002V48.26H80.532C78.282 48.26 77.652 49.28 77.652 51.74V59H73.932ZM84.2922 42.77V39.14H88.1622V42.77H84.2922ZM84.3522 59V44.84H88.1022V59H84.3522ZM91.2847 64.58V44.84H94.9747V46.64C95.9347 45.32 97.4347 44.54 99.2947 44.54C102.865 44.54 105.595 47.3 105.595 51.8V51.83C105.595 56.42 102.895 59.3 99.2647 59.3C97.4647 59.3 95.9647 58.52 94.9747 57.2V64.58H91.2847ZM98.2747 56.27C100.285 56.27 101.695 54.74 101.695 51.95V51.74C101.695 48.95 100.345 47.57 98.2747 47.57C96.1147 47.57 94.7947 49.34 94.7947 51.86V52.13C94.7947 54.62 96.0547 56.27 98.2747 56.27Z"
            fill="white"
          />
        </svg>

        <video
          src="/loader.mp4"
          height="100vh"
          controls={false}
          autoPlay={true}
          className="height-[100vh] absolute bottom-0"
        />
      </div>
    );
  }

  if (!cityData) {
    return <div className="text-white text-center py-12">City not found</div>;
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
      <div className="h-full w-full absolute top-0 left-0">
        <Map
          pois={pois}
          selectedPOI={selectedPOI}
          onMarkerClick={(poi) => {
            setSelectedPOI(poi);
            setY(snapPoints[2]);
          }}
        />
      </div>
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
              width="79"
              height="36"
              viewBox="0 0 79 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="pressable"
            >
              <g filter="url(#filter0_d_234_3298)">
                <rect
                  x="0"
                  y="0"
                  width="79"
                  height="36"
                  rx="18"
                  fill="url(#paint0_linear_234_3298)"
                  fill-opacity="0.3"
                  shape-rendering="crispEdges"
                />
                <rect
                  x="0.5"
                  y="0.5"
                  width="78"
                  height="35"
                  rx="17.5"
                  stroke="white"
                  stroke-opacity="0.1"
                  shape-rendering="crispEdges"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.5 14.3333C19.5 12.9526 20.6193 11.8333 22 11.8333C23.3807 11.8333 24.5 12.9526 24.5 14.3333C24.5 15.7141 23.3807 16.8333 22 16.8333C20.6193 16.8333 19.5 15.7141 19.5 14.3333Z"
                  fill="white"
                  fill-opacity="0.8"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.5 18C11.5 16.6193 12.6193 15.5 14 15.5C15.3807 15.5 16.5 16.6193 16.5 18C16.5 19.3807 15.3807 20.5 14 20.5C12.6193 20.5 11.5 19.3807 11.5 18Z"
                  fill="white"
                  fill-opacity="0.8"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.5 21.6667C19.5 20.2859 20.6193 19.1667 22 19.1667C23.3807 19.1667 24.5 20.2859 24.5 21.6667C24.5 23.0474 23.3807 24.1667 22 24.1667C20.6193 24.1667 19.5 23.0474 19.5 21.6667Z"
                  fill="white"
                  fill-opacity="0.8"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20.4311 15.7732L16.0977 17.7728L15.5391 16.5621L19.8724 14.5625L20.4311 15.7732ZM16.0977 18.2291L20.4311 20.2288L19.8724 21.4395L15.5391 19.4398L16.0977 18.2291Z"
                  fill="white"
                  fill-opacity="0.8"
                />
                <path
                  d="M35.85 23.154C34.156 23.154 32.91 22.44 32.434 20.914L33.946 20.312C34.254 21.306 35.01 21.754 35.92 21.754C36.956 21.754 37.558 21.306 37.558 20.508C37.558 19.71 36.914 19.416 35.36 18.94C33.624 18.408 32.742 17.722 32.756 16.168C32.756 14.712 34.044 13.578 35.99 13.578C37.74 13.578 38.902 14.348 39.266 15.692L37.824 16.308C37.572 15.454 36.984 14.964 35.99 14.964C34.87 14.964 34.436 15.51 34.436 16.07C34.436 16.77 34.702 17.05 36.382 17.568C38.034 18.072 39.322 18.716 39.322 20.326C39.322 22.062 37.88 23.154 35.85 23.154ZM40.966 23V12.682H42.59V16.812C42.59 17.008 42.52 17.806 42.52 17.806H42.604C42.996 16.574 43.864 15.832 45.026 15.832C46.342 15.832 47.154 16.616 47.154 18.324V23H45.446V18.758C45.446 17.61 44.956 17.288 44.256 17.288C43.402 17.288 42.604 18.142 42.59 19.542V23H40.966ZM50.7101 23.14C49.3661 23.14 48.6101 22.356 48.6101 21.166C48.6101 19.85 49.6041 19.304 51.0181 19.024C52.3621 18.744 52.8661 18.59 52.9081 18.408V18.282C52.9081 17.54 52.5021 17.134 51.6201 17.134C50.7661 17.134 50.2061 17.624 49.9681 18.17L48.6801 17.484C49.1701 16.448 50.3601 15.846 51.8021 15.846C53.6361 15.846 54.5601 16.728 54.5601 18.422V20.704C54.5601 22.174 54.7281 22.776 54.9661 23H53.2581C53.0761 22.832 52.9641 22.3 52.9221 21.544C52.6281 22.51 51.7601 23.14 50.7101 23.14ZM51.2281 21.922C52.0401 21.922 52.7261 21.39 52.9081 20.592V19.122C52.7541 19.346 52.4741 19.514 51.9141 19.668C50.8081 19.962 50.3041 20.326 50.3041 20.998C50.3041 21.6 50.7241 21.922 51.2281 21.922ZM56.6066 23V16H58.1886V16.924L58.0346 19.066H58.1466C58.2586 17.68 58.8466 15.888 60.5126 15.888H60.6946V17.918H60.1486C58.7906 17.918 58.2866 18.786 58.2726 20.298V23H56.6066ZM67.902 19.346C67.902 19.5 67.888 19.78 67.874 19.864H63.184C63.282 21.306 63.982 21.88 64.976 21.88C65.704 21.88 66.306 21.502 66.572 20.984L67.678 21.754C67.146 22.552 66.25 23.168 64.864 23.168C62.694 23.168 61.49 21.796 61.49 19.5C61.49 17.232 62.722 15.818 64.822 15.818C67.048 15.818 67.902 17.316 67.902 19.346ZM64.766 17.05C63.912 17.05 63.296 17.512 63.212 18.8H66.18V18.772C66.18 17.75 65.816 17.05 64.766 17.05Z"
                  fill="white"
                  fill-opacity="0.8"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_234_3298"
                  x="0"
                  y="0"
                  width="79"
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
                    result="effect1_dropShadow_234_3298"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_234_3298"
                    result="shape"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_234_3298"
                  x1="0"
                  y1="18"
                  x2="79"
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

          <FilterChips
            onFilterChange={setSelectedCategories}
            showGradient={y !== snapPoints[2]}
          />
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
              {filteredPOIs.map((poi: any) => (
                <POICard
                  key={poi.id}
                  poi={poi}
                  onSelect={() => {
                    setSelectedPOI(poi);
                    setY(snapPoints[2]);
                  }}
                  onRemove={() => handleRemovePOI(poi.id)}
                  onViewSources={() => {}}
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
            onRemove={() => handleRemovePOI(selectedPOI.id)}
            onViewSources={() => {}}
            isLight
          />
        </div>
      )}
      <AddPOISheet open={isSheetOpen} onOpenChange={setSheetOpen} />
    </div>
  );
}
