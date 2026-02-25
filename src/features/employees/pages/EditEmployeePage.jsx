import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateEmployee } from "../thunks/employeeThunks";
import EmployeeForm from "../components/EmployeeFormUI";
import { selectEmployeeById } from "../employeeSelectors";

const EditEmployee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employee = useSelector(selectEmployeeById(id));

  const handleSubmit = async (data) => {
    try {
      await dispatch(updateEmployee({ id, employeeData: data })).unwrap();
      navigate("/employees");
    } catch (error) {
      console.log("Error updating employee", error);
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