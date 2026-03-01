import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredEmployees } from "../employeeSelectors";
import { setSearchId } from "../employeeSlice";
import { deleteEmployee } from "../thunks/employeeThunks";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./EmployeeTable.css";

const EmployeeTable = ({ onEdit }) => {
  const dispatch = useDispatch();
  const employees = useSelector(selectFilteredEmployees);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDelete = (id) => {
    setSelectedId(id);
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    dispatch(deleteEmployee(selectedId));
    setIsDialogOpen(false);
    setSelectedId(null);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setSelectedId(null);
  };

  const handleSearch = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    dispatch(setSearchId(value));
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search by ID"
        onChange={handleSearch}
        className="search-input"
      />

    
      <div className="table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.mobile}</td>
                  <td>{emp.country}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn edit-btn"
                        onClick={() => onEdit(emp)}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(emp.id)}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No Employees Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={isDialogOpen}
        title="Delete Employee"
        message="Are you sure you want to delete this employee?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
};

export default EmployeeTable;