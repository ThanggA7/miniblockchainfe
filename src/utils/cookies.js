// Utility functions để làm việc với cookies
export const getCookie = (name) => {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

export const setCookie = (name, value, days = 7) => {
  if (typeof document === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

export const deleteCookie = (name) => {
  if (typeof document === 'undefined') return;
  
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

// Mapping table để map username với UID thực tế (dựa trên database)
const USERNAME_UID_MAP = {
  'hieu': 'u1',
  'toan': 'u2', 
  'hoang': 'arg38yt097b',
  '123456': '1753839111120',
  'thang123': '1753839676951',
  '1234564': '1753840007149'
};

// Function để lấy UID từ localStorage hoặc mapping
export const getUIDFromSession = () => {
  // Kiểm tra localStorage cho UID đã lưu
  if (typeof window !== 'undefined') {
    const storedUID = localStorage.getItem('userUID');
    if (storedUID) {
      console.log('UID from localStorage:', storedUID);
      return storedUID;
    }
  }
  return null;
};

// Function để lấy UID từ username
export const getUIDFromUsername = (username) => {
  const uid = USERNAME_UID_MAP[username];
  console.log(`Getting UID for username ${username}:`, uid);
  return uid || null;
};

// Function để lưu UID vào localStorage
export const setUserUID = (uid) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userUID', uid);
    console.log('Saved UID to localStorage:', uid);
  }
};

// Function để xóa UID khỏi localStorage
export const clearUserUID = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('userUID');
    console.log('Cleared UID from localStorage');
  }
};

export default {
  getCookie,
  setCookie,
  deleteCookie,
  getUIDFromSession,
  getUIDFromUsername,
  setUserUID,
  clearUserUID
};
