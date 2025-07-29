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
        <div className="group flex items-center gap-3 relative ">
          <HiOutlineUserCircle className="text-3xl" />
          <div className="w-[220px] bg-[#1f1f1f] absolute right-0 top-0 z-50 rounded-lg hidden group-hover:block p-4 text-white shadow-xl">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm text-gray-400">
                avatar
              </div>
            </div>

            <div className="w-full bg-[#2a2a2a] border border-gray-600 rounded-md py-2 text-center font-medium mb-2">
              Nguyễn Văn A
            </div>

            <div className="w-full bg-[#2a2a2a] border border-gray-600 rounded-md py-2 text-center text-sm text-gray-400 mb-4">
              nguyenvana@gmail.com
            </div>

            <button className="w-full border border-red-500 text-red-400 py-1 rounded-md text-sm hover:bg-red-500 hover:text-white transition duration-200 cursor-pointer">
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
