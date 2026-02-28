import { createSlice } from "@reduxjs/toolkit";
import { fetchEmployees } from "./thunks/employeeThunks";
import { addEmployee } from "./thunks/employeeThunks";
import { updateEmployee } from "./thunks/employeeThunks";
import { deleteEmployee } from "./thunks/employeeThunks";

const initialState = {
  employees: [],
  loading: false,
  error: null,
  searchId: "",
  
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
  setSearchId: (state, action) => {
    state.searchId = action.payload;
  },
   resetSearch: (state) => {
    state.searchId = "";
},
  },
  extraReducers: (builder) => {
    builder

      /* FETCH */
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ADD */
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })

      /* UPDATE */
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(
          (emp) => emp.id === action.payload.id
        );
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })

      /* DELETE */
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (emp) => emp.id !== action.payload
        );
      });
  },
});

export default employeeSlice.reducer;
export const { setSearchId , resetSearch } = employeeSlice.actions;