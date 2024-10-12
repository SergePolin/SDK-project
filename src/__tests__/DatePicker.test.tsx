import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DatePick from "../components/DatePicker";
import { act } from "react";
import { Datepicker } from '@mobiscroll/react';

jest.mock('@mobiscroll/react', () => ({
    Datepicker: jest.fn(() => <div data-testid="mock-datepicker" />),
    setOptions: jest.fn(),
    localeEn: jest.fn(),
}));

describe("DatePick component", () => {
  test("renders the DatePick component", () => {
    render(<DatePick onDateChoose={() => {}} />);
    
    expect(screen.getByText("Month")).toBeInTheDocument();
    expect(screen.getByText("Day")).toBeInTheDocument();
    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByTestId("mock-datepicker")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Choose/i })).toBeInTheDocument();
  });


  test("displays Datepicker with the correct settings", () => {
    render(<DatePick onDateChoose={() => {}} />);
    
    expect(Datepicker).toHaveBeenCalledWith(
      expect.objectContaining({
        controls: ["date"],
        touchUi: true,
        display: "inline",
        colors: [{ highlight: "rgba(#D63D1C, 0.5)", background: "#D63D1C" }],
        returnFormat: "jsdate",
        separator: ".",
      }),
      {}
    );
  });
});
