import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import ThemeSwitcher from "~/app/_components/theme-switcher";
import { ThemeProvider } from "next-themes";

afterEach(() => {
  cleanup();
  localStorage.clear();
});

test("renders theme switcher", () => {
  // When
  render(<ThemeProvider><ThemeSwitcher /></ThemeProvider>);

  // Then
  expect(screen.getByText("System"), "System theme should exist").toBeInTheDocument();
  expect(screen.getByLabelText("System"), "System theme should be checked by default").toBeChecked();
  expect(screen.getByText("Light"), "Light theme should exist").toBeInTheDocument();
  expect(screen.getByLabelText("Light"), "Light theme should not be checked by default").not.toBeChecked();
  expect(screen.getByText("Dark"), "Dark theme should exist").toBeInTheDocument();
  expect(screen.getByLabelText("Dark"), "Dark theme should not be checked by default").not.toBeChecked();
});

test("switches to light theme", () => {
  // Given
  render(<ThemeProvider><ThemeSwitcher /></ThemeProvider>);

  // When
  fireEvent.click(screen.getByLabelText("Light"));

  // Then
  expect(screen.getByLabelText("System"), "System theme should not be checked").not.toBeChecked();
  expect(screen.getByLabelText("Light"), "Light theme should be checked").toBeChecked();
  expect(screen.getByLabelText("Dark"), "Dark theme should not be checked").not.toBeChecked();
  expect(localStorage.getItem("theme"), "Theme should be saved to local storage").toEqual("light");
});

test("switches to dark theme", () => {
  // Given
  render(<ThemeProvider><ThemeSwitcher /></ThemeProvider>);

  // When
  fireEvent.click(screen.getByLabelText("Dark"));

  // Then
  expect(screen.getByLabelText("System"), "System theme should not be checked").not.toBeChecked();
  expect(screen.getByLabelText("Light"), "Light theme should not be checked").not.toBeChecked();
  expect(screen.getByLabelText("Dark"), "Dark theme should be checked").toBeChecked();
  expect(localStorage.getItem("theme"), "Theme should be saved to local storage").toEqual("dark");
});

test("switches to system theme", () => {
  // Given
  render(<ThemeProvider><ThemeSwitcher /></ThemeProvider>);
  fireEvent.click(screen.getByLabelText("Light"));

  // When
  fireEvent.click(screen.getByLabelText("System"));

  // Then
  expect(screen.getByLabelText("System"), "System theme should be checked").toBeChecked();
  expect(screen.getByLabelText("Light"), "Light theme should not be checked").not.toBeChecked();
  expect(screen.getByLabelText("Dark"), "Dark theme should not be checked").not.toBeChecked();
  expect(localStorage.getItem("theme"), "Theme should be saved to local storage").toEqual("system");
});

test("loads default system theme", () => {
  // Given
  localStorage.setItem("theme", "system");
  render(<ThemeProvider><ThemeSwitcher /></ThemeProvider>);

  // Then
  expect(screen.getByLabelText("System"), "System theme should be checked").toBeChecked();
  expect(screen.getByLabelText("Light"), "Light theme should not be checked").not.toBeChecked();
  expect(screen.getByLabelText("Dark"), "Dark theme should not be checked").not.toBeChecked();
});

test("loads default light theme", () => {
  // Given
  localStorage.setItem("theme", "light");
  render(<ThemeProvider><ThemeSwitcher /></ThemeProvider>);

  // Then
  expect(screen.getByLabelText("System"), "System theme should not be checked").not.toBeChecked();
  expect(screen.getByLabelText("Light"), "Light theme should be checked").toBeChecked();
  expect(screen.getByLabelText("Dark"), "Dark theme should not be checked").not.toBeChecked();
});

test("loads default dark theme", () => {
  // Given
  localStorage.setItem("theme", "dark");
  render(<ThemeProvider><ThemeSwitcher /></ThemeProvider>);

  // Then
  expect(screen.getByLabelText("System"), "System theme should not be checked").not.toBeChecked();
  expect(screen.getByLabelText("Light"), "Light theme should not be checked").not.toBeChecked();
  expect(screen.getByLabelText("Dark"), "Dark theme should be checked").toBeChecked();
});
