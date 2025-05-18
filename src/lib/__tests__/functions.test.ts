import { expect, test } from "vitest";
import { controllers, duelists, initiators, sentinels } from "~/data/agents";
import { getImagePath, invertSelection, toggleAgent } from "~/lib/functions";

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
  const agents: string[] = [
    ...controllers,
    ...duelists,
    ...initiators,
    ...sentinels,
  ];

  // When
  const actual: string[] = invertSelection(controllers, agents);

  // Then
  expect(
    controllers.some((agent) => actual.includes(agent)),
    "Result should not contain any controllers",
  ).toBeFalsy();
});

test("invertSelection adds subset", () => {
  // Given
  const agents: string[] = [...duelists, ...initiators, ...sentinels];

  // When
  const actual: string[] = invertSelection(controllers, agents);

  // Then
  expect(
    controllers.every((agent) => actual.includes(agent)),
    "Result should contain all controllers",
  ).toBeTruthy();
});

test("toggleAgent removes agent", () => {
  // Given
  const agent = "Jett";
  const agents: string[] = [
    ...controllers,
    ...duelists,
    ...initiators,
    ...sentinels,
  ];

  // When
  const actual: string[] = toggleAgent(agent, agents);

  // Then
  expect(actual, "Result should not contain agent").not.toContain(agent);
});

test("toggleAgent adds agent", () => {
  // Given
  const agent = "Jett";
  const agents: string[] = [
    ...controllers,
    ...duelists.filter((duelist) => duelist !== agent),
    ...initiators,
    ...sentinels,
  ];

  // When
  const actual: string[] = toggleAgent(agent, agents);

  // Then
  expect(actual, "Result should contain agent").toContain(agent);
});
