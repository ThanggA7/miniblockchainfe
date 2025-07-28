"use client";

import React from "react";
import { Home, Calendar } from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: "dashboard", label: "Dashboard", icon: <Home size={18} /> },
    { key: "profile", label: "My Profile", icon: <Calendar size={18} /> },
  ];

  return (
    <div className="fixed left-0 h-screen w-[250px] bg-white p-4 flex flex-col gap-4">
      {tabs.map((tab) => (
        <div
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`flex items-center gap-2 p-2 rounded-[8px] cursor-pointer transition-all
            ${
              activeTab === tab.key
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
