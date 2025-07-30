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
import ProtectedRoute from "@/components/ProtectedRoute";

import { Table } from "antd";
import React, { useState, useEffect, use } from "react";
import UserProfile from "../UserProfile/page";
import { useAuth } from "../../contexts/AuthContext";
import { transactionAPI, depositAPI, withdrawAPI, authAPI } from "../../utils/api";

const Dashboard = () => {
  const { user, refreshUser } = useAuth();
  const [value, setValue] = useState("1");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMounted, setIsMounted] = useState(false);
  
  // Data states
  const [transactions, setTransactions] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [userBalance, setUserBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [transferForm, setTransferForm] = useState({
    toUID: '',
    amount: ''
  });
  const [withdrawForm, setWithdrawForm] = useState({
    amount: ''
  });

  const [modalText, setModalText] = useState("");

  useEffect(() => {
    setIsMounted(true);
    if (user) {
      fetchAllData();
    }
  }, [user]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchTransactions(),
        fetchDeposits(), 
        fetchWithdrawals(),
        fetchUserBalance()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await transactionAPI.getTransactions();
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactions([]);
    }
  };

  const fetchDeposits = async () => {
    try {
      const response = await depositAPI.getDeposits();
      setDeposits(response.data);
    } catch (error) {
      console.error('Error fetching deposits:', error);
      setDeposits([]);
    }
  };

  const fetchWithdrawals = async () => {
    try {
      const response = await withdrawAPI.getWithdrawals();
      setWithdrawals(response.data);
    } catch (error) {
      console.error('Error fetching withdrawals:', error);
      setWithdrawals([]);
    }
  };

  const fetchUserBalance = async () => {
    try {
      // Gọi API để lấy user info mới nhất thay vì dùng cached user
      const response = await authAPI.getUserInfo();
      setUserBalance(response.data.balance || 0);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setUserBalance(user?.balance || 0); // Fallback to cached user balance
    }
  };

  if (!isMounted) return null;

  const handleTransferSubmit = async () => {
    if (!transferForm.toUID || !transferForm.amount) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    setModalText(`Bạn có chắc chắn muốn gửi ${transferForm.amount} ETH tới UID: ${transferForm.toUID}?`);
    setOpen(true);
  };

  const handleWithdrawSubmit = async () => {
    if (!withdrawForm.amount) {
      alert('Vui lòng nhập số tiền muốn rút!');
      return;
    }

    try {
      const response = await withdrawAPI.createWithdrawal({
        amount: parseFloat(withdrawForm.amount)
      });
      
      alert(response.data.message || 'Rút tiền thành công!');
      setWithdrawForm({ amount: '' });
      
      // Refresh user info và data
      await refreshUser();
      await fetchAllData();
    } catch (error) {
      alert(error.response?.data?.error || 'Rút tiền thất bại!');
    }
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const response = await transactionAPI.createTransaction({
        toUID: parseInt(transferForm.toUID), // Convert to number
        amount: parseFloat(transferForm.amount)
      });
      
      alert(response.data.message || 'Chuyển tiền thành công!');
      setTransferForm({ toUID: '', amount: '' });
      
      // Refresh user info và data
      await refreshUser();
      await fetchAllData();
    } catch (error) {
      alert(error.response?.data?.error || 'Chuyển tiền thất bại!');
    } finally {
      setConfirmLoading(false);
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const showModal = () => {
    handleTransferSubmit();
  };

  // Columns cho transaction table
  const transactionColumns = [
    {
      title: "Người dùng",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <span className={amount > 0 ? 'text-green-600' : 'text-red-600'}>
          {amount > 0 ? '+' : ''}{amount} ETH
        </span>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (timestamp) => new Date(timestamp).toLocaleString('vi-VN'),
    },
  ];

  // Columns cho deposit table
  const depositColumns = [
    {
      title: "Địa chỉ ví",
      dataIndex: "from_address",
      key: "from_address",
      render: (address) => `${address?.slice(0, 6)}...${address?.slice(-4)}`,
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `+${amount} ETH`,
    },
    {
      title: "Thời gian",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (timestamp) => new Date(timestamp).toLocaleString('vi-VN'),
    },
  ];

  // Columns cho withdrawal table
  const withdrawalColumns = [
    {
      title: "Địa chỉ ví",
      dataIndex: "to_address",
      key: "to_address",
      render: (address) => `${address?.slice(0, 6)}...${address?.slice(-4)}`,
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `-${amount} ETH`,
    },
    {
      title: "Thời gian",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (timestamp) => new Date(timestamp).toLocaleString('vi-VN'),
    },
  ];

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "dashboard" && (
        <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-50">
          {/* Sidebar spacer for desktop */}
          <div className="hidden lg:block w-[220px]"></div>

          <div className="flex-1 pt-16 lg:pt-12 px-4 lg:px-6">
            <div className="max-w-7xl mx-auto">
              {/* Page Header */}
              <div className="mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
                <p className="text-gray-600 text-sm">Overview of your ZKP account</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Wallet size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Số dư hiện tại</h3>
                      <p className="text-blue-100 text-xs">Available balance</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">${userBalance.toLocaleString()}</p>
                    <p className="text-blue-200 text-xs mt-1">Updated today</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Wallet size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Tổng nợ</h3>
                      <p className="text-red-100 text-xs">Outstanding debt</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">$0</p>
                    <p className="text-red-200 text-xs mt-1">No debt</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Wallet size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold">ZK Proof Files</h3>
                      <p className="text-gray-500 text-xs">Cryptographic proofs</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      <span className="text-xs font-medium">proof.json</span>
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      <span className="text-xs font-medium">public.json</span>
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      <span className="text-xs font-medium">verification_key.json</span>
                    </Link>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Wallet size={20} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold">Merkle Hash</h3>
                      <p className="text-gray-500 text-xs">Blockchain hash</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span
                      title="1cf62965e5613cd404f589bbe2e214de8b504177c655e9533c41d24e86fae1d32"
                      className="block text-xs text-gray-600 truncate font-mono break-all"
                    >
                      1cf62965e5613cd404f589bbe2e214...
                    </span>
                    <p className="text-xs text-gray-500">Generated: {new Date().toLocaleTimeString('vi-VN')} - {new Date().toLocaleDateString('vi-VN')}</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Wallet size={20} className="text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold">Latest Proof</h3>
                      <p className="text-gray-500 text-xs">Last updated</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      <span className="text-xs font-medium">latest_proof.json</span>
                    </Link>
                    <p className="text-xs text-gray-500">Updated: {new Date().toLocaleDateString('vi-VN')}</p>
                  </div>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Transaction History - Takes 2 columns on large screens */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                      <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
                      <p className="text-gray-500 text-sm">View your recent transactions</p>
                    </div>
                    
                    <Box sx={{ width: "100%" }}>
                      <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <TabList
                            onChange={(event, newValue) => setValue(newValue)}
                            aria-label="transaction tabs"
                            variant="scrollable"
                            scrollButtons="auto"
                          >
                            <Tab label="Giao dịch" value="1" />
                            <Tab label="Lịch sử nạp" value="2" />
                            <Tab label="Lịch sử rút" value="3" />
                          </TabList>
                        </Box>
                        <TabPanel value="1" sx={{ padding: 2 }}>
                          <Table
                            pagination={false}
                            scroll={{ y: 300, x: 'max-content' }}
                            columns={transactionColumns}
                            dataSource={transactions.map((tx, index) => ({...tx, key: index}))}
                            locale={{ emptyText: 'Chưa có giao dịch nào' }}
                            size="small"
                          />
                        </TabPanel>
                        <TabPanel value="2" sx={{ padding: 2 }}>
                          <Table
                            pagination={false}
                            scroll={{ y: 300, x: 'max-content' }}
                            columns={depositColumns}
                            dataSource={deposits.map((deposit, index) => ({...deposit, key: index}))}
                            locale={{ emptyText: 'Chưa có lịch sử nạp tiền' }}
                            size="small"
                          />
                        </TabPanel>
                        <TabPanel value="3" sx={{ padding: 2 }}>
                          <Table
                            pagination={false}
                            scroll={{ y: 300, x: 'max-content' }}
                            columns={withdrawalColumns}
                            dataSource={withdrawals.map((withdrawal, index) => ({...withdrawal, key: index}))}
                            locale={{ emptyText: 'Chưa có lịch sử rút tiền' }}
                            size="small"
                          />
                        </TabPanel>
                      </TabContext>
                    </Box>
                  </div>
                </div>

                {/* Action Panel - Takes 1 column on large screens */}
                <div className="lg:col-span-1 space-y-4">
                  {/* Deposit Card */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Wallet size={20} className="text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Nạp tiền</h3>
                        <p className="text-gray-500 text-xs">Deposit to your account</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Địa chỉ ví của bạn
                        </label>
                        <div className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg">
                          <span className="text-xs text-gray-700 break-all font-mono">
                            {user?.walletAddress || '0x1234...5678'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Gửi tiền đến địa chỉ này
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Transfer Card */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Wallet size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Chuyển tiền</h3>
                        <p className="text-gray-500 text-xs">Transfer to another user</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          UID người nhận
                        </label>
                        <input
                          value={transferForm.toUID}
                          onChange={(e) => setTransferForm({...transferForm, toUID: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                          type="text"
                          placeholder="u1, u2..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Số tiền
                        </label>
                        <input
                          value={transferForm.amount}
                          onChange={(e) => setTransferForm({...transferForm, amount: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                          type="number"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <button
                        onClick={showModal}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-lg transition duration-200 text-sm"
                      >
                        Chuyển tiền
                      </button>
                    </div>
                  </div>

                  {/* Withdraw Card */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <Wallet size={20} className="text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Rút tiền</h3>
                        <p className="text-gray-500 text-xs">Withdraw to your wallet</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Số tiền muốn rút
                        </label>
                        <input
                          value={withdrawForm.amount}
                          onChange={(e) => setWithdrawForm({...withdrawForm, amount: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-sm"
                          type="number"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Khả dụng: ${(userBalance || 0).toFixed(2)}
                        </p>
                      </div>
                      <button 
                        onClick={handleWithdrawSubmit}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded-lg transition duration-200 text-sm"
                      >
                        Rút tiền
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === "profile" && (
        <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-50">
          {/* Sidebar spacer for desktop */}
          <div className="hidden lg:block w-[220px]"></div>
          <div className="flex-1 pt-16 lg:pt-12 px-4 lg:px-6">
            <UserProfile />
          </div>
        </div>
      )}
      
      {/* Modal for transfer confirmation */}
      <Modal
        title="Xác nhận chuyển tiền"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <p>{modalText}</p>
      </Modal>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
