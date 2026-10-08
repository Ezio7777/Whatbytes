import type { Product } from "@/types/product";

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const products: Product[] = [
  {
    id: "1",
    title: "Running Shoes",
    price: 99,
    category: "clothing",
    brand: "Stride",
    rating: 4.3,
    reviewCount: 214,
    description:
      "Lightweight running shoes with a breathable mesh upper and a cushioned sole. Built for daily runs and long walks.",
    image: img("photo-1542291026-7eec264c27ff"),
    gallery: [
      img("photo-1542291026-7eec264c27ff"),
      img("photo-1491553895911-0055eca6402d"),
    ],
    inStock: true,
  },
  {
    id: "2",
    title: "Wireless Headphones",
    price: 129,
    category: "electronics",
    brand: "Sonic",
    rating: 4.5,
    reviewCount: 532,
    description:
      "Over-ear wireless headphones with active noise cancellation and up to 30 hours of battery life.",
    image: img("photo-1505740420928-5e560c06d30e"),
    gallery: [
      img("photo-1505740420928-5e560c06d30e"),
      img("photo-1583394838336-acd977736f90"),
    ],
    inStock: true,
  },
  {
    id: "3",
    title: "Backpack",
    price: 129,
    category: "clothing",
    brand: "Trailmate",
    rating: 4.2,
    reviewCount: 98,
    description:
      "Water resistant everyday backpack with a padded laptop sleeve and plenty of organised pockets.",
    image: img("photo-1553062407-98eeb64c6a62"),
    gallery: [
      img("photo-1553062407-98eeb64c6a62"),
      img("photo-1546938576-6e6a64f317cc"),
    ],
    inStock: true,
  },
  {
    id: "4",
    title: "Smartwatch",
    price: 249,
    category: "electronics",
    brand: "Pulse",
    rating: 4.4,
    reviewCount: 341,
    description:
      "Smartwatch with heart rate tracking, GPS, sleep insights and a bright always-on display.",
    image: img("photo-1523275335684-37898b6baf30"),
    gallery: [
      img("photo-1523275335684-37898b6baf30"),
      img("photo-1546868871-7041f2a55e12"),
    ],
    inStock: true,
  },
  {
    id: "5",
    title: "Sunglasses",
    price: 149,
    category: "clothing",
    brand: "Shade",
    rating: 4.1,
    reviewCount: 76,
    description:
      "Polarised sunglasses with UV400 protection and a lightweight, durable frame.",
    image: img("photo-1572635196237-14b3f281503f"),
    gallery: [
      img("photo-1572635196237-14b3f281503f"),
      img("photo-1511499767150-a48a237f0083"),
    ],
    inStock: true,
  },
  {
    id: "6",
    title: "Digital Camera",
    price: 499,
    category: "electronics",
    brand: "Lumix",
    rating: 4.6,
    reviewCount: 188,
    description:
      "Compact digital camera with a 24MP sensor, 4K video and fast autofocus for everyday shooting.",
    image: img("photo-1516035069371-29a1b244cc32"),
    gallery: [
      img("photo-1516035069371-29a1b244cc32"),
      img("photo-1502920917128-1aa500764cbd"),
    ],
    inStock: true,
  },
  {
    id: "7",
    title: "T-shirt",
    price: 29,
    category: "clothing",
    brand: "Basic Co",
    rating: 4.0,
    reviewCount: 410,
    description:
      "Soft 100 percent cotton t-shirt with a relaxed fit. Easy to wear and easy to wash.",
    image: img("photo-1521572163474-6864f9cf17ab"),
    gallery: [
      img("photo-1521572163474-6864f9cf17ab"),
      img("photo-1583743814966-8936f5b7be1a"),
    ],
    inStock: true,
  },
  {
    id: "8",
    title: "Smartphone",
    price: 699,
    category: "electronics",
    brand: "Nova",
    rating: 4.5,
    reviewCount: 905,
    description:
      "6.5 inch OLED display, dual camera setup and all day battery. Fast, smooth and built to last.",
    image: img("photo-1511707171634-5f897ff02aa9"),
    gallery: [
      img("photo-1511707171634-5f897ff02aa9"),
      img("photo-1592899677977-9c10ca588bbd"),
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "9",
    title: "Desk Lamp",
    price: 59,
    category: "home",
    brand: "Lumo",
    rating: 4.3,
    reviewCount: 129,
    description:
      "Adjustable LED desk lamp with three brightness levels and a warm light mode for late evenings.",
    image: img("photo-1507473885765-e6ed057f782c"),
    gallery: [
      img("photo-1507473885765-e6ed057f782c"),
      img("photo-1534105615256-13940a56ff44"),
    ],
    inStock: true,
  },
  {
    id: "10",
    title: "Ceramic Mug Set",
    price: 34,
    category: "home",
    brand: "Hearth",
    rating: 4.4,
    reviewCount: 63,
    description:
      "Set of four handmade style ceramic mugs. Microwave and dishwasher safe.",
    image: img("photo-1514228742587-6b1558fcf93a"),
    gallery: [
      img("photo-1514228742587-6b1558fcf93a"),
      img("photo-1577937927133-66ef06acdf18"),
    ],
    inStock: true,
  },
];

export const getProductById = (id: string) =>
  products.find((product) => product.id === id);
