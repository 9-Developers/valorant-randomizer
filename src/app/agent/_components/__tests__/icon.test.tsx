import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import AgentIcon from "~/app/agent/_components/icon";

afterEach(() => {
  cleanup();
});

test("renders selected agent icon", () => {
  // Given
  const agent = "Jett";

  // When
  render(
    <AgentIcon
      agent={agent}
      isSelected={true}
      onClick={() => {
        return;
      }}
    />,
  );

  // Then
  expect(
    screen.getByText(agent),
    agent + " should be in the document",
  ).toBeInTheDocument();
  expect(
    screen.getByAltText(agent + " icon"),
    agent + " icon should be in the document",
  ).toBeInTheDocument();
  expect(
    screen.getByLabelText(agent),
    "Agent should have background",
  ).toHaveClass("agent-selected");
  expect(
    screen.getByLabelText(agent),
    "Agent should not have background",
  ).not.toHaveClass("agent-unselected");
});

test("renders unselected agent icon", () => {
  // Given
  const agent = "Jett";

  // When
  render(
    <AgentIcon
      agent={agent}
      isSelected={false}
      onClick={() => {
        return;
      }}
    />,
  );

  // Then
  expect(
    screen.getByText(agent),
    agent + " should be in the document",
  ).toBeInTheDocument();
  expect(
    screen.getByAltText(agent + " icon"),
    agent + " icon should be in the document",
  ).toBeInTheDocument();
  expect(
    screen.getByLabelText(agent),
    "Agent should have background",
  ).not.toHaveClass("agent-selected");
  expect(
    screen.getByLabelText(agent),
    "Agent should not have background",
  ).toHaveClass("agent-unselected");
});
