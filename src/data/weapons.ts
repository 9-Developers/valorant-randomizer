import type { Named } from "~/data/named";

/**
 * Icon data.
 */
export type Weapon = Named &
  Readonly<{
    /** Price. */
    price: number;
    /** Filename (e.g. "Vandal.webp"). */
    image?: string;
  }>;

export const classic: Weapon = {
  name: "Classic",
  price: 0,
  image: "Classic.webp",
};

export const sidearms: Weapon[] = [
  classic,
  { name: "Shorty", price: 300, image: "Shorty.webp" },
  { name: "Frenzy", price: 450, image: "Frenzy.webp" },
  { name: "Ghost", price: 500, image: "Ghost.webp" },
  { name: "Sheriff", price: 800, image: "Sheriff.webp" },
];

export const smgs: Weapon[] = [
  { name: "Stinger", price: 1100, image: "Stinger.webp" },
  { name: "Spectre", price: 1600, image: "Spectre.webp" },
];

export const rifles: Weapon[] = [
  { name: "Bulldog", price: 2050, image: "Bulldog.webp" },
  { name: "Guardian", price: 2250, image: "Guardian.webp" },
  { name: "Phantom", price: 2900, image: "Phantom.webp" },
  { name: "Vandal", price: 2900, image: "Vandal.webp" },
];

export const shotguns: Weapon[] = [
  { name: "Bucky", price: 850, image: "Bucky.webp" },
  { name: "Judge", price: 1850, image: "Judge.webp" },
];

export const snipers: Weapon[] = [
  { name: "Marshal", price: 950, image: "Marshal.webp" },
  { name: "Outlaw", price: 2400, image: "Outlaw.webp" },
  { name: "Operator", price: 4700, image: "Operator.webp" },
];

export const lmgs: Weapon[] = [
  { name: "Ares", price: 1600, image: "Ares.webp" },
  { name: "Odin", price: 3200, image: "Odin.webp" },
];
