"use client";

import { motion } from "framer-motion";
import { Logo } from "@/src/svgs/Logo";
import { Arrow } from "@/src/svgs/Arrow";
import { useState } from "react";
import { BackgroundDetailing } from "@/src/svgs/BackgroundDetailing";
import { SignInSheet } from "@/src/components/SignInSheet";
import { containerVariants, itemVariants } from "@/lib/mockCityData";

export default function LoginPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-b from-[#1a0b2e] to-[#0d001a] min-h-screen text-white font-sans flex flex-col items-center overflow-hidden relative">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="375"
          height="442"
          viewBox="0 0 375 442"
          fill="none"
          className="fixed top-[-29px]"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        >
          <g filter="url(#filter0_f_79_14021)">
            <circle
              cx="173.5"
              cy="220.5"
              r="107.5"
              fill="#4788C1"
              fill-opacity="0.21"
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
          className="fixed top-[43px]"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        >
          <g filter="url(#filter0_f_79_14022)">
            <circle
              cx="200.5"
              cy="221.5"
              r="107.5"
              fill="#5A0075"
              fill-opacity="0.6"
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
        <BackgroundDetailing className="absolute top-[156px]" />
        <motion.div
          className="flex flex-col items-center text-center w-full max-w-sm h-[100vh]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="mt-[167px] mb-[14px] flex flex-col items-center justify-center">
            <motion.div variants={itemVariants} className="mb-10">
              <Logo width={167.53244018554688} height={170} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                className="border-2 border-[#E168FF30] rounded-[100px] px-4 py-3 bg-[rgba(0,0,0,0.60)] backdrop-blur-sm hover:bg-white/20 transition-transform transform active:scale-98 text-[#FFF] font-[halyard-text] text-[16px] font-[500] leading-[20px] tracking-[0px] whitespace-nowrap"
                onClick={() => setIsSheetOpen(true)}
              >
                Sign up to get started
              </button>
            </motion.div>
          </div>

          <div className="flex-grow bg-[#ffffff10] w-[2px]" />

          <motion.div
            className="flex flex-col items-center w-full"
            variants={itemVariants}
          >
            <div className="flex flex-col items-center text-center">
              <p className="text-lg text-white/80 mb-1 font-[halyard-text] font-semibold text-[21px] leading-[28px] tracking-[0]">
                So...
              </p>
              <p className="text-2xl font-medium text-white font-[halyard-text] font-semibold text-[21px] leading-[28px] tracking-[0]">
                Why Us?
              </p>
            </div>
            <Arrow className="mt-[12px] mb-[40px]" />
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full max-w-sm text-center mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            {
              title: "One tool. Every trip",
              description:
                "From saving must-see spots to building flexible daily routes, our bookmarking + itinerary builder helps you travel with clarity, not clutter.",
              icon: (
                <svg
                  width="24"
                  height="20"
                  viewBox="0 0 24 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.9918 6.35932L18.3516 6.10712L16.4111 5.9894C13.7568 5.82837 11.4731 7.85081 11.3121 10.5051C11.2453 11.607 11.5543 12.6436 12.1273 13.4906L15.8377 19.2161C15.954 19.3954 16.1364 19.4867 16.3237 19.4961C16.3295 19.4984 16.3331 19.5025 16.337 19.5028L18.336 19.624L18.3364 19.6182L18.6046 17.037L18.0794 17.1108L20.269 13.2505C20.2712 13.2468 20.2715 13.2429 20.2698 13.2388C20.6449 12.6039 20.8791 11.8743 20.9268 11.0884C21.0538 8.99381 19.822 7.13197 17.9918 6.35932ZM17.1359 12.6259C16.4915 12.2776 16.0721 11.5768 16.1194 10.7967C16.1668 10.0166 16.6677 9.37366 17.3495 9.10576C17.9939 9.45411 18.4134 10.1529 18.3661 10.933C18.3188 11.7131 17.8177 12.358 17.1359 12.6259Z"
                    fill="black"
                  />
                  <path
                    d="M18.3516 6.10707C15.6974 5.94605 13.4137 7.96848 13.2527 10.6227C13.1858 11.7246 13.4948 12.7612 14.0698 13.6084L17.7782 19.3337C17.8926 19.5129 18.0767 19.6083 18.2639 19.6196C18.2873 19.621 18.3128 19.6206 18.3365 19.6181C18.5367 19.6088 18.7331 19.5013 18.845 19.3025L22.2115 13.3683L22.2123 13.3566C22.5855 12.7216 22.8196 11.992 22.8673 11.206C23.0283 8.55177 21.0078 6.26822 18.3516 6.10707ZM16.1195 10.7967C16.1668 10.0166 16.6678 9.37361 17.3496 9.10571C17.9939 9.45407 18.4135 10.1529 18.3662 10.933C18.3189 11.7131 17.8178 12.358 17.136 12.6259C16.4916 12.2775 16.0722 11.5768 16.1195 10.7967Z"
                    fill="#C7A5F7"
                  />
                  <path
                    d="M20.0023 11.032C19.9372 12.1046 19.0147 12.9216 17.9421 12.8565C17.6495 12.8388 17.3765 12.7576 17.1359 12.6256C17.8177 12.3577 18.3188 11.7128 18.3661 10.9327C18.4134 10.1526 17.9938 9.4538 17.3495 9.10544C17.6042 9.00345 17.8851 8.9559 18.1776 8.97365C19.2502 9.03872 20.0674 9.95933 20.0023 11.032Z"
                    fill="black"
                  />
                  <path
                    d="M11.0108 0.933806L11.5187 0.577822L8.77969 0.411657C5.03319 0.184369 1.80977 3.03904 1.58249 6.78553C1.48813 8.34085 1.92432 9.80402 2.73314 10.9997L7.97033 19.0811C8.13457 19.3342 8.39198 19.4631 8.65642 19.4764C8.66452 19.4796 8.66968 19.4855 8.67519 19.4858L11.4968 19.657L11.4973 19.6487L11.8758 16.0054L11.1345 16.1096L14.2252 10.6608C14.2283 10.6554 14.2286 10.6499 14.2262 10.6443C14.7558 9.74806 15.0863 8.71822 15.1536 7.60885C15.3329 4.65239 13.5943 2.02439 11.0108 0.933806ZM9.80283 9.77913C8.89327 9.28741 8.30124 8.29829 8.36804 7.19719C8.43484 6.09609 9.14193 5.18855 10.1043 4.81041C11.0138 5.30211 11.606 6.28847 11.5392 7.38958C11.4724 8.49068 10.7651 9.40097 9.80283 9.77913Z"
                    fill="black"
                  />
                  <path
                    d="M11.5188 0.577916C7.77231 0.350628 4.54891 3.2053 4.32162 6.95179C4.22727 8.50711 4.66346 9.97028 5.47502 11.1661L10.7095 19.2474C10.871 19.5003 11.1308 19.6349 11.3951 19.6509C11.4281 19.6529 11.464 19.6523 11.4974 19.6488C11.78 19.6356 12.0572 19.4839 12.2152 19.2033L16.9671 10.8272L16.9681 10.8107C17.4949 9.91432 17.8254 8.88448 17.8927 7.77511C18.12 4.02861 15.2681 0.805371 11.5188 0.577916ZM8.36818 7.19729C8.43498 6.09618 9.14207 5.18865 10.1044 4.8105C11.0139 5.30221 11.6062 6.28857 11.5394 7.38967C11.4726 8.49077 10.7653 9.40106 9.80297 9.77922C8.89341 9.2875 8.30138 8.29839 8.36818 7.19729Z"
                    fill="#C7A5F7"
                  />
                  <path
                    d="M13.8486 7.52997C13.7568 9.04399 12.4546 10.1972 10.9405 10.1054C10.5276 10.0803 10.1422 9.96578 9.80266 9.77941C10.765 9.40125 11.4723 8.49096 11.5391 7.38986C11.6059 6.28876 11.0136 5.30239 10.1041 4.81069C10.4637 4.66672 10.8601 4.59961 11.273 4.62466C12.7871 4.71651 13.9405 6.01596 13.8486 7.52997Z"
                    fill="black"
                  />
                </svg>
              ),
            },
            {
              title: "For the travel savvy",
              description:
                "Save more than just locations — save time, context, and flow. Turn scattered ideas into smart, shareable travel plans.",
              icon: (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.4665 9.75372L17.6967 17.8262C17.5032 18.7089 16.6311 19.2666 15.75 19.0731L8.28357 17.4362L8.58434 16.0669L15.6971 17.6267C15.9525 17.6826 16.2049 17.5209 16.2608 17.2639L17.9914 9.37133C18.2544 8.16976 17.4956 6.9833 16.2941 6.72032L10.8923 5.53536L11.2414 3.94385L16.4815 5.09252C18.5929 5.55501 19.929 7.64227 19.4665 9.75372Z"
                    fill="#C7A5F7"
                  />
                  <path
                    d="M15.2406 2.32826L14.636 5.08961L12.8722 4.70269L13.3906 2.33128C13.4435 2.08945 13.2909 1.85065 13.049 1.79775L10.7169 1.28689C10.4751 1.234 10.2363 1.38665 10.1834 1.62847L9.66498 3.99988L8.48608 3.74143L9.09216 0.980079C9.23876 0.307498 9.90379 -0.118722 10.5764 0.0293933L14.2899 0.842535C14.9625 0.99065 15.3887 1.65568 15.2406 2.32826Z"
                    fill="#C7A5F7"
                  />
                  <path
                    d="M10.3663 2.23856L12.663 2.74203C15.8561 3.44205 17.8803 6.60283 17.1803 9.79602L15.1559 19.0305C15.0386 19.5656 14.5089 19.9047 13.9739 19.7874L2.04487 17.1723C1.50981 17.055 1.17064 16.5254 1.28794 15.9904L3.31235 6.75586C4.01236 3.56268 7.17315 1.53854 10.3663 2.23856Z"
                    fill="black"
                  />
                  <path
                    d="M15.9692 9.55141L15.1983 13.067L15.0584 13.7042C15.0163 13.8958 14.827 14.0172 14.6353 13.9755C14.4431 13.9337 14.3212 13.7437 14.3635 13.5515L14.5031 12.9158L15.2905 9.32621C15.9193 6.45301 14.3474 3.60853 11.7009 2.55811C14.751 3.3652 16.6508 6.44093 15.9692 9.55141Z"
                    fill="white"
                  />
                  <path
                    d="M9.56796 2.07916C12.6702 2.75925 14.6368 5.83006 13.9567 8.93234L11.8919 18.3509C11.777 18.8753 11.2579 19.2077 10.7335 19.0927L1.39185 17.0448C0.867472 16.9299 0.535073 16.4108 0.650028 15.8864L2.71479 6.46787C3.39487 3.36558 6.46568 1.39907 9.56796 2.07916Z"
                    fill="#C7A5F7"
                  />
                  <path
                    d="M11.9217 10.6534L3.74061 8.8599C3.27185 8.75713 2.80854 9.05383 2.70578 9.52259L2.46925 10.6015C2.36648 11.0703 2.66318 11.5336 3.13194 11.6364L11.313 13.4299C11.7818 13.5326 12.2451 13.2359 12.3478 12.7672L12.5844 11.6882C12.6871 11.2194 12.3904 10.7561 11.9217 10.6534Z"
                    fill="white"
                  />
                  <path
                    d="M14.7397 15.2566L14.6757 15.5485C14.6338 15.7398 14.4448 15.861 14.2534 15.8193C14.0616 15.7775 13.9402 15.5881 13.9822 15.3964L14.0462 15.1045C14.0882 14.9131 14.2772 14.792 14.4686 14.8337C14.6603 14.8754 14.7818 15.0649 14.7397 15.2566Z"
                    fill="white"
                  />
                </svg>
              ),
            },
            {
              title: "Build Effortless Itineraries",
              description:
                "Drag, drop, and customize daily plans that actually match your pace — no spreadsheets, no chaos.",
              icon: (
                <svg
                  width="23"
                  height="20"
                  viewBox="0 0 23 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.9323 3.30493L7.99421 5.38149L0.89342 3.52396C0.469973 3.41319 0.0561523 3.73268 0.0561523 4.17037V17.4076C0.0561523 17.7115 0.261222 17.9772 0.555222 18.0541L7.99421 20.0001L15.9323 17.9235L22.086 19.746C22.5142 19.8728 22.9439 19.5519 22.9439 19.1053V5.88046C22.9439 5.58452 22.7493 5.32383 22.4655 5.2398L15.9323 3.30493Z"
                    fill="black"
                  />
                  <path
                    d="M7.99434 6.80491V13.7596L2.42349 6.19555C2.16557 5.84535 2.49102 5.36546 2.91178 5.47551L7.99434 6.80491Z"
                    fill="white"
                  />
                  <path
                    d="M2.20503 8.17266L7.9941 16.0325V18.5271L1.66421 16.8714C1.54202 16.8394 1.45679 16.729 1.45679 16.6027V8.41847C1.45679 8.01831 1.96772 7.85046 2.20503 8.17266Z"
                    fill="white"
                  />
                  <path
                    d="M15.9323 4.77759L17.6803 5.29514C17.9563 5.37685 18.1456 5.63036 18.1456 5.91816V10.0268C18.1456 10.2696 18.0069 10.491 17.7885 10.5969L16.73 11.1102L15.9323 11.4975V4.77759Z"
                    fill="white"
                  />
                  <path
                    d="M17.6364 12.1732C17.8721 12.0594 18.1456 12.2311 18.1456 12.4929V16.3916C18.1456 16.7469 17.8038 17.0022 17.4631 16.9013L15.9323 16.4481V12.9958L17.6364 12.1732Z"
                    fill="white"
                  />
                  <path
                    d="M21.7064 6.64344V11.9095C21.7064 12.2013 21.3868 12.3804 21.138 12.228L20.6815 11.9486L19.9853 11.5224C19.6795 11.3352 19.493 11.0025 19.493 10.6439V6.19247C19.493 5.98694 19.6908 5.83927 19.8878 5.89761L21.5076 6.37716C21.6255 6.41208 21.7064 6.52043 21.7064 6.64344Z"
                    fill="white"
                  />
                  <path
                    d="M19.9098 13.0568L21.2329 13.8668C21.5271 14.0469 21.7064 14.3669 21.7064 14.7118V17.4985C21.7064 17.8278 21.3896 18.0644 21.0739 17.9709L20.2314 17.7215C19.7935 17.5918 19.493 17.1895 19.493 16.7328V13.2903C19.493 13.0764 19.7274 12.9451 19.9098 13.0568Z"
                    fill="white"
                  />
                  <path
                    d="M9.31653 17.8274C9.42117 17.9694 9.34946 18.1723 9.17883 18.217L7.99426 18.5266V16.0325L9.31653 17.8274ZM15.9327 16.4495L15.0695 16.676L13.7657 17.0168L11.3976 17.637C11.1207 17.7094 10.8271 17.6057 10.6573 17.3752L10.0079 16.4934C9.83234 16.2546 9.91619 15.9151 10.1827 15.7854L13.0548 14.3918L14.2892 13.7932L15.9327 12.9963V16.4495ZM11.3527 8.82837C11.5153 8.96114 11.6318 9.14234 11.6866 9.34497L12.5519 12.5383C12.635 12.8452 12.4883 13.1681 12.2023 13.3069L9.33899 14.6956C9.05928 14.8313 8.72256 14.7486 8.53821 14.4983L7.99426 13.759V6.80493L8.66418 6.63403L11.3527 8.82837ZM15.9327 11.4973L14.3956 12.2434C14.1541 12.3605 13.8653 12.229 13.795 11.97L13.3966 10.4973L12.8488 8.47778C12.8108 8.33788 12.7305 8.21311 12.6183 8.12134L10.9982 6.7981L10.8322 6.66235C10.6074 6.47873 10.6868 6.11722 10.9679 6.04517L15.9327 4.77759V11.4973Z"
                    fill="#C7A5F7"
                  />
                  <path
                    d="M7.84796 0.0039216C6.0743 -0.0843041 4.60864 1.32756 4.60864 3.08188C4.60864 3.28079 4.62764 3.47496 4.66352 3.66332C4.69887 3.84746 4.75005 4.0258 4.81653 4.19675L4.82761 4.22577C4.84425 4.26737 4.86204 4.30837 4.88042 4.34906L7.12786 9.59496C7.33982 10.0897 8.04121 10.0897 8.25317 9.59496L10.5006 4.34906C10.519 4.30837 10.5368 4.26737 10.5534 4.22577L10.5645 4.19675C10.631 4.0258 10.6822 3.84746 10.7175 3.66332C10.7583 3.44904 10.7773 3.22724 10.7713 2.9995C10.7292 1.40001 9.44603 0.0834104 7.84796 0.0039216Z"
                    fill="#C7A5F7"
                  />
                  <path
                    d="M8.92807 3.04872C8.93048 3.14021 8.92286 3.22931 8.90647 3.31539C8.89226 3.38936 8.87171 3.46101 8.845 3.52968L8.84055 3.54134C8.65805 3.99748 8.21187 4.31987 7.69045 4.31987C7.16903 4.31987 6.72285 3.99748 6.54036 3.54134L6.53591 3.52968C6.5092 3.46101 6.48864 3.38936 6.47444 3.31539C6.46002 3.23972 6.45239 3.16172 6.45239 3.08181C6.45239 2.37706 7.04118 1.80988 7.7537 1.84533C8.39568 1.87726 8.91118 2.40617 8.92807 3.04872Z"
                    fill="white"
                  />
                </svg>
              ),
            },
          ].map(({ title, description, icon }, idx) => (
            <motion.div
              variants={itemVariants}
              className="bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-sm mb-16"
              key={title}
            >
              <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
                {icon} {title}
              </h3>
              <p className="text-white/60 text-sm">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <SignInSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </>
  );
}
