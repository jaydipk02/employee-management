import EmployeeForm from "../components/EmployeeFormUI";
import { useDispatch } from "react-redux";
import { addEmployee } from "../thunks/employeeThunks";
import { useNavigate } from "react-router-dom";
import { resetSearch } from "../employeeSlice";
import Swal from "sweetalert2";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await dispatch(addEmployee(data)).unwrap();

      dispatch(resetSearch());   // ⚠️ तू इथे () विसरलास

      Swal.fire({
        title: "Success!",
        text: "Employee Added Successfully!",
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        navigate("/employees");
      });

    } catch (error) {
      console.log("Error adding employee", error);

      Swal.fire({
        title: "Error!",
        text: "Failed to add employee",
        icon: "error"
      });
    }
  };

  return (
    <EmployeeForm 
      onSubmit={handleSubmit} 
      buttonText="Add Employee" 
    />
  );
};

export default AddEmployee;