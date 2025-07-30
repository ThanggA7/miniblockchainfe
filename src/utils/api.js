import axios from 'axios';

// Tạo instance axios với config chung
const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true, // Để gửi cookies session
  timeout: 5000, // 5 giây timeout thay vì 10
});

// Interceptor để xử lý response
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Tạm thời comment redirect để tránh vòng lặp
    /*
    if (error.response?.status === 401) {
      // Nếu unauthorized, redirect về login
      if (typeof window !== 'undefined') {
        window.location.href = '/Login';
      }
    }
    */
    return Promise.reject(error);
  }
);

// API functions
export const authAPI = {
  login: (username, password) =>
    api.post('/auth/login', { username, password }),
  
  signup: (username, password, walletAddress) =>
    api.post('/auth/signup', { username, password, walletAddress }),
  
  logout: () =>
    api.get('/auth/logout'),
  
  getUserInfo: () =>
    api.get('/auth/user'),
  
  // Helper function để lấy session info từ server (bao gồm UID)
  getSessionInfo: () =>
    api.get('/auth/session'),
  
  // Helper function để lấy UID từ cookie session
  getCurrentUID: () => {
    // Lấy session cookie
    const cookies = document.cookie.split(';');
    const sessionCookie = cookies.find(cookie => 
      cookie.trim().startsWith('connect.sid=')
    );
    
    if (sessionCookie) {
      // Parse session cookie để lấy UID
      // Session cookie format: connect.sid=s%3A{sessionId}
      const sessionValue = sessionCookie.split('=')[1];
      
      // Giải mã session cookie nếu cần
      try {
        const decodedSession = decodeURIComponent(sessionValue);
        // Trả về session ID làm UID tạm thời
        return decodedSession;
      } catch (error) {
        console.error('Error decoding session cookie:', error);
        return null;
      }
    }
    
    return null;
  }
};

export const transactionAPI = {
  getTransactions: () =>
    api.get('/transactions'),
  
  createTransaction: (data) =>
    api.post('/transactions', data),
};

export const depositAPI = {
  getDeposits: () =>
    api.get('/deposits'),
  
  createDeposit: (data) =>
    api.post('/deposits', data),
};

export const withdrawAPI = {
  getWithdrawals: () =>
    api.get('/withdraws'),
  
  createWithdrawal: (data) =>
    api.post('/withdraws', data),
};

export default api;
