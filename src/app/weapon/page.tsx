import type { ReactNode } from "react";
import WeaponCategory from "~/app/weapon/_components/category";
import {
  lmgs,
  rifles,
  shotguns,
  sidearms,
  smgs,
  snipers,
} from "~/data/weapons";

export default function WeaponPage(): ReactNode {
  return (
    <div className="container bg-black">
      <h1>Valorant Weapons</h1>

      <div className="weapons">
        <WeaponCategory category="Sidearms" weapons={sidearms} />
        <WeaponCategory category="SMGs" weapons={smgs} />
        <WeaponCategory category="Rifles" weapons={rifles} />
        <WeaponCategory category="Shotguns" weapons={shotguns} />
        <WeaponCategory category="Snipers" weapons={snipers} />
        <WeaponCategory category="LMGs" weapons={lmgs} />
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
