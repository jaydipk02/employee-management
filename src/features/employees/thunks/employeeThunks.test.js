import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { 
  fetchEmployees, 
  addEmployee, 
  updateEmployee, 
  deleteEmployee 
} from "./employeeThunks";

vi.mock("axios");

describe("Employee Thunks", () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetchEmployees: should return data on success", async () => {
    const mockData = [{ id: "1", name: "Sandeep" }];
    axios.get.mockResolvedValueOnce({ data: mockData });

    const dispatch = vi.fn();
    const result = await fetchEmployees()(dispatch, () => ({}), {});

    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("/employee"));
    expect(result.type).toBe("employees/fetchEmployees/fulfilled");
    expect(result.payload).toEqual(mockData);
  });

  // --- ADD EMPLOYEE ---
  it("addEmployee: should return new employee data on success", async () => {
    const newEmployee = { name: "Rahul", email: "rahul@test.com" };
    const mockResponse = { id: "2", ...newEmployee };
    axios.post.mockResolvedValueOnce({ data: mockResponse });

    const dispatch = vi.fn();
    const result = await addEmployee(newEmployee)(dispatch, () => ({}), {});

    expect(axios.post).toHaveBeenCalledWith(expect.any(String), newEmployee);
    expect(result.type).toBe("employees/addEmployee/fulfilled");
    expect(result.payload).toEqual(mockResponse);
  });

  // --- UPDATE EMPLOYEE ---
  it("updateEmployee: should return updated data on success", async () => {
    const updateData = { id: "1", employeeData: { name: "Sandeep Patil" } };
    const mockResponse = { id: "1", name: "Sandeep Patil" };
    axios.put.mockResolvedValueOnce({ data: mockResponse });

    const dispatch = vi.fn();
    const result = await updateEmployee(updateData)(dispatch, () => ({}), {});

    expect(axios.put).toHaveBeenCalledWith(expect.stringContaining("/employee/1"), updateData.employeeData);
    expect(result.type).toBe("employees/updateEmployee/fulfilled");
    expect(result.payload).toEqual(mockResponse);
  });

  // DELETE 
  it("deleteEmployee: should return the ID of deleted employee", async () => {
    const employeeId = "101";
    axios.delete.mockResolvedValueOnce({});

    const dispatch = vi.fn();
    const result = await deleteEmployee(employeeId)(dispatch, () => ({}), {});

    expect(axios.delete).toHaveBeenCalledWith(expect.stringContaining("/employee/101"));
    expect(result.type).toBe("employees/deleteEmployee/fulfilled");
    expect(result.payload).toBe(employeeId);
  });

  // ERROR 
  it("should return error message when API fails", async () => {
    axios.get.mockRejectedValueOnce({ 
      response: { data: "Server Error" } 
    });

    const dispatch = vi.fn();
    const result = await fetchEmployees()(dispatch, () => ({}), {});

    expect(result.type).toBe("employees/fetchEmployees/rejected");
    expect(result.payload).toBe("Server Error");
  });
});