import React from "react";
import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, describe, beforeAll } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../src/views/Auth/Login";
describe("Login component test", () => {
  beforeAll(() => {
    render(
      <Router>
        <Login />
      </Router>
    );
  });
  test("Find fields", async () => {
    const emailField = screen.getByRole("textbox", { name: /Sähköposti/i });
    expect(emailField).toBeInTheDocument();
  });
  test("Test login button", async () => {
    const loginButton = screen.getByRole("button", {
      name: /Kirjaudu sisään/i,
    });
    expect(loginButton).toBeInTheDocument();
    fireEvent.click(loginButton);
  });
});
