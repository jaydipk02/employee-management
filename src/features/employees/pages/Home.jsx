import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/employees");
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Employee Management System</h1>

        <p className="home-subtitle">
          Welcome to the employee management dashboard.
        </p>

        <button className="home-button" onClick={handleNavigate}>
          Go to Employee List
        </button>
      </div>
    </div>
  );
};

export default Home;
