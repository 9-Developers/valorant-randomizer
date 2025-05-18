import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import Layout from "~/app/layout";

afterEach(() => {
  cleanup();
});

test("renders layout", () => {
  // When
  render(
    <Layout>
      <p>Test paragraph</p>
    </Layout>,
    { container: document }
  );

  // Then
  expect(
    screen.getByRole("banner"),
    "Layout should contain header",
  ).toBeInTheDocument();
  expect(
    screen.getByText("Test paragraph"),
    "Layout should contain children",
  ).toBeInTheDocument();
});
