import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../../countries/countrySlice";
import { selectCountries } from "../../countries/countrySelectors";
import "./employeeForm.css";

const EmployeeForm = ({ initialData = {}, onSubmit, buttonText }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    country: "",
    state:"",
    district:"",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        mobile: initialData.mobile || "",
        country: initialData.country || "",
        state: initialData.state || "",
        district: initialData.district || "",
      });
    }

    dispatch(fetchCountries());
  }, [dispatch]);

  const countries = useSelector(selectCountries);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <form className="employee-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Employee Form</h2>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Mobile</label>
          <input
            type="text"
            name="mobile"
            inputMode="numeric"
            maxLength="10"
            pattern="[0-9]{10}"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>District</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Country</label>

          <select
            name="country" 
            value={formData.country} 
            onChange={handleChange} 
            required
          >
            <option value="">Select Country</option>

            {countries?.map((country) => (
              <option key={country.id} value={country.country}>
                {country.country}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-btn">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
