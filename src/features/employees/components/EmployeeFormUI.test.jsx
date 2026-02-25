import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useDispatch, useSelector } from "react-redux";
import EmployeeForm from "./EmployeeFormUI";

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock("../../countries/countrySlice", () => ({
  fetchCountries: vi.fn(),
}));

describe("EmployeeForm Component", () => {
  const mockDispatch = vi.fn();
  const mockOnSubmit = vi.fn();
  const mockCountries = [
    { id: "1", country: "India" },
    { id: "2", country: "USA" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue(mockCountries);
  });

  it("renders all form fields correctly", () => {
    render(<EmployeeForm buttonText="Save" onSubmit={mockOnSubmit} />);
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
  });

  it("updates field values on change", () => {
    const { container } = render(<EmployeeForm buttonText="Save" onSubmit={mockOnSubmit} />);

    const nameInput = container.querySelector('input[name="name"]');
    
    fireEvent.change(nameInput, { target: { value: "Sandeep Patil", name: "name" } });

    expect(nameInput.value).toBe("Sandeep Patil");
  });

  it("calls onSubmit with form data when submitted", () => {
    const { container } = render(<EmployeeForm buttonText="Submit" onSubmit={mockOnSubmit} />);

    fireEvent.change(container.querySelector('input[name="name"]'), { target: { value: "Rahul", name: "name" } });
    fireEvent.change(container.querySelector('input[name="email"]'), { target: { value: "rahul@test.com", name: "email" } });
    fireEvent.change(container.querySelector('input[name="mobile"]'), { target: { value: "1234567890", name: "mobile" } });
    fireEvent.change(container.querySelector('input[name="district"]'), { target: { value: "Pune", name: "district" } });
    fireEvent.change(container.querySelector('input[name="state"]'), { target: { value: "Maharashtra", name: "state" } });
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "India", name: "country" } });

    fireEvent.submit(container.querySelector("form"));

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("pre-populates the form when initialData is provided", () => {
    const initialData = {
      name: "Amit",
      email: "amit@test.com",
      mobile: "9876543210",
      country: "USA",
      state: "California",
      district: "LA"
    };

    render(<EmployeeForm initialData={initialData} buttonText="Update" onSubmit={mockOnSubmit} />);

    expect(screen.getByDisplayValue("Amit")).toBeInTheDocument();
    expect(screen.getByDisplayValue("amit@test.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("USA")).toBeInTheDocument();
  });
});