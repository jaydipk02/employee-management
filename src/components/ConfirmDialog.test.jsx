import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest"; 
import ConfirmDialog from "./ConfirmDialog";

describe("ConfirmDialog Component", () => {
  const mockOnConfirm = vi.fn();
  const mockOnCancel = vi.fn();

  test("should not render when isOpen is false", () => {
    const { queryByText } = render(
      <ConfirmDialog isOpen={false} onConfirm={mockOnConfirm} onCancel={mockOnCancel} />
    );
    expect(queryByText("Confirm")).not.toBeInTheDocument();
  });

  test("should render title and message when isOpen is true", () => {
    render(
      <ConfirmDialog 
        isOpen={true} 
        title="Delete Employee" 
        message="Are you sure you want to delete this record?" 
        onConfirm={mockOnConfirm} 
        onCancel={mockOnCancel} 
      />
    );
    
    expect(screen.getByText("Delete Employee")).toBeInTheDocument();
    expect(screen.getByText("Are you sure you want to delete this record?")).toBeInTheDocument();
  });

  test("should call onConfirm when 'Yes, Delete' button is clicked", () => {
    render(<ConfirmDialog isOpen={true} onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
    
    const confirmBtn = screen.getByText("Yes, Delete");
    fireEvent.click(confirmBtn);
    
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  test("should call onCancel when 'Cancel' button is clicked", () => {
    render(<ConfirmDialog isOpen={true} onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
    
    const cancelBtn = screen.getByText("Cancel");
    fireEvent.click(cancelBtn);
    
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
});