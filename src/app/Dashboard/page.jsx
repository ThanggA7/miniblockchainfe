"use client";
import Header from "@/components/Header";
import { Wallet } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Modal } from "antd";
import Link from "next/link";

import { Table } from "antd";
import React, { useState, useEffect } from "react";
import UserProfile from "../UserProfile/page";

const Dashboard = () => {
  const [value, setValue] = useState("1");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [addrees_id, getAddress_id] = useState("688480f24c392e2c2faac2f2");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMounted, setIsMounted] = useState(false);
  const [modalText, setModalText] = useState(
    "Bạn có chắc chắn muốn gửi tiền tới : 688480f24c392e2c2faac2f2?"
  );
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setModalText(modalText);
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const showModal = () => {
    setOpen(true);
  };
  const columns = [
    {
      title: "Từ ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Đến",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Thời gian",
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
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "dashboard" && (
        <div className="flex w-full overflow-hidden">
          <div className="w-[300px]"></div>

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
                    Tổng nợ
                  </span>
                </div>
                <p className="mt-5 font-bold text-black text-[18px]">
                  -$103,000
                </p>
              </div>

              <div className="w-[200px] h-[130px] bg-white rounded-[6px] p-3">
                <div className="flex items-center gap-2">
                  <Wallet
                    size={30}
                    className="p-2 bg-[#D0DBFF] rounded-full text-blue-600"
                  />
                  <span className="text-[14px] font-semibold text-black">
                    ZK Proof
                  </span>
                </div>
                <div className="flex flex-col gap-1 ">
                  <Link
                    href=""
                    className="mt-2 font-bold text-blue-600 underline text-[14px] active:text-red-400"
                  >
                    proof.json
                  </Link>
                  <Link
                    href=""
                    className=" font-bold text-blue-600 underline text-[14px] active:text-red-400"
                  >
                    public.json
                  </Link>
                  <Link
                    href=""
                    className=" font-bold text-blue-600 underline text-[14px] active:text-red-400"
                  >
                    verification_key.json
                  </Link>
                </div>
              </div>

              <div className="w-[230px] h-[130px] bg-white rounded-[6px] p-3">
                <div className="flex items-center gap-2">
                  <Wallet
                    size={30}
                    className="p-2 bg-[#D0DBFF] rounded-full text-blue-600"
                  />
                  <span className="text-[14px] font-semibold text-black">
                    Final hash (Merkle root & timestamp)
                  </span>
                </div>
                <div className="flex flex-col gap-1 ">
                  <span
                    title="1cf62965e5613cd404f589bbe2e214de8b504177c655e9533c41d24e86fae1d32"
                    className="mt-2  text-[14px] overflow-hidden whitespace-nowrap overflow-ellipsis "
                  >
                    1cf62965e5613cd404f589bbe2e214de8b504177c655e9533c41d24e86fae1d3
                  </span>
                  <span className="  text-[14px] ">8:30 AM - 23/7/2025</span>
                </div>
              </div>
              <div className="w-[200px] h-[130px] bg-white rounded-[6px] p-3">
                <div className="flex items-center gap-2">
                  <Wallet
                    size={30}
                    className="p-2 bg-[#D0DBFF] rounded-full text-blue-600"
                  />
                  <span className="text-[14px] font-semibold text-black">
                    ZK Proof
                  </span>
                </div>
                <div className="flex flex-col gap-1 ">
                  <Link
                    href=""
                    className="mt-2 font-bold text-blue-600 underline text-[14px] active:text-red-400"
                  >
                    proof.json
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full h-[450px] max-h-[405px] bg-white mt-5 rounded-[6px] overflow-y-auto">
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
                    className="w-full max-h-[550px] overflow-y-auto"
                    value="1"
                  >
                    <Table
                      pagination={false}
                      scroll={{ y: 250 }}
                      columns={columns}
                      dataSource={data}
                    />
                  </TabPanel>
                  <TabPanel
                    className="w-full max-h-[550px] overflow-y-auto"
                    value="2"
                  >
                    <Table
                      pagination={false}
                      scroll={{ y: 250 }}
                      columns={columns}
                      dataSource={data}
                    />
                  </TabPanel>
                  <TabPanel
                    className="w-full max-h-[550px] overflow-y-auto"
                    value="3"
                  >
                    <Table
                      pagination={false}
                      scroll={{ y: 250 }}
                      columns={columns}
                      dataSource={data}
                    />
                  </TabPanel>
                </TabContext>
              </Box>
            </div>
          </div>

          <div className="p-4 min-w-[400px]">
            <div className="min-h-[50px] bg-white rounded-[6px] p-3">
              <span className="flex items-center justify-center font-bold">
                Nạp tiền vào sàn
              </span>
              <div>
                <div className="mt-5 relative">
                  <div className="w-full h-[45px] border border-[#CACACA] outline-none border-[1px] text-[#626262] rounded-[4px] text-[16px] flex flex-col items-center justify-center ">
                    <span className="overflow-hidden whitespace-nowrap overflow-ellipsis w-[300px]">
                      1cf62965e5613cd404f589bbe2e214de8b504177c655e9533c41d24e86fae1d3
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[250px] bg-white rounded-[6px] mt-5 p-3">
              <span className="text-[#000000] text-[15px] font-semibold">
                Chuyển tiền
              </span>
              <div>
                <input
                  className="w-full h-[45px] border border-[#CACACA] outline-none border-[1px] rounded-[4px] text-[14px] p-1  mt-3 no-spinner"
                  type="number"
                  placeholder="Nhập UID người nhận "
                />
                <input
                  className="w-full h-[45px] border border-[#CACACA] outline-none border-[1px] rounded-[4px] text-[14px] p-1  mt-3 no-spinner"
                  type="number"
                  placeholder="Nhập số tiền cần chuyển "
                />
              </div>

              <button
                onClick={showModal}
                className="px-2 py-2 w-full  bg-[#2752E7] mt-5 rounded-[3px] cursor-pointer text-white text-[16px] font-semibold"
              >
                Chuyển tiền
              </button>
              <div>
                <Modal
                  title="Title"
                  open={open}
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                >
                  <p>{modalText}</p>
                </Modal>
              </div>
            </div>
            <div className="min-h-[150px] bg-white rounded-[6px] p-3 mt-5">
              <div>
                <div className="mt-1">
                  <span className="font-bold">Rút tiền</span>
                  <input
                    className="w-full h-[45px] border border-[#CACACA] outline-none border-[1px] rounded-[4px] text-[14px] p-1  mt-1 no-spinner"
                    type="number"
                    placeholder="Nhập số tiền muốn rút"
                  />
                  <button className="px-2 py-2 w-full  bg-[#2752E7] mt-5 rounded-[3px] cursor-pointer text-white text-[16px] font-semibold">
                    Rút tiền
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === "profile" && (
        <div>
          <UserProfile />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
