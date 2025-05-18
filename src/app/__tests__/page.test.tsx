import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import HomePage from "~/app/page";

afterEach(() => {
  cleanup();
});

test("renders home page", () => {
  // When
  render(<HomePage />);

  // Then
  expect(screen.getByText("First Steps →")).toBeInTheDocument();
});
