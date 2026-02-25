import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EditEmployee from "./EditEmployeePage";
import { updateEmployee } from "../thunks/employeeThunks";

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
  useParams: vi.fn(),
}));

vi.mock("../thunks/employeeThunks", () => ({
  updateEmployee: vi.fn(),
}));

vi.mock("../components/EmployeeFormUI", () => ({
  default: ({ initialData, onSubmit, buttonText }) => (
    <div>
      <span>Editing: {initialData?.name}</span>
      <button onClick={() => onSubmit({ name: "Updated Name" })}>{buttonText}</button>
    </div>
  ),
}));

describe("EditEmployee Page", () => {
  const mockDispatch = vi.fn();
  const mockNavigate = vi.fn();
  const mockEmployee = { id: "1", name: "Sandeep Patil" };

  beforeEach(() => {
    vi.clearAllMocks();
    useDispatch.mockReturnValue(mockDispatch);
    useNavigate.mockReturnValue(mockNavigate);
    useParams.mockReturnValue({ id: "1" });
    useSelector.mockReturnValue(mockEmployee);
  });

  it("should render the form with initial data and correct button text", () => {
    render(<EditEmployee />);
    
    expect(screen.getByText("Editing: Sandeep Patil")).toBeInTheDocument();
    expect(screen.getByText("Update Employee")).toBeInTheDocument();
  });

  it("should dispatch updateEmployee and navigate on successful submission", async () => {
    const mockUnwrap = vi.fn().mockResolvedValue({});
    mockDispatch.mockReturnValue({ unwrap: mockUnwrap });

    render(<EditEmployee />);

    fireEvent.click(screen.getByText("Update Employee"));

    expect(mockDispatch).toHaveBeenCalled();
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/employees");
    });
  });

  it("should log error if updateEmployee fails", async () => {
    const consoleSpy = vi.spyOn(console, "log");
    const mockUnwrap = vi.fn().mockRejectedValue(new Error("Update Failed"));
    mockDispatch.mockReturnValue({ unwrap: mockUnwrap });

    render(<EditEmployee />);
    fireEvent.click(screen.getByText("Update Employee"));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith("Error updating employee", expect.any(Error));
    });
  });
});