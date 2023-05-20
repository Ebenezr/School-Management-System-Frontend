import { Avatar, Button, Sidebar } from "flowbite-react";
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
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
const Aside = () => {
  const navigate = useNavigate();
  return (
    <div className="w-fit h-screen flex flex-col">
      <Sidebar aria-label="Sidebar Menu">
        <Sidebar.Logo href="#" img="favicon.png" imgAlt="">
          School Soft
        </Sidebar.Logo>
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
      <div className="flex flex-col justify-center w-full px-2 py-4">
        <div className="flex items-end  pb-4 w-full ">
          <Avatar placeholderInitials="EB" rounded={true}>
            <div className="space-y-1 font-medium dark:text-white">
              <div>Jese Leos</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                ADMIN
              </div>
            </div>
          </Avatar>
        </div>
        <div>
          <Button
            className="mx-auto w-full"
            color="purple"
            onClick={() => {
              navigate("/");
            }}
          >
            Sign out
            <CiLogout className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Aside;
