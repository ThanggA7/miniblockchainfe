"use client";
import React from "react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaSignOutAlt, FaCog } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";

const Header = () => {
  return (
    <div className="p-3 bg-white border-b border-[#0000002a]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[30px]">
          <div className="font-bold text-2xl">ZKP-G1 </div>
          <div>
            <div className="flex flex-col">
              <span>Welcome Nhu Thang!</span>
              <span>Hope you are healthy and happy today...</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-xl pl-10 pr-4 py-2 text-sm"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>

          <HiOutlineUserCircle className="text-3xl" />
        </div>
      </div>
    </div>
  );
};

export default Header;
