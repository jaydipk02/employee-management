import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmployeePage from "./EmployeeListPage"; 
import { fetchEmployees } from "../thunks/employeeThunks";

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(), 
}));

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("../thunks/employeeThunks", () => ({
  fetchEmployees: vi.fn(),
  deleteEmployee: vi.fn(),
}));

vi.mock("../components/EmployeeTable", () => ({
  default: ({ onEdit }) => (
    <div>
      <button onClick={() => onEdit({ id: "101" })}>Mock Edit</button>
      <span>Employee Table Mock</span>
    </div>
  ),
}));

describe("EmployeeListPage Component", () => {
  const mockDispatch = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useDispatch.mockReturnValue(mockDispatch);
    useNavigate.mockReturnValue(mockNavigate);
  });

  it("should dispatch fetchEmployees on mount (useEffect)", () => {
    render(<EmployeePage />);
    
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("should render header and add button", () => {
    render(<EmployeePage />);
    
    expect(screen.getByText("Employee List")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add Employee/i })).toBeInTheDocument();
  });

  it("should navigate to add page when Add Employee button is clicked", () => {
    render(<EmployeePage />);
    
    const addButton = screen.getByRole("button", { name: /Add Employee/i });
    fireEvent.click(addButton);

    expect(mockNavigate).toHaveBeenCalledWith("/employees/add");
  });

  it("should navigate to edit page when handleEdit is triggered", () => {
    render(<EmployeePage />);
    
    const editBtn = screen.getByText("Mock Edit");
    fireEvent.click(editBtn);

    expect(mockNavigate).toHaveBeenCalledWith("/employees/edit/101");
  });
});