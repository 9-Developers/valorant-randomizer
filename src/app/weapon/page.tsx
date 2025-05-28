"use client";

import {
  type ChangeEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import WeaponCategory from "~/app/weapon/_components/category";
import { classic, type Weapon, weapons } from "~/data/weapons";
import {
  contains,
  getAffordable,
  invertMany,
  invertOne,
} from "~/lib/functions";
import { weaponCategories } from "~/data/category";
import WeaponSettings from "~/app/weapon/_components/settings";
import { Loadout, Shields } from "~/data/loadout";

export default function WeaponPage(): ReactNode {
  const [loadout, setLoadout] = useState<Loadout>(Loadout.BOTH);
  const [money, setMoney] = useState(9000);
  const [selected, setSelected] = useState(weapons);
  const [shields, setShields] = useState<Shields>(Shields.SHIELDS);
  const [weapon, setWeapon] = useState(classic);
  const affordable: ReadonlyArray<Weapon> = useMemo(
    () => getAffordable(money, weapons),
    [money],
  );

  useEffect(() => {
    rollRandomWeapon(affordable, selected);
  }, [affordable, selected]);

  function rollRandomWeapon(
    affordable: ReadonlyArray<Weapon>,
    selected: ReadonlyArray<Weapon>,
  ): Weapon {
    const selectable: ReadonlyArray<Weapon> = selected.filter((weapon) =>
      contains(weapon, affordable),
    );

    return selectable[Math.floor(Math.random() * selectable.length)] ?? classic;
  }

  function saveLoadout(event: ChangeEvent<HTMLInputElement>) {
    const loadout: Loadout = event.currentTarget.value as Loadout;

    setLoadout(loadout);
    localStorage.setItem("loadout", loadout);
  }

  function saveShields(event: ChangeEvent<HTMLInputElement>) {
    const shields: Shields = event.currentTarget.value as Shields;

    setShields(shields);
    localStorage.setItem("shields", loadout);
  }

  return (
    <div className="content">
      <h1 className="text-center">Valorant Weapons</h1>

      <p className="info">
        Get a random weapon from the list below.
        <br />
        All weapons are selected by default. Click on a heading (Sidearms, SMGs,
        etc.) to toggle all weapons in that category. Click on an individual
        weapon to toggle it.
        <br />
        Click on the &#34;Random weapon&#34; heading to get a new random weapon.
      </p>

      <hr />

      <WeaponSettings
        loadout={loadout}
        money={money}
        setLoadout={saveLoadout}
        setMoney={setMoney}
        setShields={saveShields}
        randomizeWeapon={() =>
          setWeapon(rollRandomWeapon(affordable, selected))
        }
        shields={shields}
        weapon={weapon}
      />

      <hr />

      <div className="weapons-select">
        {weaponCategories.map((category) => (
          <WeaponCategory
            key={category.category}
            category={category.category}
            isAffordable={(weapon) => contains(weapon, affordable)}
            isSelected={(weapon) => contains(weapon, selected)}
            items={category.items}
            onCategoryClick={() =>
              setSelected(invertMany(category.items, selected))
            }
            onWeaponClick={(weapon) => setSelected(invertOne(weapon, selected))}
          />
        ))}
      </div>
    </div>
  );
}
