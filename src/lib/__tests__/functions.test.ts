import { expect, test } from "vitest";
import { controllers, duelists, initiators, sentinels } from "~/data/agents";
import type { Named } from "~/data/named";
import { getImagePath, invertMany, invertOne } from "~/lib/functions";

test("getImagePath returns correct path", () => {
  // Given
  const weapon = "Vandal.webp";

  // When
  const actual: string = getImagePath(weapon);

  // Then
  expect(actual).toEqual("/images/weapons/Vandal.webp");
});

test("getImagePath returns default path", () => {
  // When
  const actual: string = getImagePath();

  // Then
  expect(actual).toEqual("/images/weapons/Classic.webp");
});

test("invertSelection removes subset", () => {
  // Given
  const agents: Named[] = [
    ...controllers,
    ...duelists,
    ...initiators,
    ...sentinels,
  ];

  // When
  const actual: Named[] = invertMany(controllers, agents);

  // Then
  expect(
    controllers.some(
      (agent) =>
        actual.find((element) => element.name === agent.name) !== undefined,
    ),
    "Result should not contain any controllers",
  ).toBeFalsy();
});

test("invertSelection adds subset", () => {
  // Given
  const agents: Named[] = [...duelists, ...initiators, ...sentinels];

  // When
  const actual: Named[] = invertMany(controllers, agents);

  // Then
  expect(
    controllers.every(
      (agent) =>
        actual.find((element) => element.name === agent.name) !== undefined,
    ),
    "Result should contain all controllers",
  ).toBeTruthy();
});

test("toggleAgent removes agent", () => {
  // Given
  const agent: Named = { name: "Jett" };
  const agents: Named[] = [
    ...controllers,
    ...duelists,
    ...initiators,
    ...sentinels,
  ];

  // When
  const actual: Named[] = invertOne(agent, agents);

  // Then
  expect(
    actual.find((element) => element.name === agent.name),
    "Result should not contain agent",
  ).toBeFalsy();
});

test("toggleAgent adds agent", () => {
  // Given
  const agent: Named = { name: "Jett" };
  const agents: Named[] = [
    ...controllers,
    ...duelists.filter((duelist) => duelist.name !== agent.name),
    ...initiators,
    ...sentinels,
  ];

  // When
  const actual: Named[] = invertOne(agent, agents);

  // Then
  expect(
    actual.find((element) => element.name === agent.name),
    "Result should contain agent",
  ).toBeTruthy();
});
