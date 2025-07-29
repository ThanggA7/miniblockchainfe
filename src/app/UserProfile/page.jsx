"use client";

import React from "react";

const UserProfile = () => {
  const handleVerify = () => {
    console.log("Verification initiated");
  };

  return (
    <div className=" bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">User Profile</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Horne / User
              </h2>
              <p className="text-sm text-gray-500">User Profile</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total rewards</p>
              <p className="text-xl font-bold text-green-600">$1,056.00 USD</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">
                Wallet Adress: test123213213123213213213
              </h3>
            </div>
            <div className="space-y-1">
              <p className="text-gray-800">Peterson Kennedy</p>
              <p className="text-gray-600">petersonkenn@demo.com</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleVerify}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow transition duration-200 cursor-pointer"
          >
            Verify Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
