import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SegmentedControl from "../components/SegmentControl";

describe("SegmentedControl component", () => {

  test("renders with correct options", () => {
    render(<SegmentedControl option1="Option 1" option2="Option 2" />);
    
    expect(screen.getByLabelText("Option 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Option 2")).toBeInTheDocument();
  });

  test("selects the first option by default", () => {
    render(<SegmentedControl option1="Option 1" option2="Option 2" />);
    
    const option1 = screen.getByLabelText("Option 1") as HTMLInputElement;
    const option2 = screen.getByLabelText("Option 2") as HTMLInputElement;

    expect(option1.checked).toBe(true);
    expect(option2.checked).toBe(false);
  });

  test("switches to the second option when clicked", () => {
    render(<SegmentedControl option1="Option 1" option2="Option 2" />);
    
    const option2 = screen.getByLabelText("Option 2") as HTMLInputElement;
    fireEvent.click(option2);

    expect(option2.checked).toBe(true);
  });

  test("triggers the correct onChange function when selecting options", () => {
    const onChange1 = jest.fn();
    const onChange2 = jest.fn();
    
    render(<SegmentedControl option1="Option 1" option2="Option 2" onChange1={onChange1} onChange2={onChange2} />);
    
    const option2 = screen.getByLabelText("Option 2") as HTMLInputElement;
    fireEvent.click(option2);
    
    expect(onChange2).toHaveBeenCalled();
    expect(onChange1).not.toHaveBeenCalled();
  });

  test("triggers the correct onClick function when clicking options", () => {
    const onClick1 = jest.fn();
    const onClick2 = jest.fn();
    
    render(<SegmentedControl option1="Option 1" option2="Option 2" onClick1={onClick1} onClick2={onClick2} />);
    
    const option2 = screen.getByLabelText("Option 2") as HTMLInputElement;
    fireEvent.click(option2);

    expect(onClick2).toHaveBeenCalled();
    expect(onClick1).not.toHaveBeenCalled();
  });

  test("renders small class when small prop is true", () => {
    render(<SegmentedControl option1="Option 1" option2="Option 2" small={true} />);
    
    const option1Label = screen.getByLabelText("Option 1").nextSibling;
    const option2Label = screen.getByLabelText("Option 2").nextSibling;

    expect(option1Label).toHaveClass("small");
    expect(option2Label).toHaveClass("small");
  });

  test("renders big class when small prop is false", () => {
    render(<SegmentedControl option1="Option 1" option2="Option 2" small={false} />);
    
    const option1Label = screen.getByLabelText("Option 1").nextSibling;
    const option2Label = screen.getByLabelText("Option 2").nextSibling;

    expect(option1Label).toHaveClass("big");
    expect(option2Label).toHaveClass("big");
  });
});
