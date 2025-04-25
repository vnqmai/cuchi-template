// src/js/utils/helpers.js

export function formatDate(date) {
  // Hàm định dạng ngày tháng
  const d = new Date(date);
  return d.toLocaleDateString();
}

export function debounce(func, wait) {
  // Hàm debounce để giảm số lần gọi hàm liên tiếp
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
