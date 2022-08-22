import axios from "axios";

// export const url = "https://scrum-api.carsonbutler.dev/api";

export const url = "http://localhost:8000/api";

export const axiosInstance = axios.create({
  baseURL: url,
  timeout: 5000,
});