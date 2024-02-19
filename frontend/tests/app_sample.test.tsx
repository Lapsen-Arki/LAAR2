/*
import React from "react";
import "@testing-library/jest-dom/vitest";
import { expect, test, describe, beforeAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { prettyDOM } from "@testing-library/dom";
import App from "../src/App";

describe("Simple App.tsx test", () => {
  beforeAll(() => {
    render(<App />);
  });
  test("Test login button", async () => {
    const linkElements = screen.getAllByRole("link");
    const loginLink = Array.from(linkElements).find(
      (link) => link.getAttribute("href") === "/login"
    );
    expect(loginLink).toBeInTheDocument();
    if (loginLink) fireEvent.click(loginLink);
  });
  test("Test home button", async () => {
    const linkElement = screen.getByRole("link", { name: /LAAR/i });
    expect(linkElement).toBeInTheDocument();
    fireEvent.click(linkElement);
  });
});
*/