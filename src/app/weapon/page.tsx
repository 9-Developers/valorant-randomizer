"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";
import WeaponCategory from "~/app/weapon/_components/category";
import {
  classic,
  lmgs,
  rifles,
  shotguns,
  sidearms,
  smgs,
  snipers,
  type Weapon,
} from "~/data/weapons";
import {
  getAffordable,
  getImagePath,
  invertMany,
  invertOne,
} from "~/lib/functions";
import Image from "next/image";

// TODO: Make Classic required?
export default function WeaponPage(): ReactNode {
  const [money, setMoney] = useState(9000);
  const [selected, setSelected] = useState([
    ...sidearms,
    ...smgs,
    ...rifles,
    ...shotguns,
    ...snipers,
    ...lmgs,
  ]);
  const affordable: Weapon[] = useMemo(
    () => getAffordable(money, selected),
    [money, selected],
  );
  const [weapon, setWeapon] = useState(classic);

  useEffect(() => {
    setWeapon(
      affordable[Math.floor(Math.random() * affordable.length)] ?? classic,
    );
  }, [affordable]);

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
        <WeaponCategory
          category="Sidearms"
          items={sidearms}
          onCategoryClick={() => setSelected(invertMany(sidearms, selected))}
          onWeaponClick={(weapon) => setSelected(invertOne(weapon, selected))}
          selected={selected}
        />
        <WeaponCategory
          category="SMGs"
          items={smgs}
          onCategoryClick={() => setSelected(invertMany(smgs, selected))}
          onWeaponClick={(weapon) => setSelected(invertOne(weapon, selected))}
          selected={selected}
        />
        <WeaponCategory
          category="Rifles"
          items={rifles}
          onCategoryClick={() => setSelected(invertMany(rifles, selected))}
          onWeaponClick={(weapon) => setSelected(invertOne(weapon, selected))}
          selected={selected}
        />
        <WeaponCategory
          category="Shotguns"
          items={shotguns}
          onCategoryClick={() => setSelected(invertMany(shotguns, selected))}
          onWeaponClick={(weapon) => setSelected(invertOne(weapon, selected))}
          selected={selected}
        />
        <WeaponCategory
          category="Snipers"
          items={snipers}
          onCategoryClick={() => setSelected(invertMany(snipers, selected))}
          onWeaponClick={(weapon) => setSelected(invertOne(weapon, selected))}
          selected={selected}
        />
        <WeaponCategory
          category="LMGs"
          items={lmgs}
          onCategoryClick={() => setSelected(invertMany(lmgs, selected))}
          onWeaponClick={(weapon) => setSelected(invertOne(weapon, selected))}
          selected={selected}
        />
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
