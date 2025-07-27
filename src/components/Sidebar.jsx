import React from "react";
import {
  Home,
  Calendar,
  BarChart2,
  Wallet,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="p-2 grid grid-rows-4 gap-4">
      <div className="flex items-center gap-2 bg-blue-100 p-2 rounded-[10px]  ">
        <Home size={18} />
        <span>Dashboard</span>
      </div>
      <div className="flex items-center gap-2 bg-blue-100 p-2 rounded-[10px]  ">
        <Calendar size={18} />
        <span>My Profile</span>
      </div>
      <div className="flex items-center gap-2 bg-blue-100 p-2 rounded-[10px]  ">
        <Wallet size={18} />
        <span>My Wallet</span>
      </div>
      <div className="flex items-center gap-2 bg-blue-100 p-2 rounded-[10px]  ">
        <BarChart2 size={18} />
        <span>Analytics</span>
      </div>
    </div>
  );
};

export default Sidebar;
