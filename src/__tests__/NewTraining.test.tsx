import React from "react";
import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import NewTraining from "../components/NewTraining";
import axios from "axios";
import { WorkoutType } from "../types";

jest.mock("axios");

describe('NewTraining component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    const mockWorkouts: WorkoutType[] = [
      { id: "1", title: "Total Body Burn", tags: [], exercises: [] },
      { id: "2", title: "Strength & Conditioning", tags: [], exercises: [] }
    ];

    (axios.get as jest.Mock).mockResolvedValue({data: mockWorkouts });

    
    render(
      <BrowserRouter>
        <NewTraining />
      </BrowserRouter>
    );
    
  });

  test("renders NewTraining component", () => {
    expect(screen.getByText(/Create new training session/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('---')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Here you can describe your feelings/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save training session/i })).toBeInTheDocument();
  });

  test('calories input should accept valid values', () => {
    const caloriesInput: HTMLInputElement = screen.getByPlaceholderText('---');
    fireEvent.change(caloriesInput, { target: { value: '500' } });
    expect(caloriesInput.value).toBe('500');
  });

  test('calories input should reject invalid values', () => {
    const caloriesInput: HTMLInputElement = screen.getByPlaceholderText('---');
    fireEvent.change(caloriesInput, { target: { value: '20000' } });
    expect(caloriesInput.value).toBe('');
    expect(screen.getByRole('button', { name: /Save training session/i })).toBeDisabled();
  });

  test('clicking on an emoji sets the selected emoji', () => {
    const happyEmoji = screen.getByAltText('happy');
    fireEvent.click(happyEmoji);
    expect(happyEmoji.closest('div')).toHaveClass('chosen');
  });

  test('double clicking on an emoji sets and unsets the selected emoji', () => {
    const happyEmoji = screen.getByAltText('happy');
    fireEvent.click(happyEmoji);
    expect(happyEmoji.closest('div')).toHaveClass('chosen');
    fireEvent.click(happyEmoji);
    expect(happyEmoji.closest('div')).not.toHaveClass('chosen');
  });

  test("fetches and displays workouts correctly", async () => {
    expect(axios.get).toHaveBeenCalledWith("/api/workouts");
    fireEvent.click(screen.getByText('Choose workout'));
    fireEvent.click(screen.getByText(/Total Body Burn/));
    await waitFor(() => {
      expect(screen.getAllByText(/Total Body Burn/)[0]).toBeInTheDocument();
    });
  });


  test('form submission button is disabled when fields are invalid', () => {
    const submitButton = screen.getByRole('button', { name: /Save training session/i });
    
    // Initially, the button should be disabled
    expect(submitButton).toBeDisabled();
    
    // Fill out the form partially
    fireEvent.change(screen.getByPlaceholderText('---'), { target: { value: '100' } });
    
    // Submit button should still be disabled
    expect(submitButton).toBeDisabled();
    
    // Complete the form with valid data
    fireEvent.change(screen.getAllByPlaceholderText('--')[0], { target: { value: '1' } });
    fireEvent.change(screen.getAllByPlaceholderText('--')[1], { target: { value: '30' } });
  
    expect(submitButton).toBeDisabled();

    fireEvent.click(screen.getByText('Choose workout'));
    fireEvent.click(screen.getByText(/Total Body Burn/));
    // The submit button should now be enabled
    expect(submitButton).not.toBeDisabled();
  });
});
