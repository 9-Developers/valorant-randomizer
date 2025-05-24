import type { Named } from "~/data/named";

export const noAgentsSelected: Named = { name: "No Agents Selected" };

export const controllers: ReadonlyArray<Named> = [
  { name: "Astra" },
  { name: "Brimstone" },
  { name: "Clove" },
  { name: "Harbor" },
  { name: "Omen" },
  { name: "Viper" },
];

export const duelists: ReadonlyArray<Named> = [
  { name: "Iso" },
  { name: "Jett" },
  { name: "Neon" },
  { name: "Phoenix" },
  { name: "Raze" },
  { name: "Waylay" },
  { name: "Yoru" },
];

export const initiators: ReadonlyArray<Named> = [
  { name: "Breach" },
  { name: "Fade" },
  { name: "Gekko" },
  { name: "Kayo" },
  { name: "Skye" },
  { name: "Sova" },
  { name: "Tejo" },
];

export const sentinels: ReadonlyArray<Named> = [
  { name: "Chamber" },
  { name: "Cypher" },
  { name: "Deadlock" },
  { name: "Killjoy" },
  { name: "Sage" },
  { name: "Vyse" },
];

export const agents: ReadonlyArray<Named> = [
  ...controllers,
  ...duelists,
  ...initiators,
  ...sentinels,
];
