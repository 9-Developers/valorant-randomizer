import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import NavLink from "~/app/_components/nav-link";

afterEach(() => {
  cleanup();
});

test("renders nav link", () => {
  // Given
  const href = "/";
  const text = "Home";

  // When
  render(
    <NavLink
      href={href}
      text={text}
    />,
  );

  // Then
  expect(
    screen.getByText(text),
    text + " should be in the document",
  ).toBeInTheDocument();
});
