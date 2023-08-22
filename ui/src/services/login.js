import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  console.log("🚀 ~ file: login.js:5 ~ login ~ credentials:", credentials);
  const response = await axios.post(baseUrl, credentials);
  console.log("🚀 ~ file: login.js:6 ~ login ~ response:", response);
  return response.data;
};

export default { login };
