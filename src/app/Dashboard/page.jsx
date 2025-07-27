import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from "react";

const Dashboard = () => {
  return (
    <div className="">
      <Header />
      <div className="w-full bg-[#42404028] h-[1px] mt-2"></div>
      <div className="flex">
        <div className="w-[15%]">
          <Sidebar />
        </div>
        <div className="w-[1px] h-[88vh] bg-[#42404028] "></div>
        <div className="w-[75%] p-4">dsadsad</div>
      </div>
    </div>
  );
};

export default Dashboard;
