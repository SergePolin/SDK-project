import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import AddExercise from "../components/AddExercise"; // Adjust based on file structure

describe("AddExercise component", () => {
  const mockSetExercises = jest.fn();
  const mockSetIsAddExerciseWindowOpen = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the AddExercise component", () => {
    render(<AddExercise setIsAddExerciseWindowOpen={mockSetIsAddExerciseWindowOpen} setExercises={mockSetExercises} />);

    expect(screen.getByText("New exercise")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Number of")).toBeInTheDocument();
    expect(screen.getByText("reps")).toBeInTheDocument();
    expect(screen.getByText("min")).toBeInTheDocument();
    expect(screen.getByText("Weights")).toBeInTheDocument();
  });

  test("submits exercise without weights", () => {
    render(<AddExercise setIsAddExerciseWindowOpen={mockSetIsAddExerciseWindowOpen} setExercises={mockSetExercises} />);

    fireEvent.change(screen.getByPlaceholderText("Title"), { target: { value: "Push Ups" } });
    fireEvent.change(screen.getByPlaceholderText("Number of"), { target: { value: "15" } });
    fireEvent.click(screen.getByText("reps"));

    fireEvent.click(screen.getByRole("button", { name: /Add/i }));

    expect(mockSetExercises).toHaveBeenCalledWith({
      title: "Push Ups",
      repsOrDuration: 15,
      isTimeBased: false,
    });
    expect(mockSetIsAddExerciseWindowOpen).toHaveBeenCalledWith(false);
  });

  test("submits exercise with weights", () => {
    render(<AddExercise setIsAddExerciseWindowOpen={mockSetIsAddExerciseWindowOpen} setExercises={mockSetExercises} />);

    fireEvent.change(screen.getByPlaceholderText("Title"), { target: { value: "Push Ups" } });
    fireEvent.change(screen.getByPlaceholderText("Number of"), { target: { value: "15" } });
    fireEvent.click(screen.getByText("reps"));

    fireEvent.click(screen.getByText("Weights"));
    fireEvent.change(screen.getAllByPlaceholderText("Number of")[1], { target: { value: "10" } });

    fireEvent.click(screen.getByRole("button", { name: /Add/i }));

    expect(mockSetExercises).toHaveBeenCalledWith({
      title: "Push Ups",
      repsOrDuration: 15,
      isTimeBased: false,
      weight: 10,
    });
    expect(mockSetIsAddExerciseWindowOpen).toHaveBeenCalledWith(false);
  });

  test("disables the submit button when title or reps are missing", () => {
    render(<AddExercise setIsAddExerciseWindowOpen={mockSetIsAddExerciseWindowOpen} setExercises={mockSetExercises} />);

    const addButton = screen.getByRole("button", { name: /Add/i });

    expect(addButton).toBeDisabled();

    fireEvent.change(screen.getByPlaceholderText("Title"), { target: { value: "Push Ups" } });
    expect(addButton).toBeDisabled();

    fireEvent.change(screen.getByPlaceholderText("Number of"), { target: { value: "15" } });
    expect(addButton).toBeEnabled();
  });

  test("closes the AddExercise modal when exercise is added", () => {
    render(<AddExercise setIsAddExerciseWindowOpen={mockSetIsAddExerciseWindowOpen} setExercises={mockSetExercises} />);

    fireEvent.change(screen.getByPlaceholderText("Title"), { target: { value: "Push Ups" } });
    fireEvent.change(screen.getByPlaceholderText("Number of"), { target: { value: "15" } });
    fireEvent.click(screen.getByText("reps"));

    fireEvent.click(screen.getByRole("button", { name: /Add/i }));

    expect(mockSetIsAddExerciseWindowOpen).toHaveBeenCalledWith(false);
  });
});
