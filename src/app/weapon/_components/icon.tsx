import type { ReactNode } from "react";
import Image from "next/image";
import { getImagePath } from "~/lib/functions";
import type { Weapon } from "~/data/weapons";

export default function WeaponIcon({
  isSelected,
  onClick,
  weapon,
}: Readonly<{
  isSelected: boolean;
  onClick: () => void;
  weapon: Weapon;
}>): ReactNode {
  const className =
    "clickable weapon " + (isSelected ? "selected" : "unselected");

  return (
    <div className={className} onClick={onClick}>
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
  );
}
