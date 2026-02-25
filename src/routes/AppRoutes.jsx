// src/routes/AppRoutes.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../features/employees/pages/Home";
import EmployeePage from "../features/employees/pages/EmployeeListPage";
import AddEmployee from "../features/employees/pages/AddEmployeePage";
import EditEmployee from "../features/employees/pages/EditEmployeePage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home Route */}
      <Route path="/" element={<Home />} />

      {/* Employee List */}
      <Route path="/employees" element={<EmployeePage />} />

      {/* Add Employee */}
      <Route path="/employees/add" element={<AddEmployee />} />

      {/* Edit Employee */}
      <Route path="/employees/edit/:id" element={<EditEmployee />} />

      {/* 404 Page */}
      <Route path="*" element={<h2>Page Not Found</h2>} />
    </Routes>
  );
};

export default AppRoutes;