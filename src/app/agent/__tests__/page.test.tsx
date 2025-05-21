import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import AgentPage from "~/app/agent/page";
import { controllers } from "~/data/agents";

afterEach(() => {
  cleanup();
});

test("renders agent page", () => {
  // When
  render(<AgentPage />);

  // Then
  expect(
    screen.getByText("Random agent"),
    "Random agent should be present",
  ).toBeInTheDocument();
  expect(
    screen.getByAltText(/\w+ portrait/i),
    "Agent portrait should be in the document",
  ).toBeInTheDocument();

  expect(
    screen.getByText("Controllers"),
    "Controllers should be present",
  ).toBeInTheDocument();
  expect(
    screen.getByText("Duelists"),
    "Duelists should be present",
  ).toBeInTheDocument();
  expect(
    screen.getByText("Initiators"),
    "Initiators should be present",
  ).toBeInTheDocument();
  expect(
    screen.getByText("Sentinels"),
    "Sentinels should be present",
  ).toBeInTheDocument();
});

test("unselects category", () => {
  // Given
  const category = "Controllers";

  render(<AgentPage />);

  // When
  fireEvent.click(screen.getByText(category));

  // Then
  expect(
    screen.getByText(category),
    "Controllers should be present",
  ).toBeInTheDocument();
  controllers.forEach((agent) => {
    expect(
      screen.getByLabelText(agent.name),
      "Agent should not be selected",
    ).not.toHaveClass("selected");
    expect(
      screen.getByLabelText(agent.name),
      "Agent should not be selected",
    ).toHaveClass("unselected");
  });
});

test("re-selects category", () => {
  // Given
  const category = "Controllers";

  render(<AgentPage />);

  // When
  fireEvent.click(screen.getByText(category));
  fireEvent.click(screen.getByText(category));

  // Then
  expect(
    screen.getByText(category),
    "Controllers should be present",
  ).toBeInTheDocument();
  controllers.forEach((agent) => {
    expect(
      screen.getByLabelText(agent.name),
      "Agent should be selected",
    ).toHaveClass("selected");
    expect(
      screen.getByLabelText(agent.name),
      "Agent should be selected",
    ).not.toHaveClass("unselected");
  });
});

test("unselects agent", () => {
  // Given
  const agent = "Jett";

  render(<AgentPage />);

  // When
  fireEvent.click(screen.getByLabelText(agent));

  // Then
  expect(
    screen.getByLabelText(agent),
    "Agent should have background",
  ).not.toHaveClass("selected");
  expect(
    screen.getByLabelText(agent),
    "Agent should not have background",
  ).toHaveClass("unselected");
});

test("re-selects agent", () => {
  // Given
  const agent = "Jett";

  render(<AgentPage />);

  // When
  fireEvent.click(screen.getByLabelText(agent));
  fireEvent.click(screen.getByLabelText(agent));

  // Then
  expect(
    screen.getByLabelText(agent),
    "Agent should have background",
  ).toHaveClass("selected");
  expect(
    screen.getByLabelText(agent),
    "Agent should not have background",
  ).not.toHaveClass("unselected");
});
