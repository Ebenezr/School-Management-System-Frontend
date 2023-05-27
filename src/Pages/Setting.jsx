import React, { useState } from "react";
import SchoolUpdate from "../Components/modals/SchoolUpdate";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Setting = () => {
  return (
    <div>
      <SettingsCard />
    </div>
  );
};

export default Setting;

// Name
// Email
// Phone
// Address
// Address 2
// Town
// School Moto

function SettingsCard() {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState();

  const fetchData = async () => {
    try {
      const [schoolResponse] = await Promise.all([
        axios.get(`${process.env.REACT_APP_BASE_URL}/schools/all`),
      ]);

      return {
        school: schoolResponse?.data,
      };
    } catch (error) {
      throw new Error("Error fetching data");
    }
  };

  const { data } = useQuery(["school-data"], fetchData);
  console.log(data);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">School Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-gray-600">School Name</label>
          <p className="text-gray-800">{data && data.school?.name}</p>
        </div>
        <div>
          <label className="text-gray-600">Email</label>
          <p className="text-gray-800">{data && data.school?.email}</p>
        </div>
        <div>
          <label className="text-gray-600">Phone</label>
          <p className="text-gray-800">{data && data.school?.phone}</p>
        </div>
        <div>
          <label className="text-gray-600">Address</label>
          <p className="text-gray-800">{data && data.school?.address}</p>
        </div>
        <div>
          <label className="text-gray-600">Address 2</label>
          <p className="text-gray-800">{data && data.school?.address2}</p>
        </div>
        <div>
          <label className="text-gray-600">Town</label>
          <p className="text-gray-800">{data && data.school?.town}</p>
        </div>
        <div className="col-span-2">
          <label className="text-gray-600">School Motto</label>
          <p className="text-gray-800">{data && data.school?.school_motto}</p>
        </div>
      </div>
      <button
        className="mt-6 bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-600"
        onClick={() => {
          setUpdateModalOpen(true);
        }}
      >
        Edit Information
      </button>
      <SchoolUpdate
        open={updateModalOpen}
        setShowSuccessToast={setShowSuccessToast}
        setShowErrorToast={setShowErrorToast}
        onClose={() => setUpdateModalOpen(false)}
        objData={data && data?.school}
      />
    </div>
  );
}
