"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";
import WeaponCategory from "~/app/weapon/_components/category";
import { classic, type Weapon, weapons } from "~/data/weapons";
import {
  contains,
  getAffordable,
  getImagePath,
  invertMany,
  invertOne,
} from "~/lib/functions";
import Image from "next/image";
import { weaponCategories } from "~/data/category";

export default function WeaponPage(): ReactNode {
  const [money, setMoney] = useState(9000);
  const [selected, setSelected] = useState(weapons);
  const [weapon, setWeapon] = useState(classic);
  const affordable: ReadonlyArray<Weapon> = useMemo(
    () => getAffordable(money, weapons),
    [money],
  );

  useEffect(() => {
    const selectable: Weapon[] = selected.filter((weapon) =>
      contains(weapon, affordable),
    );

    setWeapon(
      selectable[Math.floor(Math.random() * selectable.length)] ?? classic,
    );
  }, [affordable, selected]);

  return (
    <div className="content bg-black">
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

      <div className="weapons">
        <div className="random-weapon">
          <h2
            className="clickable text-center"
            onClick={() =>
              setWeapon(
                affordable[Math.floor(Math.random() * affordable.length)] ??
                  classic,
              )
            }
          >
            Random weapon
          </h2>
          <h3 className="text-center">{weapon.name}</h3>
          <div className="random-weapon-container">
            <Image
              src={getImagePath(weapon.image)}
              alt={weapon.name}
              key={weapon.name}
              style={{ objectFit: "contain" }}
              height={256}
              width={256}
            />
          </div>
        </div>

        <div className="money">
          <h2>Money</h2>

          <form
            action={(formData) =>
              setMoney(parseInt((formData.get("money") as string) ?? "9000"))
            }
          >
            <label>
              Money: &#x20B9;
              <input
                autoComplete="off"
                defaultValue={money}
                inputMode="decimal"
                name="money"
                pattern="(?:0|[1-9]\d*)"
                size={4}
                type="text"
              />
            </label>

            <button type="submit">Update</button>
          </form>
        </div>
      </div>

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

      <p className="info">
        To add or update weapon images, place them in{" "}
        <code>public/images/weapons/</code>.<br />
        If an image is missing, <code>Classic.webp</code> will be used as a
        fallback.
      </p>
    </div>
  );
}
