"use client";

import {
  ChevronDown,
  ChevronLeft,
  Send,
  MessageSquare,
  User,
} from "lucide-react";
import { Logo } from "@/src/svgs/Logo";
import { BackgroundDetailing } from "@/src/svgs/BackgroundDetailing";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SearchSheet } from "@/src/components/SearchSheet";
import { containerVariants, itemVariants } from "./login/page";
import { Arrow } from "@/src/svgs/Arrow";
import { parseCookies } from "nookies";

const tripInspirations = {
  Worldwide: [
    {
      city: "Tokyo",
      image: "/tokyo.jpg",
      user: "martiitram",
      plan: "Plan you trip to Dubai for 5 days",
    },
    {
      city: "Mount Fuji",
      image: "/fuji.jpg",
      user: "martiitram",
      plan: "Plan you trip to Dubai for 5 days",
    },
    {
      city: "Kyoto",
      image: "/kyoto.jpg",
      user: "martiitram",
      plan: "Plan you trip to Dubai for 5 days",
    },
  ],
  Japan: [
    {
      city: "Tokyo",
      image: "/tokyo.jpg",
      user: "martiitram",
      plan: "Plan you trip to Dubai for 5 days",
    },
    {
      city: "Mount Fuji",
      image: "/fuji.jpg",
      user: "martiitram",
      plan: "Plan you trip to Dubai for 5 days",
    },
    {
      city: "Kyoto",
      image: "/kyoto.jpg",
      user: "martiitram",
      plan: "Plan you trip to Dubai for 5 days",
    },
  ],
};

export default function HomePage() {
  const [selectedTrip, setSelectedTrip] = useState<"Worldwide" | "Japan">(
    "Worldwide"
  );
  const [isSearchSheetOpen, setIsSearchSheetOpen] = useState(false);
  const [username, setUsername] = useState("Traveller");

  useEffect(() => {
    const cookies = parseCookies();
    const cookieUsername = cookies.username;
    if (cookieUsername) {
      setUsername(cookieUsername);
    }
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#1a0b2e] to-[#0d001a] min-h-screen text-white font-sans overflow-hidden relative px-4">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="375"
        height="442"
        viewBox="0 0 375 442"
        fill="none"
        className="fixed top-[-60px]"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      >
        <g filter="url(#filter0_f_79_14021)">
          <circle
            cx="173.5"
            cy="220.5"
            r="107.5"
            fill="#4788C1"
            fillOpacity="0.21"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_79_14021"
            x="-48"
            y="-1"
            width="443"
            height="443"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="57"
              result="effect1_foregroundBlur_79_14021"
            />
          </filter>
        </defs>
      </motion.svg>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="375"
        height="443"
        viewBox="0 0 375 443"
        fill="none"
        className="fixed top-[3px]"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      >
        <g filter="url(#filter0_f_79_14022)">
          <circle
            cx="200.5"
            cy="221.5"
            r="107.5"
            fill="#5A0075"
            fillOpacity="0.6"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_79_14022"
            x="-21"
            y="0"
            width="443"
            height="443"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="57"
              result="effect1_foregroundBlur_79_14022"
            />
          </filter>
        </defs>
      </motion.svg>
      <BackgroundDetailing className="absolute top-[0] left-0 right-0" />
      <motion.div
        className="flex flex-col items-center text-center w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mt-[66px] mb-[14px] flex flex-col items-center justify-center">
          <motion.div variants={itemVariants} className="mb-[10px]">
            <Logo width={167.53244018554688} height={170} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <button className="border-2 border-[#ffffff10] rounded-[10px] px-4 py-3 bg-[#ffffff20] backdrop-blur-sm hover:bg-white/20 transition-transform transform active:scale-98 text-[#FFF] font-[Halyard Text] font-[500] text-[15px] leading-[20px] tracking-[0] whitespace-nowrap flex gap-1.5 items-center justify-center px-2 py-1.5 mb-[40px]">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 12.5C24 16.8647 21.8529 20.706 18.599 22.9418C16.7061 24.2432 14.4383 25 12 25C11.8597 25 11.7201 24.9976 11.5805 24.9921C9.20106 24.9073 6.99736 24.101 5.16484 22.7752C2.04376 20.5182 0 16.7578 0 12.5C0 5.59694 5.37307 0 12 0C18.6269 0 24 5.59694 24 12.5Z"
                  fill="#E4FFF0"
                />
                <path
                  d="M9.57306 9.74087C9.28562 9.33222 4.1585 10.254 3.86427 9.29607C3.6485 8.59508 3.53836 5.89877 3.70735 5.48462C3.1966 6.73651 2.80505 8.06305 2.50177 9.4061C2.45726 9.60492 2.4135 9.8226 2.38106 10.0474C2.31467 10.5079 2.29505 10.9959 2.4135 11.4093C2.60286 12.0718 3.08268 12.1692 3.64549 12.2423C5.30147 12.4592 6.94613 12.7861 8.57042 13.2215C8.55005 12.9173 8.55684 12.6116 8.58853 12.3091C8.68736 11.3621 9.03138 10.4497 9.57306 9.74009V9.74087Z"
                  fill="#29609B"
                />
                <path
                  d="M21.3988 9.97105C21.3663 9.7463 21.3233 9.52861 21.2788 9.32979C20.977 7.98595 20.587 6.65941 20.0778 5.40674C20.246 5.82089 20.1336 8.5172 19.9171 9.21819C19.6213 10.1754 14.4957 9.24806 14.2075 9.65671C14.7484 10.3671 15.0917 11.2803 15.1898 12.2273C15.2207 12.5298 15.2275 12.8355 15.2071 13.1397C16.8322 12.7059 18.4776 12.3805 20.1336 12.166C20.6964 12.0929 21.1762 11.9962 21.3663 11.3337C21.4848 10.9204 21.4659 10.4316 21.4003 9.97184L21.3988 9.97105Z"
                  fill="#5494CD"
                />
                <path
                  d="M19.0932 15.4669C19.4508 17.1479 19.5745 18.9066 19.4591 20.6536C19.2433 20.5247 19.0276 20.3966 18.811 20.2678C18.799 21.1613 18.7281 22.0564 18.599 22.9421C16.7062 24.2435 14.4384 25.0002 12 25.0002C11.8597 25.0002 11.7201 24.9979 11.5806 24.9924V8.3328C11.5806 8.3328 12.5213 7.05262 14.5017 7.2208C14.2067 7.36697 13.5941 7.78269 13.4274 8.25342C14.3297 7.99645 15.189 8.20549 15.8159 8.66679C15.4855 8.73988 15.2252 8.99528 15.2056 9.16189C15.6907 9.26641 16.1668 9.42122 16.627 9.62162C17.3467 9.93439 18.0287 10.3611 18.6481 10.8877C18.3131 10.901 17.9782 10.9144 17.6432 10.9277C18.1441 11.2774 18.5704 11.7678 18.8812 12.3494C18.9152 12.4114 18.9468 12.4751 18.9778 12.5395C18.8058 12.4539 18.6073 12.4397 18.424 12.5002C19.229 13.4456 19.7873 14.6802 20.0121 16.0091C19.7058 15.8284 19.3995 15.6476 19.0932 15.4669Z"
                  fill="#08BED0"
                />
                <path
                  d="M11.5805 8.33251V24.9921C9.20107 24.9072 6.99737 24.1009 5.16485 22.7752C4.88647 21.6938 4.72879 20.5645 4.69862 19.425C4.69635 19.3394 4.60129 19.3119 4.56357 19.3865C4.51227 19.4887 4.45041 19.5846 4.37949 19.6694C4.33196 19.7268 4.25048 19.6922 4.25124 19.6136C4.26104 18.35 4.46021 17.0816 4.83592 15.8831C4.86157 15.8014 4.78462 15.733 4.72502 15.7849C4.381 16.0772 4.06187 16.4112 3.77368 16.779C3.72087 16.8466 3.62958 16.7892 3.6492 16.7012C3.94343 15.3464 4.45493 14.0489 5.14901 12.9008C5.19277 12.8285 5.1294 12.7373 5.06074 12.7734L4.44965 13.0996C4.37798 13.1381 4.31461 13.0391 4.36365 12.9668C4.4919 12.7758 4.62468 12.5888 4.76274 12.4064C5.4455 11.5003 6.24068 10.7105 7.1128 10.0732C6.99813 10.1636 6.17579 9.87831 5.93739 9.74786C5.91325 9.7345 5.89515 9.72271 5.88458 9.71328C6.7039 9.32349 7.92608 8.84725 8.79895 8.8166C8.58847 8.17298 8.0483 7.66295 7.0283 7.54271C9.573 6.86451 11.0374 8.08339 11.5805 8.33251Z"
                  fill="#0691AE"
                />
                <path
                  d="M11.8415 20.4057C14.4661 20.4057 16.5937 18.0987 16.5937 15.2528C16.5937 12.4069 14.4661 10.0999 11.8415 10.0999C9.21697 10.0999 7.08936 12.4069 7.08936 15.2528C7.08936 18.0987 9.21697 20.4057 11.8415 20.4057Z"
                  fill="white"
                />
                <path
                  d="M11.5807 10.1079C9.07902 10.2549 7.09184 12.5009 7.09033 15.2506C7.08882 18.0027 9.07675 20.2511 11.5807 20.3981V10.1079Z"
                  fill="#E0E0E0"
                />
                <path
                  d="M11.6471 12.2742C10.9923 12.3237 10.3541 12.6239 9.87725 13.1693C8.88668 14.2993 8.96363 16.0526 10.0493 17.0837C10.4883 17.501 11.0247 17.7359 11.5732 17.7941C12.0787 15.9206 12.1753 13.9952 11.6471 12.2742Z"
                  fill="#02A486"
                />
                <path
                  d="M13.8074 16.9046C14.7979 15.7745 14.721 14.0212 13.6353 12.9902C13.0733 12.4558 12.3513 12.2208 11.6474 12.2743C12.1748 13.9945 12.079 15.9207 11.5735 17.7942C12.3822 17.8791 13.2174 17.5789 13.8074 16.9054V16.9046Z"
                  fill="#04BF8A"
                />
                <path
                  d="M11.6818 16.6796C12.1639 16.7299 12.6618 16.5515 13.0134 16.15C13.6034 15.4765 13.5581 14.4321 12.9108 13.8167C12.5758 13.4984 12.1451 13.3578 11.7264 13.39C11.3363 13.4199 10.9561 13.5983 10.6717 13.9236C10.0817 14.5971 10.127 15.6415 10.7743 16.2568C11.036 16.5052 11.3559 16.6458 11.6826 16.6796H11.6818Z"
                  fill="#263238"
                />
              </svg>
              Hey {username}
            </button>
          </motion.div>
        </div>
      </motion.div>

      <div className="font-[Halyard Text] font-semibold text-[18px] leading-[24px] tracking-[0] text-center">
        Have an inspiration?
      </div>

      <div className="mt-4 relative mx-auto max-w-2xl">
        <input
          type="text"
          placeholder="Share your link with us"
          className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 py-5 font-[Halyard Text] font-light text-[14px] leading-[16px] tracking-[0] focus:outline-none "
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white w-9 h-9 rounded-full flex items-center justify-center pressable">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5979 2.07182C17.217 1.66165 16.6199 1.50802 16.0493 1.45303C15.4499 1.39525 14.7319 1.43368 13.9589 1.53506C12.4087 1.7384 10.5358 2.20908 8.73671 2.7882C6.93646 3.36769 5.18162 4.06492 3.86742 4.73293C3.21336 5.06538 2.64608 5.40177 2.23368 5.72487C2.02833 5.88576 1.84095 6.05906 1.69999 6.24351C1.56555 6.41944 1.42411 6.66976 1.42605 6.97151C1.43115 7.76357 1.97056 8.32335 2.54499 8.69906C3.1313 9.08259 3.8949 9.37161 4.65401 9.59796C5.42126 9.82676 6.2281 10.0041 6.92173 10.1478C6.96719 10.1572 7.05805 10.176 7.16939 10.199C7.58866 10.2856 7.79829 10.3289 7.99536 10.2699C8.19241 10.2109 8.34397 10.0595 8.64691 9.75644L11.6462 6.75727C11.9643 6.43906 12.4803 6.43906 12.7985 6.75727C13.1167 7.07548 13.1167 7.59139 12.7985 7.90959L10.0015 10.7065C9.69265 11.0154 9.53824 11.1698 9.47982 11.3703C9.42131 11.5707 9.46849 11.7835 9.56276 12.209C9.92813 13.8588 10.2454 15.2221 10.562 16.1392C10.7469 16.6749 10.9549 17.1386 11.2183 17.4806C11.4932 17.8374 11.8672 18.1071 12.3595 18.1288C12.6659 18.1423 12.9207 18.0024 13.0954 17.8726C13.2795 17.7358 13.4527 17.5523 13.6133 17.3518C13.936 16.9486 14.275 16.3908 14.6123 15.7461C15.2903 14.4506 16.0081 12.7135 16.6156 10.9264C17.2227 9.14012 17.7286 7.27688 17.9723 5.72833C18.0939 4.95605 18.154 4.23882 18.1206 3.63806C18.0889 3.06833 17.9675 2.46985 17.5979 2.07182Z"
              fill="url(#paint0_linear_52_1522)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_52_1522"
                x1="9.77788"
                y1="1.42603"
                x2="9.77788"
                y2="18.1297"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#970DD3" />
                <stop offset="1" stop-color="#459FA7" />
              </linearGradient>
            </defs>
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-4 my-4">
        <span className="font-[Halyard Text] font-semibold text-[15px] leading-[20px] tracking-[0] text-white/30 text-center mx-auto">
          OR
        </span>
      </div>

      <div className="bg-[#51F07E17] rounded-2xl p-4 pressable">
        <h3 className="font-[Halyard Text] font-semibold text-[18px] leading-[24px] tracking-[0] text-center flex gap-2 justify-center">
          Simply use our WhatsApp bot
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_54_1547)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.59351 23.0065L3.17048 17.2494C2.1976 15.5647 1.68599 13.6529 1.68658 11.6949C1.68951 5.56901 6.67448 0.585205 12.8009 0.585205C15.774 0.586376 18.5638 1.74364 20.6624 3.84335C22.7603 5.94364 23.9158 8.73467 23.9147 11.7036C23.9123 17.8295 18.9262 22.8139 12.8009 22.8139H12.7962C10.9365 22.8133 9.10843 22.3468 7.48521 21.4611L1.59351 23.0065Z"
                fill="white"
              />
              <path
                d="M12.8008 0.592285C15.7709 0.593496 18.56 1.75021 20.6572 3.84912C22.7544 5.94873 23.9084 8.73709 23.9072 11.7036C23.9049 17.8253 18.9218 22.8061 12.8008 22.8062C10.983 22.8056 9.18441 22.3568 7.58887 21.5083L7.48535 21.4536L7.37207 21.4839L1.60352 22.9946L3.14551 17.3687L3.17773 17.2495L3.11719 17.1421C2.18497 15.4862 1.69323 13.6053 1.69434 11.6958C1.69662 5.57343 6.67902 0.592285 12.8008 0.592285Z"
                fill="white"
                stroke="#F0F0F0"
                stroke-width="0.6"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19.3346 5.16982C17.5902 3.42426 15.2716 2.4625 12.8037 2.46191C7.70865 2.46191 3.56484 6.60396 3.5625 11.6955C3.56192 13.4405 4.05011 15.1392 4.97499 16.6102L5.19509 16.9597L4.26143 20.3671L7.75782 19.4504L8.09557 19.6506C9.51333 20.4924 11.1395 20.9372 12.7972 20.9378H12.8007C17.8923 20.9378 22.0361 16.7952 22.0378 11.7031C22.0384 9.23577 21.079 6.91538 19.3346 5.16982Z"
                fill="#40C351"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.0226 7.0509C9.81483 6.58847 9.59591 6.5791 9.39747 6.5709C9.23532 6.56388 9.05034 6.56447 8.86537 6.56447C8.68039 6.56447 8.37951 6.63412 8.12488 6.91217C7.87025 7.19022 7.15259 7.86164 7.15259 9.22788C7.15259 10.5941 8.14771 11.9147 8.28644 12.0997C8.42517 12.2847 10.2076 15.1781 13.0302 16.2915C15.3758 17.2164 15.8535 17.0326 16.3627 16.9863C16.872 16.9401 18.0059 16.3149 18.2371 15.6663C18.4683 15.0177 18.4683 14.4622 18.3992 14.3463C18.3296 14.2304 18.1446 14.1613 17.8671 14.022C17.5897 13.8827 16.224 13.2113 15.9694 13.1188C15.7147 13.0263 15.5298 12.9801 15.3442 13.2581C15.1592 13.5356 14.6271 14.1613 14.465 14.3463C14.3028 14.5319 14.1407 14.5553 13.8632 14.416C13.5858 14.2767 12.6913 13.984 11.6301 13.038C10.8047 12.3022 10.2474 11.3931 10.0853 11.1151C9.92312 10.8376 10.0677 10.6872 10.207 10.5485C10.3317 10.4238 10.4845 10.2242 10.6238 10.062C10.7625 9.89988 10.8088 9.78398 10.9013 9.599C10.9938 9.41344 10.9475 9.25129 10.8779 9.11256C10.8094 8.97325 10.2697 7.59998 10.0226 7.0509Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_54_1547">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </h3>
        <p className="font-[Halyard Text] font-light text-[14px] leading-[20px] tracking-[0] text-center text-white/60 mt-1">
          Found an amazing instagram reel or a brag worthy blog? Simply share
          the link with our bot and we'll do all the work for you!
        </p>
      </div>

      <div className="mt-[52px] mb-[32px]">
        <h2 className="font-[Halyard Text] font-[600] text-[18px] leading-[24px] tracking-[0] flex items-center gap-2">
          Get inspiration for{" "}
          <button
            className="flex items-center gap-1 text-[#DFBFFF] underline underline-offset-3 font-[Halyard Text] font-[600] text-[18px] leading-[24px] tracking-[0]"
            onClick={() => setIsSearchSheetOpen(true)}
          >
            {selectedTrip} trips <ChevronDown size={18} />
          </button>
        </h2>
      </div>

      <div className="flex gap-4 overflow-x-auto mt-4 pb-4">
        {tripInspirations[selectedTrip].map((trip, i) => (
          <div key={i} className="min-w-[180px]">
            <Image
              src={trip.image}
              alt={trip.city}
              width={180}
              height={220}
              className="rounded-lg object-cover"
            />
            <div className="mt-2">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-5 h-5 rounded-full bg-white/20"></div>
                <span>{trip.user}</span>
              </div>
              <p className="text-sm mt-1">{trip.plan}</p>
            </div>
          </div>
        ))}
      </div>
      <SearchSheet
        open={isSearchSheetOpen}
        onOpenChange={setIsSearchSheetOpen}
      />
    </div>
  );
}
