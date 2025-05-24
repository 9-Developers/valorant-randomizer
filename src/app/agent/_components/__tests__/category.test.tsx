import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import AgentCategory from "~/app/agent/_components/category";
import { controllers } from "~/data/agents";

afterEach(() => {
  cleanup();
});

test("renders category", () => {
  // Given
  const category = "Controllers";

  // When
  render(
    <AgentCategory
      category={category}
      isSelected={() => true}
      items={controllers}
      onAgentClick={() => {
        return;
      }}
      onCategoryClick={() => {
        return;
      }}
    />,
  );

  // Then
  expect(
    screen.getByText(category),
    "Category should be in the document",
  ).toBeInTheDocument();
  controllers.forEach((agent) => {
    expect(
      screen.getByLabelText(agent.name),
      agent.name + " should be in the document",
    ).toBeInTheDocument();
  });
});
