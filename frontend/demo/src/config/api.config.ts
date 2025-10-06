// API Configuration
// Thay đổi URL này khi deploy production
export const API_CONFIG = {
  // Development API URL
  DEV_URL: "http://localhost:5213/api",
  
  // Production API URL (thay đổi khi deploy)
  PROD_URL: "https://your-production-api.com/api",
  
  // Auto detect environment
  BASE_URL: import.meta.env.DEV 
    ? "http://localhost:5213/api" 
    : "https://your-production-api.com/api",
};
