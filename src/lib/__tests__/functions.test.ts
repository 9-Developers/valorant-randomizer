import { expect, test } from "vitest";
import { controllers, duelists, initiators, sentinels } from "~/data/agents";
import type { Named } from "~/data/named";
import {
  contains,
  getAffordable,
  getImagePath,
  invertMany,
  invertOne,
} from "~/lib/functions";
import { snipers } from "~/data/weapons";

test("contains returns true", () => {
  // Given
  const item: Named = { name: "Jett" };

  // When
  const actual: boolean = contains(item, duelists);

  // Then
  expect(actual).toBeTruthy();
});

test("contains returns false", () => {
  // Given
  const item: Named = { name: "Astra" };

  // When
  const actual: boolean = contains(item, duelists);

  // Then
  expect(actual).toBeFalsy();
});

test("getAffordable returns affordable", () => {
  // Given
  const money = 2000;

  // When
  const actual: ReadonlyArray<Named> = getAffordable(money, snipers);

  // Then
  expect(
    actual.find((element) => element.name === "Marshal") !== undefined,
  ).toBeTruthy();
  expect(
    actual.find((element) => element.name === "Outlaw") !== undefined,
  ).toBeFalsy();
  expect(
    actual.find((element) => element.name === "Operator") !== undefined,
  ).toBeFalsy();
});

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
  const agents: ReadonlyArray<Named> = [
    ...controllers,
    ...duelists,
    ...initiators,
    ...sentinels,
  ];

  // When
  const actual: ReadonlyArray<Named> = invertMany(controllers, agents);

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
  const agents: ReadonlyArray<Named> = [
    ...duelists,
    ...initiators,
    ...sentinels,
  ];

  // When
  const actual: ReadonlyArray<Named> = invertMany(controllers, agents);

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
  const agents: ReadonlyArray<Named> = [
    ...controllers,
    ...duelists,
    ...initiators,
    ...sentinels,
  ];

  // When
  const actual: ReadonlyArray<Named> = invertOne(agent, agents);

  // Then
  expect(
    actual.find((element) => element.name === agent.name),
    "Result should not contain agent",
  ).toBeFalsy();
});

test("toggleAgent adds agent", () => {
  // Given
  const agent: Named = { name: "Jett" };
  const agents: ReadonlyArray<Named> = [
    ...controllers,
    ...duelists.filter((duelist) => duelist.name !== agent.name),
    ...initiators,
    ...sentinels,
  ];

  // When
  const actual: ReadonlyArray<Named> = invertOne(agent, agents);

  // Then
  expect(
    actual.find((element) => element.name === agent.name),
    "Result should contain agent",
  ).toBeTruthy();
});
