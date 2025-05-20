import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import AgentCategory from "~/app/agent/_components/category";
import { controllers, duelists, initiators, sentinels } from "~/data/agents";

afterEach(() => {
  cleanup();
});

test("renders category", () => {
  // Given
  const agents: string[] = [
    ...controllers,
    ...duelists,
    ...initiators,
    ...sentinels,
  ];
  const category = "Controllers";

  // When
  render(
    <AgentCategory
      agents={agents}
      category={category}
      onAgentClick={() => {
        return;
      }}
      onCategoryClick={() => {
        return;
      }}
      subset={controllers}
    />,
  );

  // Then
  expect(
    screen.getByText(category),
    "Category should be in the document",
  ).toBeInTheDocument();
  controllers.forEach((agent) => {
    expect(
      screen.getByLabelText(agent),
      "Agent should be in the document",
    ).toBeInTheDocument();
  });
});
