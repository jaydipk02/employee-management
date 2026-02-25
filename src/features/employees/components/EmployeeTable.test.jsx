import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useDispatch, useSelector } from "react-redux";
import EmployeeTable from "./EmployeeTable";
import { setSearchId } from "../employeeSlice";

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock("../employeeSlice", () => ({
  setSearchId: vi.fn(),
}));

vi.mock("../thunks/employeeThunks", () => ({
  deleteEmployee: vi.fn(),
}));

describe("EmployeeTable Component", () => {
  const mockDispatch = vi.fn();
  const mockOnEdit = vi.fn();
  
  const mockEmployees = [
    { id: "101", name: "Sandeep Patil", email: "sandeep@test.com", mobile: "9876543210", country: "India" },
    { id: "102", name: "Anjali Sharma", email: "anjali@test.com", mobile: "8888888888", country: "USA" }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    useDispatch.mockReturnValue(mockDispatch);
  });

  it("renders employee list correctly", () => {
    useSelector.mockReturnValue(mockEmployees);

    render(<EmployeeTable onEdit={mockOnEdit} />);

    expect(screen.getByText("Sandeep Patil")).toBeInTheDocument();
    expect(screen.getByText("Anjali Sharma")).toBeInTheDocument();
    expect(screen.getByText("101")).toBeInTheDocument();
  });

  it("shows 'No Employees Found' when list is empty", () => {
    useSelector.mockReturnValue([]);

    render(<EmployeeTable onEdit={mockOnEdit} />);

    expect(screen.getByText(/No Employees Found/i)).toBeInTheDocument();
  });

  it("calls setSearchId action when typing in search box", () => {
    useSelector.mockReturnValue(mockEmployees);
    render(<EmployeeTable onEdit={mockOnEdit} />);

    const searchInput = screen.getByPlaceholderText(/Search by ID/i);
    fireEvent.change(searchInput, { target: { value: "101" } });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it("calls onEdit when Edit button is clicked", () => {
    useSelector.mockReturnValue(mockEmployees);
    render(<EmployeeTable onEdit={mockOnEdit} />);

    const editButtons = screen.getAllByTitle("Edit");
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(mockEmployees[0]);
  });

  it("opens ConfirmDialog when delete button is clicked", () => {
    useSelector.mockReturnValue(mockEmployees);
    render(<EmployeeTable onEdit={mockOnEdit} />);

    const deleteButtons = screen.getAllByTitle("Delete");
    fireEvent.click(deleteButtons[0]);

    expect(screen.getByText(/Are you sure you want to delete this employee?/i)).toBeInTheDocument();
  });
});