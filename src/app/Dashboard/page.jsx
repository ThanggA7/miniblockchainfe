"use client";
import Header from "@/components/Header";
import { Wallet } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Table } from "antd";

import React, { useState } from "react";

const Dashboard = () => {
  const [value, setValue] = useState("1");
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tuổi",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
  ];

  const data = [
    {
      key: "1",
      name: "Nguyễn Văn A",
      age: 32,
      address: "Hà Nội",
    },
    {
      key: "2",
      name: "Nguyễn Văn A",
      age: 32,
      address: "Hà Nội",
    },
    {
      key: "3",
      name: "Nguyễn Văn A",
      age: 32,
      address: "Hà Nội",
    },
    {
      key: "4",
      name: "Nguyễn Văn A",
      age: 32,
      address: "Hà Nội",
    },
    {
      key: "5",
      name: "Nguyễn Văn A",
      age: 32,
      address: "Hà Nội",
    },
    {
      key: "6",
      name: "Nguyễn Văn A",
      age: 32,
      address: "Hà Nội",
    },
  ];

  return (
    <div className="">
      <Header />
      <div className="flex w-full overflow-hidden">
        <div className="w-[250px]">
          <Sidebar />
        </div>

        <div className="p-4 flex-1">
          <div className="flex items-center gap-5">
            <div className="w-[200px] h-[130px] bg-[#2752E7] rounded-[6px] p-3">
              <div className="flex items-center gap-2">
                <Wallet
                  size={30}
                  className="p-2 bg-white rounded-full text-blue-600"
                />
                <span className="text-[14px] font-semibold text-white">
                  Balance
                </span>
              </div>
              <p className="mt-5 font-bold text-white text-[18px]">
                $40,000.063
              </p>
            </div>

            <div className="w-[200px] h-[130px] bg-white rounded-[6px] p-3">
              <div className="flex items-center gap-2">
                <Wallet
                  size={30}
                  className="p-2 bg-[#D0DBFF] rounded-full text-blue-600"
                />
                <span className="text-[14px] font-semibold text-black">
                  Balance
                </span>
              </div>
              <p className="mt-5 font-bold text-black text-[18px]">-$103,000</p>
            </div>

            <div className="w-[200px] h-[130px] bg-white rounded-[6px] p-3">
              <div className="flex items-center gap-2">
                <Wallet
                  size={30}
                  className="p-2 bg-[#D0DBFF] rounded-full text-blue-600"
                />
                <span className="text-[14px] font-semibold text-black">
                  Balance
                </span>
              </div>
              <p className="mt-5 font-bold text-black text-[18px]">-$103,000</p>
            </div>

            <div className="w-[200px] h-[130px] bg-white rounded-[6px] p-3">
              <div className="flex items-center gap-2">
                <Wallet
                  size={30}
                  className="p-2 bg-[#D0DBFF] rounded-full text-blue-600"
                />
                <span className="text-[14px] font-semibold text-black">
                  Balance
                </span>
              </div>
              <p className="mt-5 font-bold text-black text-[18px]">-$103,000</p>
            </div>
          </div>

          <div className="w-full h-[400px] max-h-[400px] bg-white mt-5 rounded-[6px] overflow-y-auto">
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Lịch sử giao dịch" value="1" />
                    <Tab label="Lịch sử nạp" value="2" />
                    <Tab label="Lịch sử rút" value="3" />
                  </TabList>
                </Box>
                <TabPanel
                  className="w-full max-h-[350px] overflow-y-auto"
                  value="1"
                >
                  <Table
                    pagination={{
                      pageSize: 3,
                      showSizeChanger: true,
                      pageSizeOptions: ["3", "10", "20", "50"],
                      showQuickJumper: true,
                    }}
                    columns={columns}
                    dataSource={data}
                  />
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>

        <div className="p-4 min-w-[400px]">
          <div className="h-[250px] bg-white rounded-[6px]"></div>
          <div className="h-[250px] bg-white rounded-[6px] mt-5"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
