import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <Link
        to="/surveys/new"
        className="ui right floated labeled icon green large basic button"
      >
        <i className="plus square green icon"></i>
        New Survey
      </Link>
    </div>
  );
};

export default Dashboard;
