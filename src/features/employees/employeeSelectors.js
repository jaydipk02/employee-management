import { createSelector } from "@reduxjs/toolkit";

export const selectEmployees = (state) =>
  state.employees?.employees || [];  

export const selectSearchId = (state) =>
  state.employees?.searchId || '';

export const selectFilteredEmployees = createSelector(
  [selectEmployees, selectSearchId],
  (employees, searchId) => {
    if (!searchId) return employees;
    return employees.filter((emp) => String(emp.id).includes(searchId));
  }
);

export const selectEmployeeById = (id) =>
  createSelector(
    [selectEmployees],
    (employees) => employees.find((emp) => String(emp.id) === String(id))
  );