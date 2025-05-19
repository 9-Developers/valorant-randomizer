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
  expect(screen.getByText("Valorant Randomizer")).toBeInTheDocument();
  expect(screen.getByText("Agent")).toBeInTheDocument();
  expect(screen.getByText("Weapon")).toBeInTheDocument();
});
