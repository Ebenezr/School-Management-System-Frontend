import { Sidebar } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import stud from "./svg/stud";
import dash from "./svg/dash";
import usericon from "./svg/usericon";
import guardicon from "./svg/guardicon";
import gearicon from "./svg/gearicon";
import reporticon from "./svg/reporticon";
import payicon from "./svg/payicon";
import classicon from "./svg/classicon";
import teachericon from "./svg/teachericon";

const Aside = () => {
  return (
    <div className="w-fit">
      <Sidebar aria-label="Sidebar Menu">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item as={Link} to="dashboard" icon={dash}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Collapse label="Classes" icon={classicon}>
              <Sidebar.Item href="#">Products</Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Item as={Link} to="students" icon={stud}>
              Students
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="users" icon={usericon}>
              Users
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="guardians" icon={guardicon}>
              Guardians
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={teachericon}>
              Teachers
            </Sidebar.Item>

            <Sidebar.Item as={Link} to="teachers" icon={payicon}>
              Payments
            </Sidebar.Item>
            <Sidebar.Collapse label="Reports" icon={reporticon}>
              <Sidebar.Item href="#">Products</Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Collapse label="Settings" icon={gearicon}>
              <Sidebar.Item href="#">Products</Sidebar.Item>
            </Sidebar.Collapse>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default Aside;
