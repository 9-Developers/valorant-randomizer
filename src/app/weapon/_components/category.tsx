import type { ReactNode } from "react";
import WeaponIcon from "~/app/weapon/_components/icon";
import { type Weapon } from "~/data/weapons";

export default function WeaponCategory({
  category,
  isAffordable,
  isSelected,
  items,
  onCategoryClick,
  onWeaponClick,
}: Readonly<{
  category: string;
  isAffordable: (weapon: Weapon) => boolean;
  isSelected: (weapon: Weapon) => boolean;
  items: ReadonlyArray<Weapon>;
  onCategoryClick: () => void;
  onWeaponClick: (weapon: Weapon) => void;
}>): ReactNode {
  return (
    <>
      <h2
        className="clickable weapon-category-heading"
        onClick={onCategoryClick}
      >
        {category}
      </h2>

      {items.map((weapon) => (
        <WeaponIcon
          key={weapon.name}
          isAffordable={isAffordable(weapon)}
          isSelected={isSelected(weapon)}
          onClick={() => onWeaponClick(weapon)}
          weapon={weapon}
        />
      ))}
    </>
  );
}
