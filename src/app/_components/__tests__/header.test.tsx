import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import Header from "~/app/_components/header";

afterEach(() => {
  cleanup();
});

test("renders header", () => {
  // When
  render(<Header />);

  // Then
  expect(
    screen.getByText("Valorant Randomizer"),
    "Title should exist",
  ).toBeInTheDocument();
  expect(
    screen.getByText("Agent"),
    "Agent link should exist",
  ).toBeInTheDocument();
  expect(
    screen.getByText("Weapon"),
    "Weapon link should exist",
  ).toBeInTheDocument();
  expect(
    screen.getByText("System"),
    "System theme should exist",
  ).toBeInTheDocument();
  expect(
    screen.getByText("Light"),
    "Light theme should exist",
  ).toBeInTheDocument();
  expect(
    screen.getByText("Dark"),
    "Dark theme should exist",
  ).toBeInTheDocument();
});
