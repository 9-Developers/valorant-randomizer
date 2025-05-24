import { controllers, duelists, initiators, sentinels } from "~/data/agents";
import type { Named } from "~/data/named";
import {
  lmgs,
  rifles,
  shotguns,
  sidearms,
  smgs,
  snipers,
  type Weapon,
} from "~/data/weapons";

export type Category<T extends Named> = Readonly<{
  category: string;
  items: ReadonlyArray<T>;
}>;

export const agentCategories: ReadonlyArray<Category<Named>> = [
  { category: "Controllers", items: controllers },
  { category: "Duelists", items: duelists },
  { category: "Initiators", items: initiators },
  { category: "Sentinels", items: sentinels },
];

export const weaponCategories: ReadonlyArray<Category<Weapon>> = [
  { category: "Sidearms", items: sidearms },
  { category: "SMGs", items: smgs },
  { category: "Rifles", items: rifles },
  { category: "Shotguns", items: shotguns },
  { category: "Snipers", items: snipers },
  { category: "LMGs", items: lmgs },
];
