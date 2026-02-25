import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* GET ALL EMPLOYEES */
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee",
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch");
    }
  },
);

/* ADD EMPLOYEE */
export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee",
        employeeData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add");
    }
  },
);

/* UPDATE EMPLOYEE */
export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, employeeData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`,
        employeeData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update");
    }
  },
);
/* DELETE EMPLOYEE */
export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
  `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`
);
      return id; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete");
    }
  },
);
