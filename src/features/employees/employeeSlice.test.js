import { describe, it, expect } from "vitest";
import employeeReducer, { setSearchId } from "./employeeSlice";
import { 
  fetchEmployees, 
  addEmployee, 
  updateEmployee, 
  deleteEmployee 
} from "./thunks/employeeThunks";

describe("Employee Slice", () => {
  const initialState = {
    employees: [],
    loading: false,
    error: null,
    searchId: "",
  };

  it("should return the initial state", () => {
    expect(employeeReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setSearchId", () => {
    const actual = employeeReducer(initialState, setSearchId("101"));
    expect(actual.searchId).toBe("101");
  });

 
  it("should set loading true when fetchEmployees is pending", () => {
    const state = employeeReducer(initialState, { type: fetchEmployees.pending.type });
    expect(state.loading).toBe(true);
  });

  it("should update employees list when fetchEmployees is fulfilled", () => {
    const mockEmployees = [{ id: "1", name: "Sandeep" }];
    const state = employeeReducer(initialState, { 
      type: fetchEmployees.fulfilled.type, 
      payload: mockEmployees 
    });
    expect(state.loading).toBe(false);
    expect(state.employees).toEqual(mockEmployees);
  });

  it("should add a new employee to the list", () => {
    const newEmployee = { id: "2", name: "Rahul" };
    const state = employeeReducer(initialState, { 
      type: addEmployee.fulfilled.type, 
      payload: newEmployee 
    });
    expect(state.employees).toContainEqual(newEmployee);
    expect(state.employees.length).toBe(1);
  });

  
  it("should update an existing employee", () => {
    const existingState = {
      ...initialState,
      employees: [{ id: "1", name: "Sandeep" }]
    };
    const updatedEmployee = { id: "1", name: "Sandeep Patil" };
    
    const state = employeeReducer(existingState, { 
      type: updateEmployee.fulfilled.type, 
      payload: updatedEmployee 
    });

    expect(state.employees[0].name).toBe("Sandeep Patil");
  });

 
  it("should remove an employee from the list", () => {
    const existingState = {
      ...initialState,
      employees: [{ id: "1", name: "Sandeep" }, { id: "2", name: "Rahul" }]
    };
    
    const state = employeeReducer(existingState, { 
      type: deleteEmployee.fulfilled.type, 
      payload: "1" 
    });

    expect(state.employees.length).toBe(1);
    expect(state.employees[0].id).toBe("2");
  });
});