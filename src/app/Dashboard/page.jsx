"use client";
import Header from "@/components/Header";
import { Wallet, Link } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button, Modal } from "antd";

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
                    Balance
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
                    Balance
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
                    Balance
                  </span>
                </div>
                <p className="mt-5 font-bold text-black text-[18px]">
                  -$103,000
                </p>
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
                  <TabPanel
                    className="w-full max-h-[350px] overflow-y-auto"
                    value="2"
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
                  </TabPanel>{" "}
                  <TabPanel
                    className="w-full max-h-[350px] overflow-y-auto"
                    value="3"
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
                </TabContext>
              </Box>
            </div>
          </div>

          <div className="p-4 min-w-[400px]">
            <div className="h-[250px] bg-white rounded-[6px] p-3">
              <span className="flex items-center justify-center font-bold">
                Nạp tiền vào sàn
              </span>
              <div>
                <div className="mt-5 relative">
                  <input
                    className="w-full h-[45px] border border-[#CACACA] outline-none border-[1px] text-[#626262] rounded-[4px] text-[16px] p-1 text-center "
                    type="text"
                    value={addrees_id}
                    onChange={(e) => {
                      getAddress_id(e.target.value);
                    }}
                  />
                  <input
                    className="w-full h-[45px] border border-[#CACACA] outline-none border-[1px] rounded-[4px] text-[14px] p-1  mt-3 no-spinner"
                    type="number"
                    placeholder="Nhập số tiền cần chuyển vào sàn"
                  />
                  <Link className="absolute left-1/2 -translate-x-1/2 top-[40px] z-10 " />
                </div>
                <div>
                  <button className="px-2 py-2 w-full  bg-[#2752E7] mt-5 rounded-[3px] cursor-pointer text-white text-[16px] font-semibold">
                    Nạp tiền
                  </button>
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
