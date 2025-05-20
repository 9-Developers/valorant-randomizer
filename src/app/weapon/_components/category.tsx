import type { ReactNode } from "react";
import { type Weapon } from "~/data/weapons";
import Image from "next/image";
import { getImagePath } from "~/lib/functions";

export default function WeaponCategory({
  category,
  weapons,
}: Readonly<{
  category: string;
  weapons: Weapon[];
}>): ReactNode {
  return (
    <>
      <h2 className="weapon-category-heading">{category}</h2>

      {weapons.map((weapon) => (
        <div key={weapon.name} className="weapon">
          <div className="weapon-image-container">
            <Image
              src={getImagePath(weapon.image)}
              alt={weapon.name}
              style={{ objectFit: "contain" }}
              width={96}
              height={64}
            />
          </div>

          <span className="weapon-name">{weapon.name}</span>

          <span className="weapon-price">&#x20B9;{weapon.price}</span>
        </div>
      ))}
    </>
  );
}
