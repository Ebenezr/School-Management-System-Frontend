import React, { useState } from "react";
import SchoolUpdate from "../Components/modals/SchoolUpdate";

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
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">School Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-gray-600">School Name</label>
          <p className="text-gray-800">ABC School</p>
        </div>
        <div>
          <label className="text-gray-600">Email</label>
          <p className="text-gray-800">info@abcschool.com</p>
        </div>
        <div>
          <label className="text-gray-600">Phone</label>
          <p className="text-gray-800">123-456-7890</p>
        </div>
        <div>
          <label className="text-gray-600">Address</label>
          <p className="text-gray-800">123 Main St</p>
        </div>
        <div>
          <label className="text-gray-600">Address 2</label>
          <p className="text-gray-800">Suite 100</p>
        </div>
        <div>
          <label className="text-gray-600">Town</label>
          <p className="text-gray-800">Cityville</p>
        </div>
        <div className="col-span-2">
          <label className="text-gray-600">School Motto</label>
          <p className="text-gray-800">Learning for a better future</p>
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
        objData={selectedData?.original}
      />
    </div>
  );
}
