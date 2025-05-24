import type { ReactNode } from "react";
import Image from "next/image";
import { getImagePath } from "~/lib/functions";
import type { Weapon } from "~/data/weapons";

export default function WeaponIcon({
  isAffordable,
  isSelected,
  onClick,
  weapon,
}: Readonly<{
  isAffordable: boolean;
  isSelected: boolean;
  onClick: () => void;
  weapon: Weapon;
}>): ReactNode {
  const containerClassName =
    "clickable weapon " + (isSelected ? "selected" : "unselected");
  const priceClassName =
    "weapon-price " + (isAffordable ? "affordable" : "unaffordable");

  return (
    <div className={containerClassName} onClick={onClick}>
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

      <span className={priceClassName}>&#x20B9;{weapon.price}</span>
    </div>
  );
}
