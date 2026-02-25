import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchEmployees, deleteEmployee } from "../thunks/employeeThunks";
import EmployeeTable from "../components/EmployeeTable";
import "./EmployeeList.css";

const EmployeePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleAdd = () => {
    navigate("/employees/add");
  };

  const handleEdit = (employee) => {
    navigate(`/employees/edit/${employee.id}`);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteEmployee(id)).unwrap();
    } catch (error) {
      console.log("Error deleting employee", error);
    }
  };

  return (
    <div className="page-container">
        <div className="employee-header"><h1 >Employee List</h1>
        <button className="add-btn" onClick={handleAdd}>
          Add Employee
        </button>
      </div>

      <EmployeeTable
        // employees={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default EmployeePage;