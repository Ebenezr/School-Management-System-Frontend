import React from "react";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <section className="bg-purple-50 grid place-items-center h-[100vh]">
      <Link
        className="hover:bg-purple-500 text-purple-700 bg-purple-200 px-4 py-2 border-.5 rounded hover:text-white"
        to="dashboard"
      >
        login
      </Link>
    </section>
  );
};

export default Login;
