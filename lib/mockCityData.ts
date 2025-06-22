import { Variants } from "framer-motion";

export const mockCityData = [
  {
    id: "tokyo",
    name: "Tokyo",
    imageUrl: "/tokyo.jpg",
    placesSaved: 50,
  },
  {
    id: "kyoto",
    name: "Kyoto",
    imageUrl: "/kyoto.jpg",
    placesSaved: 53,
  },
  {
    id: "osaka",
    name: "Osaka",
    imageUrl: "/osaka.jpg",
    placesSaved: 48,
  },
  {
    id: "sapporo",
    name: "Sapporo",
    imageUrl: "/sapporo.jpg",
    placesSaved: 32,
  },
  {
    id: "fuji",
    name: "Mount Fuji",
    imageUrl: "/fuji.jpg",
    placesSaved: 60,
  },
];

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};
