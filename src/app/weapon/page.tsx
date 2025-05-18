import Image from "next/image";
import { weapons } from "~/data/weapons";
import { getImagePath } from "~/lib/functions";

const categories = [
  { key: "sidearms", label: "Sidearms" },
  { key: "smgs", label: "SMGs" },
  { key: "rifles", label: "Rifles" },
  { key: "shotguns", label: "Shotguns" },
  { key: "snipers", label: "Sniper Rifles" },
  { key: "lmgs", label: "Machine Guns" },
];

export default function WeaponPage() {
  return (
    <div className="bg-opacity-80 flex min-h-screen flex-col items-center bg-black py-8">
      <h1 className="mb-8 text-4xl font-bold tracking-wide text-white">
        Valorant Weapons
      </h1>
      <div className="grid w-full max-w-7xl grid-cols-1 gap-4 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((cat) => (
          <div key={cat.key} className="flex flex-col">
            <h2 className="mb-4 text-center text-lg font-semibold tracking-wider text-gray-200 uppercase">
              {cat.label}
            </h2>
            <div className="flex flex-col gap-3">
              {weapons[cat.key]?.map((weapon) => (
                <div
                  key={weapon.name}
                  className="bg-opacity-80 flex flex-col items-center rounded-lg border border-gray-700 bg-gray-900 p-3 shadow-md"
                >
                  <div className="mb-2 flex h-16 w-24 items-center justify-center">
                    <Image
                      src={getImagePath(weapon.image)}
                      alt={weapon.name}
                      width={96}
                      height={64}
                      className="max-h-16 object-contain"
                    />
                  </div>
                  <span className="text-center text-base font-bold tracking-tight text-white">
                    {weapon.name}
                  </span>
                  <span className="mt-1 font-mono text-sm text-green-400">
                    &#x20B9;{weapon.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center text-sm text-gray-400">
        <p>
          To add or update weapon images, place them in{" "}
          <code className="rounded bg-gray-800 px-2 py-1">
            public/images/weapons/
          </code>
          .<br />
          If an image is missing, <code>Classic.webp</code> will be used as a
          fallback.
        </p>
      </div>
    </div>
  );
}
