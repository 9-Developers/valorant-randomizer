import { weapons } from "~/data/weapons";
import type { Weapon } from "~/data/weapons";
import Image from "next/image";

const categories = [
  { key: "sidearms", label: "Sidearms" },
  { key: "smgs", label: "SMGs" },
  { key: "rifles", label: "Rifles" },
  { key: "shotguns", label: "Shotguns" },
  { key: "snipers", label: "Sniper Rifles" },
  { key: "lmgs", label: "Machine Guns" },
];

const getImagePath = (image?: string) =>
  image ? `/images/weapons/${image}` : "/images/weapons/Classic.webp";

export default function WeaponPage() {
  return (
    <div className="min-h-screen bg-black bg-opacity-80 flex flex-col items-center py-8">
      <h1 className="mb-8 text-4xl font-bold text-white tracking-wide">Valorant Weapons</h1>
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-2">
        {categories.map((cat) => (
          <div key={cat.key} className="flex flex-col">
            <h2 className="text-center text-lg font-semibold text-gray-200 mb-4 uppercase tracking-wider">
              {cat.label}
            </h2>
            <div className="flex flex-col gap-3">
              {(weapons as Record<string, Weapon[]>)[cat.key]?.map((weapon) => (
                <div
                  key={weapon.name}
                  className="flex flex-col items-center bg-gray-900 bg-opacity-80 rounded-lg p-3 border border-gray-700 shadow-md"
                >
                  <div className="w-24 h-16 flex items-center justify-center mb-2">
                    <Image
                      src={getImagePath(weapon.image)}
                      alt={weapon.name}
                      width={96}
                      height={64}
                      className="object-contain max-h-16"
                    />
                  </div>
                  <span className="text-white text-base font-bold tracking-tight text-center">
                    {weapon.name}
                  </span>
                  <span className="text-green-400 text-sm font-mono mt-1">
                    &#x20B9;{weapon.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-gray-400 text-sm text-center">
        <p>To add or update weapon images, place them in <code className="bg-gray-800 px-2 py-1 rounded">public/images/weapons/</code>.<br />
        If an image is missing, <code>Classic.webp</code> will be used as a fallback.</p>
      </div>
    </div>
  );
}
