import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateEmployee } from "../thunks/employeeThunks";
import EmployeeForm from "../components/EmployeeFormUI";
import { selectEmployeeById } from "../employeeSelectors";
import { resetSearch } from "../employeeSlice";
import Swal from "sweetalert2";

const EditEmployee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employee = useSelector(selectEmployeeById(id));

  const handleSubmit = async (data) => {
    try {
      await dispatch(updateEmployee({ id, employeeData: data })).unwrap();

      dispatch(resetSearch());

      Swal.fire({
        title: "Success!",
        text: "Employee Updated Successfully!",
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        navigate("/employees");
      });

    } catch (error) {
      console.log("Error updating employee", error);

      Swal.fire({
        title: "Error!",
        text: "Failed to update employee",
        icon: "error"
      });
    }
  };

  return (
    <EmployeeForm
      initialData={employee || {}}
      onSubmit={handleSubmit}
      buttonText="Update Employee"
    />
  );
};

export default EditEmployee;