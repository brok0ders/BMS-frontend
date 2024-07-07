import axios from "axios";

// Axios interceptor
const API = axios.create({ baseURL: import.meta.env.VITE_APP_BASE_URL });

export default API;
