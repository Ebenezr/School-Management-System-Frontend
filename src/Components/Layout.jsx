import React from "react";
import Aside from "./aside";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Aside />
      <div className="flex-1 bg-gray-100">
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 p-5">
            <Outlet />
          </main>
          <footer className="bg-white p-5 border-l-2 border-l-gray-300">
            School Soft
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;
