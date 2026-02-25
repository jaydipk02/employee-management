import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddEmployee from "./AddEmployeePage";
import { addEmployee } from "../thunks/employeeThunks";

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("../thunks/employeeThunks", () => ({
  addEmployee: vi.fn(),
}));

vi.mock("../components/EmployeeFormUI", () => ({
  default: ({ onSubmit, buttonText }) => (
    <button onClick={() => onSubmit({ name: "Sandeep" })}>{buttonText}</button>
  ),
}));

describe("AddEmployee Page", () => {
  const mockDispatch = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useDispatch.mockReturnValue(mockDispatch);
    useNavigate.mockReturnValue(mockNavigate);
  });

  it("should render the form with correct button text", () => {
    render(<AddEmployee />);
    expect(screen.getByText("Add Employee")).toBeInTheDocument();
  });

  it("should dispatch addEmployee and navigate on successful submission", async () => {
    const mockUnwrap = vi.fn().mockResolvedValue({});
    mockDispatch.mockReturnValue({ unwrap: mockUnwrap });

    render(<AddEmployee />);

    fireEvent.click(screen.getByText("Add Employee"));

    expect(mockDispatch).toHaveBeenCalled();
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/employees");
    });
  });

  it("should log error if addEmployee fails", async () => {
    const consoleSpy = vi.spyOn(console, "log");
    const mockUnwrap = vi.fn().mockRejectedValue(new Error("Failed"));
    mockDispatch.mockReturnValue({ unwrap: mockUnwrap });

    render(<AddEmployee />);
    fireEvent.click(screen.getByText("Add Employee"));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith("Error adding employee", expect.any(Error));
    });
  });
});