import type { ChangeEvent, ReactNode } from "react";
import Image from "next/image";
import { getImagePath } from "~/lib/functions";
import { Loadout, Shields } from "~/data/loadout";
import type { Weapon } from "~/data/weapons";

export default function WeaponSettings({
  loadout,
  money,
  setMoney,
  setLoadout,
  setShields,
  setWeapon,
  shields,
  weapon,
}: Readonly<{
  loadout: Loadout;
  money: number;
  setMoney: (money: number) => void;
  setShields: (event: ChangeEvent<HTMLInputElement>) => void;
  setLoadout: (event: ChangeEvent<HTMLInputElement>) => void;
  setWeapon: () => void;
  shields: Shields;
  weapon: Weapon;
}>): ReactNode {
  return (
    <div className="weapon-settings">
      <div className="random-weapon">
        <h2 className="clickable" onClick={setWeapon}>
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
        <h2 className="text-center">Money</h2>

        <form
          action={(formData) =>
            setMoney(parseInt((formData.get("money") as string) ?? "9000"))
          }
        >
          <label htmlFor="money">Money: &#x20B9;</label>
          <input
            autoComplete="off"
            defaultValue={money}
            id="money"
            inputMode="decimal"
            name="money"
            pattern="(?:0|[1-9]\d*)"
            size={4}
            type="text"
          />

          <button type="submit">Update</button>
        </form>
      </div>

      <div className="loadout-settings">
        <h2 className="text-right">Loadout</h2>

        <form className="settings pb-4">
          <input
            checked={shields === Shields.SHIELDS}
            id="loadout-shields"
            name="shields"
            onChange={setShields}
            type="radio"
            value={Shields.SHIELDS}
          />
          <label htmlFor="loadout-sidearm">Buy shields</label>

          <input
            checked={shields === Shields.NAKED}
            id="loadout-naked"
            name="naked"
            onChange={setShields}
            type="radio"
            value={Shields.NAKED}
          />
          <label htmlFor="loadout-naked">Don&#39;t buy shields</label>
        </form>

        <form className="settings">
          <input
            checked={loadout === Loadout.SIDEARM}
            id="loadout-sidearm"
            name="sidearm"
            onChange={setLoadout}
            type="radio"
            value="sidearm"
          />
          <label htmlFor="loadout-sidearm">Sidearm only</label>

          <input
            checked={loadout === Loadout.RIFLE}
            id="loadout-rifle"
            name="rifle"
            onChange={setLoadout}
            type="radio"
            value="rifle"
          />
          <label htmlFor="loadout-rifle">Rifle only</label>

          <input
            checked={loadout === Loadout.BOTH}
            id="loadout-both"
            name="both"
            onChange={setLoadout}
            type="radio"
            value="both"
          />
          <label htmlFor="loadout-both">Both</label>
        </form>
      </div>
    </div>
  );
}
