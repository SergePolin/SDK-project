import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter to wrap the component
import NewTraining from "../components/NewTraining";

test("renders NewTraining component", () => {
  render(
    <BrowserRouter>
      <NewTraining />
    </BrowserRouter>
  );
  expect(screen.getByText(/Create new training session/i)).toBeInTheDocument();
});
