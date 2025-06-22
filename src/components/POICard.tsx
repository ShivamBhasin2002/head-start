"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { RemovePOISheet } from "./RemovePOISheet";
import { fetchPOIImage, isUnsplashConfigured } from "@/lib/unsplash";

interface POICardProps {
  poi: {
    id: string;
    name: string;
    category: string;
    imageUrl: {
      photo_reference: string;
      url: string;
      width: number;
      height: number;
    };
    price?: number;
    discountPercent?: number;
    tgid?: string;
  };
  onSelect?: () => void;
  onRemove: () => void;
  onViewSources: () => void;
  isLight?: boolean;
}

export function POICard({
  poi,
  onSelect,
  isLight,
  onRemove,
  onViewSources,
}: POICardProps) {
  const { tgid } = poi;
  const discountPercentage = 5;
  const price = "$40.84";
  const [isRemoveSheetOpen, setRemoveSheetOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(poi.imageUrl.url);
  const [imageError, setImageError] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  // Handle image loading and fallback to Unsplash
  useEffect(() => {
    const loadImage = async () => {
      // If we have a valid imageUrl and no error, use it
      if (poi.imageUrl && !imageError) {
        setImageUrl(poi.imageUrl.url);
        return;
      }

      // If image failed to load or no imageUrl, try Unsplash
      if (imageError || !poi.imageUrl) {
        if (isUnsplashConfigured()) {
          setIsLoadingImage(true);
          try {
            const unsplashImage = await fetchPOIImage(poi.name, poi.category);
            setImageUrl(unsplashImage);
          } catch (error) {
            console.error("Failed to fetch Unsplash image:", error);
            setImageUrl("/tokyo-skytree.jpg");
          } finally {
            setIsLoadingImage(false);
          }
        } else {
          // Fallback to default image if Unsplash is not configured
          setImageUrl("/tokyo-skytree.jpg");
        }
      }
    };

    loadImage();
  }, [poi.imageUrl, poi.name, poi.category, imageError]);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <div
        className={`rounded-2xl p-3 ${
          isLight
            ? "bg-[#fff] backdrop-blur-[11px] shadow-[0px_4px_64px_0px_#B45FFF40]"
            : "bg-[#ffffff10]"
        }`}
      >
        <div className="flex gap-3 mb-[18px] items-center">
          <div className="relative w-[62px] h-[53px] rounded-lg overflow-hidden">
            {isLoadingImage && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={imageUrl}
              width={62}
              height={53}
              className="rounded-lg object-cover w-[62px] h-[53px]"
              onError={handleImageError}
            />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <h3
              className={`font-[halyard-text] font-semibold text-[18px] leading-[24px] tracking-[0] ${
                isLight ? "text-[#22222290]" : "text-[#ffffff90]"
              }`}
            >
              {poi.name}
            </h3>
            <div className=" flex gap-1.5 mt-1.5 items-center">
              <span
                onClick={onViewSources}
                className={`flex gap-1 items-center font-[halyard-text] font-light text-[12px] leading-[20px] tracking-[0] ${
                  isLight ? "text-[#222222]" : "text-[#ffffff90]"
                } pressable`}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.55026 1.50104C3.72581 1.50432 2.77043 1.54911 2.15987 2.15965C1.50098 2.81853 1.50098 3.87898 1.50098 5.99985C1.50098 8.12075 1.50098 9.1812 2.15987 9.84005C2.81876 10.4989 3.87924 10.4989 6.00021 10.4989C8.12111 10.4989 9.18161 10.4989 9.84051 9.84005C10.4511 9.22955 10.4959 8.2742 10.4992 6.4498"
                    stroke={isLight ? "#222222" : "white"}
                    strokeWidth="0.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.2401 1.75876L7.46545 4.52575M10.2401 1.75876C9.9931 1.5115 8.3293 1.53455 7.97755 1.53955M10.2401 1.75876C10.4871 2.00601 10.4641 3.67164 10.4591 4.02377"
                    stroke={isLight ? "#222222" : "white"}
                    strokeWidth="0.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                View source
              </span>
              <span
                className={`w-[1px] h-[13px] ${
                  isLight ? "bg-[#E2E2E2]" : "bg-[#ffffff20]"
                }`}
              />
              <span
                onClick={() => setRemoveSheetOpen(true)}
                className={`flex items-center gap-1 font-[halyard-text] font-light text-[12px] leading-[20px] tracking-[0] ${
                  isLight ? "text-[#AF2525E5]" : "text-[#F79696E5]"
                } pressable`}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_5_1665)">
                    <path
                      d="M9.73245 2.7561L9.42315 7.7597C9.34409 9.03806 9.30461 9.67726 8.98418 10.1368C8.82572 10.364 8.62178 10.5558 8.38521 10.6999C7.90676 10.9914 7.26636 10.9914 5.9855 10.9914C4.70301 10.9914 4.06175 10.9914 3.58298 10.6993C3.34628 10.555 3.14224 10.3629 2.98387 10.1353C2.66354 9.67502 2.6249 9.03491 2.54761 7.75475L2.24585 2.7561"
                      stroke="#F79696"
                      strokeOpacity="0.9"
                      strokeWidth="0.74866"
                      strokeLinecap="round"
                    />
                    <path
                      d="M1.4967 2.75441H10.4806M8.01289 2.75441L7.6722 2.05153C7.44585 1.58463 7.33266 1.35118 7.13745 1.20559C7.09418 1.17329 7.04831 1.14456 7.00035 1.11969C6.78419 1.00754 6.52475 1.00754 6.00588 1.00754C5.47398 1.00754 5.20806 1.00754 4.98829 1.12439C4.93959 1.15029 4.89311 1.18018 4.84935 1.21375C4.65188 1.36525 4.54157 1.60724 4.32095 2.09123L4.01865 2.75441"
                      stroke="#F79696"
                      strokeOpacity="0.9"
                      strokeWidth="0.74866"
                      strokeLinecap="round"
                    />
                    <path
                      d="M4.74219 8.24546V5.25082"
                      stroke="#F79696"
                      strokeOpacity="0.9"
                      strokeWidth="0.74866"
                      strokeLinecap="round"
                    />
                    <path
                      d="M7.23828 8.24546V5.25082"
                      stroke="#F79696"
                      strokeOpacity="0.9"
                      strokeWidth="0.74866"
                      strokeLinecap="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_5_1665">
                      <rect
                        width="11.9786"
                        height="11.9786"
                        fill="white"
                        transform="translate(0 0.0107117)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                Remove place
              </span>
            </div>
          </div>
          {onSelect && (
            <svg
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="pressable"
              onClick={onSelect}
            >
              <rect width="31" height="31" rx="15.5" fill="white" />
              <path
                d="M16.0785 21.2447C15.7894 21.5153 15.4029 21.6667 15.0007 21.6667C14.5985 21.6667 14.2121 21.5153 13.923 21.2447C11.2753 18.7507 7.72717 15.9646 9.45751 11.9198C10.3931 9.73278 12.6389 8.33334 15.0007 8.33334C17.3626 8.33334 19.6084 9.73278 20.544 11.9198C22.2721 15.9595 18.7327 18.7593 16.0785 21.2447Z"
                fill="url(#paint0_linear_5_1542)"
              />
              <path
                d="M17.3333 14.3333C17.3333 15.622 16.2886 16.6667 15 16.6667C13.7113 16.6667 12.6666 15.622 12.6666 14.3333C12.6666 13.0447 13.7113 12 15 12C16.2886 12 17.3333 13.0447 17.3333 14.3333Z"
                fill="white"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_5_1542"
                  x1="15.0006"
                  y1="8.33334"
                  x2="15.0006"
                  y2="21.6667"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#970DD3" />
                  <stop offset="1" stopColor="#459FA7" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </div>

        {tgid && (
          <div
            className={`flex-1 flex justify-between border-t border-dashed pt-3 -mx-3 px-3 ${
              isLight ? "border-[#E2E2E2]" : "border-[#ffffff10]"
            }`}
          >
            <div className="flex flex-col gap-0.5">
              <span
                className={`font-[halyard-text] font-medium text-[12px] leading-[16px] tracking-[0] ${isLight ? "text-[#666666]" : "text-[#ffffff50]"}`}
              >
                from
              </span>
              <div className="flex">
                <span
                  className={`font-[halyard-text] font-medium text-[15px] leading-[20px] tracking-[0] ${isLight ? "text-[#111]" : "text-white"}`}
                >
                  {price}
                </span>
                {discountPercentage && discountPercentage > 0 && (
                  <>
                    <svg
                      width="8"
                      height="16"
                      viewBox="0 0 8 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1"
                    >
                      <path
                        d="M6.14972 0.849168C6.61333 0.310087 7.28898 0 8 0V16C7.28898 16 6.61333 15.6899 6.14972 15.1508L1.68226 9.95612C0.715002 8.8314 0.715002 7.1686 1.68226 6.04388L6.14972 0.849168Z"
                        fill="#078842"
                      />
                    </svg>
                    <span className="bg-[#078842] text-white font-[halyard-text] font-medium text-[10px] leading-[12px] tracking-[0] pr-1 py-1 h-4 rounded-r">
                      {discountPercentage}% off
                    </span>
                  </>
                )}
              </div>
            </div>
            <svg
              width="146"
              height="36"
              viewBox="0 0 146 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="pressable"
              onClick={() =>
                window.open(`https://www.headout.com/tour/${tgid}`)
              }
            >
              <mask
                id="path-1-inside-1_5_8105"
                fill={isLight ? "#8000FF" : "white"}
              >
                <path d="M0 8C0 3.58172 3.58172 0 8 0H137.476C141.894 0 145.476 3.58172 145.476 8V28C145.476 32.4183 141.894 36 137.476 36H8C3.58173 36 0 32.4183 0 28V8Z" />
              </mask>
              <path
                d="M0 8C0 3.58172 3.58172 0 8 0H137.476C141.894 0 145.476 3.58172 145.476 8V28C145.476 32.4183 141.894 36 137.476 36H8C3.58173 36 0 32.4183 0 28V8Z"
                fill={isLight ? "#8000FF" : "white"}
                fillOpacity="0.06"
              />
              <path
                d="M8 0V1H137.476V0V-1H8V0ZM145.476 8H144.476V28H145.476H146.476V8H145.476ZM137.476 36V35H8V36V37H137.476V36ZM0 28H1V8H0H-1V28H0ZM8 36V35C4.13401 35 1 31.866 1 28H0H-1C-1 32.9706 3.02944 37 8 37V36ZM145.476 28H144.476C144.476 31.866 141.342 35 137.476 35V36V37C142.447 37 146.476 32.9706 146.476 28H145.476ZM137.476 0V1C141.342 1 144.476 4.13401 144.476 8H145.476H146.476C146.476 3.02944 142.447 -1 137.476 -1V0ZM8 0V-1C3.02944 -1 -1 3.02944 -1 8H0H1C1 4.13401 4.13401 1 8 1V0Z"
                fill={isLight ? "#8000FF" : "white"}
                fillOpacity="0.1"
                mask="url(#path-1-inside-1_5_8105)"
              />
              <path
                d="M13.218 23V13.76H16.368C18.72 13.76 19.91 14.446 19.91 16.126C19.91 17.148 19.322 17.736 18.216 18.002C19.56 18.296 20.344 19.024 20.344 20.298C20.344 22.02 19 23 16.69 23H13.218ZM14.884 17.652H16.718C17.586 17.652 18.202 17.106 18.202 16.322C18.202 15.538 17.74 15.132 16.27 15.132H14.884V17.652ZM14.884 21.642H16.69C17.95 21.642 18.566 21.236 18.566 20.326C18.566 19.514 18.146 18.856 16.368 18.856H14.884V21.642ZM24.8757 23.168C22.6357 23.168 21.4877 21.698 21.4877 19.486C21.4877 17.4 22.7757 15.818 24.9877 15.818C27.1857 15.818 28.3757 17.232 28.3757 19.416C28.3757 21.53 27.0597 23.168 24.8757 23.168ZM24.9037 21.894C26.0377 21.894 26.6397 20.914 26.6397 19.458C26.6397 18.03 26.0657 17.064 24.9597 17.064C23.8257 17.064 23.2237 18.016 23.2237 19.444C23.2237 20.886 23.7977 21.894 24.9037 21.894ZM32.8875 23.168C30.6475 23.168 29.4995 21.698 29.4995 19.486C29.4995 17.4 30.7875 15.818 32.9995 15.818C35.1975 15.818 36.3875 17.232 36.3875 19.416C36.3875 21.53 35.0715 23.168 32.8875 23.168ZM32.9155 21.894C34.0495 21.894 34.6515 20.914 34.6515 19.458C34.6515 18.03 34.0775 17.064 32.9715 17.064C31.8375 17.064 31.2355 18.016 31.2355 19.444C31.2355 20.886 31.8095 21.894 32.9155 21.894ZM38.0012 23V12.682H39.6252V17.834L39.5412 19.584L42.2152 16H44.2592L41.9632 18.8L44.4132 23H42.5372L40.7592 19.822L39.5832 21.18L39.6112 21.614V23H38.0012ZM51.6316 23.168C49.3916 23.168 48.2436 21.698 48.2436 19.486C48.2436 17.4 49.5316 15.818 51.7436 15.818C53.9416 15.818 55.1316 17.232 55.1316 19.416C55.1316 21.53 53.8156 23.168 51.6316 23.168ZM51.6596 21.894C52.7936 21.894 53.3956 20.914 53.3956 19.458C53.3956 18.03 52.8216 17.064 51.7156 17.064C50.5816 17.064 49.9796 18.016 49.9796 19.444C49.9796 20.886 50.5536 21.894 51.6596 21.894ZM56.7453 23V16H58.3693V16.952C58.3693 17.148 58.3273 17.806 58.3273 17.806H58.4113C58.8033 16.574 59.6713 15.832 60.8193 15.832C62.1353 15.832 62.9473 16.616 62.9473 18.324V23H61.2393V18.758C61.2393 17.61 60.7633 17.288 60.0773 17.288C59.2233 17.288 58.4393 18.058 58.4253 19.402V23H56.7453Z"
                fill={isLight ? "#8000FF" : "white"}
              />
              <g clipPath="url(#clip0_5_8105)">
                <path
                  d="M91.178 16.3001C91.8218 15.7934 92.7261 15.3663 93.6954 15.3663C94.6141 15.3663 95.381 15.7427 95.381 17.176V22.0476H94.1005V17.48C94.1005 16.662 93.7388 16.4376 93.1095 16.4376C92.3933 16.4376 91.7277 16.7778 91.1852 17.0891V22.0476H89.9048V13.2381H90.6065C91.0984 13.2381 91.1852 13.3539 91.1852 14.0923V16.3001H91.178Z"
                  fill={isLight ? "#8000FF" : "white"}
                />
                <path
                  d="M97.6454 18.9712C97.7099 20.513 98.4054 21.0912 99.6314 21.0912C100.47 21.0912 101.044 20.8199 101.438 20.4987H101.847V21.3767C101.374 21.6979 100.664 22.0476 99.4378 22.0476C97.4446 22.0476 96.3333 20.7842 96.3333 18.7428C96.3333 16.6729 97.6167 15.381 99.3159 15.381C101.037 15.381 102.048 16.3874 102.048 18.5216C102.048 18.6929 102.033 18.9213 102.033 18.9712H97.6454ZM97.6669 18.1361H100.786C100.764 16.73 100.212 16.2518 99.3159 16.2518C98.4627 16.2518 97.8031 16.7585 97.6669 18.1361Z"
                  fill={isLight ? "#8000FF" : "white"}
                />
                <path
                  d="M106.757 21.2553C106.268 21.7764 105.679 22.0476 104.81 22.0476C103.624 22.0476 102.762 21.3767 102.762 20.1133C102.762 18.7857 103.825 18.1361 105.298 18.1361C105.859 18.1361 106.276 18.2004 106.721 18.3074V17.4509C106.721 16.68 106.268 16.3446 105.406 16.3446C104.63 16.3446 104.034 16.5801 103.617 16.8799H103.215V15.9377C103.789 15.6522 104.515 15.381 105.564 15.381C107.116 15.381 108 15.9377 108 17.3652V21.9691H107.497C107.008 21.9762 106.836 21.8335 106.757 21.2553ZM106.721 20.4345V19.0569C106.362 18.9855 105.959 18.9356 105.507 18.9356C104.63 18.9356 104.005 19.2568 104.005 20.0419C104.005 20.8485 104.515 21.184 105.219 21.184C105.909 21.1768 106.347 20.8556 106.721 20.4345Z"
                  fill={isLight ? "#8000FF" : "white"}
                />
                <path
                  d="M113.666 21.0863C113.223 21.6244 112.54 22.0476 111.661 22.0476C110.323 22.0476 109.19 21.072 109.19 18.805C109.19 16.244 110.549 15.3472 111.837 15.3472C112.716 15.3472 113.244 15.6126 113.659 16.0216V13.2381H114.342C114.834 13.2381 114.905 13.3601 114.905 14.0846V21.9687H114.081C113.8 21.9759 113.701 21.8252 113.666 21.0863ZM113.652 20.2398V16.9183C113.286 16.5668 112.843 16.3659 112.181 16.3659C111.337 16.3659 110.443 16.825 110.443 18.7333C110.443 20.5196 111.091 21.1007 111.963 21.1007C112.674 21.115 113.174 20.7778 113.652 20.2398Z"
                  fill={isLight ? "#8000FF" : "white"}
                />
                <path
                  d="M116.095 18.7428C116.095 16.6729 117.433 15.381 119.19 15.381C120.948 15.381 122.286 16.6729 122.286 18.7428C122.286 20.8056 120.948 22.0476 119.19 22.0476C117.433 22.0476 116.095 20.8056 116.095 18.7428ZM120.991 18.7428C120.991 17.1797 120.286 16.3374 119.183 16.3374C118.095 16.3374 117.376 17.1797 117.376 18.7428C117.376 20.306 118.095 21.0912 119.183 21.0912C120.286 21.0912 120.991 20.3131 120.991 18.7428Z"
                  fill={isLight ? "#8000FF" : "white"}
                />
                <path
                  d="M127.665 20.4135V15.381H128.952V21.9609H128.145C127.84 21.9609 127.716 21.8596 127.68 21.2161C127.025 21.6789 126.16 22.0476 125.287 22.0476C124.247 22.0476 123.476 21.621 123.476 20.2906V15.381H124.763V19.9941C124.763 20.8401 125.178 21.0353 125.789 21.0353C126.458 21.0426 127.134 20.7244 127.665 20.4135Z"
                  fill={isLight ? "#8000FF" : "white"}
                />
                <path
                  d="M129.905 15.2892H130.692V13.4762H131.458C131.852 13.4762 131.973 13.6236 131.973 14.1911L131.959 15.2892H133.405V16.2105H131.959V20.1535C131.959 20.8684 132.245 21.0748 132.889 21.0748H133.476V21.9223C133.247 21.9739 132.889 22.0476 132.446 22.0476C131.343 22.0476 130.699 21.5686 130.699 20.323V16.2105H129.912V15.2892H129.905Z"
                  fill={isLight ? "#8000FF" : "white"}
                />
                <path
                  d="M85.8326 17.0856C84.5071 19.5747 81.226 20.8157 77.8435 20.8157C75.1563 20.8157 72.5126 20.4601 70.2093 19.4369C75.714 20.0247 81.0449 19.7925 85.8326 17.0856ZM85.8326 16.0479C84.2247 15.5689 82.776 15.4311 81.2767 15.4456C77.4741 15.4746 73.628 16.6212 70.231 18.1234C72.9327 15.7213 76.9526 13.9724 80.9798 13.9724C82.8992 13.9724 85.1083 14.7925 85.8326 16.0479ZM86.5714 16.5922C86.5714 14.0377 82.7253 13 80.5307 13C77.0902 13 74.2002 14.2554 71.7303 15.6343C71.5782 15.3585 71.3609 15.3077 71.0205 15.2642C70.5135 15.2206 70.202 15.1988 69.8181 15.1988C69.398 15.1988 68.7679 15.2279 68.2753 15.3077C68.0363 15.3512 67.9567 15.5399 68.0218 15.8302C68.2391 16.6212 68.5651 17.3324 68.9924 18C68.8041 18.6531 68.8693 19.27 69.4125 19.7779C69.2242 20.5399 69.1662 21.3745 69.1952 22.1292C69.2387 22.4412 69.398 22.5283 69.6588 22.4848C70.6294 22.3324 71.571 21.9913 72.3894 21.5559C72.5922 21.447 72.6864 21.3237 72.7443 21.1713L75.1418 21.5414C75.5112 21.9405 75.8806 22.2816 76.3297 22.6589C76.6266 22.8766 76.9453 23 77.3365 23C79.0821 22.9855 80.5524 22.7242 81.7693 22.2598C82.2473 22.1074 82.6022 21.4688 83.131 20.5762C84.3043 19.9811 86.5714 18.8636 86.5714 16.5922Z"
                  fill={isLight ? "#8000FF" : "white"}
                />
              </g>
              <defs>
                <clipPath id="clip0_5_8105">
                  <rect
                    width="65.4762"
                    height="10"
                    fill="white"
                    transform="translate(68 13)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        )}
      </div>
      <RemovePOISheet
        open={isRemoveSheetOpen}
        onOpenChange={setRemoveSheetOpen}
        poi={poi}
        onConfirmRemove={onRemove}
      />
    </>
  );
}
