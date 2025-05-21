import type { ReactNode } from "react";
import WeaponIcon from "~/app/weapon/_components/icon";
import { type Weapon } from "~/data/weapons";

export default function WeaponCategory({
  category,
  items,
  onCategoryClick,
  onWeaponClick,
  selected,
}: Readonly<{
  category: string;
  items: Weapon[];
  onCategoryClick: () => void;
  onWeaponClick: (weapon: Weapon) => void;
  selected: Weapon[];
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
          isSelected={
            selected.find((element) => element.name === weapon.name) !==
            undefined
          }
          onClick={() => onWeaponClick(weapon)}
          weapon={weapon}
        />
      ))}
    </>
  );
}
