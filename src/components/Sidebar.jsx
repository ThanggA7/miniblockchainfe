import React from "react";
import { Home, Calendar, BarChart2, Wallet } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="fixed left-0 h-screen w-[250px] bg-[#FFFFFF] p-4 flex flex-col justify-start gap-4">
      <div className="flex items-center justify-center gap-2 p-2 bg-blue-100 rounded-[8px]">
        <Home size={18} />
        <span>Dashboard</span>
      </div>
      <div className="flex items-center justify-center gap-2 p-2 bg-blue-100 rounded-[8px]">
        <Calendar size={18} />
        <span>My Profile</span>
      </div>
    </div>
  );
};

export default Sidebar;
