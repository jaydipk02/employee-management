import EmployeeForm from "../components/EmployeeFormUI";
import { useDispatch } from "react-redux";
import { addEmployee } from "../thunks/employeeThunks";
import { useNavigate } from "react-router-dom";
import { resetSearch } from "../employeeSlice";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await dispatch(addEmployee(data)).unwrap();
         dispatch(resetSearch)
      navigate("/employees");
    } catch (error) {
      console.log("Error adding employee", error);
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