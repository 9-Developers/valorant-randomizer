import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import AgentCategory from "~/app/_components/agent-category";
import { controllers, duelists, initiators, sentinels } from "~/data/agents";

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
    "Category should not be null",
  ).not.toBeNull();
  controllers.forEach((agent) => {
    expect(
      screen.getByText(agent),
      agent + " should not be null",
    ).not.toBeNull();
    expect(
      screen.getByAltText(agent + " icon"),
      agent + " icon should not be null",
    ).not.toBeNull();
  });
});
