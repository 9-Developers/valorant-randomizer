import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import AgentCategory from "~/app/agent/_components/category";
import { controllers, duelists, initiators, sentinels } from "~/data/agents";
import type { Named } from "~/data/named";

afterEach(() => {
  cleanup();
});

test("renders category", () => {
  // Given
  const agents: Named[] = [
    ...controllers,
    ...duelists,
    ...initiators,
    ...sentinels,
  ];
  const category = "Controllers";

  // When
  render(
    <AgentCategory
      selected={agents}
      category={category}
      onAgentClick={() => {
        return;
      }}
      onCategoryClick={() => {
        return;
      }}
      items={controllers}
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
