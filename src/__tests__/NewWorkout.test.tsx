import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import NewWorkout from "../components/NewWorkout"; // Adjust the import based on your file structure
import { postCustomWorkout, postSavedWorkout } from "../services/api"; // Adjust imports as necessary

jest.mock("../services/api");

describe("NewWorkout component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders NewWorkout component", () => {
    render(<NewWorkout isInTraining={false} />);
    
    expect(screen.getByText(/New workout/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByText(/Select the type of workout, the equipment, and the muscle groups/i)).toBeInTheDocument();
    expect(screen.getByText(/Exercises/i)).toBeInTheDocument();
  });

  test("updates title input value", () => {
    render(<NewWorkout isInTraining={false} />);
    
    const titleInput : HTMLInputElement = screen.getByPlaceholderText("Title");
    fireEvent.change(titleInput, { target: { value: "My Workout" } });
    
    expect(titleInput.value).toBe("My Workout");
  });

  test("adds a tag to the workout", () => {
    render(<NewWorkout isInTraining={false} />);
    
    const tag = screen.getByText("Jumping rope");
    fireEvent.click(tag);
    
    expect(screen.getByAltText("Jumping rope")).toBeInTheDocument();
  });

  test("removes a tag from the workout", () => {
    render(<NewWorkout isInTraining={false} />);
    
    const tag = screen.getByText("Jumping rope");
    fireEvent.click(tag);
    expect(screen.queryByText("Jumping rope")).not.toBeInTheDocument(); 
    
    fireEvent.click(screen.getByAltText("Jumping rope"));

    expect(screen.queryByText("Jumping rope")).toBeInTheDocument();
  });

  test("adds an exercise", async () => {
    render(<NewWorkout isInTraining={false} />);

    fireEvent.click(screen.getByText("Add exercise"));

    fireEvent.change(screen.getAllByPlaceholderText("Title")[1], {
      target: { value: "Push Ups" },
    });

    fireEvent.change(screen.getAllByPlaceholderText("Number of")[0], {
      target: { value: "15" },
    });

    fireEvent.click(screen.getByText("reps"));

    const weightsToggle : HTMLDivElement = screen.getByAltText("choose");
    fireEvent.click(weightsToggle);

    fireEvent.change(screen.getAllByPlaceholderText("Number of")[1], {
      target: { value: "10" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Add/i }));
    await waitFor(() => expect(screen.getByText(/Push Ups/)).toBeInTheDocument());
  });

  test("saves workout as custom workout", async () => {
    (postSavedWorkout as jest.Mock).mockResolvedValue({
      status: 200,
      data: { message: "Workout saved successfully" },
    });
  
    render(<NewWorkout isInTraining={true} />);
  
    fireEvent.change(screen.getByPlaceholderText("Title"), { target: { value: "My Workout" } });
  
    fireEvent.click(screen.getByText("Add exercise"));
  
    fireEvent.change(screen.getAllByPlaceholderText("Title")[1], {
      target: { value: "Push Ups" },
    });
  
    fireEvent.change(screen.getAllByPlaceholderText("Number of")[0], {
      target: { value: "15" },
    });
  
    fireEvent.click(screen.getByText("reps"));
  
    const weightsToggle: HTMLDivElement = screen.getByAltText("choose");
    fireEvent.click(weightsToggle);
  
    fireEvent.change(screen.getAllByPlaceholderText("Number of")[1], {
      target: { value: "10" },
    });
  
    fireEvent.click(screen.getByRole("button", { name: /Add/i }));
  
    await waitFor(() => {
      expect(screen.getByText(/Push Ups/)).toBeInTheDocument();
    });
  
    const saveButton = screen.getByRole("button", { name: /Save as custom workout/i });
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(postSavedWorkout).toHaveBeenCalledWith(expect.objectContaining({ title: "My Workout" }));
      expect(screen.getByText("Saved as custom workout!")).toBeInTheDocument();
    });
  });

  test("disables save button when title or exercises are missing", () => {
    render(<NewWorkout isInTraining={true} />);
    
    const saveButton = screen.getByRole("button", { name: "Save" });
    expect(saveButton).toBeDisabled();

    fireEvent.change(screen.getByPlaceholderText("Title"), { target: { value: "My Workout" } });
    expect(saveButton).toBeDisabled();

    fireEvent.click(screen.getByText("Add exercise"));
  
    fireEvent.change(screen.getAllByPlaceholderText("Title")[1], {
      target: { value: "Push Ups" },
    });
  
    fireEvent.change(screen.getAllByPlaceholderText("Number of")[0], {
      target: { value: "15" },
    });
  
    fireEvent.click(screen.getByText("reps"));
  
    const weightsToggle: HTMLDivElement = screen.getByAltText("choose");
    fireEvent.click(weightsToggle);
  
    fireEvent.change(screen.getAllByPlaceholderText("Number of")[1], {
      target: { value: "10" },
    });
  
    fireEvent.click(screen.getByRole("button", { name: /Add/i }));
    
    expect(saveButton).toBeEnabled();
  });

  test("handles save in training", async () => {
    (postCustomWorkout as jest.Mock).mockResolvedValue({
      status: 200,
      data: { message: "Workout saved successfully" },
    });
  
    render(<NewWorkout isInTraining={true} handleSaveInTraining={() =>{}}/>);
  
    fireEvent.change(screen.getByPlaceholderText("Title"), { target: { value: "My Workout" } });
  
    fireEvent.click(screen.getByText("Add exercise"));
  
    fireEvent.change(screen.getAllByPlaceholderText("Title")[1], {
      target: { value: "Push Ups" },
    });
  
    fireEvent.change(screen.getAllByPlaceholderText("Number of")[0], {
      target: { value: "15" },
    });
  
    fireEvent.click(screen.getByText("reps"));
  
    const weightsToggle: HTMLDivElement = screen.getByAltText("choose");
    fireEvent.click(weightsToggle);
  
    fireEvent.change(screen.getAllByPlaceholderText("Number of")[1], {
      target: { value: "10" },
    });
  
    fireEvent.click(screen.getByRole("button", { name: /Add/i }));
  
    await waitFor(() => {
      expect(screen.getByText(/Push Ups/)).toBeInTheDocument();
    });
  
    const saveButton = screen.getByRole("button", { name: "Save" });
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(postCustomWorkout).toHaveBeenCalledWith(expect.objectContaining({ title: "My Workout" }));
    });
  });

  test("handles save not in training", async () => {
    (postSavedWorkout as jest.Mock).mockResolvedValue({
      status: 200,
      data: { message: "Workout saved successfully" },
    });
  
    render(<NewWorkout isInTraining={false}/>);

    fireEvent.change(screen.getByPlaceholderText("Title"), { target: { value: "My Workout" } });
  
    fireEvent.click(screen.getByText("Add exercise"));
  
    fireEvent.change(screen.getAllByPlaceholderText("Title")[1], {
      target: { value: "Push Ups" },
    });
  
    fireEvent.change(screen.getAllByPlaceholderText("Number of")[0], {
      target: { value: "15" },
    });
  
    fireEvent.click(screen.getByText("reps"));
  
    const weightsToggle: HTMLDivElement = screen.getByAltText("choose");
    fireEvent.click(weightsToggle);
  
    fireEvent.change(screen.getAllByPlaceholderText("Number of")[1], {
      target: { value: "10" },
    });
  
    fireEvent.click(screen.getByRole("button", { name: /Add/i }));
  
    await waitFor(() => {
      expect(screen.getByText(/Push Ups/)).toBeInTheDocument();
    });
  
    const saveButton = screen.getByRole("button", { name: "Save" });
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(postSavedWorkout).toHaveBeenCalledWith(expect.objectContaining({ title: "My Workout" }));
    });
  });
});
